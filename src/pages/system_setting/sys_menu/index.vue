<script>
export default {
  name: 'SysMenu',
}
</script>
<script setup lang="ts">
import { computed, h, reactive, ref } from 'vue'
import { deleteMenu, register, searchMenu } from '@/api/system_setting/sys_menu'
import { PageResult } from '#axios'
import { registerMenu, SearchMenu } from '@/api/system_setting/types/sys_menu'
import { FormInst, FormRules, NButton, NDivider, NPopconfirm, NSpace } from 'naive-ui'
import { Page } from '@/api/system_setting/types/sys_role'
import YIcon from '@/components/yIcon/index.vue'

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
    render(row) {
      return h(YIcon, { size: 22, iconType: row.icon, depth: 2 })
    },
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
      return h(
        NSpace,
        { size: 1 },
        {
          default: () => [
            h(
              NButton,
              {
                onClick: () => {
                  menuModel.value = row
                  menuModel.value.pid = row.id
                  menuModel.value.hiddenNumber = row.hidden ? '1' : ''
                  openDialog()
                },
                text: true,
              },
              { default: () => '编辑' }
            ),
            h(NDivider, { vertical: true }),
            h(
              NButton,
              {
                onClick: () => {
                  clearModel()
                  menuModel.value.pid = row.id
                  openDialog()
                },
                text: true,
              },
              { default: () => '添加下级' }
            ),
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
const searchData = ref<SearchMenu>({ name: '', pid: 0 })
const pagination = reactive({
  pageSize: 10,
  page: 1,
  itemCount: 100,
  onChange: (page: number) => {
    pagination.page = page
    getData({ page: page, pageSize: pagination.pageSize, desc: false })
  },
})
const data = ref<Array<registerMenu>>([])
const checkedRowKeys = ref([])
const showRegister = ref<boolean>(false)
const modalStyle = computed(() => {
  return { width: '600px' }
})
const form = ref<FormInst | null>(null)
const menuModel = ref<registerMenu>({
  name: '',
  title: '',
  path: '',
  hidden: false,
  hiddenNumber: '',
  component: '',
  icon: 'Earth',
  sort: 100,
  pid: 0,
})
const rules: FormRules = {
  title: {
    required: true,
    message: '请填写页面标题！',
    trigger: ['input', 'blur'],
  },
  name: {
    required: true,
    message: '请填写页面名称！',
    trigger: ['input', 'blur'],
  },
  path: {
    required: true,
    message: '请填写页面路径！',
    trigger: ['input', 'blur'],
  },
  component: {
    required: true,
    message: '请填写组件地址！',
    trigger: ['input', 'blur'],
  },
}

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

// 搜索
const getData = async (page: Page) => {
  const res = await searchMenu<PageResult<Array<registerMenu>>>(
    completeAssign<SearchMenu>(page, searchData.value),
    { isMessage: false }
  )
  pagination.itemCount = res.total
  data.value = res.items
}

// 点击搜索按钮
const doSearch = () => {
  pagination.page = 1
  getData({ page: 1, pageSize: pagination.pageSize, desc: false })
}

// 表格映射转换
const key2id = (row) => row.id

// 重置搜索条件
const doReset = () => {
  searchData.value = { name: '', pid: undefined }
}

const handleChangeHidden = async (e: Event) => {
  menuModel.value.hidden = !!(e.target as HTMLInputElement).value
}
const handleRegister = async () => {
  clearModel()
  openDialog()
}
const submitCallback = async (e: MouseEvent) => {
  e.preventDefault()
  form.value
    ?.validate(async (errors) => {
      if (errors) {
        return
      }
      await register<string>(menuModel.value, { isMessage: true })
      await getData({ page: pagination.page, pageSize: pagination.pageSize, desc: false })
      showRegister.value = false
      clearModel()
    })
    .catch((e) => {
      console.log(e)
    })
}
const clearModel = () => {
  menuModel.value = {
    name: '',
    title: '',
    path: '',
    hidden: false,
    hiddenNumber: '',
    component: '',
    icon: 'Earth',
    sort: 100,
    pid: 0,
  }
}
const openDialog = () => {
  showRegister.value = true
}
const cancelCallback = async () => {
  showRegister.value = false
}

// 操作
getData({ page: 1, pageSize: pagination.pageSize, desc: false })
</script>

<template>
  <n-space vertical class="y1t-table-box">
    <n-form :label-width="'auto'" inline label-placement="left">
      <n-form-item label="页面标题">
        <n-input v-model:value="searchData.name" type="text" placeholder="搜索条件" />
      </n-form-item>
      <n-space :size="5">
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
      :pagination="pagination"
      :scroll-x="1200"
      :row-key="key2id"
    />
  </n-space>
  <n-modal v-model:show="showRegister" title="新增" :style="modalStyle" preset="card">
    <n-form
      ref="form"
      :model="menuModel"
      :rules="rules"
      label-placement="left"
      require-mark-placement="right-hanging"
      label-width="auto"
    >
      <n-form-item label="页面标题" path="title">
        <n-input v-model:value="menuModel.title" placeholder="标题" />
      </n-form-item>
      <n-form-item label="页面名称" path="name">
        <n-input v-model:value="menuModel.name" placeholder="名称" />
      </n-form-item>
      <n-form-item label="页面路径" path="path">
        <n-input v-model:value="menuModel.path" placeholder="路径" />
      </n-form-item>
      <n-form-item label="图标" path="icon">
        <n-input v-model:value="menuModel.icon" placeholder="图标" />
      </n-form-item>
      <n-form-item label="组件地址" path="component">
        <n-input v-model:value="menuModel.component" placeholder="组件地址" />
      </n-form-item>
      <n-form-item label="是否隐藏" path="hiddenNumber">
        <n-radio-group
          v-model:value="menuModel.hiddenNumber"
          name="hiddenNumber"
          @change="handleChangeHidden"
        >
          <n-space :size="5">
            <n-radio value="1"> 是</n-radio>
            <n-radio value=""> 否</n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="排序" path="sort">
        <n-input-number v-model:value="menuModel.sort" placeholder="排序" />
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
