<template>
  <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab" @tab-click="tabClick">
    <el-tab-pane label="合同查询" name="contractSearch">
      <contractSearch @handleOperation="handleOperation"></contractSearch>
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
import contractSearch from '@/views/contract/contractSearch';
import viewTheRepaymentPlan from '@/views/contract/viewTheRepaymentPlan';
import viewApprovalProcess from '@/views/contract/viewApprovalProcess';
import common from '@/common/common.js';

export default {
  components: {
    contractSearch,
    viewTheRepaymentPlan,
    viewApprovalProcess,
  },
  data() {
    return {
      /*     rolePermission:{
        'approvalRecord':false
      },
        rolePermissionArray:[172],*/
      editableTabsValue: 'contractSearch',
      isComponentAlive: true,
      dataParams: {},
      dataParamsForApproval: {},
      dataParamsForReturn: {},
      componentName: '',
      editableTabs: [],
    };
  },
  /*    mounted(){
    let that = this;
    that.rolePermissionArray.forEach((item,index,array)=>{
    common.checkRolePermission(item,this.$store.state.asideInfoIds,Object.keys(that.rolePermission)[index],that.rolePermission);

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
    // viewApprovalProcess
    // viewTheRepaymentPlan
    tabClick(data) {
      if (data.name === 'viewApprovalProcess') {
        this.handleOperation(this.dataParamsForApproval);
      }
      if (data.name === 'viewTheRepaymentPlan') {
        this.handleOperation(this.dataParamsForReturn);
      }
    },
    reloadComponent() {
      this.isComponentAlive = false;
      this.$nextTick(() => (this.isComponentAlive = true));
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      this.editableTabsValue = 'contractSearch';
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
    },

    handleOperation(data) {
      this.reloadComponent();
      this.dataParams = data;
      if (data.flag === 'viewApprovalProcess') {
        this.dataParamsForApproval = data;
      }
      if (data.flag === 'viewTheRepaymentPlan') {
        this.dataParamsForReturn = data;
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
          data.flag === 'viewApprovalProcess' ? '查看审批记录' : '查看还款计划';
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