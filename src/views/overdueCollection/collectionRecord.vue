<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-25 14:25:10
 * @LastEditTime: 2020-12-03 10:41:40
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

    <el-row :gutter="0">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="20">
        <div class="exportBtn">
          <el-button icon="el-icon-upload2" type="primary" size="small" @click="importButton" v-show="rightControl.import">导入催收记录</el-button>
          <el-button icon="el-icon-download" type="primary" size="small" plain @click="exportButton" :loading="exportLoading" v-show="rightControl.export">导出催收记录</el-button>
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
              label="序号"
              type="index"
              :index="indexMethod"
              fixed
            ></el-table-column>
            <el-table-column prop="name" label="经销店名称" show-overflow-tooltip min-width="100"></el-table-column>
            <el-table-column prop="electricExpeditor" label="电催人员" show-overflow-tooltip></el-table-column>
            <el-table-column prop="electricDate" label="电催日期" show-overflow-tooltip min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.electricDate | timeFormatTemp }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="promisedRepayDate" label="承诺还款日期" show-overflow-tooltip min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.promisedRepayDate | timeFormat }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="newLink" label="最新联系人" show-overflow-tooltip min-width="100"></el-table-column>
            <el-table-column prop="overdueReason" label="逾期原因" show-overflow-tooltip></el-table-column>
            <el-table-column prop="electricCatalysis" label="电催记录" show-overflow-tooltip></el-table-column>
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

    <!-- // 导入催收记录 -->
    <upload-dialog ref="uploadDialog" :uploadURLStr="recordUploadURL"></upload-dialog>
  </div>
</template>

<script>
import addRecordModule from './components/addRecordModule';
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import moment from 'moment';
import { mapState } from 'vuex';

import uploadDialog from '@/components/uploadDialog';  // 上传弹框

export default {
  name: '',
  props: {},
  components: {
    addRecordModule,
    uploadDialog,
  },
  data() {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 5,
      tableData: [],
      formData: {
        electricExpeditor: '',
        electricCatalysis: '',
        electricDate: '',
        newLink: '',
        overdueReason: '',
        promisedRepayDate: '',
        soldId: '',
      },
      formReadonly: {
        hide: [],
        readonly: ['electricExpeditor'],
      },
      status: { loading: false },

      // 导入URL
      recordUploadURL: '',
      pageForm: {
        pageNum: 1,
        pageSize: 5,
      },

      // 按钮权限
      rightArray: [9011, 9014],
      rightControl: {
        import: false,
        export: false,
      },

      exportLoading: false,
      soldId: '',
      agentName: '',
    };
  },
  computed: {
    ...mapState({
      userId: (store) => store.userId,
      successStatus: (store) => store.successStatus,
    }),
  },
  watch: {
    // 监听是否导入成功，成功则刷新催收记录
    successStatus(val) {
      // console.log(val);
      if (val) {
        this.getCollectionRecordListData();
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


    this.soldId = this.$route.query.soldId;
    this.agentName = this.$route.query.agentName;
    this.formData.soldId = this.$route.query.soldId;

    // this.$on('successStatus', (data) => {
    //   console.log(data);
    //   if (data.status) {
    //     this.getCollectionRecordListData();
    //   }
    // })
  },
  mounted() {
    this.formData.electricExpeditor = this.userId;
    this.getCollectionRecordListData();
  },
  methods: {
    // 获取分页数据
    getCollectionRecordListData() {
      this.tableData = [];
      const url = common.collectionQueryListUrl;
      const params = {
        soldId            : this.soldId,
        turnPageBeginPos: this.pageForm.pageNum,
        turnPageShowNum : this.pageForm.pageSize,
      };
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.tableData = data.recordList;
          this.total = data.turnPageTotalNum * 1;
        } 
      })
    },

    // 确定提交
    formDataSubmit(obj) {
      const data = obj.data;
      const url = common.createCollectionUrl;
      this.status.loading = true;
      axios.post(url, data).then((res) => {
        if (res.ec === '0') {
          this.status.loading = false;
          this.$notify.success({
            title: '温馨提示',
            message: '保存成功',
          });
          Object.assign(this.formData, {
            electricCatalysis: '',
            newLink: '',
            overdueReason: '',
            promisedRepayDate: '',
          })
          this.getCollectionRecordListData();
        } else {
          this.status.loading = false;
          this.$notify.error({
            title: '温馨提示',
            message: res.em || '保存失败',
          });
        }
      }).catch((err) => {
        this.status.loading = false;
        this.$notify.error({
          title: '温馨提示',
          message: err ? err.em : '保存失败'
        });
      })
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    download() {
      let _that = this;
      let url = `/api${
        common.exportCollectionByAgentIdUrl
      }?id=${
        this.soldId ? this.soldId : ''
      }`;

      // 原生ajax下载
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);    // 也可以使用POST方式，根据接口
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 设置请求头类型
      xhr.responseType = "blob";  // 返回类型blob
      // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
      xhr.onload = function () {
        // console.log(xhr);
        // console.log(xhr.getAllResponseHeaders()); //返回全部头信息,string
          // 请求完成
          if (xhr.readyState == 4) {
            if (xhr.status === 200) {
              _that.exportLoading = false;
                // 返回200
                let blob = xhr.response;
                let reader = new FileReader(); // 调用FileReader对象的方法
                reader.readAsDataURL(blob);  // 该方法将文件读取为一段以 data: 开头的字符串，这段字符串的实质就是 Data URL，Data URL是一种将小文件直接嵌入文档的方案。这里的小文件通常是指图像与 html 等格式的文件。 转换为base64，可以直接放入a表情href
                reader.onload = function (e) {
                  // console.log(e);
                    // 转换完成，创建一个a标签用于下载
                    let Ee = document.createElement('a');
                    let currentTime = moment().format('YYYYMMDD'); // 当前时间
                    Ee.download = _that.agentName + '催收记录' + currentTime +  '.xlsx';
                    // Ee.download = _that.agentName + '催收记录' + '.xlsx';
                    Ee.href = e.target.result;
                    // $("body").append(a);  // 修复firefox中无法触发click
                    Ee.click();
                    Ee.remove();
                    // $(a).remove();
                }
            } else {
              _that.exportLoading = false;
              _that.$notify.error({
                title: '温馨提示！',
                message: xhr.statusText || '导出失败，请联系管理员！'
              })
            }
          }
          
      };
      
      // 进程结束
      xhr.onloadend = function () {
        // _that.exportLoading = false;
        // _that.showDownBox = false;
      }
      // 发送ajax请求
      xhr.send()
    },

    // 导出
    exportButton() {
      this.exportLoading = true;
      this.download();
      // window.location.href = `/api${
      //   common.exportCollectionByAgentIdUrl
      // }?id=${
      //   this.soldId ? this.soldId : ''
      // }`;
    },

    // 导入
    importButton() {
      this.recordUploadURL = common.importCollectionUrl,
      this.$refs.uploadDialog.isShow(true);
    },

    // 分页
    handleSizeChange(val) {
      this.pageNum = 1;
      this.pageForm.pageNum = 1;
      this.pageSize = val;
      this.pageForm.pageSize = val;
      this.getCollectionRecordListData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.pageForm.pageNum = (val - 1) * this.pageSize + 1;
      this.getCollectionRecordListData();
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
    padding-top: 20px;
    padding-bottom: 10px;

}

.exportBtn {
  border-top: 1px solid #eee;
  padding-top: 20px;
  padding-bottom: 10px;
}
}
</style>
