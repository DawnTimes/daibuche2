<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-13 11:13:20
 * @LastEditTime: 2020-09-10 17:55:26
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
            :formReadonly="formReadonly"
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

import _ from 'lodash';

export default {
  name: 'rentApprovalOperation',
  props: {},
  components: {
    baseInformationDetailModule,
    approvalModule,
  },
  data() {
    return {
      id: '',
      formTemp: {
        activeName: 'first',
      },
      baseInfoForm: {
        status: 'Y',
      },
      formData: {
        status: 'Y',
        approvalPerson: '',
        approvalTime: '',
        type: '',
        approvalOperation: '',
        approvalOpinion: '',
        id: '',
      },
      formReadonly: {
        hide: ['cancelBtn2'],
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
      userId: store => store.userId
    }),
  },
  watch: {},
  created() {
    this.formData.approvalPerson = this.userId;
    this.formData.approvalTime = moment().format('YYYY-MM-DD HH:mm:ss');

    const query = this.$route.query;

    this.id = query.id;
    this.formData.type = query.type;
    this.formData.id = query.id;
     this.getBaseInforDetail();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例
      vm.fatherPath = from.path;
    });
  },
  mounted() {},
  methods: {
    // 获取基本信息详情
    getBaseInforDetail() {
      const params = {
        id: this.id,
      };
      const url = common.queryRentDetailByIdUrl;
      axios.post(url, params).then((res) => {
        if (res.em === 'Success!') {
          const data = res.data;
          this.baseInfoForm = data;
          if (!_.isEmpty(this.baseInfoForm.rentApprovalList)) {
            this.baseInfoForm.rentApprovalList.forEach((val) => {
              val.color = '';
              val.icon = '';
              // if (val.approvalOperation === 'Y') {
              //   val.color = '#0bbd87';
              //   val.icon = 'el-icon-check';
              // } else {
              //   val.color = '#F56C6C';
              //   val.icon = 'el-icon-close';
              // }
              if (val.curStatus === '1' || val.curStatus === '2' || val.curStatus === '3') {
                val.color = '#409EFF';
                val.icon = 'el-icon-more';
              } else if (val.curStatus === '4') {
                val.color = '#0bbd87';
                val.icon = 'el-icon-check';
              } else if(val.curStatus === '5') {
                val.color = '#F56C6C';
                val.icon = 'el-icon-close';
              }
              
            })
          }
          // this.baseInfoForm.rentApprovalList.splice(0, 1); 
          // 判断是否限牌
          if (this.baseInfoForm.isLimitLicence === 'N') {
            this.formReadonly.hide.push('cityName', 'licenceCode', 'newLicenceFee', 'newtotalMonthlyRent', 'rentLicenceFee', 'totalMonthlyRent')
          } else {
            this.baseInfoForm.totalMonthlyRent = this.baseInfoForm.monthlyRent * 1 + this.baseInfoForm.rentLicenceFee * 1 + '';
          }
        }
      })
    },


    handleFormDataSubmit(obj) {
      const data = obj.data;
      const url = common.rentApprovalOperationUrl;
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
              path: '/rentApprovalList'
            });
          }, 1000);
        } else {
          this.status.loading = false;
          this.$notify.error({
            title: '温馨提示！',
            message: res.em || '提交失败!'
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