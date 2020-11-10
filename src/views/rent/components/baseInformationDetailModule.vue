<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-13 17:42:12
 * @LastEditTime: 2020-11-09 17:02:18
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\rent\components\baseInformationDetailModule.vue
-->
<template>
  <div class="baseInformationDetailModule">
    <div class="baseInfor">
      <el-row :gutter="0">
        <el-col :xs="24" :sm="24" :md="22" :lg="20" :xl="16">
          <el-row :gutter="0">
            <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>id编号：</span>
                <span>{{ baseInfoForm.id }}</span>
              </div>
            </el-col> -->
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>车型代码：</span>
                <span>{{ baseInfoForm.modelCode }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>车型名称：</span>
                <el-tooltip :content="baseInfoForm.modelName" placement="top-start" effect="light">
                  <span>{{ baseInfoForm.modelName }}</span>
                </el-tooltip>
                
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>品牌：</span>
                <el-tooltip :content="baseInfoForm.brandName" placement="top-start" effect="light">
                  <span>{{ baseInfoForm.brandName }}</span>
                </el-tooltip>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>车系：</span>
                <span>{{ baseInfoForm.seriesName }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>数量：</span>
                <span>{{ baseInfoForm.num }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>是否限牌：</span>
                <span>{{ baseInfoForm.isLimitLicence | flagValue }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox" v-show="!$formAtReadonly('cityName', formReadonly.hide)">
                <span>城市：</span>
                <span>{{ baseInfoForm.cityName }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox" v-show="!$formAtReadonly('licenceName', formReadonly.hide)">
                <span>牌照商：</span>
                <el-tooltip :content="baseInfoForm.licenceName" placement="top-start" effect="light">
                  <span>{{ baseInfoForm.licenceName }}</span>
                </el-tooltip>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>生效日期：</span>
                <span>{{ baseInfoForm.validDate | timeFormat }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>原月租金：</span>
                <span>{{ baseInfoForm.monthlyRent | moneyFormat }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox" v-show="!$formAtReadonly('rentLicenceFee', formReadonly.hide)">
                <span>原牌照费：</span>
                <span>{{ baseInfoForm.rentLicenceFee | moneyFormat }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox" v-show="!$formAtReadonly('totalMonthlyRent', formReadonly.hide)">
                <span>原月租金合计：</span>
                <span>{{ baseInfoForm.totalMonthlyRent | moneyFormat }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>新月租金：</span>
                <span>{{ baseInfoForm.newMonthlyRent | moneyFormat }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox" v-show="!$formAtReadonly('newLicenceFee', formReadonly.hide)">
                <span>新牌照费：</span>
                <span>{{ baseInfoForm.newLicenceFee | moneyFormat }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox" v-show="!$formAtReadonly('newtotalMonthlyRent', formReadonly.hide)">
                <span>新月租金合计：</span>
                <span>{{ baseInfoForm.newtotalMonthlyRent | moneyFormat }}</span>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div class="approvalProcess">
      <el-row :gutter="0">
        <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="14">
          <el-timeline>
            <!-- <el-timeline-item class="text_statr" timestamp="发起修改" placement="top" icon="el-icon-more" type="primary">
              <el-card>
                <h4>
                  <span>修改时间：{{ baseInfoForm.modifiedTime | timeFormatTemp }}</span>
                  <span>修改人：{{ baseInfoForm.modifier }}</span>
                </h4>
                <p>备注：{{ baseInfoForm.remark }}</p>
              </el-card>
            </el-timeline-item> -->
            <el-timeline-item
              :timestamp="formatUser(value.curStatus, userTemp)"
              :color="value.color"
              :icon="value.icon"
              :type="value.type"
              :class="{ 'text_success': value.approvalOperation == 'Y', 'text_error': value.approvalOperation == 'N' }"
              placement="top"
              v-for="(value, index) in baseInfoForm.rentApprovalList"
              :key="index"
            >
              <el-card>
                <h4>
                  <span>{{ value.curStatus == '1' || value.curStatus == '2' ? '修改时间' : '审批时间' }}：{{ value.approvalTime | timeFormatTemp }}</span>
                  <span>{{ value.curStatus == '1' || value.curStatus == '2' ? '修改人' : '审批人' }}：{{ value.approvalPerson }}</span>
                </h4>
                <p>
                  <span>{{ value.curStatus == '1' || value.curStatus == '2' ? '备注' : '审批意见' }}：</span>
                  <span>{{ value.approvalOpinion }}</span>                  
                </p>
              </el-card>


              <!-- <el-card>
                <h4>
                  <span>审批时间：{{ value.approvalTime | timeFormatTemp }}</span>
                  <span>审批人：{{ value.approvalPerson }}</span>
                </h4>
                <p>
                  <span>审批意见：</span>
                  <span>{{ value.approvalOpinion }}</span>                  
                </p>
              </el-card> -->
            </el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>
    </div>

    <!-- <el-row :gutter="10">
      <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="14">
        <div style="padding: 20px 0 20px 0; text-align: center">
          <el-button @click="handleGoToBack()" size="medium">返 回</el-button>
          <el-button
            v-show="!$formAtReadonly('saveBtn', formReadonly.hide)"
            type="primary"
            size="medium"
            @click="handleGoToApproval()"
          >去审批</el-button>
        </div>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import { queryDict } from '@/api/index.js';

export default {
  name: '',
  props: {
    baseInfoForm: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formReadonly: {
      type: Object,
      default: () => {
        return {}
      }
    },
    fatherPath: {
      type: String,
      default: '',
    },
  },
  components: {},
  data() {
    return {
      approvalProcessData: [
        {
          appprovalOperation: 'approved',
          approvalTime: '2020-08-09',
          approvalUser: '会计',
          approvalOpinion: '经审核无误，允许通过！',
          color: '#0bbd87',
          icon: 'el-icon-check',
        },
        {
          appprovalOperation: 'refuse',
          approvalTime: '2020-08-09',
          approvalUser: '财务负责人',
          approvalOpinion: '经审核数据有误，拒绝通过！',
          color: '#F56C6C',
          icon: 'el-icon-close',
        },
        // { appprovalOperation: '', approvalTime: '2020-08-09', approvalUser: 'admin', approvalOpinion: '经审核无误，允许通过！' },
      ],

      // 数据字典集
      dictOperationTemp: [
        {
          columnName: 'approval_Status',
          columnValueCode: 'Y',
          columnValueDesc: '审批通过',
          createTime: '2020-04-27 00:00:00.0',
          tabName: 'UNIFY_SYSTEM_INTERFACE',
        },
        {
          columnName: 'approval_Status',
          columnValueCode: 'refuse',
          columnValueDesc: 'N',
          createTime: '2020-04-27 00:00:00.0',
          tabName: 'UNIFY_SYSTEM_INTERFACE',
        },
      ],

      userTemp: [
        { value: '1', lable: '生成租金' },
        { value: '2', lable: '发起申请' },
        { value: '3', lable: '会计审批通过' },
        { value: '4', lable: '财务审批通过' },
        { value: '5', lable: '审批拒绝' },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
    // this.$nextTick(function () {
    //   this.tableHeight =
    //     window.innerHeight - this.$refs.refSpan.$el.offsetWidth;

    //   // 监听窗口大小变化
    //   let self = this;
    //   window.onresize = function () {
    //     self.tableHeight =
    //       window.innerHeight - self.$refs.refSpan.$el.offsetWidth;
    //   };
    // });
    // this.getDictStatus('approval_operation', 'UNIFY_INTERFACE_APPROVAL');
  },
  mounted() {},
  methods: {
    // 获取状态数据字典
    getDictStatus(columnName, tabName) {
      const data = {
        columnName: columnName,
        tabName: tabName,
      };
      queryDict(data).then((res) => {
        if (res.code === '0') {
          const arrData = res.data.dictList;
          this.dictOperationTemp = arrData;
        }
      });
    },

    // 格式化状态
    formatStatus(type, dictTemp = []) {
      let columnValueDesc = '';
      dictTemp.forEach((v) => {
        if (type === v.columnValueCode) {
          return (columnValueDesc = v.columnValueDesc);
        }
      });
      return columnValueDesc;
    },

    formatUser(val, userTemp = []) {
      let lable = '';
      userTemp.forEach((v) => {
        if (val === v.value) {
          return (lable = v.lable);
        }
      })
      return lable;
    },

    // 去审批
    handleGoToApproval() {
      
    },

    // 返回
    handleGoToBack() {
      this.$router.push({
        path: this.fatherPath,
      });
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style lang="scss">
.baseInformationDetailModule {
  .baseInfor {
    padding: 10px 0 10px 10px;
    border-bottom: 1px solid #eee;
    .tempBox {
      position: relative;
      height: 36px;
      color: #000;
      font-weight: bold;
      font-size: 16px;
      width: 100%;

      :nth-child(1) {
        display: inline-block;
        width: 120px;
        text-align: right;
        // text-align: justify; // 两端对齐
        // text-align-last: justify;
      }
      :nth-child(2) {
        position: absolute;
        left: auto;
        top: auto;
        width: calc(100% - 120px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .approvalProcess {
    padding: 20px 0 0 20px;

    h4 {
      padding-top: 5px;
      padding-bottom: 24px;
      display: flex;

      span {
        flex: 1;
      }
    }

    p {
      // height: 38px;
      display: flex;
      padding-bottom: 5px;

      span {
        line-height: 18px;
      }
      
      :nth-child(1) {
        width: 70px;
      }
      :nth-child(2) {
        flex: 1;        
      }
    }

    .text_statr {
      // padding-left: 0px;
      .el-timeline-item__timestamp {
        color: #409EFF;
      }
    }
    .text_success {
      // padding-left: 0px;
      .el-timeline-item__timestamp {
        color: #0bbd87;
      }
    }
    .text_error {
      // padding-left: 0px;
      .el-timeline-item__timestamp {
        color: #F56C6C;
      }
    }
    
  }
}
</style>
