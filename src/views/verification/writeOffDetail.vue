<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-11 10:36:55
 * @LastEditTime: 2020-11-30 13:56:30
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\verification\writeOffDetail.vue
-->
<template>
  <div class="writeOffDetail">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        size="mini"
        ref="ruleForm"
      >
        <el-form-item label="承租人/牌照商" prop="name">
          <el-input
            maxlength="30"
            v-model="formData.name"
            clearable
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item label="合同编号" prop="contractNumber">
          <el-input
            maxlength="30"
            v-model="formData.contractNumber"
            clearable
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="期数" prop="nper">
          <el-input
            maxlength="50"
            v-model="formData.nper"
            clearable
            placeholder=""
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryForm">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm('ruleForm')"
            >重置</el-button
          >
        </el-form-item>
        <el-form-item label="">
          <el-button @click="backButton" plain>返回</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- <div class="batchBtn">
      <el-button
        type="primary"
        size="small"
        @click="batchRecoil"
        v-show="rightControl.recoil"
        >批量反冲</el-button
      >
    </div> -->

    <div class="table">
      <el-table
        :data="tableData"
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
        border
        stripe
        :max-height="tableHeight"
        show-summary
        :summary-method="getSummaries"
        @selection-change="handleSelectionChange"
        @select="handleSelect"
        ref="table"
        style="width: 100%"
        :header-cell-style="{
          'text-align': 'center',
          'font-weight': 'bold',
          background: '#627CAF',
          color: '#fff',
        }"
      >
        <!-- <el-table-column
          width="50"
          align="center"
          type="selection"
          fixed
        ></el-table-column> -->
        <el-table-column
          width="50"
          align="center"
          label="序号"
          type="index"
          :index="indexMethod"
          fixed
        ></el-table-column>
        <el-table-column
          prop="frameNumber"
          label="车架号"
          show-overflow-tooltip
          width="180"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="承租人/牌照商"
          show-overflow-tooltip
          width="180"
        ></el-table-column>
        <!-- <el-table-column
          prop="licenceName"
          label="牌照商"
          show-overflow-tooltip
          width="100"
        ></el-table-column> -->
        <el-table-column
          prop="contractNumber"
          label="合同编号"
          show-overflow-tooltip
          width="180"
        ></el-table-column>
        <el-table-column
          prop="nper"
          label="期数"
          show-overflow-tooltip
          width=""
        ></el-table-column>

        <el-table-column
          prop="carModel"
          label="车型名称"
          show-overflow-tooltip
          width="160"
        ></el-table-column>
        <el-table-column
          prop="plateNumber"
          label="车牌号"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          prop="engineNumber"
          label="发动机号"
          show-overflow-tooltip
          width="100"
        ></el-table-column>

        <el-table-column
          prop="serialNumber"
          label="银行单据号"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column
          prop="backlash"
          label="反冲状态"
          show-overflow-tooltip
          width="100"
        >
          <template slot-scope="scope">
            <span
              :class="{
                greenStatus: scope.row.backlash == 'Y',
                blueColor: scope.row.backlash == 'N',
              }"
              >{{ scope.row.backlash | recoilStatus }}</span
            >
          </template>
        </el-table-column>

        <el-table-column
          prop="isLimitLicence"
          label="是否限牌"
          show-overflow-tooltip
          width="100"
        >
          <template slot-scope="scope">
            <span
              :class="{
                greenStatus: scope.row.isLimitLicence == 'Y',
                redStatus: scope.row.isLimitLicence == 'N',
              }"
              >{{ scope.row.isLimitLicence | flagValue }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="cityName"
          label="上牌地"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <!-- <el-table-column prop="" label="车辆数量" show-overflow-tooltip width="100"></el-table-column> -->
        <el-table-column
          prop="leaseWay"
          label="租赁方式"
          show-overflow-tooltip
          width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.leaseWay | leaseWay }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="payDay"
          label="支付日"
          show-overflow-tooltip
          width="120"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.payDay | timeFormat }}</span>
          </template>
        </el-table-column>

        
        <el-table-column
          prop="verState"
          label="核销状态"
          show-overflow-tooltip
          width="100"
        >
          <template slot-scope="scope">
            <span
              :class="{
                greenStatus: scope.row.verState == 'FULL',
                blueColor: scope.row.verState == 'PART',
                redStatus: scope.row.verState == 'NOT',
              }"
              >{{ scope.row.verState | verState }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="verPersion"
          label="核销人"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          prop="verDate"
          label="核销时间"
          show-overflow-tooltip
          width="160"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.verDate | timeFormatTemp }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="payStatus"
          label="支援金状态"
          show-overflow-tooltip
          width="120"
        >
          <template slot-scope="scope">
            <span
              :class="{
                greenStatus: scope.row.payStatus == 'HAVEGRANT',
                redStatus: scope.row.payStatus == 'NOTAPPLY',
                blueColor: scope.row.payStatus == 'HAVEAPPLY',
              }"
              >{{ scope.row.payStatus | payStatus }}</span
            >
          </template>
        </el-table-column>

        <el-table-column
          prop="dueAmount"
          label="应收金额"
          show-overflow-tooltip
          width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.dueAmount | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="duePrincipal"
          label="应收本金"
          show-overflow-tooltip
          width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.duePrincipal | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="dueInterest"
          label="应收利息"
          show-overflow-tooltip
          width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.dueInterest | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="dueManagementFee"
          label="应收管理费"
          show-overflow-tooltip
          width="120"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.dueManagementFee | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="dueCommission"
          label="应收手续费"
          show-overflow-tooltip
          width="120"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.dueCommission | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="verAmount"
          label="已核金额"
          show-overflow-tooltip
          width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.verAmount | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="verPrincipal"
          label="已核本金"
          show-overflow-tooltip
          width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.verPrincipal | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="verInterest"
          label="已核利息"
          show-overflow-tooltip
          width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.verInterest | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="verManagementFee"
          label="已核管理费"
          show-overflow-tooltip
          width="120"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.verManagementFee | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="verCommission"
          label="已核手续费"
          show-overflow-tooltip
          width="120"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.verCommission | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="notVerAmount"
          label="未核金额"
          show-overflow-tooltip
          width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.notVerAmount | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="notVerPrincipal"
          label="未核本金"
          show-overflow-tooltip
          width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.notVerPrincipal | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="notVerInterest"
          label="未核利息"
          show-overflow-tooltip
          width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.notVerInterest | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="notVerManagementFee"
          label="未核管理费"
          show-overflow-tooltip
          width="120"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.notVerManagementFee | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="notCommission"
          label="未核手续费"
          show-overflow-tooltip
          width="120"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.notCommission | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="160"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column label="操作" align="center" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleRecoil(scope.row)"
              v-show="rightControl.recoil"
              :disabled="scope.row.backlash == 'Y'"
              >反冲</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="page-layer">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20, 50, 100, 200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <recoilModule
      ref="recoilModule"
      :recoilForm="recoilForm"
      :loading="status.loading"
      v-on:formDataSubmit="formDataSubmit"
    ></recoilModule>
  </div>
