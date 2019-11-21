<template>
  <div class="addmain">
    <p class="title">修改角色</p>
    <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="120px" class="demo-ruleForm">
      <el-form-item class="fl" label="角色名称" prop="roleName" :rules="[{ required: true, message: '角色名称不能为空'}]">
        <el-input v-model="numberValidateForm.roleName" auto-complete="off" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item class="fr" label="角色代码" prop="roleCode" :rules="[{ required: true, message: '角色代码不能为空'}]">
        <el-input v-model="numberValidateForm.roleCode" auto-complete="off" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item class="fl" label="角色描述" prop="roleDesc" :rules="[{ required: true, message: '角色描述不能为空'}]">
        <el-input v-model="numberValidateForm.roleDesc" auto-complete="off" ></el-input>
      </el-form-item>
      <!-- <el-form-item class="fr" label="所属部门" prop="deptName" :rules="[{ required: true, message: '所属部门不能为空'}]">
        <el-input v-model="numberValidateForm.deptName" auto-complete="off"></el-input>
      </el-form-item> -->
      <div style="clear:both"></div>
      <el-form-item class="btnitem">
        <el-button type="primary" @click="comfirmbtn">确定</el-button>
        <router-link to="/authlist">
            <el-button type="primary" style="margin-left:2%">返回</el-button>
        </router-link>         
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "@/common/axios.js";
import common from "@/common/common.js";
export default {
  components: {
  },
  data() {
    return {
      numberValidateForm: {
          roleName:'',
          roleCode:'',
          roleDesc:'',

      },
    };
  },
  methods: {
      comfirmbtn() {
        this.$refs['numberValidateForm'].validate((valid) => {
            if (valid) {
                // 验证通过
                let url = common.roleUrl
                axios.put(url, this.numberValidateForm).then(res => {
                    if (res.status === 'SUCCEED') {
                        let _this = this
                        _this.$message({message: "操作成功!",type: "success",duration: 1500})
                        setTimeout(function(){ 
                            _this.$router.push({path: "/authlist"})
                        }, 1500)                    
                        
                    } else {
                        this.$alert('修改失败，请联系管理员!', '提示', {confirmButtonText: '确定'})
                    }
                })                
            } else {
            console.log('error submit!!');
            return false;
            }
        })
      },
    },
    created() {
        // 数据回显
        console.log(this.$route.query )
        this.numberValidateForm = this.$route.query 
    }
}
</script>

<style scoped>
.addmain {
  padding: 30px;
  background: #fff;
}
.addmain .el-select {
  width: 100%;
}
.addmain .el-form-item {
  width: 34%;
}
.addmain .title {
  height: 60px;
  line-height: 60px;
  font-size: 16px;
}
.addmain .el-form-item__label {
  text-align: center;
  background: #f8f8f9 !important;
}
.btnitem {
  width: 100% !important;
  text-align: center;
}
.addmain .btnitem .el-form-item__content {
  margin-left: 0 !important;
}
</style>
