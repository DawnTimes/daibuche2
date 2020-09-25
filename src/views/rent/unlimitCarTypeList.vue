<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-11 10:36:55
 * @LastEditTime: 2020-09-25 14:55:29
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\rent\unlimitCarTypeList.vue
-->
<template>
  <div class="unlimitCarTypeList">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width="80px"
        size="small"
        ref="ruleForm"
      >
        <el-form-item label="车型名称:" prop="modelName">
          <el-input maxlength="30" v-model="formData.modelName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="品牌名称:" prop="brandName">
          <el-input maxlength="30" v-model="formData.brandName" placeholder=""></el-input>
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
        <el-table-column prop="modelCode" label="车型代码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="modelName" label="车型名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="brandName" label="品牌名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="seriesName" label="车系" show-overflow-tooltip></el-table-column>
        <el-table-column prop="num" label="数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="monthlyRent" label="月租金" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.monthlyRent}} 元</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="" label="月租金合计" show-overflow-tooltip></el-table-column> -->
        <!-- <el-table-column prop="" label="尾款" show-overflow-tooltip></el-table-column> -->
        <el-table-column
          label="操作"
          width="150"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)" v-show="rightControl.edit">租金修改</el-button>
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

  </div>
</template>

<script>
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';

export default {
  name: '',
  props: {

  },
  components: {
    
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      formData: {
        brandName: '',
        modelCode: '',
        modelName: '',
        seriesName: '',
        pageSize: 10,
        pageNum: 1,
      },

      tableData: [
        { id: 123456 },
      ],
      tableHeight: 100,
      
      rightArray: [9521],
      rightControl: {
        edit: false,
      },
    };
  },
  computed: {

  },
  watch: {

  },
  created() {
    this.getUnLimitCarTypeList();

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
    queryForm() {
      // 重置当前页
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.getUnLimitCarTypeList();
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getUnLimitCarTypeList();
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 获取非限牌车型列表
    getUnLimitCarTypeList() {
      const params = {
        brandName: this.formData.brandName,
        modelName: this.formData.modelName,
        seriesName: this.formData.seriesName,
        modelCode: this.formData.modelCode,
        turnPageBeginPos: this.formData.pageNum,
        turnPageShowNum: this.formData.pageSize,
      };
      const url = common.queryNotLimitCarListUrl;
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.tableData = data.notLimitList;
          this.total = data.turnPageTotalNum * 1;
        }
      })
    },

    // 分页
    handleSizeChange(val) {
      this.pageNum = 1;
      this.formData.pageNum = 1;
      this.pageSize = val;
      this.formData.pageSize = val;
      this.getUnLimitCarTypeList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.formData.pageNum = (val - 1) * this.pageSize + 1;
      this.getUnLimitCarTypeList();
    },

    // 修改
    handleUpdate(row) {
      this.$router.push({
        path: '/unlimitCarTypeRentUpdate',
        query: {
          row: JSON.stringify(row)
        },
      })
    },

  },
  filters: {
    function() {

    },
  },
};
</script>

<style scoped lang="scss">
  .unlimitCarTypeList {
    
  }
</style>
