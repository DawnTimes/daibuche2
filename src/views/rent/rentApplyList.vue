<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-11 10:36:55
 * @LastEditTime: 2020-09-14 14:31:34
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\rent\rentApplyList.vue
-->
<template>
  <div class="rentApplyList">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width="80px"
        size="small"
        ref="ruleForm"
      >
        <!-- <el-form-item label="任务编号:" prop="systemName">
          <el-input maxlength="30" v-model="formData.systemName" placeholder=""></el-input>
        </el-form-item> -->
        <el-form-item label="车型代码:" prop="modelCode">
          <el-input maxlength="50" v-model="formData.modelCode" placeholder=""></el-input>
        </el-form-item>
        <!-- <el-form-item label="审批状态:" prop="interfaceName">
          <el-select v-model="formData.value" clearable placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in appravolStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
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

        <el-form-item>
          <el-button type="primary" @click="queryForm">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        border
        stripe
        :max-height="tableHeight"
        ref="table"
        style="width: 100%"
        :header-cell-style="{
        'text-align':'center',
        'font-weight':'bold',  
        'background':'#627CAF',    
        'color': '#fff',
      }"
      >
        <el-table-column
          width="50"
          align="center"
          label="序号"
          type="index"
          :index="indexMethod"
          fixed
        ></el-table-column>
        <!-- <el-table-column prop="modId" label="任务id" show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="modelCode" label="车型代码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="modelName" label="车型名称" show-overflow-tooltip width="150"></el-table-column>
        <el-table-column prop="brandName" label="品牌" show-overflow-tooltip width="150"></el-table-column>
        <el-table-column prop="seriesName" label="车系" show-overflow-tooltip></el-table-column>
        <el-table-column prop="isLimitLicence" label="是否限牌" show-overflow-tooltip>
          <template slot-scope="scope">
            <span :class="{ blueColor: scope.row.isLimitLicence == 'Y' , redStatus: scope.row.isLimitLicence == 'N' }">{{ scope.row.isLimitLicence | flagValue }}</span>
          </template>
        </el-table-column>        
        <el-table-column prop="" label="生效年月" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="licenceName" label="牌照商" show-overflow-tooltip width="180"></el-table-column>
        <el-table-column prop="cityName" label="城市" show-overflow-tooltip></el-table-column>
        <el-table-column prop="num" label="数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="approvalStatus" label="审批状态" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <span
            :class="{greenStatus: scope.row.approvalStatus == '4', redStatus: scope.row.approvalStatus == '5', blueColor: scope.row.approvalStatus == '2' ,
            skyblueColor: scope.row.approvalStatus == '3',
            yellowColor: scope.row.approvalStatus == '1'}"
            >{{ scope.row.approvalStatus | approvalStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="newMonthlyRent" label="新月租金" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.newMonthlyRent }} 元</span>
          </template>
        </el-table-column>
        <el-table-column prop="newLicenceFee" label="新月牌照费" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.newLicenceFee && scope.row.newLicenceFee != '0' ? scope.row.newLicenceFee + '元' : scope.row.newLicenceFee }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="newtotalMonthlyRent" label="新月租金合计" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.newtotalMonthlyRent }} 元</span>
          </template>
        </el-table-column>
        <el-table-column prop="monthlyRent" label="原月租金" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.monthlyRent }} 元</span>
          </template>
        </el-table-column>
        <el-table-column prop="rentLicenceFee" label="原月牌照费" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.rentLicenceFee && scope.row.rentLicenceFee != '0' ? scope.row.rentLicenceFee + '元' : scope.row.rentLicenceFee }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalMonthlyRent" label="原月租金合计" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.monthlyRent * 1 + scope.row.rentLicenceFee * 1 }} 元</span>
          </template>
        </el-table-column>
        <el-table-column prop="modifier" label="修改人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="modifiedTime" label="修改时间" show-overflow-tooltip width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.modifiedTime | timeFormatTemp }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column
          label="操作"
          width="250"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)" v-if="rightControl.edit">编辑</el-button>
            <el-button size="mini" @click="handleDetail(scope.row)" v-if="rightControl.detail">详情</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)" v-if="rightControl.delete">删除</el-button>
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
        :page-sizes="[10, 20, 50, 100, 200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    
    <confirmBox
      v-if="showDeleteBox"
      :msgConfirBox="deleteInfoText"
      v-on:submitForm="deleteSubmit"
      v-on:cancelbox="cancelBack"
    ></confirmBox>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import confirmBox from '@/components/confirmBox';  // 删除弹框
