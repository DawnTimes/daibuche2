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
          label-width=""
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
              <el-option label="西南" value="010"></el-option>
              <el-option label="西北" value="011"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="牌照商名称" prop="licenceName">
            <el-input
              class="inputSelectClass"
              v-model="params.licenceName"
              placeholder="牌照商"
              size="small"
              clearable
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
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="社会统一信用代码" prop="socialCreditCode">
            <el-input
              class="inputSelectClass"
              v-model="params.socialCreditCode"
              placeholder="社会统一信用代码"
              size="small"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="银行账号" prop="bankAccountNumber">
            <el-input
              class="inputSelectClass"
              v-model="params.bankAccountNumber"
              placeholder="银行账号"
              size="small"
              clearable
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
        label="email地址"
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
          <span>{{ scope.row.status | status }}</span>
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
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>

    <!-- // 导入 -->
    <upload-dialog ref="uploadDialog" :uploadURLStr="rentUploadURL"></upload-dialog>

    <!-- 导出提示 -->
    <downConfirmBox
      v-if="showDownBox"
      :msgConfirBox="downInfoText"
      v-on:submitForm="downSubmit"
      :loading="exportLoading"
      v-on:cancelbox="downCancelBack"
    ></downConfirmBox>
  </div>
</template>
<script>
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import uploadDialog from '@/components/uploadDialog'; // 上传弹框
import { mapState } from 'vuex';
import downConfirmBox from '@/components/confirmBox';  // 导出弹框

export default {
  components: {
    uploadDialog,
    downConfirmBox,
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
        bankAccountNumber: '',
        turnPageBeginPos: 1, // 开始是数据的序号，后台需要
        turnPageShowNum: 10, // 每页展示的条数
      },
      realParams: {
        areaCode: '',
        licenceName: '',
        status: '',
        lessor: '',
        socialCreditCode: '',
        bankAccountNumber: '',
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

      // 导出提示文本
      downInfoText: {
        icon: 'icon-jinggao',
        confirst: '确认要导出牌照商信息？',
        // consecond: '警告：导出后不可恢复！'
      },
      // 导出框显示
      showDownBox: false,
      exportLoading: false,
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
        areaCode: this.params.areaCode.trim(),
        licenceName: this.params.licenceName.trim(),
        status: this.params.status,
        lessor: this.params.lessor.trim(),
        bankAccountNumber: this.params.bankAccountNumber.trim(),
        socialCreditCode: this.params.socialCreditCode.trim(),
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

    download() {
      let _that = this;
      let url = `/api${common.licenceExportExcelUrl}?areaCode=${
        this.params.areaCode ? this.params.areaCode.trim() : ''
      }&licenceName=${
        this.params.licenceName ? this.params.licenceName.trim() : ''
      }&status=${
        this.params.status ? this.params.status : ''
      }&lessor=${
        this.params.lessor ? this.params.lessor.trim() : '' 
      }&socialCreditCode=${
        this.params.socialCreditCode ? this.params.socialCreditCode.trim() : ''
      }&bankAccountNumber=${
        this.params.bankAccountNumber ? this.params.bankAccountNumber.trim() : ''
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
              _that.showDownBox = false;
                // 返回200
                let blob = xhr.response;
                let reader = new FileReader(); // 调用FileReader对象的方法
                reader.readAsDataURL(blob);  // 该方法将文件读取为一段以 data: 开头的字符串，这段字符串的实质就是 Data URL，Data URL是一种将小文件直接嵌入文档的方案。这里的小文件通常是指图像与 html 等格式的文件。 转换为base64，可以直接放入a表情href
                reader.onload = function (e) {
                  // console.log(e);
                    // 转换完成，创建一个a标签用于下载
                    let Ee = document.createElement('a');
                    let currentTime = moment().format('YYYYMMDD'); // 当前时间
                    Ee.download = '牌照商信息' + currentTime +  '.xlsx';
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
    batchesDownload() {
      this.showDownBox = true;

      // let downUrl = `/api${common.licenceExportExcelUrl}?areaCode=${
      //   this.params.areaCode ? this.params.areaCode : ''
      // }&licenceName=${
      //   this.params.licenceName ? this.params.licenceName : ''
      // }&status=${
      //   this.params.status ? this.params.status : ''
      // }&lessor=${
      //   this.params.lessor ? this.params.lessor : '' 
      // }&socialCreditCode=${
      //   this.params.socialCreditCode ? this.params.socialCreditCode : ''
      // }&bankAccountNumber=${
      //   this.params.bankAccountNumber ? this.params.bankAccountNumber : ''
      // }`;

      // let net = window.open(downUrl, '_blank');
      // net.addEventListener('beforeunload', (e) => {
      //   console.log(e, 1234444);
      // })
      
    },
    // 确定下载
    downSubmit() {
      this.exportLoading = true;
      this.download();
      // window.location.href = `/api${common.licenceExportExcelUrl}?areaCode=${
      //   this.params.areaCode ? this.params.areaCode.trim() : ''
      // }&licenceName=${
      //   this.params.licenceName ? this.params.licenceName.trim() : ''
      // }&status=${
      //   this.params.status ? this.params.status : ''
      // }&lessor=${
      //   this.params.lessor ? this.params.lessor.trim() : '' 
      // }&socialCreditCode=${
      //   this.params.socialCreditCode ? this.params.socialCreditCode.trim() : ''
      // }&bankAccountNumber=${
      //   this.params.bankAccountNumber ? this.params.bankAccountNumber.trim() : ''
      // }`;
    },
    // 取消下载
    downCancelBack() {
      this.showDownBox = false;
      this.exportLoading = false;
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
          licenceCode: row.licenceCode,
          // licenceName: row.licenceName,
          // lessor: row.lessor,
          // socialCreditCode: row.socialCreditCode,
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
  /* margin-top: 1%; */
  padding-top: 10px;
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