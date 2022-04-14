<script setup lang="ts">
import { viewStore } from '@/store/module/views'
import { useRouter, useRoute } from 'vue-router'
import { useMessage } from 'naive-ui'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import YIcon from '@/components/yIcon/index.vue'
import { AppRouteRecordRaw } from '@r/types'
import { router2menu } from '@/utils/yMenu'

const tabs = viewStore()
const msg = useMessage()
const { viewList, currentView } = storeToRefs(tabs)
const router = useRouter()
const route = useRoute()
const scrollbar: any = ref(null)
const leftArrowDisabled = ref<boolean>(false)
const rightArrowDisabled = ref<boolean>(false)

watch(
  route,
  (n) => {
    router.push({ name: n.name as string })
    const r = router2menu(n as AppRouteRecordRaw)
    tabs.routerPush(r)
  },
  { immediate: true }
)

const iconClick = (name: string) => {
  closeTab(name)
}

const itemClick = (name: string, e: MouseEvent) => {
  currentView.value = name
  tabClick(e.target as HTMLElement, name)
}

const itemChildClick = (name: string, e: MouseEvent) => {
  currentView.value = name
  tabClick(e.target as HTMLElement, name)
}

const tabClick = (el: HTMLElement, name: string) => {
  scrollbar.value.scrollTo(
    {
      left: el.offsetLeft,
      debounce: true,
      behavior: 'auto',
    } as any,
    0
  )
  router.push({ name })
}

const leftArrowClick = () => {
  const scrollX = scrollbar.value.$el?.scrollLeft || 0
  scrollbar.value.scrollTo(
    {
      left: Math.max(0, scrollX - 200),
      debounce: true,
      behavior: 'smooth',
    } as any,
    0
  )
  isDisabledArrow()
}

const rightArrowClick = () => {
  const scrollX = scrollbar.value.$el?.scrollLeft || 0
  scrollbar.value.scrollTo(
    {
      left: scrollX + 200,
      debounce: false,
      behavior: 'smooth',
    } as any,
    0
  )
  isDisabledArrow()
}

const isDisabledArrow = () => {
  setTimeout(() => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollbar.value.$el as HTMLElement
    leftArrowDisabled.value = scrollLeft === 0
    rightArrowDisabled.value = scrollLeft === scrollWidth - clientWidth
  }, 100)
}

const closeTab = async (name: string) => {
  if (viewList.value.length === 1) {
    msg.warning('最后一页不能删除')
    return
  }
  const index = viewList.value.findIndex((self: AppRouteRecordRaw) => self.key === name)
  if (index !== -1) {
    await tabs.removeTab(index)
    if (currentView.value === name) {
      currentView.value = tabs.listSliceEnd[0].name
      router.push({ name: currentView.value })
    }
  }
}
</script>

<template>
  <div class="tab-bar">
    <y-icon type="left" :size="18" class="icon-location" @click="leftArrowClick" />
    <div class="tabs">
      <n-scrollbar ref="scrollbar" :x-scrollable="true" :size="0">
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
          <y-icon v-if="true" class="icon-item" type="close" @click="iconClick(item.key)" />
        </n-button>
      </n-scrollbar>
    </div>
    <y-icon type="right" class="icon-location" :size="18" @click="rightArrowClick" />
  </div>
</template>

<style lang="sass" scoped>
.tab-bar
  position: relative
  //box-sizing: border-box
  //white-space: nowrap
  display: flex
  height: 40px
  box-shadow: 10px 5px 10px rgb(0 0 0 / 10%)

  .icon-location
    position: static
    //display: inline-block
    cursor: pointer
    font-size: 20px
    margin: 8px 8px

  .tabs
    //justify-content: flex-start
    //display: inline-block
    width: 100%
    margin-left: 0
    white-space: nowrap
    overflow: hidden

    .tab-item
      padding: 7px 10px
      margin: 5px 5px
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
