<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-10 15:57:36
 * @LastEditTime: 2020-09-25 18:06:25
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\writeOffQuery\carWriteOffQuery.vue
-->
<template>
  <div class="carWriteOffQuery">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width="80px"
        size="small"
        ref="ruleForm"
      >
        <el-form-item label="经销店:" prop="agentFullName">
          <el-input maxlength="30" v-model="formData.agentFullName" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="牌照商:" prop="licenceName">
          <el-input maxlength="50" v-model="formData.licenceName" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="合同编号:" prop="contractInfoId">
          <el-input maxlength="30" v-model="formData.contractInfoId" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="期数:" prop="nper">
          <el-input maxlength="30" v-model="formData.nper" clearable placeholder></el-input>
        </el-form-item>

        <el-form-item label="是否限牌:" prop="isLimitLicence">
          <el-select v-model="formData.isLimitLicence" clearable placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in this.$options.filters.flagValue([])"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="车型:" prop="carModel">
          <el-input maxlength="30" v-model="formData.carModel" clearable placeholder></el-input>
        </el-form-item>
        <el-form-item label="车架号:" prop="frameNumber">
          <el-input maxlength="30" v-model="formData.frameNumber" clearable placeholder></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryForm">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

        <el-form-item label>
          <el-button type="primary" @click="exportButton" v-show="rightControl.export">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="batchBtn">
      <el-button type="primary" size="small" @click="batchRecoil" v-show="rightControl.recoil">批量反冲</el-button>
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
        border
        stripe
        :max-height="tableHeight"
        ref="table"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        :header-cell-style="{
        'text-align':'center',
        'font-weight':'bold',  
        'background':'#627CAF',    
        'color': '#fff',
      }"
      >
        <el-table-column width="50" align="center" type="selection" fixed></el-table-column>
        <el-table-column
          width="50"
          align="center"
          label="序号"
          type="index"
          :index="indexMethod"
          fixed
        ></el-table-column>
        <el-table-column prop="agentFullName" label="经销店" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="licenceName" label="牌照商" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="contractInfoId" label="合同编号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="carModel" label="车型" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="frameNumber" label="车架号" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="plateNumber" label="车牌号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="engineNumber" label="发动机号" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="nper" label="期数" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="isLimitLicence" label="是否限牌" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span :class="{ greenStatus: scope.row.isLimitLicence == 'Y' , redStatus: scope.row.isLimitLicence == 'N' }">{{ scope.row.isLimitLicence | flagValue }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cityName" label="上牌地" show-overflow-tooltip width="100"></el-table-column>
        <!-- <el-table-column prop="" label="车辆数量" show-overflow-tooltip width="100"></el-table-column> -->
        <el-table-column prop="leaseWay" label="租赁方式" show-overflow-tooltip width="100">
          <template slot-scope="scope">
              <span>{{ scope.row.leaseWay | leaseWay }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="payDay" label="支付日" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.payDay | timeFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="serialNumber" label="银行单据号" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="verState" label="核销状态" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span
              :class="{greenStatus: scope.row.verState == '', redStatus: scope.row.verState == '', blueColor: scope.row.verState == ''}"
            >{{ scope.row.verState }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="verPersion" label="核销人" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="verDate" label="核销时间" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.verDate | timeFormat }}</span>
          </template>
        </el-table-column>
        
        <el-table-column prop="payStatus" label="支援金状态" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="backlash" label="反冲状态" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.backlash | recoilStatus }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="dueAmount" label="应收金额" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="duePrincipal" label="应收本金" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="dueInterest" label="应收利息" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="dueManagementFee" label="应收管理费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="dueCommission" label="应收手续费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="verAmount" label="已收金额" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="verPrincipal" label="已收本金" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="verInterest" label="已收利息" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="verManagementFee" label="已收管理费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="verCommission" label="已收手续费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="notVerAmount" label="未收金额" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="notVerPrincipal" label="未收本金" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="notVerInterest" label="未收利息" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="notVerManagementFee" label="未收管理费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="notCommission" label="未收手续费" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>

        <el-table-column label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleRecoil(scope.row)" v-show="rightControl.recoil">反冲</el-button>
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
        :page-sizes="[10, 20, 50, 100, 500]"
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

