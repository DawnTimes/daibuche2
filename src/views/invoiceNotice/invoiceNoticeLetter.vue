<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-21 17:31:53
 * @LastEditTime: 2020-09-24 16:39:48
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\invoiceNotice\invoiceNoticeLetter.vue
-->

<template>
  <div class="invoiceNoticeLetter">
    <div class="noticeLetterBox">
      <div class="topTitle">
        <div class="letterType">
          <span>代步车项目</span>
        </div>
        <div class="letterCust">
          <span>广州广汽租赁有限公司</span>
          <span>开票通知单</span>
        </div>
        <div class="lettetMode">
          <span>{{ formData.leaseWay ? (formData.leaseWay | leaseWay) : '租赁方式' }}</span>
        </div>
      </div>
      <div class="makeBox">
        <div class="makeDepart">
          <span>制单部门：车辆业务部</span>
        </div>
        <div class="makeTime">
          <span>制单时间：{{ letterForm.currentDate }}</span>
        </div>
      </div>
      <div class="tableInfoBox">
        <div class="speciesBox">
          <div class="speciesItem1">
            <span>发票种类</span>
          </div>
          <div class="speciesItem2">
            <span>{{ letterForm.incoiceType }}</span>
            <span>{{ letterForm.margin }}</span>
          </div>
          <div class="speciesItem3">
            <span>增值税专用发票</span>
            <span>收据</span>
          </div>
          <div class="speciesItem4">
            <span>税率</span>
          </div>
          <div class="speciesItem4">
            <span>{{ letterForm.rate }}</span>
          </div>
          <div class="speciesItem5">
            <span>合同编号</span>
          </div>
          <div class="speciesItem6">
            <span>{{ formData.contractNumber }}</span>
          </div>
        </div>
        <div class="contentBox">
          <div class="contentItem1">
            <span>开票内容</span>
          </div>
          <div class="contentItem2">
            <span>{{ letterForm.letterContent }}</span>
          </div>
          <div class="contentItem3">
            <span>纳税人类型</span>
          </div>
          <div class="contentItem4">
            <el-checkbox-group v-model="formData.checkList" :max="1">
              <el-checkbox :label="1">一般纳税人</el-checkbox>
              <el-checkbox :label="2">小规模纳税人</el-checkbox>
              <el-checkbox :label="3">个人</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="contentBox">
          <div class="contentItem1">
            <span>客户名称(全称)</span>
          </div>
          <div class="contentItem4">
            <span>{{ formData.name }}</span>
          </div>
        </div>
        <div class="contentBox2">
          <div class="contentItem5">
            <span>（机构）纳税人识别号</span>
            <span>（个人）身份证号码</span>
          </div>
          <div class="contentItem4">
            <span>{{ formData.creditCode }}</span>
          </div>
        </div>
        <div class="contentBox2">
          <div class="contentItem5">
            <span>（机构）地址\电话号码</span>
            <span>（个人）手机号码</span>
          </div>
          <div class="contentItem4">
            <span>{{ formData.addressTel }}</span>
          </div>
        </div>
        <div class="contentBox">
          <div class="contentItem1">
            <span>（机构）开户行及账号</span>
          </div>
          <div class="contentItem4">
            <span>{{ formData.bankAccount }}</span>
          </div>
        </div>
        <div class="contentBox">
          <div class="contentItem1">
            <span>电子邮箱地址</span>
          </div>
          <div class="contentItem4">
            <span>{{ formData.email }}</span>
          </div>
        </div>
      </div>
      <el-table
        :data="tableData"
        border
        :header-cell-style="{
        'text-align':'center',
        'color': '#333',
      }"
        style="width: 100%"
      >
        <el-table-column prop="nper" label="租金期数" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="payDay" label="应收日期" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="num" label="车辆台数" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dueAmount" label="月租金合计" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dueInterest" label="车辆租金" show-overflow-tooltip v-if="true"></el-table-column>
        <el-table-column prop="duePrincipal" label="本金" show-overflow-tooltip v-if="true"></el-table-column>
        <el-table-column prop="dueInterest" label="利息" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dueManagementFee" label="管理费" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dueCommission" label="手续费" show-overflow-tooltip></el-table-column>
        <el-table-column prop="invoiceDate" label="开票日期" show-overflow-tooltip></el-table-column>
        <el-table-column prop="invoiceNumber" label="票据号码" show-overflow-tooltip></el-table-column>
      </el-table>
      <div class="footerBox">
        <div class="agentBox">
          <span>经办人：</span>
        </div>
        <div class="headerBox">
          <span>经办部门负责人：</span>
        </div>
      </div>

      <div class="footerBtn">
        <el-button size="medium" @click="handleBack()">返回</el-button>
        <el-button type="primary" size="medium">导出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  name: 'invoiceNoticeLetter',
  props: {},
  components: {},
  data() {
    return {
      contractId: '',
      formData: {
        checkList: [1],
        addressTel: '',
        bankAccount: '',
        contractNumber: '',
        contractId: '',
        creditCode: '',
        leaseWay: '',
        name: '',
        email: '',
        invoiceDetail: [],
      },
      letterForm: {
        currentDate: '',
        rate: '13%',
        incoiceType: '车辆租金',
        margin: '违章保证金',
        letterContent: '*经营租赁*车辆租金',
      },
      tableData: [
        { nper: '1'},
        { nper: '2'},
        { nper: '3'},
        { nper: '4'},
        { nper: '5'},
        { nper: '6'},
        { nper: '7'},

      ],
      // 经租
      jzLeaseList: [
        { nper: '首期租金' },
        { nper: '手续费' },
        { nper: '违章保证金' },
        { nper: '0' },
      ],
      // 直租
      zzLeaseList: [
        { nper: '首付款' },
        { nper: '手续费' },
        { nper: '保证金' },
      ],
      // 回租
      hzLeaseList: [
        { nper: '0' },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.tableData = _.concat(this.jzLeaseList, this.tableData);
    this.letterForm.currentDate = moment().format('YYYY-MM-DD')
    this.contractId = this.$route.query.contractId;
  },
  mounted() {
    this.queryNoticeLetterDetail();
  },
  methods: {
    // 详情
    queryNoticeLetterDetail() {
      const url = common.queryInvoiceByContractIdUrl;
      const params = {
        contractId: this.contractId,
      };
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          
        } else {

        }
      }).catch((err) => {
        
      })
    },

    // 返回
    handleBack() {
      this.$router.push({
        path: '/invoiceNoticeList'
      });
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
.invoiceNoticeLetter {
  // display: flex;
  // justify-content: center;
  min-width: 1100px;

  .noticeLetterBox {
    width: 1080px;
    // border: 1px solid #eee;
    // height: 800px;
    // display: flex;
    // justify-content: center;
    overflow-x: auto;

    .topTitle {
      display: flex;
      height: 80px;
      justify-content: center;
      align-items: center;

      .letterType {
        width: 20%;
        display: flex;
        justify-content: center;

        span {
          border: 1px dashed #ccc;
          padding: 15px 20px;
        }
      }

      .letterCust {
        width: 60%;
        display: flex;
        align-content: center;
        justify-content: center;
        flex-direction: column;

        span {
          text-align: center;
          font-weight: bold;
          font-size: 24px;
          padding: 5px 0;
        }
      }

      .lettetMode {
        width: 20%;
        display: flex;
        justify-content: center;

        span {
          border: 1px solid #ccc;
          padding: 15px 30px;
        }
      }
    }

    .makeBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;

      .makeDepart {
        padding-left: 30px;
      }

      .makeTime {
        padding-right: 30px;
      }
    }

    .tableInfoBox {
      border: 1px solid #eee;
      border-bottom: none;
      box-sizing: border-box;
      .speciesBox {
        display: flex;
        height: 60px;
        // width: 360px;
        // justify-content: center;
        align-items: center;
        border-collapse: collapse;
        border-bottom: 1px solid #eee;

        .speciesItem1,
        .speciesItem5,
        .speciesItem6 {
          height: 100%;
          width: 100px;
          text-align: center;
          line-height: 60px;
          border-right: 1px solid #eee;
          box-sizing: border-box;
        }

        .speciesItem6 {
          flex: 1;
          border-right: none;
        }

        .speciesItem2,
        .speciesItem3 {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          border-right: 1px solid #eee;
          box-sizing: border-box;
          font-size: 12px;

          span {
            width: 100%;
            height: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            &:nth-child(1) {
              border-bottom: 1px solid #eee;
              box-sizing: border-box;
            }
          }
        }
        .speciesItem2 {
          width: 200px;
        }
        .speciesItem3 {
          width: 160px;
        }

        .speciesItem4 {
          width: 90px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-right: 1px solid #eee;
          box-sizing: border-box;
        }
      }

      .contentBox,
      .contentBox2 {
        height: 40px;
        display: flex;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;

        .contentItem1,
        .contentItem2,
        .contentItem3,
        .contentItem4 {
          width: 300px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: 1px solid #eee;
          box-sizing: border-box;
        }

        .contentItem2 {
          width: 340px;
        }

        .contentItem3 {
          width: 100px;
        }

        .contentItem4 {
          flex: 1;
          border-right: none;
          font-weight: bold;
        }
      }

      .contentBox:nth-last-child(1) {
        border-bottom: none;
      }

      .contentBox2 {
        height: 60px;

        .contentItem5 {
          width: 300px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          border-right: 1px solid #eee;
          box-sizing: border-box;
        }
      }
    }

    .footerBox {
      padding-top: 15px;
      display: flex;
      justify-content: space-between;
      font-weight: bold;

      .headerBox {
        padding-right: 80px;
      }
    }

    .footerBtn {
      padding: 30px 0;
      text-align: center;
    }
  }
}
</style>
