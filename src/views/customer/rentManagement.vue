<template>
  <div>
    <div class="userPage">
      <!-- <span>
        <i class="iconfont iconkehuguanli"></i>出租人信息管理
      </span>-->
      <div class="hearderBox">
        <el-form
          :inline="true"
          :model="params"
          class="demo-form-inline"
          label-width="130px"
          size="small"
          ref="params"
        >
          <el-form-item label="所属地区" prop="areaCode">
            <el-select
              class="inputSelectClass"
              v-model="params.areaCode"
              placeholder="所属地区"
              size="small"
              clearable
            >
              <el-option label="台湾" value="007"></el-option>
              <el-option label="华北" value="003"></el-option>
              <el-option label="华中" value="006"></el-option>
              <el-option label="华东" value="004"></el-option>
              <el-option label="东北" value="002"></el-option>
              <el-option label="华南" value="005"></el-option>
              <el-option label="西部" value="009"></el-option>
              <el-option label="香港" value="008"></el-option>
              <el-option label="澳门" value="001"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="牌照商名称" prop="licenceName">
            <el-input
              class="inputSelectClass"
              v-model="params.licenceName"
              placeholder="牌照商"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              class="inputSelectClass"
              v-model="params.status"
              placeholder="状态"
              size="small"
              clearable
            >
              <el-option label="有效" value="Y"></el-option>
              <el-option label="无效" value="N"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出租方" prop="lessor">
            <el-input
              class="inputSelectClass"
              v-model="params.lessor"
              placeholder="出租方"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="社会统一信用代码" prop="socialCreditCode">
            <el-input
              class="inputSelectClass"
              v-model="params.socialCreditCode"
              placeholder="社会统一信用代码"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button type="primary" @click="resetForm('params')">重置</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button icon="el-icon-plus" type="primary" @click="addInfo">新增牌照商</el-button>
            <el-button icon="el-icon-upload2" type="primary" @click="importButton">导入牌照商</el-button>
            <el-button icon="el-icon-download" type="primary" @click="batchesDownload">导出牌照商</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <el-row type="flex" class="row-bg" justify="end" style="margin-top: -1%;">
      <el-button icon="el-icon-plus" type="primary" plain round @click="addInfo">新增</el-button>
      <el-button icon="el-icon-upload2" type="primary" plain round @click="batchesimport">导入</el-button>
      <el-button icon="el-icon-download" type="primary" plain round @click="batchesDownload">导出</el-button>
    </el-row>-->
    <el-table
      size="medium"
      ref="table"
      :data="tableData"
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      stripe
      style="width: 100%"
      border
      :max-height="tableHeight"
      :header-cell-style="{
        'text-align':'center',
        'font-weight':'bold',  
        'background':'#627CAF',    
        'color': '#fff',
    }"
    >
      >
      <el-table-column
        fixed
        type="index"
        label="序号"
        :index="indexMethod"
        resizable
        width="60"
        align="center"
      ></el-table-column>
      <el-table-column
        fixed
        prop="licenceCode"
        label="牌照商代码"
        width="120"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        fixed
        prop="licenceName"
        label="牌照商名称"
        width="250"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="isLimitLicence"
        label="是否限牌"
        width="100"
        :show-overflow-tooltip="true"
        resizable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.isLimitLicence | flagValue }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="isGalcCompany"
        label="租赁公司"
        width="100"
        :show-overflow-tooltip="true"
        resizable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.isGalcCompany | flagValue }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="lessor"
        label="出租方"
        width="250"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="socialCreditCode"
        label="社会统一信用代码"
        width="200"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="email"
        label="Email地址"
        width="200"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>

      <el-table-column
        prop="legalRepresentative"
        label="法定代表人"
        width="100"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="legalTelephone"
        label="法定代表人联系电话"
        width="250"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="contactPerson"
        label="联系人"
        width="100"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="contactPersonTelephone"
        label="联系人联系电话"
        width="150"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="bankAccountNo"
        label="开户银行账号"
        width="150"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="bankAccountName"
        label="开户银行名称"
        width="150"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="billingAddress"
        label="开票地址"
        width="200"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="billingTelephone"
        label="开票电话"
        width="150"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column prop="status" label="状态" width="80" :show-overflow-tooltip="true" resizable>
        <template slot-scope="scope">
          <span>{{ scope.row.isLimitLicence | status }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="areaName"
        label="地区"
        width="100"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="provinceName"
        label="省份"
        width="100"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="cityName"
        label="城市"
        width="100"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column
        prop="registerAddress"
        label="注册地址"
        width="150"
        :show-overflow-tooltip="true"
        resizable
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <!-- <el-button type="text" size="small" style="color:#F00">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      class="paginationClass"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100, 500]"
      :page-size="pageSize"
      layout="total, prev, pager, next, sizes, jumper"
      :total="totalCount"
    ></el-pagination>

    <!-- // 导入 -->
    <upload-dialog ref="uploadDialog" :uploadURLStr="rentUploadURL"></upload-dialog>
  </div>
