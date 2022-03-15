<script setup lang="ts">
import { tabsViewStore } from '@/store/module/tabsViewStore'
import { CloseCircleOutline } from '@vicons/ionicons5'
import { useRouter, useRoute } from 'vue-router'
import { MenuOption, NScrollbar, useMessage } from 'naive-ui'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import Icon from '@/components/icon.vue'

const tabs = tabsViewStore()
const msg = useMessage()
const { viewList, currentView } = storeToRefs(tabs)
const router = useRouter()
const route = useRoute()
const scrollbar = ref<HTMLElement>()

const itemClick = (name: string, e: MouseEvent) => {
  currentView.value = name
  tabClick(e.target as HTMLElement, name)
}

const itemChildClick = (name: string, e: MouseEvent) => {
  currentView.value = name
  tabClick(e.target as HTMLElement, name)
}

const iconClick = (name: string) => {
  closeTab(name)
}

const tabClick = (el: HTMLElement, name: string) => {
  ;(scrollbar as unknown as InstanceType<typeof NScrollbar>).value.scrollTo({
    left: el.offsetLeft,
    behavior: 'auto',
  })
  router.push(name)
}

const closeTab = async (name: string) => {
  console.log(name)
  if (viewList.value.length === 1) {
    msg.warning('最后一页不能删除')
    return
  }
  const index = viewList.value.findIndex((self: MenuOption) => self.key === name)
  console.log(index)
  if (index !== -1) {
    await tabs.removeTab(index)
    if (currentView.value === name) {
      currentView.value = viewList.value[viewList.value.length - 1].key
      router.push(currentView.value)
    }
  }
}
</script>

<template>
  <div class="tab-bar">
    <Icon type="left" :size="18" class="icon-location" />
    <div class="tabs">
      <n-scrollbar ref="scrollbar" x-scrollable :size="0">
        <n-button
          v-for="item of viewList"
          :key="item.key"
          :type="currentView === item.key ? 'primary' : 'default'"
          class="tab-item"
          style="--n-height: 24px; --n-font-weight: 200"
          @click.self="itemClick(item.key, $event)"
        >
          <span
            style="font-size: 12px; margin-top: 2px"
            class="text-item"
            @click.self="itemChildClick(item.key, $event)"
          >
            {{ item.label }}
          </span>
          <n-icon
            v-if="true"
            class="icon-item"
            :component="CloseCircleOutline"
            @click="iconClick(item.key)"
          />
        </n-button>
      </n-scrollbar>
    </div>
    <Icon type="right" class="icon-location" :size="18" />
  </div>
</template>

<style lang="sass" scoped>
.tab-bar
  position: relative
  box-sizing: border-box
  white-space: nowrap
  box-shadow: 10px 5px 10px rgb(0 0 0 / 10%)

  .icon-location
    position: static
    display: inline-block
    cursor: not-allowed
    font-size: 20px
    margin: 0 8px

  .tabs
    display: inline-block
    height: 30px
    white-space: nowrap
    overflow: hidden

    .tab-item
      padding: 7px 10px
      margin: 5px 5px
      width: 150px
      cursor: pointer
      .icon-item
        margin-left: 0
        width: 0
        height: 0
        transition: all 0.2s ease-in-out
        overflow: hidden

      & :hover
        .icon-item
          display: inline
          width: 14px
          height: 14px
          margin-left: 5px
          font-size: 12px
          background-color: rgba(0, 0, 0, 0)
          border-radius: 50%
          padding: 1px
          transition: all 0.2s ease-in-out
</style>
