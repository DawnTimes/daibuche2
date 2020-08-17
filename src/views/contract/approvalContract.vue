<template>
  <div class="mainDiv">
    <viewApprovalProcess :dataParams="dataParams" @getContractApprOp="getContractApprOp"></viewApprovalProcess>
    <p class="title">合同审批 > 审批</p>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="10" style="margin-right:5%">
          <el-form-item label="合同编号">
            <el-input v-model="form.contractNumber" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="审批操作" v-if="form.contractApprOp == 1">
            <el-select v-model="form.approvalOperation" placeholder="请选择" style="width:100%">
              <el-option label="批准" value="Y"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审批操作" v-else>
            <el-select v-model="form.approvalOperation" placeholder="请选择" style="width:100%">
              <el-option label="批准" value="Y"></el-option>
              <el-option label="拒绝" value="N"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" style="margin-right:5%">
          <el-form-item label="审批人">
            <el-input v-model="form.approvalPerson" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="审批时间">
            <el-input v-model="form.approvalTime"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-form-item label="合同附件">
        <el-upload class="upload-demo" drag  action="https://jsonplaceholder.typicode.com/posts/" :before-upload="beforeUpload" :limit=1>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>-->
      <el-form-item label="审批意见">
        <el-input type="textarea" v-model="form.approvalOpinion" rows="6"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:38%">
        <el-button type="primary" @click="onSubmit">审批合同</el-button>
        <el-button type="primary" @click="downLoad(form.contractNumber)">合同下载</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from '@/common/axios.js';
import { mapState, mapMutations } from 'vuex';
import viewApprovalProcess from '@/views/contract/viewApprovalProcess';
import bus from '@/common/eventBus.js';
import common from '@/common/common.js';
export default {
  props: ['dataParams'],
  data() {
    return {
      form: {
        approvalOperation: 'Y',
        approvalOpinion: '',
        approvalPerson: '',
        approvalTime: '',
        contractApprOp: '',
        contractAttachment: '',
        contractNumber: this.dataParams.contractNumber,
        contractPath: this.dataParams.contractPath,
      },
    };
  },
  computed: {
    ...mapState(['personName']),
  },
  created() {
    this.form.approvalPerson = this.personName;
    this.form.approvalTime = common.getNowFormatDate();
  },
  components: {
    viewApprovalProcess,
  },
  methods: {
    downLoad(contractName) {
      window.location.href = `/api/carmanage-admin/contract/downloadContract?fileName=${contractName}.pdf`;
    },
    getContractApprOp(data) {
      if (data.length > 0) {
        this.form.contractApprOp = data[data.length - 1].curStatus;
      } else {
        this.form.contractApprOp = '1';
      }
    },
    beforeUpload(file) {
      // 表单提交方式
      let formDatas = new FormData();
      formDatas.append('file', file);
      console.log(formDatas);
      let url = common.contractUploadUrl;
      axios.post(url, formDatas).then((res) => {
        this.form.contractAttachment = res;
      });
    },
    onSubmit() {
      let url = common.contraceApprovalUrl;
      this.form.contractApprOp = this.dataParams.contractFlowStatus;
      console.log('this.form.contractApprOp');
      console.log(this.form.contractApprOp);
      console.log(this.dataParams.contractFlowStatus);

      axios.post(url, this.form).then((res) => {
        // {"ec":"0","em":"Success!","data":{"contractFlowStatus":"1","contractApprOp":"1"}}
        if (res.em === 'Success!') {
          let _this = this;
          _this.$message({
            message: '操作成功!',
            type: 'success',
            duration: 1500,
          });
          setTimeout(function () {
            // 关闭改tab
            _this.$emit('closeTab', 'approvalContract');
            bus.$emit('forInitData');
          }, 1500);
        } else {
          this.$alert('操作失败，请联系管理员!', '提示', {
            confirmButtonText: '确定',
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  height: 40px;
  line-height: 40px;
  font-size: 17px;
  text-indent: 8px;
  margin-bottom: 20px;
  color: #666;
}
</style>