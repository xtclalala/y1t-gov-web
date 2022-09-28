import { computed, ref } from 'vue'
import { isEmpty, isFunction, isNullOrUnDef } from '@/utils/is'
import { FormInst } from 'naive-ui'
import type {
  ModalType,
  useModalType,
  ModalMapStates,
  ModelMap,
  Options,
} from '@/hooks/useModal/type'
import { options } from './options'
import { completeMerger } from '@/utils/helper/objectHelper'

/**
 * 所有 modal 内容的存储点
 */
const modalMap: ModelMap = {}

/**
 * 所有 modal 是否被激活的存储点
 */
const modalMapStates: ModalMapStates = {}

export const useModel = <T = any, D = any>(value: Options<T, D>): useModalType<T> => {
  /**
   * 创建或者获取一个 modal 需要的相关字段
   */
  const createModal = (option: Options<T, D>): ModalType<T, D> => {
    const key = option.key
    let isAdd, mStyle, showModal, form, model
    option = completeMerger(options, option)
    // 是否创建过该弹窗
    if (isNullOrUnDef(modalMapStates[key])) {
      showModal = ref<boolean>(false)
      isAdd = ref<boolean>(true)
      form = ref<FormInst | null>(null)
      const { style, modelObject } = option
      mStyle = computed(() => {
        if (isEmpty(style)) {
          return { width: '600px' }
        }
        return style
      })
      model = ref<T>(Object.assign({}, modelObject))
      modalMapStates[key] = true
      modalMap[key] = { isAdd, mStyle, showModal, form, model, option }
    } else {
      ;({ isAdd, mStyle, showModal, form, model, option } = modalMap[key])
    }

    return {
      isAdd,
      mStyle,
      showModal,
      form,
      model,
      option,
    }
  }
  const { isAdd, showModal, form, model, mStyle, option } = createModal(value)

  /**
   * 清空弹窗
   */
  const clearModel = async (): Promise<void> => {
    model.value = Object.assign({}, option.modelObject)
  }

  /**
   * 打开弹窗
   */
  const openModal = async (): Promise<void> => {
    showModal.value = true
  }

  /**
   * 打开新增弹窗
   */
  const handleRegister = async (): Promise<void> => {
    isAdd.value = true
    await clearModel()
    await openModal()
  }

  /**
   * 提交回调
   * @param e 鼠标点击事件
   */
  const submitCallback = async (e: MouseEvent): Promise<void> => {
    e.preventDefault()
    form.value
      ?.validate(async (errors) => {
        if (errors) {
          return
        }
        if (isAdd.value) {
          const { fn, after } = option.register
          await fn(model.value)
          if (isFunction(after)) {
            await after(showModal, model)
          }
        } else {
          const { fn, after } = option.update
          await fn(model.value as unknown as D)
          if (isFunction(after)) {
            await after(showModal, model)
          }
        }
        showModal.value = false
        await clearModel()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  /**
   * 取消回调
   */
  const cancelCallback = async (): Promise<void> => {
    await clearModel()
    showModal.value = false
    isAdd.value = false
  }

  /**
   * 弹窗标题
   */
  const modalTitle = (): string => {
    return isAdd.value ? '新增' : '编辑'
  }

  return [
    isAdd,
    showModal,
    form,
    model,
    mStyle,
    handleRegister,
    submitCallback,
    clearModel,
    openModal,
    cancelCallback,
    modalTitle,
  ]
}