import { queryDict } from '@/api/index.js';
import eventBus from '@/common/eventBus.js';

export default {
  name: '',
  props: {

  },
  components: {
    confirmBox,
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      formData: {
        cityCode: '',
        isLimitLicence: '',
        licenceCode: '',
        modelCode: '',
        pageSize: 10,
        pageNum: 1,
      },

      tableData: [],
      tableHeight: 100,
      appravolStatus: [],

      // 删除提示文本
      deleteInfoText: {
        icon: 'icon-jinggao',
        confirst: '确认删除该租金修改任务？',
        consecond: '警告：删除后不可恢复！'
      },
      // 删除框显示
      showDeleteBox: false,
      // 删除的系统ID
      deleteId: null,

      // 按钮权限
      rightArray: [9531, 9532, 9533],
      rightControl: {
        edit: false,
        detail: false,
        delete: false,
      },

      // 数据字典集
      dictStatusTemp: [],
      dictApprovalTemp: [],
    };
  },
  computed: {

  },
  watch: {

  },
  created() {
    // this.getDictStatus('status', 'UNIFY_SYSTEM_INTERFACE');
    // this.getDictStatus('approval_Status', 'UNIFY_SYSTEM_INTERFACE');
    
    this.getRentApplyListData();

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
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 120;
      
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 120;
      }
    })
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
    //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
  },

  // 添加组件内的导航钩子，在跳转路由前，将监听窗口大小变化的函数清空
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // this.tableHeight = 500
    window.onresize = function() {
      // console.log('离开了')
    }
    next()
  },
  
  mounted() {

  },
  methods: {
    // 查询
    queryForm() {
      // 重置当前页
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.getRentApplyListData();
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getRentApplyListData();
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 获取分页数据
    getRentApplyListData() {
      const params = {
        cityCode: this.formData.cityCode,
        licenceCode: this.formData.licenceCode,
        modelCode: this.formData.modelCode,
        isLimitLicence: this.formData.isLimitLicence,
        state: '2',
        turnPageBeginPos: this.formData.pageNum,
        turnPageShowNum: this.formData.pageSize,
      };
      const url = common.queryRentHisUrl;
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.tableData = data.rentModList;
          this.total = data.turnPageTotalNum * 1;
        }
      });
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
          if (columnName === 'status') {
            this.dictStatusTemp = arrData;
          }
          if (columnName === 'approval_Status') {
            this.dictApprovalTemp = arrData;
          }
        }
        
      })
    },

    // 格式化状态
    formatStatus(type, dictTemp = []) {      
      let columnValueDesc = '';
      dictTemp.forEach((v) => {
        if ( type === v.columnValueCode) {
          return columnValueDesc = v.columnValueDesc
        }
      })
      return columnValueDesc;
          
    },

    // 分页
    handleSizeChange(val) {
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.pageSize = val;
      this.formData.pageSize = val;
      this.getRentApplyListData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.formData.pageNum = (val - 1) * this.pageSize + 1;
      this.getRentApplyListData();
    },

    // 修改
    handleEdit(row) {
      this.$router.push({
        path: '/editRent',
        query: {
          row: JSON.stringify(row)
        },
      })
    },

    // 详情
    handleDetail(row) {
      // eventBus.$emit('sendFatherPath', this.$route.path);
      sessionStorage.setItem('rentDeatilPath', this.$route.path);
      this.$router.push({
        path: '/baseInformationDetail',
        query: {
          id: row.modId,
        },
      })
    },
    
    // 删除
    handleDelete(row) {
      this.showDeleteBox = true;
      this.deleteId = row.id;
    },

    // 删除提交
    deleteSubmit() {
      // const url = common.systemDeleteUrl;
      // const data = {
      //   id: this.deleteId
      // };
      // axios.post(url, data).then(res => {
      //   if (res.code === '0') {
      //     this.$notify.success({
      //       title: '温馨提示！',
      //       message: '删除成功！'
      //     });
      //     this.showDeleteBox = false;
      //     this.getSystemListData();
      //   } else {
      //     this.$notify.error({
      //       title: '温馨提示！',
      //       message: '删除失败！'
      //     });
      //   }
      // });
    },

    // 取消删除
    cancelBack() {
      this.showDeleteBox = false;
    },

  },
  filters: {
    function() {

    },
  },
};
</script>

<style scoped lang="scss">
  .rentApplyList {
    
  }
</style>
