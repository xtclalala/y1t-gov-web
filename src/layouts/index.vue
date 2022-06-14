<template>
  <n-layout has-sider position="absolute">
    <Sidebar />
    <n-layout>
      <Header />
      <Content />
      <Footer />
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { Header } from '@/layouts/components/header'
import { Content } from '@/layouts/components/content'
import { Footer } from '@/layouts/components/footer'
import { Sidebar } from '@/layouts/components/sidebar'
</script>
