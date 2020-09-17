<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-25 14:25:10
 * @LastEditTime: 2020-09-16 13:45:49
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\overdueCollection\collectionRecord.vue
-->


<template>
  <div class="collectionRecord">
    <div class="addBox">
      <addRecord-module
        :formData="formData"
        :formReadonly="formReadonly"
        :loading="status.loading"
        @formDataSubmit="formDataSubmit"
      ></addRecord-module>
    </div>

    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="18">
        <div class="exportBtn">
          <el-button type="primary" size="medium">导出</el-button>
        </div>
        <div class="table">
          <el-table
            :data="tableData"
            border
            stripe
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
              type="selection"
              fixed
            ></el-table-column>
            <el-table-column
              width="50"
              align="center"
              label="序号"
              type="index"
              :index="indexMethod"
              fixed
            ></el-table-column>
            <el-table-column prop="name" label="经销店名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop label="电催人员" show-overflow-tooltip></el-table-column>
            <el-table-column prop label="电催日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="id" label="承诺还款日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop label="最新联系人" show-overflow-tooltip></el-table-column>
            <el-table-column prop label="逾期原因" show-overflow-tooltip></el-table-column>
            <el-table-column prop label="电催记录" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        <div class="page-layer">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[5, 10, 20, 30, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import addRecordModule from './components/addRecordModule';
import { mapState } from 'vuex';

export default {
  name: '',
  props: {},
  components: {
    addRecordModule,
  },
  data() {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 10,
      tableData: [
        { name: '广州广汽租赁' },
        { name: '南京广汽租赁' },
      ],
      formData: {
        userId: ''
      },
      formReadonly: {
        hide: [],
        readonly: [],
      },
      status: { loading: false },
    };
  },
  computed: {
    ...mapState({
      userId: (store) => store.userId,
    })
  },
  watch: {},
  created() {},
  mounted() {
    this.formData.userId = this.userId;
  },
  methods: {
    // 确定提交
    formDataSubmit(obj) {
      const data = obj.data;
      const url = '';
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 导出经销店台账
    exportButton() {},

    // 分页
    handleSizeChange(val) {
      this.pageNum = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
.collectionRecord {
  .addBox {
    padding-top: 30px;
    padding-bottom: 20px;

}

.exportBtn {
  border-top: 1px solid #eee;
  padding-top: 20px;
  padding-bottom: 10px;
}
}
</style>
