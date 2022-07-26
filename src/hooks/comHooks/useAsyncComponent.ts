/**
 * @Description: src\hooks\comHooks\useAsyncComponent.ts
 * @author: y1t
 * @date 2022/7/26
 **/
import { defineAsyncComponent } from 'vue'
const modules = import.meta.glob('../../**/**/components/index.ts')

/**
 * 动态导入组件
 * @param path 路径
 * @param target 组件名
 */
export const useAsyncComponent = (path: string, target: string) => {
  return defineAsyncComponent(async () => {
    const res = await modules[`../..${path}/index.ts`]()
    return res[target]
  })
}

export const usePagesAsyncComponent = (path: string, target: string) => {
  return useAsyncComponent(`/pages${path}/components`, target)
}

export const useComponentsAsyncComponent = (target: string) => {
  return useAsyncComponent('/components', target)
}
