<template>
  <h1>{{ msg }}</h1>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" :max-height="height" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { searchMenu } from '@/api/system_setting/sys_menu'
import { registerRole } from '@/api/system_setting/types/sys_role'
import { PageResult } from '#axios'
import { registerMenu } from '@/api/system_setting/types/sys_menu'

const columns = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Age',
    key: 'age',
  },
  {
    title: 'Address',
    key: 'address',
  },
]

const height = ref<number>(window.innerHeight * 0.8)
const data = ref<Array<registerMenu>>([])
const getData = async (page: number, pageSize: number) => {
  const res = await searchMenu<PageResult<Array<registerMenu>>>(
    { Page: page, PageSize: pageSize, Desc: false },
    { isMessage: false }
  )
  pagination.itemCount = res.total
  data.value = res.items
  console.log(res)
}
getData(1, 10)
const msg = ref<string>('sys yMenu')
const pagination = reactive({
  pageSize: 10,
  page: 1,
  itemCount: 100,
  onChange: (page) => {
    pagination.page = page
    getData(page, pagination.pageSize)
  },
})
</script>

<style scoped></style>
