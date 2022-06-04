import { computed, ref } from 'vue'
import { isEmpty, isNullOrUnDef } from '@/utils/is'
import { FormInst } from 'naive-ui'

const modalMap = {}
const modalMapStates = {}

export const useModal = <T>(
  registerApi: Function,
  updateApi: Function,
  afterApi: Function,
  modelObj: any,
  modalStyle: any,
  key: string
) => {
  const createModal = () => {
    let isAdd, style, showModal, form, model
    if (isNullOrUnDef(modalMapStates[key])) {
      showModal = ref<boolean>(false)
      style = computed(() => {
        if (isEmpty(modalStyle)) return { width: '600px' }
        return modalStyle
      })
      isAdd = ref<boolean>(true)
      form = ref<FormInst | null>(null)
      model = ref<T>(Object.assign({}, modelObj))
      modalMapStates[key] = true
      modalMap[key] = { isAdd, style, showModal, form, model }
    } else {
      ;({ isAdd, style, showModal, form, model } = modalMap[key])
    }
    return {
      isAdd,
      style,
      showModal,
      form,
      model,
    }
  }

  const handleRegister = async () => {
    isAdd.value = true
    clearModel()
    openModal()
  }

  const submitCallback = async (e: MouseEvent) => {
    e.preventDefault()
    form.value
      ?.validate(async (errors) => {
        if (errors) {
          return
        }
        if (isAdd.value) {
          await registerApi(model.value, { isMessage: true })
        } else {
          await updateApi(model.value, { isMessage: true })
        }
        await afterApi()
        showModal.value = false
        clearModel()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const clearModel = () => {
    model.value = Object.assign({}, modelObj)
  }

  const openModal = () => {
    showModal.value = true
  }

  const cancelCallback = () => {
    clearModel()
    showModal.value = false
    isAdd.value = false
  }

  const modalTitle = () => {
    return isAdd.value ? '新增' : '编辑'
  }

  const { isAdd, showModal, form, model, style } = createModal()

  return [
    isAdd,
    showModal,
    form,
    model,
    style,
    handleRegister,
    submitCallback,
    clearModel,
    openModal,
    cancelCallback,
    modalTitle,
  ]
}
