<template>
  <el-dialog
    :title="'配置菜单： ' + RoleselectRow.roleName"
    :visible.sync="visible"
    append-to-body
    width="800px"
    @close="closeDialog"
    :close-on-click-modal="false"
  >
    <div style="width:100%;float: left;">
      <el-tree
        :data="data"
        show-checkbox
        default-expand-all
        :highlight-current="true"
        @selection-change="handleSelectionChange"
        ref="tree"
        node-key="id"
        :default-checked-keys="defaultCheck"
        style="height:500px;;overflow: auto;"
      ></el-tree>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog" :size="size">取 消</el-button>
      <el-button type="primary" @click="onSubmit" :size="size">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ['RoleselectRow'],
  data() {
    return {
      visible: true,
      size: 'medium',
      //数据配置
      data: [],

      selectedRow: null, //选择行
      defaultCheck: [], //默认选中值
      indenterniateList: [], //菜单不定态列表选择状态
      selectKeys: []
    }
  },
  mounted() {
    const params = { roleId: this.RoleselectRow.id }
    this.$axios.get('/SystemMenu/GetMenuTreeNodes', { params }).then(res => {
      this.data = res.data.list
      this.defaultCheck = res.data.selectList
    })
  },
  methods: {
    handleSelectionChange(val) {
      this.selectedRow = val
    },

    onSubmit() {
      const MenuIds = this.$refs.tree
        .getCheckedNodes(false, false)
        .map(item => item.id)
        .join(',')
      this.$axios
        .post(`/SystemRoleMenu/SaveRoleMenu`, {
          SelectRoleId: this.RoleselectRow.id,
          MenuIds
        })
        .then(res => {
          this.closeDialog()
         this.$notify({
            type: 'success',
            message:'操作成功',
            offset: 100,
          })
          this.$emit('updataList')
        })
    },

    closeDialog() {
      this.$emit('closeAddDialog', true)
    }
  }
}
</script>
