<template>
  <n-space vertical>
    <n-space :size="5">
      <register />
    </n-space>
    <n-data-table
      v-model:checked-row-keys="checkedRowKeys"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :scroll-x="1200"
      :row-key="key2id"
    />
  </n-space>
</template>

<script setup lang="ts">
import Register from './components/register.vue'
import { h, reactive, ref } from 'vue'
import { deleteMenu, searchMenu } from '@/api/system_setting/sys_menu'
import { PageResult } from '#axios'
import { registerMenu } from '@/api/system_setting/types/sys_menu'
import { NButton, NDivider, NPopconfirm, NSpace } from 'naive-ui'

const columns = [
  {
    type: 'selection',
    options: ['all', 'none'],
  },
  {
    title: '页面标题',
    key: 'title',
    width: 150,
  },
  {
    title: '页面名称',
    key: 'name',
    width: 150,
  },
  {
    title: '页面路径',
    key: 'path',
    width: 150,
  },
  {
    title: '图标',
    key: 'icon',
    width: 150,
  },
  {
    title: '组件地址',
    key: 'component',
    width: 200,
  },
  {
    title: '是否隐藏',
    key: 'hidden',
    width: 100,
    render(row) {
      return h('p', null, { default: () => (row.hidden ? '是' : '否') })
    },
  },
  {
    title: '排序',
    key: 'sort',
    width: 100,
  },
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
    width: 200,
    render(row) {
      console.log(row)
      return h(
        NSpace,
        { size: 5 },
        {
          default: () => [
            h(NButton, { onClick: () => console.log('a'), text: true }, { default: () => '详情' }),
            h(NDivider, { vertical: true }),
            h(
              NPopconfirm,
              {
                onPositiveClick: () => deleteMenu({ id: row.id }, { isMessage: true }),
              },
              {
                trigger: () => h(NButton, { text: true }, { default: () => '删除' }),
                default: () => '请确认是否删除!',
              }
            ),
          ],
        }
      )
    },
  },
]
const pagination = reactive({
  pageSize: 10,
  page: 1,
  itemCount: 100,
  onChange: (page) => {
    pagination.page = page
    getData(page, pagination.pageSize)
  },
})
const data = ref<Array<registerMenu>>([])
const checkedRowKeys = ref([])

const getData = async (page: number, pageSize: number) => {
  const res = await searchMenu<PageResult<Array<registerMenu>>>(
    { Page: page, PageSize: pageSize, Desc: false },
    { isMessage: false }
  )
  pagination.itemCount = res.total
  data.value = res.items
  console.log(res)
}
const key2id = (row) => {
  return row.id
}
getData(1, 10)
</script>

<style scoped></style>
