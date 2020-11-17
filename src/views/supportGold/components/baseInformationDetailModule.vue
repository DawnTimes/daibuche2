<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-13 17:42:12
 * @LastEditTime: 2020-11-16 19:20:08
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\supportGold\components\baseInformationDetailModule.vue
-->
<template>
  <div class="baseInformationDetailModule">
    <div class="baseInfor">
      <el-row :gutter="0">
        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="16">
          <el-row :gutter="0">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>支援金月份：</span>
                <span>{{ baseInfoForm.year + '-' + baseInfoForm.month }}</span>
              </div>
            </el-col>
            <!-- <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>期数：</span>
                <span></span>
              </div>
            </el-col> -->
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>批次号：</span>
                <span>{{ baseInfoForm.batchNumber }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>批次：</span>
                <span>第{{ baseInfoForm.batch }}批</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>店数：</span>
                <span>{{ baseInfoForm.counts }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>车辆数量：</span>
                <span>{{ baseInfoForm.carNum }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>支援金：</span>
                <span>{{ baseInfoForm.rentCount | moneyFormat }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>牌照费：</span>
                <span>{{ baseInfoForm.LicenceFee | moneyFormat }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>总支援金：</span>
                <span>{{ baseInfoForm.rentTotalCount | moneyFormat }}</span>
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
            <!-- <el-timeline-item class="text_statr" timestamp="发起申请" placement="top" icon="el-icon-more" type="primary">
              <el-card>
                <h4>
                  <span>修改时间：2020-08-09 12:12:12</span>
                  <span>修改人：admin</span>
                </h4>
                <p>备注：</p>
              </el-card>
            </el-timeline-item>
            
            <el-timeline-item
              :timestamp="value.approvalOperation"
              :color="value.color"
              :icon="value.icon"
              :type="value.type"
              :class="{ 'text_success': value.approvalOperation == 'approved', 'text_error': value.approvalOperation == 'refuse' }"
              placement="top"
              v-for="( value, index) in baseInfoForm.suApprovalList"
              :key="index"
            >
              <el-card>
                <h4>
                  <span>审批时间：{{ value.approvalTime | timeFormatTemp }}</span>
                  <span>审批人：{{ value.approvalPerson }}</span>
                </h4>
                <p>
                  <span>审批意见：</span>
                  <span>{{ value.approvalOpinion }}</span>                  
                </p>
              </el-card>
            </el-timeline-item> -->
            
            <el-timeline-item
              :timestamp="formatUser(value.curStatus, userTemp)"
              :color="value.color"
              :icon="value.icon"
              :type="value.type"
              :class="{ 'text_success': value.approvalOperation == 'Y', 'text_error': value.approvalOperation == 'N' }"
              placement="top"
              v-for="(value, index) in baseInfoForm.suApprovalList"
              :key="index"
            >
              <el-card>
                <h4>
                  <span>{{ value.curStatus === '2' ? '申请时间' : '审批时间' }}：{{ value.approvalTime | timeFormatTemp }}</span>
                  <span>{{ value.curStatus === '2' ? '申请人' : '审批人' }}：{{ value.approvalPerson }}</span>
                </h4>
                <p>
                  <span>{{ value.curStatus === '2' ? '备注' : '审批意见' }}：</span>
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
          approvalUser: '财务',
          approvalOpinion: '经审核无误，允许通过！',
          color: '#0bbd87',
          icon: 'el-icon-check',
        },
        // {
        //   appprovalOperation: 'refuse',
        //   approvalTime: '2020-08-09',
        //   approvalUser: '资管负责人',
        //   approvalOpinion: '经审核数据有误，拒绝通过！',
        //   color: '#F56C6C',
        //   icon: 'el-icon-close',
        // },
        // { appprovalOperation: '', approvalTime: '2020-08-09', approvalUser: 'admin', approvalOpinion: '经审核无误，允许通过！' },
      ],

      // 数据字典集
      dictOperationTemp: [
        {
          columnName: 'approval_Status',
          columnValueCode: 'approved',
          columnValueDesc: '审批通过',
          createTime: '2020-04-27 00:00:00.0',
          tabName: 'UNIFY_SYSTEM_INTERFACE',
        },
        {
          columnName: 'approval_Status',
          columnValueCode: 'refuse',
          columnValueDesc: '审批拒绝',
          createTime: '2020-04-27 00:00:00.0',
          tabName: 'UNIFY_SYSTEM_INTERFACE',
        },
      ],

      userTemp: [
        { value: '1', lable: '生成支援金' },
        { value: '2', lable: '发起申请' },
        { value: '3', lable: '财务审批通过' },
        { value: '4', lable: '资管负责人审批通过' },
        { value: '5', lable: '审批拒绝' },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
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

    // 去审批
    handleGoToApproval() {
      
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
    padding: 0px 0 10px 0px;
    border-bottom: 1px solid #eee;
    .tempBox {
      height: 30px;
      color: #000;
      font-weight: bold;
      font-size: 13px;

      :nth-child(1) {
        display: inline-block;
        width: 120px;
        text-align: right;
        // text-align: justify; // 两端对齐
        // text-align-last: justify;
      }
    }
  }

  .approvalProcess {
    padding: 20px 0 0 20px;

    h4 {
      // padding-top: 5px;
      padding-bottom: 20px;
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
