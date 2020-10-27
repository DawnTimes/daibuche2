<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-19 17:31:49
 * @LastEditTime: 2020-10-26 18:33:27
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\supportGold\supportGoldDetail.vue
-->


<template>
  <div class="supportGoldDetail">
    <div class="wrapper">
      <el-tabs type="card" v-model="formTemp.activeName" class="noBorder">
        <el-tab-pane class="title" name="first" label="支援金复核表">
          <supportGoldApproval-reason></supportGoldApproval-reason>

          <div style="padding: 20px 0 20px 0; text-align: center">
            <el-button @click="handleGoToBack()" plain size="medium">返 回</el-button>
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
                <el-button @click="handleGoToBack()" plain size="medium">取 消</el-button>
                <el-button type="primary" size="medium" @click="prevToStep()">上一步</el-button>
              </div>
            </el-col>
          </el-row>
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

export default {
  name: 'supportGoldDetail',
  props: {},
  components: {
    supportGoldApprovalReason,
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
        suApprovalList: [],
        month: '',
        batchNumber: '',
        batch: '',
        carNum: '',
        rentCount: '',
        LicenceFee: '',
        rentTotalCount: '',
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
      userId: (store) => store.userId,
    }),
  },
  watch: {},
  created() {
    // this.formData.approvalUser = this.userId;
    // this.formData.approvalTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const query = this.$route.query;
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
        id: this.baseInfoForm.id,
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
                val.curStatus === '2' ||
                val.curStatus === '3'
              ) {
                val.color = '#409EFF';
                val.icon = 'el-icon-more';
              } else if (val.curStatus === '4') {
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

    handleFormDataSubmit() {},

    // 上一步
    prevToStep() {
      this.formTemp.activeName = 'first';
    },
    // 下一步
    nextStep() {
      this.formTemp.activeName = 'second';
    },

    // 返回
    handleGoToBack() {
      const path = sessionStorage.getItem('supportGoldDeatilPath');
      this.$router.push({
        path: path,
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