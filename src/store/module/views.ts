import { defineStore } from 'pinia'
import { Menu } from '@r/types'
import { rName } from '@/enums/rName'

interface ITabsViewStore {
  viewList: Menu[]
  currentView: string
  tBlacklist: string[]
}

export const viewStore = defineStore('tabsView', {
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
    findTab(route: Menu): boolean {
      for (const item of this.viewList) {
        if (item.name === route.name) {
          return true
        }
      }
      return false
    },
    routerPush(to: Menu) {
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
