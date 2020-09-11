<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-19 17:31:49
 * @LastEditTime: 2020-09-10 17:57:22
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\supportGold\supportGoldApprovaled.vue
-->


<template>
  <div class="supportGoldApprovaled">
    <div class="wrapper">
      <el-tabs type="card" v-model="formTemp.activeName" class="noBorder">
        <el-tab-pane class="title" name="first" label="原因说明">
          <supportGoldApproval-reason :currentMonth="currentMonth" :batch="batch"></supportGoldApproval-reason>

          <div style="padding: 20px 0 20px 0; text-align: center">
            <el-button @click="handleGoToBack()" size="medium">返 回</el-button>
            <el-button type="primary" size="medium" @click="nextStep()">下一步</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane class="title" name="second" label="基本信息">
          <baseInformationDetail-module
            :baseInfoForm="baseInfoForm"
          ></baseInformationDetail-module>

          <el-row :gutter="10">
            <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="14">
              <div style="padding: 20px 0 20px 0; text-align: center">
                <el-button @click="handleGoToBack()" size="medium">取 消</el-button>
                <el-button type="primary" plain size="medium" @click="prevToStep()">上一步</el-button>
                <el-button type="primary" size="medium" @click="handleGoToApproval()">去审批</el-button>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane name="third" label="审批提交">
          <approval-module
            :formData="formData"
            :fatherPath="fatherPath"
            :formReadonly="formReadonly"
            :loading="status.loading"
            @formDataSubmit="handleFormDataSubmit"
            @prevStep="prevStep"
          ></approval-module>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import { mapState } from 'vuex';
import moment from 'moment';

import supportGoldApprovalReason from './components/supportGoldApprovalReason';
import baseInformationDetailModule from './components/baseInformationDetailModule';
import approvalModule from '@/components/approvalModule';

export default {
  name: 'supportGoldApprovaled',
  props: {},
  components: {
    supportGoldApprovalReason,
    approvalModule,
    baseInformationDetailModule,
  },
  data() {
    return {
      formTemp: {
        activeName: 'first',
      },
      currentMonth: '',
      batch: '',
      baseInfoForm: {
        status: 'Y',
      },
      formData: {
        status: 'Y',
        approvalUser: '',
        approvalTime: '',
      },
      formReadonly: {
        hide: ['cancelBtn1'],
        readonly: ['approvalUser', 'approvalTime'],
      },
      status: {
        loading: false,
      },
      fatherPath: '',
    };
  },
  computed: {
    ...mapState({
      userId: (store) => store.userId,
    }),
  },
  watch: {},
  created() {
    this.formData.approvalUser = this.userId;
    this.formData.approvalTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const params = this.$route.query;
    this.batch = params.batch;
    const times = new Date(params.month);
    // console.log(times);
    this.currentMonth = times.getMonth() + 1 + '';
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例
      vm.fatherPath = from.path;
    });
  },
  mounted() {},
  methods: {
    handleFormDataSubmit() {},

    // 上一步
    prevStep() {
      this.formTemp.activeName = 'second';
    },

    // 上一步
    prevToStep() {
      this.formTemp.activeName = 'first';
    },
    // 下一步
    nextStep() {
      this.formTemp.activeName = 'second';
    },
    
    // 去审批
    handleGoToApproval() {
      this.formTemp.activeName = 'third';
    },

    // 返回
    handleGoToBack() {
      this.$router.push({
        path: '/supportGoldApprovalList',
      });
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
.baseInformationDetail {
}
</style>