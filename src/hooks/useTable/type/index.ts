import { Ref } from 'vue'
import { FormInst } from 'naive-ui'
import { RequestOptions } from '#axios'

// useModel 接收类型
/**
 * 创建接口
 */
type RegisterApiType<T = any> = (modal: T, options?: RequestOptions) => void

/**
 * 更新接口
 */
type UpdateApiType<T = any> = (modal: T, options?: RequestOptions) => void

/**
 * 接口请求以后的操作方法
 */
type AfterApiType = () => void

// useModel 返回类型
/**
 * 数据新增
 */
type HandlerRegisterFunc = () => void

/**
 * 点击提交
 */
type HandlerSubmitFunc = (e: MouseEvent) => void

/**
 * 点击取消
 */
type HandlerCancelFunc = () => void

/**
 * 打开弹窗
 */
type HandlerOpenFunc = () => void

/**
 * 清空弹窗
 */
type HandlerClearFunc = () => void

/**
 * 弹窗标题
 */
type TitleFunc = () => string

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
  HandlerRegisterFunc,
  HandlerSubmitFunc,
  HandlerClearFunc,
  HandlerOpenFunc,
  HandlerCancelFunc,
  TitleFunc
]

export type {
  RegisterApiType,
  UpdateApiType,
  AfterApiType,
  HandlerRegisterFunc,
  HandlerSubmitFunc,
  HandlerCancelFunc,
  HandlerOpenFunc,
  HandlerClearFunc,
  TitleFunc,
  ModalType,
  useModalType,
}
