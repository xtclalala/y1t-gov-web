import { Ref } from 'vue'
import type { PageResult } from '#axios'
import type { Page } from '@/api/type'

type TableMap = {
  [key: string]: Pagination<any, any>
}
type TableMapStates = {
  [key: string]: boolean
}

// useTable 接收类型
/**
 * 获取数据接口
 */
type DataApiType<T = any, D = any> = (page: Page, searchData: D) => Promise<PageResult<Array<T>>>

// useModel 返回类型
/**
 * 分页类型
 */
type PaginationInfo = {
  page: number
  pageSize: number
  itemCount: number
  desc: boolean
  onChange: (pageNum: number) => Promise<void>
}

/**
 * 获取数据方法
 */
type HandleGetData = (page: Page) => Promise<void>

/**
 * 搜索方法
 */
type HandleSearch = () => Promise<void>

/**
 * 重置方法
 */
type HandleReset = () => Promise<void>

/**
 * key2id 方法
 */
type Handle2<T> = (row: T) => string | number

/**
 * 一个 modal 所需要的相关字段
 */
type Pagination<T, D> = {
  pagination: PaginationInfo
  loading: Ref<boolean>
  data: Ref<Array<T>>
  searchData: Ref<D>
  option: Options<D>
}

/**
 * useModel 方法向外暴漏的问题
 */
type useTableType<T, D> = [
  PaginationInfo,
  Ref<boolean>,
  Ref<Array<T>>,
  Ref<D>,
  HandleGetData,
  HandleSearch,
  HandleReset,
  Handle2<T>
]

type Options<D> = {
  key: string
  page: Page
  search: {
    obj: D
    dataMode: DataMode
    api?: DataApiType
    getDataCallback?: HandleGetData
  }
}
type PId = { id: string | number }
type DataMode = 'JOIN' | 'MARGE'

export type {
  DataApiType,
  PaginationInfo,
  useTableType,
  Pagination,
  HandleGetData,
  HandleSearch,
  HandleReset,
  Handle2,
  TableMapStates,
  TableMap,
  Options,
  DataMode,
  PId,
}
