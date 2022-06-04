<script lang="ts">
export default {
  name: 'RoleSetMenu',
}
</script>

<script setup lang="ts">
import { ref, toRef } from 'vue'
import { BaseMenu, SelectMenu } from '@/api/system_setting/types/sys_menu'
import { roleGetMenu } from '@/api/system_setting/sys_role'
import { allMenu } from '@/api/system_setting/sys_menu'
import { list2Tree } from '@/utils/helper/treeHelper'

type PerProps = {
  show: boolean
  currentRole: number
}

const props = withDefaults(defineProps<PerProps>(), {
  show: false,
  currentRole: 0,
})
const show = toRef(props, 'show')
const emit = defineEmits(['update:show'])
const menuData = ref<SelectMenu[]>([])
const menuCheckedKeys = ref<number[]>([])

const allMenus = async () => {
  const res = await allMenu<Required<BaseMenu[]>>({ isMessage: false })
  menuData.value = list2Tree<BaseMenu>(res)
}
const closeDrawer = () => {
  emit('update:show', false)
}
const openAfter = async () => {
  const res = await roleGetMenu<Required<BaseMenu>[]>(
    { id: props.currentRole },
    { isMessage: false }
  )
  menuCheckedKeys.value = res.flatMap((item) => item.id)
}
const updateCheckedKeys = (v: string[]) => {}

allMenus()
</script>

<template>
  <n-drawer v-model:show="show" :width="700" @after-enter="openAfter" @mask-click="closeDrawer">
    <n-drawer-content title="页面">
      <n-tree
        block-line
        cascade
        checkable
        :data="menuData"
        key-field="id"
        label-field="title"
        :default-checked-keys="menuCheckedKeys"
        @update:checked-keys="updateCheckedKeys"
      />
      <template #footer>
        <n-button>更新</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped></style>
