<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue'
import YIcon from '@/components/yIcon/index.vue'
import { Page } from '@/api/system_setting/types/sys_role'
import { PageResult } from '#axios'
import { registerPer, SearchPer } from '@/api/system_setting/types/sys_permission'
import { searchPer } from '@/api/system_setting/sys_permission'

type PerProps = {
  show: boolean
  id: number
}

const props = defineProps<PerProps>()
const { show } = toRefs(props)
const emits = defineEmits(['update:show'])

const columns = [
  {
    title: '按钮名称',
    key: 'name',
    width: 150,
  },
  {
    title: '按钮编码',
    key: 'code',
    width: 150,
  },
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
    width: 200,
  },
]
const loading = ref<boolean>(false)
const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  onChange: (page: number) => {
    loading.value = true
    pagination.page = page
    getData({ page: page, pageSize: pagination.pageSize, desc: false })
  },
})
const data = ref<Array<registerPer>>([])
const searchData = ref<SearchPer>({
  name: '',
})

// 更新 show
const updateShow = (show: boolean) => {
  emits('update:show', show)
}
// 搜索
const getData = async (page: Page) => {
  const res = await searchPer<PageResult<Array<registerPer>>>(
    completeAssign<SearchPer>(page, searchData.value),
    { isMessage: false }
  )
  pagination.itemCount = res.total
  data.value = res.items
  loading.value = false
}
// 表格映射转换
const key2id = (row) => row.id
// 合并对象
function completeAssign<T>(...sources): T {
  const target = {}
  sources.forEach((item) => {
    Object.keys(item).reduce((prev, current) => {
      if (item[current] !== undefined) {
        prev[current] = item[current]
      }
      return prev
    }, target)
  })
  return target as T
}
getData({ page: pagination.page, pageSize: pagination.pageSize, desc: false })
</script>

<template>
  <n-drawer v-model:show="show" :width="700" @update:show="updateShow">
    <n-drawer-content title="页面按钮">
      <n-space vertical>
        <n-button type="primary">
          <template #icon>
            <y-icon icon-type="Add" :depth="2" :size="17" color="white" />
          </template>
          新增
        </n-button>
        <n-data-table
          :columns="columns"
          :data="data"
          :scroll-x="500"
          :max-height="750"
          :loading="loading"
          :row-key="key2id"
        />
      </n-space>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped></style>
