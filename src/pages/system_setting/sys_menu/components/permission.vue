<script setup lang="ts">
import { computed, h, ref, toRefs } from 'vue'
import YIcon from '@/components/yIcon/index.vue'
import { registerPer } from '@/api/system_setting/types/sys_permission'
import { deletePer, register, searchPer } from '@/api/system_setting/sys_permission'
import { FormInst, FormRules, NButton, NDivider, NPopconfirm, NSpace } from 'naive-ui'
import { Page } from '@/api/system_setting/types/sys_role'
import { useTable } from '@/hooks/comHooks/useTable'

type PerProps = {
  show: boolean
  menuId: number
}

const props = withDefaults(defineProps<PerProps>(), {
  show: false,
  menuId: 0,
})
const { show, menuId } = toRefs(props)
const emit = defineEmits(['update:show'])

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
    render(row) {
      return h(
        NSpace,
        {
          size: 1,
        },
        {
          default: () => {
            const options = [
              h(
                NButton,
                {
                  onClick: () => {
                    perModel.value = row
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
                    await deletePer({ id: row.id }, { isMessage: true })
                    await getData()
                  },
                },
                {
                  trigger: () => h(NButton, { text: true }, { default: () => '删除' }),
                  default: () => '请确认是否删除!',
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
const tableApi = async (page: Page, searchData: any) => {
  return searchPer<Array<registerPer>>(searchData.value, { isMessage: false })
}
const [pagination, loading, data, searchData, getData, doSearch, doReset] = useTable<registerPer>(
  tableApi,
  { page: 1, pageSize: 10 },
  { menuId: 0 },
  'B'
)
const showRegister = ref<boolean>(false)
const form = ref<FormInst | null>(null)
const perModel = ref<registerPer>({
  menuId: menuId.value,
  name: '',
  code: '',
  sort: 100,
})
const rules: FormRules = {
  name: {
    required: true,
    message: '请填写按钮名称！',
    trigger: ['input', 'blur'],
  },
  code: {
    required: true,
    message: '请填写按钮编码！',
    trigger: ['input', 'blur'],
  },
}

const modalStyle = computed(() => {
  return { width: '600px' }
})
// 更新 show
const closeDrawer = () => {
  data.value = []
  emit('update:show', false)
}

// 表格映射转换
const key2id = (row) => row.id
const handleRegister = async () => {
  clearModel()
  openDialog()
}
const clearModel = () => {
  perModel.value = {
    menuId: menuId.value,
    name: '',
    code: '',
    sort: 100,
  }
}
const openDialog = () => {
  showRegister.value = true
}
const cancelCallback = async () => {
  showRegister.value = false
}
const submitCallback = async (e: MouseEvent) => {
  e.preventDefault()
  form.value
    ?.validate(async (errors) => {
      if (errors) {
        return
      }
      await register<string>(perModel.value, { isMessage: true })
      loading.value = false
      await getData()
      showRegister.value = false
      clearModel()
    })
    .catch((e) => {
      // console.log(e)
    })
}
const openAfter = () => {
  loading.value = true
  searchData.value.menuId = menuId.value
  getData()
}
</script>

<template>
  <n-drawer v-model:show="show" :width="700" @after-enter="openAfter" @mask-click="closeDrawer">
    <n-drawer-content title="页面按钮">
      <n-space vertical>
        <n-button type="primary" @click="handleRegister">
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
  <n-modal v-model:show="showRegister" title="新增" :style="modalStyle" preset="card">
    <n-form
      ref="form"
      :model="perModel"
      :rules="rules"
      label-placement="left"
      require-mark-placement="right-hanging"
      label-width="auto"
    >
      <n-form-item label="按钮名称" path="name">
        <n-input v-model:value="perModel.name" placeholder="标题" />
      </n-form-item>
      <n-form-item label="按钮编码" path="code">
        <n-input v-model:value="perModel.code" placeholder="名称" />
      </n-form-item>
      <n-form-item label="排序" path="sort">
        <n-input-number v-model:value="perModel.sort" placeholder="排序" />
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
