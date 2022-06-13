<template>
  <n-layout-header bordered style="padding: 0">
    <!--    <current-view />-->
    <n-layout>
      <n-layout-header bordered>
        <Refresh />
        <n-space :size="20" align="center" style="line-height: 1">
          <Theme />
          <About />
          <Github />
          <Notify />
          <PCenter />
        </n-space>
      </n-layout-header>
      <n-layout-content>
        <Tabbar />
      </n-layout-content>
    </n-layout>
  </n-layout-header>
</template>

<script lang="ts" setup>
import Refresh from './components/refresh.vue'
import { Tabbar } from '@/layouts/components/tabbar'
// import CurrentView from './components/currentView.vue'
import About from './components/about.vue'
import Github from './components/github.vue'
import Notify from './components/notify.vue'
import PCenter from './components/pCenter.vue'
import Theme from './components/theme.vue'
</script>

<style scoped>
.n-layout-header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 9px 18px;
}

.n-button {
  margin-right: 15px;
}

.n-space {
  margin-left: auto;
}
</style>
