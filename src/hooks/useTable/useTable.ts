import { isFunction, isNullOrUnDef } from '@/utils/is'
import { reactive, ref } from 'vue'
import type { Page } from '@/api/type'
import type {
  Handle2,
  HandleReset,
  HandleSearch,
  Pagination,
  TableMapStates,
  TableMap,
  HandleGetData,
  PaginationInfo,
  useTableType,
  Options,
  PId,
} from '@/hooks/useTable/type'
import { completeMerger } from '@/utils/helper/objectHelper'
import { options } from '@/hooks/useModal/options'

const tableMap: TableMap = {}
const tableMapStates: TableMapStates = {}

export const useTable = <T extends PId, D>(value: Options<D>): useTableType<T, D> => {
  // 创建分页对象
  const createTable = (option: Options<D>): Pagination<T, D> => {
    let pagination, loading, data, searchData

    const key = option.key
    option = completeMerger(options, option)
    if (isNullOrUnDef(tableMapStates[key])) {
      const { page, search } = option

      pagination = reactive<PaginationInfo>({
        page: page.page,
        pageSize: page.pageSize,
        itemCount: 0,
        desc: page.desc,
        onChange: async (pageNum: number) => {
          loading.value = true
          page.page = pageNum
          await getData({ page: pageNum, pageSize: page.pageSize, desc: page.desc })
        },
      })
      loading = ref<boolean>(true)
      data = ref<Array<T>>([])
      searchData = ref({ ...search.obj })
      tableMapStates[key] = true
      tableMap[key] = { pagination, loading, data, searchData, option }
    } else {
      ;({ pagination, loading, data, searchData, option } = tableMap[key])
    }
    return {
      pagination,
      loading,
      data,
      searchData,
      option,
    }
  }

  const { pagination, loading, data, searchData, option } = createTable(value)

  // 获取搜索数据
  let getData: HandleGetData
  const fn = option.search.getDataCallback

  if (isFunction(fn)) {
    getData = async (page: Page): Promise<void> => {
      await fn(page)
      loading.value = false
    }
  } else {
    const api = option.search.api
    if (!isFunction(api)) {
      throw new Error('useTable options.search.api can not empty')
    } else {
      getData = async (page: Page): Promise<void> => {
        const res = await api(page, searchData.value)
        pagination.itemCount = res.total
        switch (option.search.dataMode) {
          case 'JOIN':
            data.value.push(...res.items)
            break
          case 'MARGE':
            data.value = res.items
            break
          default:
            data.value = res.items
        }
        loading.value = false
      }
    }
  }

  // 点击搜索按钮
  const doSearch: HandleSearch = async (): Promise<void> => {
    loading.value = true
    pagination.page = 1
    await getData({ page: 1, pageSize: pagination.pageSize, desc: pagination.desc })
  }

  // 重置搜索条件
  const doReset: HandleReset = async (): Promise<void> => {
    searchData.value = { ...option.search.obj }
  }

  const key2id: Handle2<T> = (row: T): string | number => row.id

  return [pagination, loading, data, searchData, getData, doSearch, doReset, key2id]
}
