<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-13 11:13:20
 * @LastEditTime: 2020-11-09 17:04:55
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\rent\baseInformationDetail.vue
-->

<template>
  <div class="baseInformationDetail">
    <div class="wrapper">
      <el-tabs type="card" v-model="formTemp.label" class="noBorder">
        <el-tab-pane class="title" name="info" label="基本信息">
          <baseInformationDetail-module :baseInfoForm="baseInfoForm" :formReadonly="formReadonly"></baseInformationDetail-module>

          <el-row :gutter="10">
            <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="14">
              <div style="padding: 20px 0 20px 0; text-align: center">
                <el-button @click="handleGoToBack()" size="medium">返 回</el-button>
              </div>
            </el-col>
          </el-row>
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
import _ from 'lodash';
import eventBus from '@/common/eventBus.js';

export default {
  name: 'baseInformationDetail',
  props: {},
  components: {
    baseInformationDetailModule,
  },
  data() {
    return {
      id: '',
      formTemp: {
        label: 'info',
      },
      baseInfoForm: {},
      formReadonly: {
        hide: ['saveBtn'],
        readonly: [],
      },
      status: {
        loading: false,
      },
      fatherPath: '',
    };
  },
  computed: {
    // ...mapState('menu', {
    //   userId: store => store.userId
    // }),
  },
  watch: {},
  created() {
    // this.getSend();
    this.id = this.$route.query.id;
    this.getBaseInforDetail();
    
    
  },
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     // 通过 `vm` 访问组件实例
  //     vm.fatherPath = from.path;
  //   });
  // },
  mounted() {
        
  },

  // destroyed: function() {
  //   eventBus.$off('sendFatherPath');
  // },

  methods: {
    // getSend() {
    //   // 避免多次绑定触发事件，在每次调用方法前先解绑事件( bus.$off )，然后在重新绑定( bus.$on )
    //   eventBus.$off('sendFatherPath');
    //   eventBus.$on('sendFatherPath', (path) => {
    //     this.fatherPath = path;
    //   });
    // },
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
                val.approvalOperation = 'N';  // 返回的数据为Y,是错误的，修改为N
              }
            });
          }
          this.baseInfoForm.rentApprovalList.sort(this.sortFunc);
          // 判断是否限牌 隐藏字段
          if (this.baseInfoForm.isLimitLicence === 'N') {
            this.formReadonly.hide.push(
              'cityName',
              'licenceCode',
              'licenceName',
              'newLicenceFee',
              'newtotalMonthlyRent',
              'rentLicenceFee',
              'totalMonthlyRent'
            );
          } else {
            // 计算原月租金合计
            this.baseInfoForm.totalMonthlyRent =
              this.baseInfoForm.monthlyRent * 1 +
              this.baseInfoForm.rentLicenceFee * 1 +
              '';
          }
        }
      });
    },
    
    // 按审批时间排序
    sortFunc(a, b) {
      return a.approvalTime > b.approvalTime ? 1 : -1
    },

    // 返回
    handleGoToBack() {
      const path = sessionStorage.getItem('rentDeatilPath');
      console.log(path);
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