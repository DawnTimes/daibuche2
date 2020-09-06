<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-13 11:13:20
 * @LastEditTime: 2020-08-20 09:35:53
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\rent\rentApprovalOperation.vue
-->

<template>
  <div class="rentApprovalOperation">
    <div class="wrapper">
      <el-tabs type="card" v-model="formTemp.activeName" class="noBorder">
        <el-tab-pane class="title" name="first" label="基本信息">
          <baseInformationDetail-module
            :baseInfoForm="baseInfoForm"
          ></baseInformationDetail-module>

          <el-row :gutter="10">
            <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="14">
              <div style="padding: 20px 0 20px 0; text-align: center">
                <el-button @click="handleGoToBack()" size="medium">返 回</el-button>
                <el-button type="primary" size="medium" @click="handleGoToApproval()">去审批</el-button>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane name="second" label="审批提交">
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
import baseInformationDetailModule from './components/baseInformationDetailModule';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import { mapState } from 'vuex';
import approvalModule from '@/components/approvalModule';

import moment from 'moment';

export default {
  name: 'rentApprovalOperation',
  props: {},
  components: {
    baseInformationDetailModule,
    approvalModule,
  },
  data() {
    return {
      formTemp: {
        activeName: 'first',
      },
      baseInfoForm: {
        status: 'Y',
      },
      formData: {
        status: 'Y',
        approvalUser: '',
        approvalTime: '',
      },
      formReadonly: {
        hide: [],
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
      userId: store => store.userId
    }),
  },
  watch: {},
  created() {
    this.formData.approvalUser = this.userId;
    this.formData.approvalTime = moment().format('YYYY-MM-DD HH:mm:ss');
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
    prevStep(obj) {
      this.formTemp.activeName = obj.data;
    },

    // 去审批
    handleGoToApproval() {
      this.formTemp.activeName = 'second';
    },

    // 返回
    handleGoToBack() {
      this.$router.push({
        path: '/rentApprovalList',
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