</template>

<script>
import { queryDict } from '@/api/index.js';
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';

import recoilModule from '@/components/recoilModule';
import { moneyFormat } from '@/common/moneyFormat.js';

export default {
  name: 'writeOffDetail',
  props: {},
  components: {
    recoilModule,
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      formData: {
        name: '',
        contractNumber: '',
        isLimitLicence: '',
        nper: '',
        carModel: '',
        frameNumber: '',
        serialNumber: '',
        pageSize: 10,
        pageNum: 1,
      },
      tableData: [],
      tableLoading: false,
      tableHeight: 100,
      // 数据字典
      paidTemp: [],

      // 反冲
      recoilForm: {},
      status: {
        loading: false,
      },
      recoilFormVisible: false,

      // 按钮权限
      rightArray: [9732],
      rightControl: {
        recoil: false,
      },
      multipleSelection: [], // 批量选择
    };
  },
  computed: {},
  watch: {},
  created() {
    this.formData.serialNumber = this.$route.query.serialNumber;

    // 判断权限
    this.rightArray.forEach((item, index, array) => {
      common.checkRolePermission(
        item,
        this.$store.state.asideInfoIds,
        Object.keys(this.rightControl)[index],
        this.rightControl
      );
    });

    this.$nextTick(function () {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 110;

      // 监听窗口大小变化
      let self = this;
      window.onresize = function () {
        self.tableHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 110;
      };
    });
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
    //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
  },

  // 添加组件内的导航钩子，在跳转路由前，将监听窗口大小变化的函数清空
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // this.tableHeight = 500
    window.onresize = function () {
      // console.log('离开了')
    };
    next();
  },

  mounted() {
    this.getCarWriteOffListData();
  },
  methods: {
    // 查询
    queryForm() {
      // 重置当前页
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.getCarWriteOffListData();
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getCarWriteOffListData();
    },

    // 返回
    backButton() {
      this.$router.push({
        path: '/bankWaterList',
      });
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 获取分页数据
    getCarWriteOffListData() {
      this.tableData = [];
      this.tableLoading = true;
      const url = common.selectVerCarStatementUrl;
      const params = {
        nper: this.formData.nper,
        contractNumber: this.formData.contractNumber,
        isLimitLicence: this.formData.isLimitLicence,
        name: this.formData.name,
        frameNumber: this.formData.frameNumber,
        serialNumber: this.formData.serialNumber,
        carModel: this.formData.carModel,
        turnPageShowNum: this.formData.pageSize,
        turnPageBeginPos: this.formData.pageNum,
      };
      axios
        .post(url, params)
        .then((res) => {
          if (res.ec === '0') {
            const data = res.data;
            this.tableData = data.verCarList;
            this.total = data.turnPageTotalNum * 1;
            this.tableLoading = false;
          } else {
            this.tableLoading = false;
          }
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },

    // 分页
    handleSizeChange(val) {
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.pageSize = val;
      this.formData.pageSize = val;
      this.getCarWriteOffListData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.formData.pageNum = (val - 1) * this.pageSize + 1;
      this.getCarWriteOffListData();
    },

    // 获取状态数据字典
    getDictStatus(columnName, tabName) {
      const data = {
        columnName: columnName,
        tabName: tabName,
      };
      queryDict(data).then((res) => {
        if (res.code === '0') {
          const arrData = res.data.dictList;
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

    // 反冲
    handleRecoil(row) {
      // this.recoilFormVisible = true;
      // this.$refs.recoilModule.isShow(true);

      this.$confirm('是否确定反冲选中的车辆? 反冲后不可恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const idArr = [{ id: row.id }];
          this.formDataSubmit(idArr);
        })
        .catch(() => {});
    },

    // 反冲提交
    formDataSubmit(idArr) {
      // console.log(obj);
      // this.status.loading = true;
      const url = common.backlashDealUrl;
      const params = {
        backList: idArr,
      };
      axios
        .post(url, params)
        .then((res) => {
          if (res.ec === '0') {
            // this.status.loading = false;
            this.$notify.success({
              title: '温馨提示！',
              message: '反冲成功！',
            });
            // this.$refs.recoilModule.isShow(false);
            this.getCarWriteOffListData();
          } else {
            // this.status.loading = false;
            this.$notify.error({
              title: '温馨提示！',
              message: res.em || res.error || res.message || '反冲失败！',
            });
          }
        })
        .catch((err) => {
          // this.status.loading = false;
          this.$notify.error({
            title: '温馨提示！',
            message: err.em || err.error || err.message || '反冲失败！',
          });
        });
    },

    // 选择单条数据， 反冲状态为已反冲的不能勾选
    handleSelect(val, row) {
      if (row.backlash == 'Y') {
        this.$notify.warning({
          title: '温馨提示！',
          message: '该车辆已经反冲，不能再次反冲！',
          duration: 2000,
        });
        this.$refs.table.toggleRowSelection(row, false);
      }
    },

    // 批量选择 全选， 反冲状态为已反冲的不能勾选
    handleSelectionChange(val) {
      // console.log(val);
      this.multipleSelection = val;
      if (val) {
        val.forEach((item, index) => {
          if (item.backlash == 'Y') {
            this.$refs.table.toggleRowSelection(item, false);
          } 
        });
      }
      
      // this.toggleSelection();
      // console.log(this.multipleSelection);
    },

    // 批量反冲
    batchRecoil() {
      
      // 批量反冲时，每次操作只能选择同一合同编号的车辆进行
      let arrTem = [];
      let bacthCarIdArr = [];
      this.multipleSelection.forEach((v, i) => {
        // 获取未反冲状态的车辆id
        if (v.backlash === 'N') {
          bacthCarIdArr.push({
            id: v.id,
          });
          arrTem.push(v.contractNumber);
        } else {
          // 删除已反冲的项
          this.multipleSelection.splice(i, 1);
        }
      });

      if (_.isEmpty(this.multipleSelection)) {
        this.$notify.warning({
          title: '温馨提示',
          message: '请选择需要反冲的车辆',
        });
        return false;
      }
      
      // console.log(arrTem);
      // some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
      // some() 方法会依次执行数组的每个元素：
      // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
      // 如果没有满足条件的元素，则返回false。
      // 注意： some() 不会对空数组进行检测。
      // 注意： some() 不会改变原始数组。
      const status = arrTem.some((val) => {
        return val !== arrTem[0];
      });
      // console.log(status);
      if (status) {
        this.$notify.warning({
          title: '温馨提示',
          message: '只能同时反冲合同编号相同的车辆！',
        });
        return false;
      }

      this.$confirm('是否确定反冲选中的车辆? 反冲后不可恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // const url = common.backlashDealUrl;
          // let idArr = [];
          // // 合并数组
          // // idArr = _.concat(bacthCarIdArr, idArr);
          // // // 去重
          // idArr = this.unique(bacthCarIdArr);
          // console.log(idArr);

          // 对json数组去重， 使用js hash去重；js中使用hash去重，需要建立在对象的基础之上，因为对象的存储采用的是hash表
          /*
          * hash去重：不是自己去写hash算法  利用对象属性的添加内部应用了hash算法
          * 思路：将元素 作为对象的属性进行添加 当对象内没有此属性时   将此元素作为属性添加  否则不添加
          * hash表：线性表+链表
          * 功能：无论查找还是添加都非常快
          */
          let hash = {};
          bacthCarIdArr = bacthCarIdArr.reduce((temp, item) => {
            hash[item.id] ? '' : hash[item.id] = true && temp.push(item)
            return temp
          }, []);

          // console.log(bacthCarIdArr);

          this.formDataSubmit(bacthCarIdArr);
          
        })
        .catch(() => {});
    },

    // 合计
    getSummaries(param) {
      // console.log(param);
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }

        // if (column.property == 'nper' || column.property == 'num') {
        //   sums[index] = moneyFormat(sums[index]);
        //   return
        // }
        
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          // 千分位格式化金额
          if (column.property == 'nper' || column.property == 'serialNumber') {
            // sums[index] = 'N/A';
            sums[index] = '';
          } else {
            sums[index] = moneyFormat(sums[index]);
          }
          
        } else {
          // sums[index] = 'N/A';
          sums[index] = '';
        }
      });

      return sums;
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
.writeOffDetail {
  .batchBtn {
    padding: 0 0 5px 10px;
  }
}
</style>
