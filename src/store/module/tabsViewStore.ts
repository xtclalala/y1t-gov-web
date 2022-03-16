import { defineStore } from 'pinia'
import { MenuOption } from 'naive-ui'

export const tabsViewStore = defineStore('tabsView', {
  state: () => {
    return {
      viewList: [
        { label: '测试', key: 'test' },
        { label: '测试', key: 'test' },
        { label: '测试', key: 'test' },
        { label: '测试', key: 'test' },
        { label: '测试', key: 'test' },
      ],
      currentView: '',
    }
  },
  actions: {
    removeTab(index: number) {
      this.viewList.splice(index, 1)
    },
    findTab(route: MenuOption): boolean {
      for (const item of this.viewList) {
        if (item.key === route.key) {
          return true
        }
      }
      return false
    },
  },
})
