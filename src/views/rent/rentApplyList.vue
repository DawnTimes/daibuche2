<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-11 10:36:55
 * @LastEditTime: 2020-09-04 10:48:38
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
        <el-form-item label="任务编号:" prop="systemName">
          <el-input maxlength="30" v-model="formData.systemName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="车型名称:" prop="interfaceName">
          <el-input maxlength="50" v-model="formData.interfaceName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="审批状态:" prop="interfaceName">
          <el-select v-model="formData.value" clearable placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in appravolStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否限牌:" prop="interfaceName">
          <el-select v-model="formData.value" clearable placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in limitStatus"
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
        :cell-style="{'text-align': 'center', 'height': '40px'}"
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
        <el-table-column align="center" prop="id" label="任务编号" show-overflow-tooltip fixed="left"></el-table-column>
        <!-- <el-table-column align="center" prop="" label="车型代码" show-overflow-tooltip></el-table-column> -->
        <el-table-column align="center" prop="" label="车型名称" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="" label="品牌" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="" label="车系" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="" label="是否限牌" show-overflow-tooltip></el-table-column>        
        <el-table-column align="center" prop="" label="生效年月" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="" label="牌照商" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="" label="城市" show-overflow-tooltip width="70"></el-table-column>
        <el-table-column align="center" prop="" label="数量" show-overflow-tooltip width="70"></el-table-column>
        <el-table-column align="center" prop="status" label="审批状态" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column align="center" prop="" label="新月租金" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="" label="新月牌照费" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="新月租金合计" show-overflow-tooltip width="110"></el-table-column>
        <el-table-column align="center" prop="" label="原月租金" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="" label="原月牌照费" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column align="center" prop="" label="原月租金合计" show-overflow-tooltip width="110"></el-table-column>
        <!-- <el-table-column align="center" prop="" label="尾款" show-overflow-tooltip></el-table-column> -->
        <el-table-column
          align="center"
          label="操作"
          width="220"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)" v-show="rightControl.edit">编辑</el-button>
            <el-button size="mini" @click="handleDetail(scope.row)" v-show="rightControl.detail">详情</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)" v-show="rightControl.delete">删除</el-button>
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
        
      },

      tableData: [
        { id: 123456, status: '待会记审批' },
      ],
      tableHeight: 100,
      appravolStatus: [],
      limitStatus: [
        { value: 'Y', label: '是' },
        { value: 'N', label: '否' },
      ],

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
    };
  },
  computed: {

  },
  watch: {

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

    this.$nextTick(function () {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 120;
      
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 120
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
    queryForm() {},

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 分页
    handleSizeChange(val) {
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.pageSize = val;
      this.formData.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.formData.pageNum = (val - 1) * this.pageSize + 1;
    },

    // 修改
    handleEdit(row) {
      this.$router.push({
        path: '/editRent'
      })
    },

    // 详情
    handleDetail(row) {
      this.$router.push({
        path: '/baseInformationDetail'
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
