import { Ref } from 'vue'
import { FormInst } from 'naive-ui'

type ModelMap = {
  [key: string]: ModalType<any, any>
}

type ModalMapStates = {
  [key: string]: boolean
}

// useModel 接收类型
/**
 * 创建接口
 */
type RegisterApiType<T = any> = (modal: T) => Promise<void>

/**
 * 更新接口
 */
type UpdateApiType<D = any> = (modal: D) => Promise<any>

/**
 * 创建接口请求以后的操作方法
 */
type AfterRegisterApiType<T = any> = (show: Ref<boolean>, modal: Ref<T>) => Promise<void>

/**
 * 更新接口请求以后的操作方法
 */
type AfterUpdateApiType<D = any> = (show: Ref<boolean>, modal: Ref<D>) => Promise<any>

// useModel 返回类型
/**
 * 数据新增
 */
type HandleRegisterFunc = () => Promise<void>

/**
 * 点击提交
 */
type HandleSubmitFunc = (e: MouseEvent) => Promise<void>

/**
 * 点击取消
 */
type HandleCancelFunc = () => Promise<void>

/**
 * 打开弹窗
 */
type HandleOpenFunc = () => Promise<void>

/**
 * 清空弹窗
 */
type HandleClearFunc = () => Promise<void>

/**
 * 弹窗标题
 */
type HandleTitle = () => string

/**
 * 一个 modal 所需要的相关字段
 */
type ModalType<T, D> = {
  isAdd: Ref<boolean>
  showModal: Ref<boolean>
  form: Ref<FormInst | null>
  model: Ref<T>
  mStyle: Object
  option: Options<T, D>
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

type Options<T = any, D = any> = {
  key: string
  register: {
    after?: AfterRegisterApiType
    fn: RegisterApiType<T>
  }
  update: {
    after?: AfterUpdateApiType
    fn: UpdateApiType<D>
  }
  modelObject: T
  style?: any
}

export type {
  RegisterApiType,
  UpdateApiType,
  AfterRegisterApiType,
  AfterUpdateApiType,
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
  Options,
}
