import { Ref } from 'vue'
import { FormInst } from 'naive-ui'

type ModelMap = {
  [key: string]: ModalType<any>
}

type ModalMapStates = {
  [key: string]: boolean
}

// useModel 接收类型
/**
 * 创建接口
 */
type RegisterApiType<T = any> = (modal: T) => void

/**
 * 更新接口
 */
type UpdateApiType<D = any> = (modal: D) => Promise<any>

/**
 * 接口请求以后的操作方法
 */
type AfterApiType = () => void

// useModel 返回类型
/**
 * 数据新增
 */
type HandleRegisterFunc = () => void

/**
 * 点击提交
 */
type HandleSubmitFunc = (e: MouseEvent) => void

/**
 * 点击取消
 */
type HandleCancelFunc = () => void

/**
 * 打开弹窗
 */
type HandleOpenFunc = () => void

/**
 * 清空弹窗
 */
type HandleClearFunc = () => void

/**
 * 弹窗标题
 */
type HandleTitle = () => string

/**
 * 一个 modal 所需要的相关字段
 */
type ModalType<T> = {
  isAdd: Ref<boolean>
  showModal: Ref<boolean>
  form: Ref<FormInst | null>
  model: Ref<T>
  style: Object
}

/**
 * useModel 方法向外暴漏的问题
 */
type useModalType<T> = [
  Ref<boolean>,
  Ref<boolean>,
  Ref<FormInst | null>,
  Ref<T>,
  Object,
  HandleRegisterFunc,
  HandleSubmitFunc,
  HandleClearFunc,
  HandleOpenFunc,
  HandleCancelFunc,
  HandleTitle
]

export type {
  RegisterApiType,
  UpdateApiType,
  AfterApiType,
  HandleRegisterFunc,
  HandleSubmitFunc,
  HandleCancelFunc,
  HandleOpenFunc,
  HandleClearFunc,
  HandleTitle,
  ModalType,
  useModalType,
  ModelMap,
  ModalMapStates,
}
