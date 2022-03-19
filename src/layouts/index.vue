<template>
  <n-layout position="absolute" has-sider>
    <Sidebar />
    <n-layout>
      <Header />
      <Tabbar />
      <Content />
      <Footer />
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
// import Content from './components/content/index.vue'
// import Footer from './components/footer/index.vue'
// import Header from './components/header/index.vue'
// import Sidebar from './components/sidebar/index.vue'
// import Tabs from './components/tabbar/index.vue'
// workbench
import { Header } from '@/layouts/components/header'
import { Content } from '@/layouts/components/content'
import { Footer } from '@/layouts/components/footer'
import { Sidebar } from '@/layouts/components/sidebar'
import { Tabbar } from '@/layouts/components/tabbar'
</script>
