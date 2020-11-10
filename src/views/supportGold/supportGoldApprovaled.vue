<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-19 17:31:49
 * @LastEditTime: 2020-11-10 09:46:44
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\supportGold\supportGoldApprovaled.vue
-->


<template>
  <div class="supportGoldApprovaled">
    <div class="wrapper">
      <el-tabs type="card" v-model="formTemp.activeName" class="noBorder">
        <el-tab-pane class="title" name="first" label="支援金复核表">
          <supportGoldApproval-reason></supportGoldApproval-reason>

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
                <el-button type="primary" size="medium" @click="handleGoToApproval()">下一步</el-button>
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
import _ from 'lodash';

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
      id: '',
      currentMonth: '',
      currentYear: '',
      batch: '',
      // formData: {
      //   agentName: '',
      //   applyDate: '',
      //   id: '',
      //   isGacShop: '',
      //   pageSize: 10,
      //   pageNum: 1,
      // },
      baseInfoForm: {
        suApprovalList: [],
        month: '',
        year: '',
        batchNumber: '',
        batch: '',
        carNum: '',
        rentCount: '',
        LicenceFee: '',
        rentTotalCount: '',
        counts: '',
      },
      formData: {
        type: '',
        approvalPerson: '',
        approvalOpinion: '',
        id: '',
        approvalOperation: '',
        approvalTime: '',
      },
      formReadonly: {
        hide: ['cancelBtn1'],
        readonly: ['approvalPerson', 'approvalTime'],
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
    this.formData.approvalPerson = this.userId;
    this.formData.approvalTime = moment().format('YYYY-MM-DD HH:mm:ss');

    const query = this.$route.query;
    this.formData.id = query.id;
    this.formData.type = query.type;
    Object.assign(this.baseInfoForm, query);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例
      vm.fatherPath = from.path;
    });
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    // 详情
    getDetail() {
      const url = common.supportApprovalListUrl;
      const params = {
        id: this.formData.id,
      }
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          this.baseInfoForm.suApprovalList = res.data.suApprovalList;
          if (!_.isEmpty(this.baseInfoForm.suApprovalList)) {
            this.baseInfoForm.suApprovalList.forEach((val) => {
              val.color = '';
              val.icon = '';
              // if (val.approvalOperation === 'Y') {
              //   val.color = '#0bbd87';
              //   val.icon = 'el-icon-check';
              // } else {
              //   val.color = '#F56C6C';
              //   val.icon = 'el-icon-close';
              // }
              if (
                val.curStatus === '1' ||
                val.curStatus === '2' 
                // val.curStatus === '3'
              ) {
                val.color = '#409EFF';
                val.icon = 'el-icon-more';
              } else if (val.curStatus === '3' || val.curStatus === '4') {
                val.color = '#0bbd87';
                val.icon = 'el-icon-check';
              } else if (val.curStatus === '5') {
                val.color = '#F56C6C';
                val.icon = 'el-icon-close';
              }
            });
          }
        }
      })
    },

    // 审批提交
    handleFormDataSubmit(obj) {
      const data = obj.data;
      const url = common.supportApprovalUrl;
      this.status.loading = true;
      axios.post(url, data).then((res) => {
        if (res.ec === '0') {
          this.status.loading = false;
          this.$notify.success({
            title: '温馨提示！',
            message: '提交成功！'
          });

          setTimeout(() => {
            this.$router.push({
              path: '/supportGoldApprovalList'
            });
          }, 1000);
        } else {
          this.status.loading = false;
          this.$notify.error({
            title: '温馨提示！',
            message: res.em || '提交失败，请联系管理员!'
          });
        }
      }).catch((err) => {
        this.status.loading = false;
        this.$notify.error({
          title: '温馨提示！',
          message: err ? err.em : '提交失败，请联系管理员!',
        });
      })
      
    },

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