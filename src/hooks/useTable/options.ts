import { Options } from '@/hooks/useTable/type'

export const options: Options<any> = {
  key: 'default',
  page: {
    pageSize: 10,
    page: 0,
    desc: true,
  },
  search: {
    obj: {},
    dataMode: 'JOIN',
  },
}
