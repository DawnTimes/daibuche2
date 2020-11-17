<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-21 17:31:53
 * @LastEditTime: 2020-11-16 14:24:44
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
          <span>{{ formData.leaseWay | leaseWayFc(formData.leaseWay) }}</span>
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
            <span>{{ formData.parentContractNumber }}</span>
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
            <el-checkbox-group v-model="formData.checkList" :max="1" disabled>
              <el-checkbox :label="1">一般纳税人</el-checkbox>
              <el-checkbox :label="2">小规模纳税人</el-checkbox>
              <el-checkbox :label="3">个人</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="contentBox2">
          <div class="contentItem5">
            <span> 客户名称(全称)</span>
          </div>
          <div class="contentItem4 leftAlign">
            <span>{{ formData.name }}</span>
          </div>
        </div>
        <div class="contentBox2">
          <div class="contentItem5">
            <span>(机构)纳税人识别号</span>
            <span>(个人)身份证号码</span>
          </div>
          <div class="contentItem4 leftAlign">
            <span>{{ formData.creditCode }}</span>
          </div>
        </div>
        <div class="contentBox2">
          <div class="contentItem5">
            <span>(机构)地址\电话号码</span>
            <span>(个人)手机号码</span>
          </div>
          <div class="contentItem4 leftAlign">
            <span>{{ formData.addressTel }}</span>
          </div>
        </div>
        <div class="contentBox2">
          <div class="contentItem5">
            <span>(机构)开户行及账号</span>
          </div>
          <div class="contentItem4 leftAlign">
            <span>{{ formData.bankAccount }}</span>
          </div>
        </div>
        <div class="contentBox2">
          <div class="contentItem5">
            <span> 电子邮箱地址</span>
          </div>
          <div class="contentItem4 leftAlign">
            <span>{{ formData.email }}</span>
          </div>
        </div>
      </div>
      <el-table
        :data="formData.invoiceDetail"
        border
        show-summary
        :summary-method="getSummaries"
        :header-cell-style="{
        'text-align':'center',
        'color': '#333',
      }"
        style="width: 100%"
      >
        <el-table-column prop="nper" label="租金期数" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="payDay" label="应收日期" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.payDay | timeFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="车辆台数" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dueAmount" label="月租金合计" width="120" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>{{ scope.row.dueAmount | moneyFormat }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="dueInterest" label="车辆租金" show-overflow-tooltip v-if="formData.leaseWay == 'OPERATING-LEASE'">
          <template slot-scope="scope">
          <span>{{ scope.row.dueInterest | moneyFormat }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="dueInterest" label="利息 / 手续费 开票金额" width="118" show-overflow-tooltip v-if="formData.leaseWay == 'BACK-LEASE'">
        <template slot-scope="scope">
          <span>{{ scope.row.dueInterest | moneyFormat }}</span>
        </template>
        </el-table-column>        
        <el-table-column prop="dueInterest" label="利息" show-overflow-tooltip v-if="formData.leaseWay == 'LEASE'">
          <template slot-scope="scope">
          <span>{{ scope.row.dueInterest | moneyFormat }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="duePrincipal" label="本金" show-overflow-tooltip v-if="formData.leaseWay == 'LEASE'">
          <template slot-scope="scope">
          <span>{{ scope.row.duePrincipal | moneyFormat }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="dueManagementFee" label="管理费" show-overflow-tooltip v-if="formData.leaseWay == 'OPERATING-LEASE' || formData.leaseWay == 'LEASE'">
          <template slot-scope="scope">
          <span>{{ scope.row.dueManagementFee | moneyFormat }}</span>
        </template>
        </el-table-column>
        <!-- <el-table-column prop="dueCommission" label="手续费" show-overflow-tooltip v-if="formData.leaseWay == 'OPERATING-LEASE' || formData.leaseWay == 'LEASE'"></el-table-column> -->
        <el-table-column prop="invoiceDate" label="发票开具日期" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.invoiceDate | timeFormatTemp }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="invoiceNumber" label="发票号码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="duePrincipal" label="本金 / 保证金  开票金额" width="118" show-overflow-tooltip v-if="formData.leaseWay == 'BACK-LEASE'">
          <template slot-scope="scope">
            <span>{{ scope.row.duePrincipal | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="invoiceDate" label="收据开具日期" show-overflow-tooltip v-if="formData.leaseWay == 'BACK-LEASE'">
          <template slot-scope="scope">
            <span>{{ scope.row.invoiceDate | timeFormatTemp }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="invoiceNumber" label="收据号码" show-overflow-tooltip v-if="formData.leaseWay == 'BACK-LEASE'"></el-table-column>
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
        <el-button type="primary" size="medium" v-show="rightControl.exportBtn" @click="exportButton">导出通知单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import moment from 'moment';
import { mapState, Store } from 'vuex';

import { moneyFormat } from '@/common/moneyFormat.js';

export default {
  name: 'invoiceNoticeLetter',
  props: {},
  components: {},
  data() {
    return {
      contractId: '',
      formData: {
        checkList: [],
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
      tableData: [],
      // 经租
      jzLeaseList: [
        { nper: '首期租金' },
        { nper: '手续费' },
        { nper: '违章保证金' },
        // { nper: '0' },
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

      // 按钮权限
      rightArray: [9916],
      rightControl: {
        exportBtn: false,
      },

    };
  },
  computed: {
    ...mapState({
      letterContractId: (store) => store.letterContractId,
    })
  },
  watch: {
    'formData.leaseWay'(val) {
      if (val == 'LEASE') {
        Object.assign(this.letterForm, {
          rate: '13%',
          incoiceType: '利息/本金/管理费',
          margin: '保证金',
          letterContent: '*融资租赁*有形动产融资租赁服务',
        })
        // this.formData.invoiceDetail = _.concat(this.zzLeaseList, this.formData.invoiceDetail);
      }
      if (val == 'BACK-LEASE') {
        Object.assign(this.letterForm, {
          rate: '6%',
          incoiceType: '利息/手续费',
          margin: '本金/保证金',
          letterContent: '*金融服务*有形动产融资性售后回租',
        })
        // this.formData.invoiceDetail = _.concat(this.hzLeaseList, this.formData.invoiceDetail);
      }
      if (val == 'OPERATING-LEASE') {
        Object.assign(this.letterForm, {
          rate: '13%',
          incoiceType: '车辆租金',
          margin: '违章保证金',
          letterContent: '*经营租赁*车辆租金',
        })
        // this.formData.invoiceDetail = _.concat(this.jzLeaseList, this.formData.invoiceDetail);
      }
    } 
  },
  created() {

    // 判断权限
    this.rightArray.forEach((item, index, array) => {
      common.checkRolePermission(
        item,
        this.$store.state.asideInfoIds,
        Object.keys(this.rightControl)[index],
        this.rightControl
      );
    });
    
    this.letterForm.currentDate = moment().format('YYYY-MM-DD');
    // console.log(this.contractId);
  },
  mounted() {
    this.contractId = this.$route.query.contractId;
    this.queryNoticeLetterDetail();
  },
  methods: {
    // 详情
    queryNoticeLetterDetail() {
      const url = common.queryInvoiceByContractIdUrl;
      const params = {
        contractId: this.contractId,  // bug：多次切换tabs标签时，会返回第一次打开页面时的数据
        // contractId: this.letterContractId,
      };
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          Object.assign(this.formData, data);
          // this.formData.leaseWay = 'BACK-LEASE';
          // this.formData.leaseWay = 'LEASE';
          // if (!_.isEmpty(this.formData.invoiceDetail)) {
          //   this.formData.invoiceDetail.forEach((item) => {
          //     item.carRents = '';
          //     item.carRents = item.dueInterest * 1 + item.duePrincipal * 1;
          //   })
          // }
          
        } else {

        }
      }).catch((err) => {
        
      })
    },

    // 合计
    getSummaries(param) {
      const { columns, data } = param;
      // console.log(columns, data);
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        // 
        if (index === 1 || index === 2) {
          sums[index] = '--';
          return;
        }

        if (index == columns.length - 1 || index == columns.length - 2) {
          sums[index] = '--';
          return;
        }
        // 统计金额
        // map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。map() 方法按照原始数组元素顺序依次处理元素。map() 不会改变原始数组。
        // Number() 函数把对象的值转换为数字。
        // every() 方法使用指定函数检测数组中的所有元素, 如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。如果所有元素都满足条件，则返回 true。
        const values = data.map((item) => Number(item[column.property]));
        // isNaN() 函数用于检查其参数是否是非数字值。如果参数值为 NaN 或字符串、对象、undefined等非数字值则返回 true, 否则返回 false。
        if (!values.every((value) => isNaN(value))) {
          // reduce() 方法接收一个函数作为累加器
          sums[index] = values.reduce((prev, curr) => {
            // console.log(prev, curr);
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr
              // return Math.round((prev + curr) * 100) / 100; // 保留2位小数
            } else {
              return prev;
            }
          }, 0);
          sums[index] = moneyFormat(sums[index]);
        } else {
          sums[index] = 'N/A';
        }
      });

      return sums;
    },

    // 导出
    exportButton() {
      window.location.href = `/api${common.exportSubcarInvoiceNoticeUrl}?contractId=${this.contractId ? this.contractId : ''}`;
      
    },

    // 返回
    handleBack() {
      this.$router.push({
        path: '/invoiceNoticeList'
      });
    },
  },
  filters: {
    leaseWayFc(val) {
      if (val == 'LEASE') return '直租业务';
      if (val == 'BACK-LEASE') return '回租业务';
      if (val == 'OPERATING-LEASE') return '经营租赁';
      return '租赁方式'
    },
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
      height: 40px;

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

        .leftAlign {
          justify-content: left;
          text-indent: 10px;
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
          text-indent: 10px;
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

