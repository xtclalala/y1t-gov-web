import { isNullOrUnDef } from '@/utils/is'
import { reactive, ref } from 'vue'
import type { Page } from '@/api/type'
import type {
  Handle2,
  HandleReset,
  HandleSearch,
  Pagination,
  TableMapStates,
  TableMap,
  DataApiType,
  HandleGetData,
  PaginationInfo,
  useTableType,
} from '@/hooks/useTable/type'

const tableMap: TableMap = {}
const tableMapStates: TableMapStates = {}

export const useTable = <T extends { id: string }, D>(
  dataApi: DataApiType<D>,
  page: Page,
  searchObj: D,
  key: string
): useTableType<T, D> => {
  // 创建分页对象
  const createTable = (page: Page, key: string): Pagination<T, D> => {
    let pagination, loading, data, searchData
    if (isNullOrUnDef(tableMapStates[key])) {
      pagination = reactive<PaginationInfo>({
        page: page.page,
        pageSize: page.pageSize,
        itemCount: 0,
        onChange: (pageNum: number) => {
          loading.value = true
          pagination.page = pageNum
          getData({ page: pageNum, pageSize: pagination.pageSize, desc: page.desc })
        },
      })
      loading = ref<boolean>(true)
      data = ref<Array<T>>([])
      searchData = ref({ ...searchObj })
      tableMapStates[key] = true
      tableMap[key] = { pagination, loading, data, searchData }
    } else {
      ;({ pagination, loading, data, searchData } = tableMap[key])
    }
    return {
      pagination,
      loading,
      data,
      searchData,
    }
  }

  // 获取搜索数据
  const getData: HandleGetData = async (page: Page): Promise<void> => {
    const res = await dataApi(page, searchData.value)
    pagination.itemCount = res.total
    data.value = res.items
    loading.value = false
  }

  // 点击搜索按钮
  const doSearch: HandleSearch = (): void => {
    loading.value = true
    pagination.page = 1
    getData({ page: 1, pageSize: pagination.pageSize, desc: page.desc })
  }

  // 重置搜索条件
  const doReset: HandleReset = (): void => {
    searchData.value = { ...searchObj }
  }

  const key2id: Handle2<T> = (row: T): string => row.id

  const { pagination, loading, data, searchData } = createTable(page, key)
  return [pagination, loading, data, searchData, getData, doSearch, doReset, key2id]
}
