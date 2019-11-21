<template>
  <div class="addmain">
      <p class="title">新增用户</p>
      <el-form :model="numberValidateForm" ref="numberValidateForm"  label-width="120px" class="demo-ruleForm">
          
        <el-form-item class="fl"
            label="登录名"
            prop="username"
            :rules="[
            { required: true, message: '登录名不能为空'}
            ]"
        >
            <el-input type="age" v-model="numberValidateForm.username" auto-complete="off"></el-input>
        </el-form-item>
        
        <el-form-item class="fr"
            label="姓名"
            prop="label"
            :rules="[
            { required: true, message: '姓名不能为空'}
            ]"
        >
            <el-input type="age" v-model="numberValidateForm.label" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item class="fr"
            label="手机号"
            prop="phone"
        >
            <el-input type="age" v-model.number="numberValidateForm.phone" auto-complete="off"></el-input>
        </el-form-item> -->
        <!-- <el-form-item class="fl"
            label="所属部门"
            prop="deptName"
            :rules="[
            { required: true, message: '所属部门不能为空'}
            ]"
        >
        <el-select v-model="numberValidateForm.deptName" placeholder="请选择部门" multiple>
            <el-option
            v-for="item in options2"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            </el-option>
        </el-select>        
        </el-form-item> -->
        <el-form-item class="fl"
            label="角色"
            prop="role"
            :rules="[
            { required: true, message: '角色不能为空'}
            ]"
        >
            <el-select v-model="numberValidateForm.role" placeholder="请选择角色" multiple clearable>
                <el-option
                    v-for="item in options"
                    :key="item.roleId"
                    :label="item.roleName"
                    :value="item.roleId">
                </el-option>
            </el-select>             
        </el-form-item>
        <el-form-item class="fr"
            label="状态"
            prop="delFlag"
            :rules="[
            { required: true, message: '状态不能为空'}
            ]"
        >
        <el-select v-model="numberValidateForm.delFlag" placeholder="请选择状态" clearable value='0'>
            <el-option label="有效" value="0"></el-option>
            <el-option label="无效" value="1"></el-option>
        </el-select>
        </el-form-item>
        <div style="clear:both"></div>
        <el-form-item class="btnitem">
            <el-button type="primary" @click="comfirmbtn">确定</el-button>
            <router-link to="/uermanage">
                <el-button type="primary" style="margin-left:2%">返回</el-button>
            </router-link>              
        </el-form-item>  
    </el-form>
  </div>
</template>
<script>
import axios from "@/common/axios.js";
import common from "@/common/common.js";
import axios2 from 'axios'
export default {
    components:{
    },
   data() {
      return {
        options: [],
        options2: [],
        numberValidateForm: {
            username: '',
            label: '',
            // phone: '',
            // deptName: '',
            role: [],
            delFlag: ''
        },
      };
    },
    methods: {
      comfirmbtn() {
        this.$refs['numberValidateForm'].validate((valid) => {
            console.log(this.numberValidateForm.role)
            if (valid) {

                // 验证通过
                // 提交数据
                //   增加：/user Post请求
                let url = common.userUrl

                axios2.post(url, this.numberValidateForm).then(res => {
                    console.log(res)
                    if (res.data.status === 'SUCCEED') {
                        let _this = this
                        _this.$message({message: "操作成功!",type: "success",duration: 1500})
                        setTimeout(function(){ 
                            _this.$router.push({path: "/uermanage"})
                        }, 1500)                    
                    } else {
                        this.$alert('添加失败，请联系管理员!', '提示', {confirmButtonText: '确定'})
                    }
                }).catch(error => {
                    if (error.message.includes('ORA-00001')) {
                        this.$alert('用户名必须唯一，请重新填写!', '提示', {confirmButtonText: '确定'})
                    }
                })        
            } else {
                console.log('error submit!!');
                return false;
            }
        })         
      },
      getDropDownData() {
        // 获取部门和角色下拉框中的数据
/*         axios.get(common.treeUrl, {}).then(res => {
            this.options2 = res[0].children
        })   */    
        
        axios.get(common.allRoleUrl, {}).then(res => {
            this.options = res
        })          


      }
    },

    created() {
        this.getDropDownData();
    },
    
}
</script>

<style scoped>
.addmain {
    padding: 30px;
    background: #fff;
}
.addmain .el-select{
    width: 100%;
}
.addmain .el-form-item{
    width: 34%;
}
.addmain .title{
    height: 60px;
    line-height: 60px;
    font-size: 16px;
}
.addmain .el-form-item__label {
    text-align: center;
    background: #F8F8F9 !important
}
.btnitem{
    margin-top: 5%;
    width: 100% !important;
    text-align: center;
}
.addmain .btnitem .el-form-item__content{
    margin-left: 0 !important;
}
</style>