export default {
  name: '',
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
        agentFullName: '',
        licenceName: '',
        contractInfoId: '',
        isLimitLicence: '',
        nper: '',
        carModel: '',
        frameNumber: '',
        pageSize: 10,
        pageNum: 1,
      },
      appravolStatus: [
        {
          value: '1',
          label: '全部核销',
        },
        {
          value: '2',
          label: '未核销',
        },
        {
          value: '3',
          label: '部分核销',
        },
      ],

      tableData: [],
      tableLoading: false,
      tableHeight: 100,
      // 数据字典
      paidTemp: [],

      limitStatus: [
        { value: 'Y', label: '是' },
        { value: 'N', label: '否' },
      ],

      // 反冲
      recoilForm: {},
      status: {
        loading: false,
      },
      recoilFormVisible: false,

      multipleSelection: [], // 批量选择
      bacthCarId: [],

      // 按钮权限
      rightArray: [9731, 9732],
      rightControl: {
        export: false,
        recoil: false,
      },
    };
  },
  computed: {},
  watch: {},
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

    this.$nextTick(function () {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 120;

      // 监听窗口大小变化
      let self = this;
      window.onresize = function () {
        self.tableHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 120;
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
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.getCarWriteOffListData();
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getCarWriteOffListData();
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 获取分页数据
    getCarWriteOffListData() {
      this.tableLoading = true;
      const url = common.selectVerCarStatementUrl;
      const params = {
        nper            : this.formData.nper,
        contractInfoId  : this.formData.contractInfoId,
        isLimitLicence  : this.formData.isLimitLicence,
        agentFullName   : this.formData.agentFullName,
        licenceName     : this.formData.licenceName,
        frameNumber     : this.formData.frameNumber,
        carModel        : this.formData.carModel,
        turnPageShowNum : this.formData.pageSize,
        turnPageBeginPos: this.formData.pageNum,
      };
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.tableData = data.verCarList;
          this.total = data.turnPageTotalNum * 1;
          this.tableLoading = false;
        } else {
          this.tableLoading = false;
        }
      }).catch(() => {
        this.tableLoading = false;
      })
    },

    // 导出车辆核销清单
    exportButton() {},

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
      // this.recoilForm.serialNumber   = row.serialNumber || '';
      // this.recoilForm.agentFullName  = row.agentFullName || '';
      // this.recoilForm.licenceName    = row.licenceName || '';
      // this.recoilForm.contractInfoId = row.contractInfoId || '';
      // this.recoilForm.nper           = row.nper || '';
      // this.recoilForm.frameNumber    = row.frameNumber || '';
      // this.recoilForm.remark         = row.remark || '';
      // this.$refs.recoilModule.isShow(true);

      this.$confirm('是否确定反冲选中的车辆? 反冲后不可恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formDataSubmit(row.id);
      }).catch(() => {         
        });
    },
    // 反冲提交
    formDataSubmit(id) {
      // console.log(obj);
      // this.status.loading = true;
      const url = common.backlashDealUrl;
      const params = {
        backList: [
          { id : id }
        ],
      };
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          // this.status.loading = false;
          this.$notify.success({
            title: '温馨提示！',
            message: '反冲成功！',
          })
          // this.$refs.recoilModule.isShow(false);
        } else {
          // this.status.loading = false;
          this.$notify.error({
            title: '温馨提示！',
            message: res.em || '反冲失败！',
          })
        }
      }).catch((err) => {
        // this.status.loading = false;
        this.$notify.error({
          title: '温馨提示！',
          message: err ? err.em : '反冲失败！',
        })
      })
      
    },

    // 批量选择
    handleSelectionChange(val) {
      this.bacthCarId = [];
      this.multipleSelection = val;
      if (!_.isEmpty(this.multipleSelection)) {
        this.multipleSelection.forEach((item) => {
          this.bacthCarId.push(item.id)
        })
      }
    },
    // 批量反冲
    batchRecoil() {
      if (_.isEmpty(this.multipleSelection)) {
        this.$notify.warning({
          title: '温馨提示',
          message: '请选择需要反冲的车辆',
        });
        return false
      }

      // 批量反冲时，每次操作只能选择同一合同编号的车辆进行
      let arrTem = [];
      this.multipleSelection.forEach((v) => {
        arrTem.push(v.contractInfoId)
      })
      // console.log(arrTem);
      const status = arrTem.some((val) => {
        return val !== arrTem[0]
      })
      // console.log(status);
      if (status) {
        this.$notify.warning({
          title: '温馨提示',
          message: '只能同时批量反冲合同编号相同的车辆！',
        });
        return false
      }
      
      this.$confirm('是否确定反冲选中的车辆? 反冲后不可恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const url = common.backlashDealUrl;
          let idArr = [];
          // 合并数组
          idArr = _.concat(this.bacthCarId, tidArr);
          const params = {
            backList: idArr,
          };
          axios.post(url, params).then((res) => {
            if (res.ec === '0') {
              this.$notify.success({
                title: '温馨提示！',
                message: '反冲成功！',
              })
            } else {
              this.$notify.error({
                title: '温馨提示！',
                message: res.em || '反冲失败！',
              })
            }
          }).catch((err) => {
            this.$notify.error({
              title: '温馨提示！',
              message: err ? err.em : '反冲失败！',
            })
          });
        }).catch(() => {         
        });
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
.carWriteOffQuery {
  .batchBtn {
    padding: 0 0 5px 10px;
  }
}
</style>

