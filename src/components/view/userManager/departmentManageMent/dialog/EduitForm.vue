<template>
  <el-dialog title="编辑" :visible.sync="visible"  append-to-body width="500px" @close="closeDialog" :close-on-click-modal="false">
    <el-form
      ref="userform"
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
import valRule from "@/components/public/validate";
export default {
  props:['selectRow'],
  data() {
    return {
      visible: true,
      size: "medium",
      roleData: {

      },
      rules: {
        roleName  : [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur"
          },
          {
            validator: valRule.checkNull,
            trigger: "blur"
          }
        ],
      }
    };
  },
  mounted(){
    // this.$fetch('SystemRole/Detail',{id:this.selectRow.id}).then(res=>{
    //   this.roleData=res.data;
    // })
    this.roleData = JSON.parse(JSON.stringify(this.selectRow));
  },
  methods: {
    CheckValue() {

        this.$refs["userform"].validate(valid => {
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
        this.$axios.post('SystemRole/UpdateRole',this.roleData).then((res)=>{
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
