<script lang="ts">
export default {
  name: 'SysUser',
}
</script>
<script setup lang="ts">
import { h, ref } from 'vue'
import YIcon from '@/components/yIcon/index.vue'
import { FormRules, NButton, NDivider, NPopconfirm, NSpace } from 'naive-ui'
import { completeAssign } from '@/utils/helper/objectHelper'

import { Page } from '@/api/system_setting/types/sys_role'
import { PageResult } from '#axios'
import { useTable } from '@/hooks/comHooks/useTable'
import { deleteUser, register, searchUser, updateUser } from '@/api/system_setting/sys_user'
import { BaseUser, registerUser, SearchUser } from '@/api/system_setting/types/sys_user'
import { useModal } from '@/hooks/comHooks/useModal'
import { registerMenu } from '@/api/system_setting/types/sys_menu'
import { selectOrg } from '@/api/system_setting/sys_organize'
import { BaseOrg } from '@/api/system_setting/types/sys_organization'

const orgOptions = ref<Array<BaseOrg>>([])
const allOrganizations = async () => {
  orgOptions.value = await selectOrg<Array<BaseOrg>>({ name: '' }, { isMessage: false })
}
const orgUpdateValue = async (value: string | number) => {
  userModel.value.orgId = value
}
const columns = [
  {
    type: 'selection',
    options: ['all', 'none'],
  },
  {
    title: '用户名',
    key: 'username',
    width: 150,
  },
  {
    title: '用户账号',
    key: 'loginName',
    width: 150,
  },
  {
    title: '组织',
    width: 150,
    render(row) {
      return row.organizes.flatMap((item) => item.name).join(',')
    },
  },
  {
    title: '创建时间',
    width: 150,
    render(row) {
      const time = new Date(row.CreateTime)
      return `${time.getFullYear()}-${
        time.getMonth() + 1
      }-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`
    },
  },
  {
    title: '身份',
    width: 150,
    render(row) {
      return row.roles.flatMap((item) => item.name).join(',')
    },
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
                    userModel.value = completeAssign(row)
                    userModel.value.orgId = row.organizes.flatMap((item) => item.id)
                    openModal()
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
                    await deleteUser({ id: row.id }, { isMessage: true })
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
                NPopconfirm,
                {
                  onPositiveClick: async () => {
                    // await copyRole({ id: row.id }, { isMessage: true })
                    await getData({
                      page: pagination.page,
                      pageSize: pagination.pageSize,
                      desc: false,
                    })
                  },
                },
                {
                  trigger: () => h(NButton, { text: true }, { default: () => '重置密码' }),
                  default: () => '请确认是否重置密码!',
                }
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
  username: '',
  loginName: '',
  roleId: null,
  orgId: null,
}
const tableApi = async (page: Page, searchData: any) => {
  return searchUser<PageResult<Array<registerUser>>>(
    completeAssign<SearchUser>(page, searchData.value),
    { isMessage: false }
  )
}
const [pagination, loading, data, searchData, getData, doSearch, doReset, key2id] =
  useTable<registerUser>(tableApi, { page: 1, pageSize: 10, desc: false }, sTmpData, 'User')
const checkedRowKeys = ref([])

const rules: FormRules = {
  username: {
    required: true,
    message: '请填写用户名！',
    trigger: ['input', 'blur'],
  },
  loginName: {
    required: true,
    message: '请填写账号！',
    trigger: ['input', 'blur'],
  },
  // diy
  orgId: {
    type: 'array',
    required: true,
    message: '请选择组织！',
    trigger: ['blur', 'change'],
  },
}
const registerApi = async (params: registerUser) => {
  return register<string>(params, { isMessage: true })
}
const updateApi = async (params: BaseUser) => {
  return updateUser<string>(params, { isMessage: true })
}
const afterApi = async () => {
  loading.value = false
  await getData({
    page: pagination.page,
    pageSize: pagination.pageSize,
    desc: false,
  })
}
const [
  isAdd,
  showModal,
  form,
  userModel,
  modalStyle,
  handleRegister,
  submitCallback,
  clearModel,
  openModal,
  cancelCallback,
  modalTitle,
] = useModal<registerMenu>(
  registerApi,
  updateApi,
  afterApi,
  {
    username: '',
    loginName: '',
    orgName: [],
    orgId: [],
    roleName: [],
    roleId: [],
  },
  {},
  'User'
)

allOrganizations()
getData({ page: pagination.page, pageSize: pagination.pageSize, desc: false })
</script>
<template>
  <n-space vertical class="y1t-table-box">
    <n-form :label-width="'auto'" label-placement="left">
      <n-space>
        <n-form-item label="角色名称" path="name">
          <n-input v-model:value="searchData.name" type="text" placeholder="搜索条件" />
        </n-form-item>
        <!--        <n-form-item label="组织" path="orgId">-->
        <!--          <n-select-->
        <!--              v-model:value="searchData.orgId"-->
        <!--              value-field="id"-->
        <!--              label-field="name"-->
        <!--              filterable-->
        <!--              :options="options"-->
        <!--              :loading="loadingSelect"-->
        <!--              clearable-->
        <!--          />-->
        <!--        </n-form-item>-->
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
      :scroll-x="800"
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
  <n-modal v-model:show="showModal" :title="modalTitle()" :style="modalStyle" preset="card">
    <n-form
      ref="form"
      :model="userModel"
      :rules="rules"
      label-placement="left"
      require-mark-placement="right-hanging"
      label-width="auto"
    >
      <n-form-item label="用户名" path="username">
        <n-input v-model:value="userModel.username" placeholder="用户名" />
      </n-form-item>
      <n-form-item label="账号" path="loginName">
        <n-input v-model:value="userModel.loginName" placeholder="账号" />
      </n-form-item>
      <n-form-item label="组织" path="orgId">
        <n-select
          v-model:value="userModel.orgId"
          value-field="id"
          label-field="name"
          multiple
          filterable
          :options="orgOptions"
          clearable
          @update:value="orgUpdateValue"
        />
      </n-form-item>
      <!--      <n-form-item label="身份" path="roleName">-->
      <!--        <n-select-->
      <!--          v-model:value="userModel.roleName"-->
      <!--          value-field="id"-->
      <!--          label-field="name"-->
      <!--          filterable-->
      <!--          :options="options"-->
      <!--          clearable-->
      <!--          @update:value="orgUpdateValue"-->
      <!--        />-->
      <!--      </n-form-item>-->
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
