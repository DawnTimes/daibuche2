<template>
  <div class="main">
    <p class="title">待办任务</p>
    <dl class="waitList">
      <!-- <a href="">
             <dt>租金待审批</dt>
            <dd>您有<span>5</span>条租金单待审批</dd>
      </a>-->
      <a @click="$router.push('/contractApproveMain')" v-if="haveTodo">
        <dt>合同待审批</dt>
        <dd>
          您有
          <span>{{num}}</span> 条合同待审批
        </dd>
      </a>
      <a @click="$router.push('/rentApprovalList')" v-if="rentShow">
        <dt>租金修改待审批</dt>
        <dd>
          您有
          <span>{{ rentNumbers }}</span> 条租金修改待审批
        </dd>
      </a>
      <a @click="$router.push('/supportGoldApprovalList')" v-if="goldShow">
        <dt>支援金待审批</dt>
        <dd>
          您有
          <span>{{ goldNumbers }}</span> 条支援金申请待审批
        </dd>
      </a>
      <a @click="$router.push('/invoiceNoticeList')" v-if="invoiceShow">
        <dt>开票通知</dt>
        <dd>
          您有
          <span>{{ invoiceNumbers }}</span> 条开票通知
        </dd>
      </a>
      <a @click="$router.push('/invoiCecontractChange')" v-if="contractChangeShow">
        <dt>开票合同变更</dt>
        <dd>
          您有
          <span>{{ contractChangeNumbers }}</span> 条开票合同变更
        </dd>
      </a>

      <p v-if="!haveTodo && !rentShow && !goldShow && !invoiceShow && !contractChangeShow">无待办事项</p>

    </dl>
  </div>
</template>
<script>
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import { mapState, mapMutations } from 'vuex';
import _ from 'lodash';

export default {
  data() {
    return {
      num: 0,
      rentNumbers: 0, // 租金审批数量
      goldNumbers: 0, // 支援金审批数量
      invoiceNumbers: 0, // 开票通知数量
      contractChangeNumbers: 0, // 合同变更数量
      haveTodo: false,
      rentShow: false,
      goldShow: false,
      invoiceShow: false,
      contractChangeShow: false,
      params: {
        turnPageBeginPos: '0',
        turnPageShowNum: '10',
        contractFlowStatus: [],
      },
    };
  },

  computed: {
    ...mapState(['roles', 'userId', 'asideInfoIds']),
  },
  created() {
    // var that = this;

    // let url = '';
    // if (this.userId === 'admin') {
    //   url = common.allTreeUrl;
    // } else {
    //   url = common.userMenuUrl;
    // }
    // axios.get(url, { roles: this.roles }).then((res) => {
    //   // console.log(res.ids);
    //   res.ids.forEach(function (val, index) {
    //     // 判断是否有合同审批的菜单权限
    //     if (val == 161) {
    //       that.haveTodo = true;
    //       that.initData(res.ids);
    //     }
    //     // 判断是否有租金修改审批的菜单权限
    //     if (val == 954) {
    //       that.rentShow = true;
    //       that.rentWaitingTotal(res.ids);
    //     }
    //     // 判断是否有支援金审批的菜单权限
    //     if (val == 963) {
    //       that.goldShow = true;
    //       that.supportGoldWaitingTotal(res.ids);
    //     }
    //     // 判断是否有开票明细的菜单权限
    //     if (val == 991) {
    //       that.invoiceShow = true;
    //       that.InvoiceWaitingTotal();
    //     }
    //     // 判断是否有开票合同变更的菜单权限
    //     if (val == 993) {
    //       that.contractChangeShow = true;
    //       // that.InvoiceWaitingTotal();
    //     }
    //   });
    // });

  },

  mounted() {
    // console.log(this.asideInfoIds);
    setTimeout(() => {
      if (!_.isEmpty(this.asideInfoIds)) {
      this.asideInfoIds.forEach((val, index) => {
        // 判断是否有合同审批的菜单权限
        if (val == 161) {
          this.haveTodo = true;
          this.initData(this.asideInfoIds);
        }
        // 判断是否有租金修改审批的菜单权限
        if (val == 954) {
          this.rentShow = true;
          this.rentWaitingTotal(this.asideInfoIds);
        }
        // 判断是否有支援金审批的菜单权限
        if (val == 963) {
          this.goldShow = true;
          this.supportGoldWaitingTotal(this.asideInfoIds);
        }
        // 判断是否有开票明细的菜单权限
        if (val == 991) {
          this.invoiceShow = true;
          this.InvoiceWaitingTotal();
        }
        // 判断是否有开票合同变更的菜单权限
        if (val == 993) {
          this.contractChangeShow = true;
          // this.InvoiceWaitingTotal();
        }
      });
    }
    }, 1000);
  },

  methods: {
    ...mapMutations({
      setRentApprovalNum: 'setRentApprovalNum',
    }),

    initData(idsArr) {
      common.checkConstractFlow(162, idsArr, '1', this.params.contractFlowStatus);
      common.checkConstractFlow(163, idsArr, '2', this.params.contractFlowStatus);
      common.checkConstractFlow(164, idsArr, '3', this.params.contractFlowStatus);
      if (this.params.contractFlowStatus.length === 0) {
        this.params.contractFlowStatus.push('5');
      }
      let url = common.findCarContractApprUrl;
      axios.post(url, this.params).then((res) => {
        let data = res.data.turnPageTotalNum;
        this.num = data;
      });
    },

    // 租金修改待办统计
    rentWaitingTotal(idsArr) {
      let type = '';
      type = common.queryApprovalFlow(9541, idsArr, '1') || common.queryApprovalFlow(9542, idsArr, '2');
      // type = common.queryApprovalFlow(9542, idsArr, '2');
      const url = common.rentModificationSumUrl;
      const params = {
        type: type,
      }
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          this.rentNumbers = res.data.num * 1;
          // 保存，用于判断是否可以生成合同
          this.setRentApprovalNum(this.rentNumbers); 
        }
      })
    },

    // 支援金审批待办统计
    supportGoldWaitingTotal(idsArr) {
      let type = '';
      type = common.queryApprovalFlow(9631, idsArr, '1') || common.queryApprovalFlow(9632, idsArr, '2');
      // type = common.queryApprovalFlow(9632, idsArr, '2');
      const url = common.supportApprovalSumUrl;
      const params = {
        type: type,
      }
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          this.goldNumbers = res.data.number * 1;
        }
      })
    },

    // 开票明细待办统计
    InvoiceWaitingTotal(idsArr) {
      const url = common.InvoiceSumUrl;
      const params = {}
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          this.invoiceNumbers = res.data.num * 1;
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: #fff;
  padding: 30px 0;
}
.main .title {
  height: 40px;
  line-height: 40px;
  font-size: 17px;
  text-indent: 8px;
  margin-bottom: 20px;
  color: #666;
}
.waitList a {
  font-size: 16px;
  display: inline-block;
  height: 50px;
  color: #666;
  text-indent: 10px;
  width: 100%;
  cursor: pointer;
  margin-bottom: 20px;
  background: #f1f2f4;
}
.waitList a dt {
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #666;
}
.waitList a dd {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: #999;
}
</style>
