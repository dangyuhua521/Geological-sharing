<template>
  <el-dialog title="新增" :visible.sync="visible"  append-to-body width="500px" @close="closeDialog" :close-on-click-modal="false">
    <el-form
      ref="roleform"
      :rules="rules"
      :model="roleData"
      label-width="100px"
      label-position="right"
      :size="size"
      class="formWrap"
    >
      <el-row :gutter="20" style="display:flex;flex-wrap:wrap">
        <el-col :span="12">
          <el-form-item label="角色名称：" prop="roleName">
            <el-input placeholder="请输入角色名称" v-model="roleData.roleName" style="width:335px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：" prop="remark">
            <el-input type="textarea" placeholder="请输入备注" v-model="roleData.remark" style="width:93%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog" :size="size">取 消</el-button>
      <el-button type="primary" @click="CheckValue" :size="size">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import valrule from '@/components/public/validate.js'
export default {
  data() {

    return {
      visible: true,
      size: "medium",
      roleData: {
        statusValue:1,
      },
      rules: {
        roleName  : [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur"
          },
          {
            validator: valrule.checkNull,
            trigger: "blur"
          }
        ],
      }
    };
  },
  methods: {
    CheckValue() {
        this.$refs["roleform"].validate(valid => {
          if (valid) {
            this.onSubmit();
          } else {
             this.$notify({
                type: 'error',
                message:'验证失败,请重新输入',
                offset: 100,
              })
           
          }
        });

    },

    onSubmit() {
        this.$axios.post('SystemRole/AddRole',this.roleData).then((res)=>{
            this.closeDialog();
             this.$notify({
                type: 'success',
                message:'操作成功',
                offset: 100,
              })
            this.$emit('updataList')
        })
    },
    closeDialog() {
      this.$emit("closeAddDialog", true);
    }
  }
};
</script>