</template>
<script>
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import uploadDialog from '@/components/uploadDialog'; // 上传弹框
import { mapState } from 'vuex';

export default {
  components: {
    uploadDialog,
  },
  data() {
    return {
      totalCount: 0,
      currentPage: 1, //初始页
      pageSize: 10, //    每页的数据
      tableData: [],
      tableLoading: false,
      params: {
        areaCode: '',
        licenceName: '',
        status: '',
        lessor: '',
        socialCreditCode: '',
        turnPageBeginPos: 1, // 开始是数据的序号，后台需要
        turnPageShowNum: 10, // 每页展示的条数
      },
      realParams: {
        areaCode: '',
        licenceName: '',
        status: '',
        lessor: '',
        socialCreditCode: '',
      },
      tableHeight: 100,

      // 导入url
      rentUploadURL: '',

      // 按钮权限
      rightArray: [1111, 1112, 1113, 1114],
      rightControl: {
        add: false,
        edit: false,
        import: false,
        export: false,
      },
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
      if (val) {
        this.initData();
      }
    }
  },

  methods: {
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.initData();
    },

    initData() {
      this.tableData = [];
      const params = {
        areaCode: this.params.areaCode,
        licenceName: this.params.licenceName,
        status: this.params.status,
        lessor: this.params.lessor,
        socialCreditCode: this.params.socialCreditCode,
        turnPageBeginPos: this.params.turnPageBeginPos, // 开始是数据的序号，后台需要
        turnPageShowNum: this.params.turnPageShowNum, // 每页展示的条数
      };
      this.tableLoading = true;
      let url = common.licenceListUrl;
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          this.tableData = res.data.licenceList;
          this.totalCount = parseInt(res.data.turnPageTotalNum);
          this.tableLoading = false;
        } else {
          this.tableLoading = false;
        }
      }).catch(() => {
        this.tableLoading = false;
      });
    },

    // 分页
    handleSizeChange(pageSize) {
      this.currentPage = 1;
      this.params.turnPageBeginPos = 1;
      this.pageSize = pageSize;
      this.params.turnPageShowNum = pageSize;

      this.initData();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.params.turnPageBeginPos = (currentPage - 1) * this.pageSize + 1;
      this.initData();
    },

    // 查询
    onSearch() {
      this.params.turnPageBeginPos = 1;
      this.currentPage = 1;
      this.initData();
    },

    // 新增
    addInfo() {
      this.$router.push({
        path: '/addOrganization',
      });
    },

    // 导入
    importButton() {
      this.rentUploadURL = common.importLicenceCompanyUrl,
      this.$refs.uploadDialog.isShow(true);
    },
    // 导出
    batchesDownload() {
      // console.log('batchesDownload!');
      window.location.href = `/api${common.licenceExportExcelUrl}?areaCode=${
        this.params.areaCode ? this.params.areaCode : ''
      }&licenceName=${
        this.params.licenceName ? this.params.licenceName : ''
      }&status=${
        this.params.status ? this.params.status : ''
      }&lessor=${
        this.params.lessor ? this.params.lessor : ''
      }&socialCreditCode=${
        this.params.socialCreditCode ? this.params.socialCreditCode : ''
      }`;
    },
    indexMethod(index) {
      let order = this.pageSize * (this.currentPage - 1);
      return index + order + 1;
    },

    // 编辑
    handleEdit(row) {
      this.$router.push({
        path: '/editOrganization',
        query: {
          id: row.licenceCode,
        },
      });
    },
  },

  created() {
    this.initData();

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
};
</script>

<style scoped>
.paginationClass {
  margin-top: 1%;
  float: right;
}
.userPage {
  overflow: hidden;
  padding: 0 0 0 20px;
  display: flex;
  align-content: center;
  justify-content: space-between;
}
.userPage span {
  display: inline-block;
  /* height: 62px;
      line-height: 62px;
      width: 200px; */
  color: #d42027;
  font-size: 24px;
  line-height: 120px;
}
.userPage span i {
  font-size: 32px;
  margin-right: 10px;
}
.el-form--inline .el-form-item {
  display: inline-block;
  margin-right: 20px;
  vertical-align: top;
}
.el-button.is-round {
  border-radius: 20px;
  padding: 10px 35px;
}
/* .el-form-item {
  margin: 0;
} */
</style>