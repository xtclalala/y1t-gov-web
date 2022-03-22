import { defineStore } from 'pinia'
import { AppRouteRecordRaw } from '@r/types'
import { rName } from '@/enums/rName'

interface ITabsViewStore {
  viewList: AppRouteRecordRaw[]
  currentView: string
  tBlacklist: string[]
}

export const tabsViewStore = defineStore('tabsView', {
  state: (): ITabsViewStore => {
    return {
      viewList: [],
      currentView: '',
      tBlacklist: [rName.REDIRECT, rName.LOGIN, rName.REDIRECT_ROUTE],
    }
  },
  getters: {
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
      if (this.tBlacklist.findIndex((self: string) => self === to.name) !== -1) {
        return
      }
      this.viewList.push(to)
    },
  },
})
