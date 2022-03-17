import { defineStore } from 'pinia'
import { AppRouteRecordRaw } from '@r/types'

export const tabsViewStore = defineStore('tabsView', {
  state: () => {
    return {
      viewList: [],
      currentView: '',
    }
  },
  getters: {
    getListLength(): Number {
      return this.viewList.length
    },
    listSliceEnd(): any {
      return this.viewList.slice(-1)
    },
  },
  actions: {
    removeTab(index: number) {
      this.viewList.splice(index, 1)
    },
    findTab(route: AppRouteRecordRaw): boolean {
      for (const item of this.viewList) {
        // @ts-ignore
        if (item.name === route.name) {
          return true
        }
      }
      return false
    },
    routerPush(to: AppRouteRecordRaw) {
      this.currentView = to.name
      if (this.findTab(to)) {
        return
      }
      if ('redirect' === to.meta.title) {
        return
      }
      // @ts-ignore
      this.viewList.push(to)
    },
  },
})
