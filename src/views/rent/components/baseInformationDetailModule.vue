<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-13 17:42:12
 * @LastEditTime: 2020-08-14 11:46:26
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\rent\components\baseInformationDetailModule.vue
-->
<template>
  <div class="baseInformationDetailModule">
    <div class="baseInfor">
      <el-row :gutter="0">
        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="16">
          <el-row :gutter="0">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>任务编号：</span>
                <span>00001</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>车型代码：</span>
                <span>S899</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>车型名称：</span>
                <span>某某</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>品牌：</span>
                <span>传祺</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>车系：</span>
                <span>8系</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>数量：</span>
                <span>155</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>是否限牌：</span>
                <span>是</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>城市：</span>
                <span>广州</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>牌照商：</span>
                <span>广汽租赁</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>原月租金：</span>
                <span>3888元</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>原牌照费：</span>
                <span>3888元</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>原月租金合计：</span>
                <span>6888元</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>新月租金：</span>
                <span>4888元</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>新牌照费：</span>
                <span>4888元</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="tempBox">
                <span>新月租金合计：</span>
                <span>8888元</span>
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
            <el-timeline-item class="text_statr" timestamp="发起修改" placement="top" icon="el-icon-more" type="primary">
              <el-card>
                <h4>
                  <span>修改时间：2020-08-09 12:12:12</span>
                  <span>修改人：admin</span>
                </h4>
                <p>备注：王小虎 提交于 2018/4/12 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item
              :timestamp="formatStatus(value.appprovalOperation, dictOperationTemp)"
              :color="value.color"
              :icon="value.icon"
              :type="value.type"
              :class="{ 'text_success': value.appprovalOperation == 'approved', 'text_error': value.appprovalOperation == 'refuse' }"
              placement="top"
              v-for="( value, index) in approvalProcessData"
              :key="index"
            >
              <el-card>
                <h4>
                  <span>审批时间：{{ value.approvalTime }}</span>
                  <span>审批人：{{ value.approvalUser }}</span>
                </h4>
                <p>
                  <span>审批意见：</span>
                  <span>{{ value.approvalOpinion }}</span>                  
                </p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="10">
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
    </el-row>
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
      height: 36px;
      color: #000;
      font-weight: bold;
      font-size: 16px;

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
