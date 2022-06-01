<script lang="ts">
export default {
  name: 'SysMenu',
}
</script>
<script setup lang="ts">
import { computed, h, ref } from 'vue'
import YIcon from '@/components/yIcon/index.vue'
import { FormInst, FormRules, NButton, NDivider, NPopconfirm, NSpace } from 'naive-ui'
import { Page } from '@/api/system_setting/types/sys_role'
import { PageResult } from '#axios'

import { completeAssign } from '@/utils/helper/objectHelper'
import { useTable } from '@/hooks/comHooks/useTable'
import { deleteOrg, searchOrg, updateOrg, register } from '@/api/system_setting/sys_organize'
import { registerOrg, SearchOrg } from '@/api/system_setting/types/sys_organization'

const columns = [
  {
    type: 'selection',
    options: ['all', 'none'],
  },
  {
    title: '部门名称',
    key: 'name',
    width: 150,
  },
  {
    title: '部门编码',
    key: 'code',
    width: 150,
  },
  {
    title: '排序',
    key: 'sort',
    width: 150,
  },
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
    width: 200,
    render(row) {
      return h(
        NSpace,
        { size: 1 },
        {
          default: () => {
            const options = [
              h(
                NButton,
                {
                  onClick: () => {
                    isAdd.value = false
                    orgModel.value = row
                    openDialog()
                  },
                  text: true,
                },
                { default: () => '编辑' }
              ),
              h(NDivider, { vertical: true }),
              h(
                NPopconfirm,
                {
                  onPositiveClick: async () => {
                    await deleteOrg({ id: row.id }, { isMessage: true })
                    await getData({
                      page: pagination.page,
                      pageSize: pagination.pageSize,
                      desc: false,
                    })
                  },
                },
                {
                  trigger: () => h(NButton, { text: true }, { default: () => '删除' }),
                  default: () => '请确认是否删除!',
                }
              ),
              h(NDivider, { vertical: true }),
              h(
                NButton,
                {
                  onClick: () => {
                    clearModel()
                    orgModel.value.pid = row.id
                    openDialog()
                  },
                  text: true,
                },
                { default: () => '添加下级' }
              ),
            ]
            return options
          },
        }
      )
    },
  },
]
const sTmpData = {
  name: '',
  code: '',
}
const tableApi = async (page: Page, searchData: any) => {
  return searchOrg<PageResult<Array<registerOrg>>>(
    completeAssign<SearchOrg>(page, searchData.value),
    { isMessage: false }
  )
}
const [pagination, loading, data, searchData, getData, doSearch, doReset] = useTable<registerOrg>(
  tableApi,
  { page: 1, pageSize: 10 },
  sTmpData,
  'Organize'
)
const form = ref<FormInst | null>(null)
const rules: FormRules = {
  name: {
    required: true,
    message: '请填写部门名称！',
    trigger: ['input', 'blur'],
  },
  code: {
    required: true,
    message: '请填写部门编码！',
    trigger: ['input', 'blur'],
  },
}
const showModal = ref<boolean>(false)
const isAdd = ref<boolean>(true)
const checkedRowKeys = ref([])
const orgModel = ref<registerOrg>({
  name: '',
  code: '',
  sort: 100,
  pid: 0,
})

const modalStyle = computed(() => {
  return { width: '600px' }
})
const key2id = (row) => row.id
const handleRegister = async () => {
  isAdd.value = true
  clearModel()
  openDialog()
}
const clearModel = () => {
  orgModel.value = {
    name: '',
    code: '',
    sort: 100,
    pid: 0,
  }
}
const openDialog = () => {
  showModal.value = true
}
const submitCallback = async (e: MouseEvent) => {
  e.preventDefault()
  form.value
    ?.validate(async (errors) => {
      if (errors) {
        return
      }
      if (isAdd.value) {
        await register<string>(orgModel.value, { isMessage: true })
      } else {
        await updateOrg<string>(orgModel.value, { isMessage: true })
      }
      loading.value = false
      await getData({
        page: pagination.page,
        pageSize: pagination.pageSize,
        desc: false,
      })
      showModal.value = false
      clearModel()
    })
    .catch((e) => {
      // console.log(e)
    })
}
const cancelCallback = async () => {
  showModal.value = false
  isAdd.value = false
}
const modelTitle = () => {
  return isAdd.value ? '新增' : '编辑'
}

getData({ page: pagination.page, pageSize: pagination.pageSize, desc: false })
</script>

<template>
  <n-space vertical class="y1t-table-box">
    <n-form :label-width="'auto'" label-placement="left">
      <n-space>
        <n-form-item label="部门名称" path="name">
          <n-input v-model:value="searchData.name" type="text" placeholder="搜索条件" />
        </n-form-item>
        <n-form-item label="部门编码" path="code">
          <n-input v-model:value="searchData.code" type="text" placeholder="搜索条件" />
        </n-form-item>
        <n-button type="primary" @click="doSearch">
          <template #icon>
            <y-icon icon-type="SearchOutline" :depth="2" :size="15" color="white" />
          </template>
          搜索
        </n-button>
        <n-button @click="doReset">
          <template #icon>
            <y-icon icon-type="Reload" :depth="2" :size="15" />
          </template>
          重置
        </n-button>
      </n-space>
    </n-form>
    <n-space :size="5">
      <n-button type="primary" @click="handleRegister">
        <template #icon>
          <y-icon icon-type="Add" :depth="2" :size="17" color="white" />
        </template>
        新增
      </n-button>
    </n-space>
    <n-data-table
      v-model:checked-row-keys="checkedRowKeys"
      :columns="columns"
      :data="data"
      :scroll-x="1200"
      :max-height="750"
      :loading="loading"
      :row-key="key2id"
    />
    <n-pagination
      v-model:page="pagination.page"
      v-model:pageSize="pagination.pageSize"
      :item-count="pagination.itemCount"
      @update:page="pagination.onChange"
    />
  </n-space>
  <n-modal v-model:show="showModal" :title="modelTitle()" :style="modalStyle" preset="card">
    <n-form
      ref="form"
      :model="orgModel"
      :rules="rules"
      label-placement="left"
      require-mark-placement="right-hanging"
      label-width="auto"
    >
      <n-form-item label="部门名称" path="name">
        <n-input v-model:value="orgModel.name" placeholder="名称" />
      </n-form-item>
      <n-form-item label="部门编码" path="code">
        <n-input v-model:value="orgModel.code" placeholder="编码" />
      </n-form-item>
      <n-form-item label="排序" path="sort">
        <n-input-number v-model:value="orgModel.sort" placeholder="排序" />
      </n-form-item>
    </n-form>
    <template #action>
      <n-space :size="5" justify="end">
        <n-button type="tertiary" size="small" @click="cancelCallback">取消</n-button>
        <n-button type="success" size="small" @click="submitCallback">确认</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped></style>
