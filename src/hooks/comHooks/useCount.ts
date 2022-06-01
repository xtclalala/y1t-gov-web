import { ref } from 'vue'
import { isNullOrUnDef } from '@/utils/is'

const numberMap = {}
const numberMapStates = {}

const createNumber = (num: number, numKey: string) => {
  let count
  if (isNullOrUnDef(numberMapStates[numKey])) {
    count = ref<number>(num)
    numberMapStates[numKey] = true
    numberMap[numKey] = count
  }
  count = numberMap[numKey]
  return {
    count,
  }
}

export const useCount = (num: number, numKey: string) => {
  const { count } = createNumber(num, numKey)

  const doAdd = () => {
    count.value++
  }
  return [count, doAdd]
}
