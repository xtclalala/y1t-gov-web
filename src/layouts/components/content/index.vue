<template>
  <!--  <n-layout-content content-style="padding: 24px; min-height: 85vh; background-color:#F2F3F4">-->
  <n-layout-content
    embedded
    content-style="padding: 12px; min-height: 85vh"
    :native-scrollbar="false"
  >
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transaction || 'fade'" mode="out-in" appear>
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </n-layout-content>
</template>
