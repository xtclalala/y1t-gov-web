import { genMessage } from '../helper'
// todo
// import antdLocale from 'ant-design-vue/es/locale/zh_CN'

const modules = import.meta.globEager('./zh-CN/**/*.ts')
export default {
  message: {
    ...genMessage(modules, 'zh-CN'),
    // antdLocale,
  },
}
