<template>
  <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab" @tab-click="tabClick">
    <el-tab-pane label="合同待审核" name="contractToBeReviewed">
      <contractToBeReviewed @handleOperation="handleOperation"></contractToBeReviewed>
    </el-tab-pane>
    <el-tab-pane
      closable
      v-for="(item) in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      <component
        :is="componentName"
        :dataParams="dataParams"
        v-if="isComponentAlive"
        @closeTab="removeTab"
      ></component>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import contractToBeReviewed from '@/views/contract/contractToBeReviewed';
import viewTheRepaymentPlan from '@/views/contract/viewTheRepaymentPlan';
import approvalContract from '@/views/contract/approvalContract';
import common from '@/common/common.js';

export default {
  components: {
    contractToBeReviewed,
    viewTheRepaymentPlan,
    approvalContract,
  },
  data() {
    return {
      /* rolePermission:{
        'passApproval':false,
        'repayPlan':false
      },
      rolePermissionArray:[162,165],*/
      isComponentAlive: true,
      dataParams: {},
      dataParamsForApproval: {},
      dataParamsForView: {},
      componentName: '',
      editableTabsValue: 'contractToBeReviewed',
      editableTabs: [],
    };
  },
  /* mounted(){
    let that = this;
    that.rolePermissionArray.forEach((item,index,array)=>{
    common.checkRolePermission(item,this.$store.state.asideInfoIds,that.rolePermission);

     })
  },*/
  mounted() {
    setTimeout(function () {
      let height = document.getElementsByClassName('el-table__fixed')[0].style
        .height;
      height = height.replace('px', '');
      height = parseInt(height); // 234
      height = height - 14 + 'px';
      document.getElementsByClassName(
        'el-table__fixed'
      )[0].style.height = height;
    }, 1000);
  },
  methods: {
    tabClick(data) {
      console.log(this.dataParamsForApproval);
      console.log(this.dataParamsForView);
      if (data.name === 'approvalContract') {
        this.handleOperation(this.dataParamsForApproval);
      }
      if (data.name === 'viewTheRepaymentPlan') {
        this.handleOperation(this.dataParamsForView);
      }
    },
    reloadComponent() {
      this.isComponentAlive = false;
      this.$nextTick(() => (this.isComponentAlive = true));
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      this.editableTabsValue = 'contractToBeReviewed';
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
    },

    handleOperation(data) {
      this.reloadComponent();
      this.dataParams = data;
      console.log(data);
      if (data.flag === 'approvalContract') {
        this.dataParamsForApproval = data;
      }
      if (data.flag === 'viewTheRepaymentPlan') {
        this.dataParamsForView = data;
      }
      // 先判断该tab是否存在存在直接替换就好
      let flag = true;
      this.editableTabs.forEach((obj, index) => {
        if (obj.name === data.flag) {
          flag = false;
        }
      });
      if (flag) {
        let newTabName =
          data.flag === 'approvalContract' ? '合同审批' : '查看还款计划';
        this.editableTabs.push({
          title: newTabName,
          name: data.flag,
        });
      }
      this.editableTabsValue = data.flag;
      this.componentName = data.flag;
    },
  },
};
</script>

<style scoped>
</style>