import { Page } from '@/api/system_setting/types/sys_role'
import { isNullOrUnDef } from '@/utils/is'
import { reactive, ref } from 'vue'

const tableMap = {}
const tableMapStates = {}

export const useTable = <T>(
  dataApi: Function,
  page: Omit<Page, 'desc'>,
  searchObj: any,
  key: string
) => {
  // 创建分页对象
  const createTable = (page: Omit<Page, 'desc'>, key: string) => {
    let pagination, loading, data, searchData
    console.log(isNullOrUnDef(tableMapStates[key]))
    if (isNullOrUnDef(tableMapStates[key])) {
      // count = ref<number>(num)
      pagination = reactive({
        page: page.page,
        pageSize: page.pageSize,
        itemCount: 0,
        onChange: (page: number) => {
          loading.value = true
          pagination.page = page
          getData({ page: page, pageSize: pagination.pageSize, desc: false })
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
  const getData = async (page: Page) => {
    const res = await dataApi(page, searchData)
    pagination.itemCount = res.total
    data.value = res.items
    loading.value = false
  }

  // 点击搜索按钮
  const doSearch = () => {
    loading.value = true
    pagination.page = 1
    getData({ page: 1, pageSize: pagination.pageSize, desc: false })
  }

  // 重置搜索条件
  const doReset = () => {
    searchData.value = { ...searchObj }
  }

  const { pagination, loading, data, searchData } = createTable(page, key)
  return [pagination, loading, data, searchData, getData, doSearch, doReset]
}
