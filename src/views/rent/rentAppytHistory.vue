<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-11 10:36:55
 * @LastEditTime: 2020-11-30 14:02:03
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\rent\rentAppytHistory.vue
-->
<template>
  <div class="rentAppytHistory">
    <div class="hearderBox">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width=""
        size="mini"
        ref="ruleForm"
      >
        <!-- <el-form-item label="任务编号:" prop="systemName">
          <el-input maxlength="30" v-model="formData.systemName" placeholder=""></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="车型代码:" prop="modelCode">
          <el-input maxlength="50" v-model="formData.modelCode" placeholder=""></el-input>
        </el-form-item> -->
        <el-form-item label="车型名称:" prop="modelName">
          <el-input maxlength="50" v-model="formData.modelName" clearable placeholder=""></el-input>
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

        <el-form-item label="城市:" prop="cityName">
          <el-input maxlength="30" v-model="formData.cityName" clearable placeholder=""></el-input>
          <!-- <el-select v-model="formData.cityName" placeholder="请选择">
            <el-option value label style="height:240px; overflow-y: auto; background-color:#fff; color: #606266; font-weight: normal">
              <el-tree :props="defaultProps" :load="loadNode" lazy @node-click="handleNodeClick" highlight-current accordion></el-tree>
            </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="牌照商:" prop="licenceName">
          <el-input maxlength="50" v-model="formData.licenceName" clearable placeholder></el-input>
          <!-- <el-select v-model="formData.licenceCode" filterable clearable  placeholder="请选择">
            <el-option
              v-for="item in licenceOptions"
              :key="item.licenceCode"
              :label="item.licenceName"
              :value="item.licenceCode">
            </el-option>
          </el-select> -->
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
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
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
        <el-table-column prop="modId" label="ID" show-overflow-tooltip></el-table-column>
        <el-table-column prop="modelCode" label="车型代码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="modelName" label="车型名称" show-overflow-tooltip width="180"></el-table-column>
        <el-table-column prop="brandName" label="品牌" show-overflow-tooltip width="180"></el-table-column>
        <el-table-column prop="seriesName" label="车系" show-overflow-tooltip></el-table-column>
        <el-table-column prop="isLimitLicence" label="是否限牌" show-overflow-tooltip>
          <template slot-scope="scope">
          <span :class="{ blueColor: scope.row.isLimitLicence == 'Y' , redStatus: scope.row.isLimitLicence == 'N' }">{{ scope.row.isLimitLicence | flagValue }}</span>
        </template>
        </el-table-column>        
        <el-table-column prop="validDate" label="生效日期" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.validDate | timeFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="licenceName" label="牌照商" show-overflow-tooltip width="200"></el-table-column>
        <el-table-column prop="cityName" label="城市" show-overflow-tooltip></el-table-column>
        <el-table-column prop="num" label="数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="approvalStatus" label="审批状态" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span
            :class="{greenStatus: scope.row.approvalStatus == '4', redStatus: scope.row.approvalStatus == '5', blueColor: scope.row.approvalStatus == '2' ,
            skyblueColor: scope.row.approvalStatus == '3',
            yellowColor: scope.row.approvalStatus == '1'}"
            >{{ scope.row.approvalStatus | approvalStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="newMonthlyRent" label="新月租金" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.newMonthlyRent | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="newLicenceFee" label="新月牌照费" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.newLicenceFee && scope.row.newLicenceFee != '0' ? scope.row.newLicenceFee + '元' : scope.row.newLicenceFee }}</span> -->
            <span>{{ scope.row.newLicenceFee | moneyFormat  }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="newtotalMonthlyRent" label="新月租金合计" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.newtotalMonthlyRent | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="monthlyRent" label="原月租金" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.monthlyRent | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rentLicenceFee" label="原月牌照费" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.rentLicenceFee && scope.row.rentLicenceFee != '0' ? scope.row.rentLicenceFee + '元' : scope.row.rentLicenceFee }}</span> -->
            <span>{{ scope.row.rentLicenceFee | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalMonthlyRent" label="原月租金合计" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.monthlyRent * 1 + scope.row.rentLicenceFee * 1 }}</span> -->
            <span>{{ scope.row.totalMonthlyRent | moneyFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="modifier" label="修改人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="modifiedTime" label="修改时间" show-overflow-tooltip width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.modifiedTime | timeFormatTemp }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip width="150"></el-table-column>
        <el-table-column
          label="操作"
          width="80"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <el-button size="mini" plain @click="handleDetail(scope.row)" v-show="rightControl.detail">详情</el-button>
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
import eventBus from '@/common/eventBus.js';

export default {
  name: '',
  props: {

  },
  components: {
    
  },
  data() {
    let _that = this;
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      formData: {
        cityCode: '',
        isLimitLicence: '',
        licenceCode: '',
        modelCode: '',
        modelName: '',
        cityName: '',
        licenceName: '',
        pageSize: 10,
        pageNum: 1,
      },

      tableData: [],
      tableHeight: 100,
      tableLoading: false,

      // 按钮权限
      rightArray: [9551],
      rightControl: {
        detail: false,
      },

      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf',
      },
      licenceOptions: [],

      cityProps: {
        checkStrictly: false,
        children: 'children',
        label: 'name',
        value: 'code',
        lazy: true,
        lazyLoad(node, resolve) {
          _that.getCascaderCityData(node, resolve);
        },
      },

    };
  },
  computed: {

  },
  watch: {
    // 监听城市的变化，获取对应城市的牌照商
    'formData.cityCode'(nval, oval) {
      // console.log(nval, 12, oval);
      if (nval) {
        // 清空选中的牌照商
        this.formData.licenceCode = '';

        this.queryLicenceByCity(nval);
      } else {
        this.getLicenceList();
      }
    }
  },
  created() {
    this.getRentApplyListData();
    // this.getLicenceList();
    
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
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 110;
      
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 110
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
      this.formData.cityCode = '';
      this.getRentApplyListData();
    },

    // 自定义列接口索引
    indexMethod(index) {
      let order = this.pageSize * (this.pageNum - 1);
      return index + order + 1;
    },

    // 获取分页数据
    getRentApplyListData() {
      this.tableData = [];
      const params = {
        cityCode: this.formData.cityCode.trim(),
        cityName: this.formData.cityName.trim(),
        licenceName: this.formData.licenceName.trim(),
        licenceCode: this.formData.licenceCode.trim(),
        modelCode: this.formData.modelCode.trim(),
        modelName: this.formData.modelName.trim(),
        isLimitLicence: this.formData.isLimitLicence.trim(),
        state: '1',
        turnPageBeginPos: this.formData.pageNum,
        turnPageShowNum: this.formData.pageSize,
      };
      const url = common.queryRentHisUrl;
      this.tableLoading = true;
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.tableData = data.rentModList;
          this.total = data.turnPageTotalNum * 1;
          this.tableLoading = false;
        } else {
          this.tableLoading = false;
        }
      }).catch(() => {
        this.tableLoading = false;
      })
    },

    // 获取城市数据 二级（省份-城市）
    getCascaderCityData(node, resolve) {
      if (node.level === 0) {
        // 先获取省份
        const url = common.findProviInfoUrl;
        const params = {
          areaCode: '',
        };
        axios.post(url, params).then((res) => {
          if (res.em === 'Success!') {
            const data2 = res.data.provinceList;
            const listData2 = data2.map((item) => {
              this.$set(item, 'name', item.provinceName);
              this.$set(item, 'code', item.provinceCode);
              this.$set(item, 'children', []);
              return item;
            });
            listData2.forEach((val) => {
              // 去掉最后一级（城市）的箭头
              if (
                val.provinceCode === '710000' ||
                val.provinceCode === '810000' ||
                val.provinceCode === '820000' ||
                val.provinceCode === 'TWN'
              ) {
                val.leaf = node.level >= 0;
              }
            });
            resolve(listData2);
          }
        });
      } else if (node.level === 1) {
        // 先获取城市
        const url = common.findCityInfoUrl;
        const params = {
          provinceCode: node.data.provinceCode,
        };
        axios.post(url, params).then((res) => {
          if (res.em === 'Success!') {
            const data3 = res.data.cityList;
            const listData3 = data3.map((item) => {
              this.$set(item, 'name', item.cityName);
              this.$set(item, 'code', item.cityCode);
              // this.$set(item, 'children', []);
              return item;
            });

            listData3.forEach((val) => {
              // 去掉最后一级（城市）的箭头
              val.leaf = node.level >= 1;
            });
            resolve(listData3);
          }
        });
      }
    },

    loadNode(node, resolve) {
      if (node.level === 0) {
        // 先获取省份
        const url = common.findProviInfoUrl;
        const params = {
          areaCode: '',
        };
        axios.post(url, params).then((res) => {
          if (res.em === 'Success!') {
            const data2 = res.data.provinceList;
            const listData2 = data2.map((item) => {
              this.$set(item, 'name', item.provinceName);
              this.$set(item, 'code', item.provinceCode);
              this.$set(item, 'children', []);
              return item;
            });
            listData2.forEach((val) => {
              // 去掉最后一级（城市）的箭头
              if (
                val.provinceCode === '710000' ||
                val.provinceCode === '810000' ||
                val.provinceCode === '820000' ||
                val.provinceCode === 'TWN'
              ) {
                val.leaf = node.level >= 0;
              }
            });
            resolve(listData2);
          }
        });
      }
      if (node.level === 1) {
        // 先获取城市
        const url = common.findCityInfoUrl;
        const params = {
          provinceCode: node.data.provinceCode,
        };
        axios.post(url, params).then((res) => {
          if (res.em === 'Success!') {
            const data3 = res.data.cityList;
            const listData3 = data3.map((item) => {
              this.$set(item, 'name', item.cityName);
              this.$set(item, 'code', item.cityCode);
              // this.$set(item, 'children', []);
              return item;
            });

            listData3.forEach((val) => {
              // 去掉最后一级（城市）的箭头
              val.leaf = node.level >= 1;
            });
            resolve(listData3);
          }
        });
      }
      if (node.level > 1) return resolve([]);
    },

    // 点击选中
    handleNodeClick(data, node) {
      // console.log(node);
      if (node.isLeaf) {
        this.formData.cityCode = data.code;
        this.formData.cityName = data.name;
      }
    },

    // 根据城市选牌照商
    queryLicenceByCity(val) {
      const params = {
        cityCode: val,
      };
      const url = common.findCityLicenceUrl;
      
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.licenceOptions = data.cityLicence;
        }
      })
    },

    // 全部牌照商下拉选
    getLicenceList() {
      const params = {
        turnPageBeginPos: 1,
        turnPageShowNum: 1000000,
      };
      const url = common.licenceListUrl;

      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          const data = res.data;
          this.licenceOptions = data.licenceList;
        }
      })
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
    

  },
  filters: {
    function() {

    },
  },
};
</script>

<style scoped lang="scss">
  .rentAppytHistory {
    
  }
</style>
