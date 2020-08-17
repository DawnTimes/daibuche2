<template>
  <el-form ref="form" :model="form" label-width="160px" class="definewth">
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="批次" prop="batch">
            <el-input v-model="form.batch" @input="change($event)"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="msrp" prop="msrp">
            <el-input v-model="form.msrp" placeholder="官方指导价" @input="change($event)"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="车辆识别代号" prop="frameNumber">
            <el-input v-model="form.frameNumber" @input="change($event)"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="主机厂匹配车型" prop="factoryMatchesModel">
            <el-input v-model="form.factoryMatchesModel" @input="change($event)"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item class="page-form-item" label="经销商简称" prop="agentFullNameViewForSearch">
            <el-select
              v-model="agentFullNameViewForSearch"
              placeholder="请选择经销商"
              ref="selectReport"
              multiple
              style="width:100%"
              @remove-tag="removeTag"
            >
              <el-option value label style="height:200px;overflow: auto;background-color:#fff">
                <el-tree
                  @node-click="nodeClick"
                  :load="loadNode"
                  lazy
                  :props="defaultProps"
                  node-key="id"
                ></el-tree>
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="经销商代码" prop="agentCode2">
            <el-input v-model="form.agentCode2" @input="change($event)"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="车牌" prop="plateNumber">
            <el-input v-model="form.plateNumber" @input="change($event)"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="发动机号码" prop="engineNumber">
            <el-input v-model="form.engineNumber" @input="change($event)"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="月租金" prop="monthlyRent">
            <el-input v-model="form.monthlyRent" @input="change($event)"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="手动/自动" prop="atmt">
            <el-select v-model="form.atmt" placeholder clearable @input="change($event)">
              <el-option label="手动" value="MT"></el-option>
              <el-option label="自动" value="AT"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form-item label="车用途类型" prop="carUse">
            <el-select
              v-model="form.carUse"
              placeholder="请选择用途类型"
              clearable
              @input="change($event)"
            >
              <!-- SUBCAR-代步车/HELPCAR-救援车 -->
              <el-option label="代步车" value="SUBCAR"></el-option>
              <el-option label="救援车" value="HELPCAR"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="是否限牌" prop="isLimitLicence">
            <el-select
              v-model="form.isLimitLicence"
              placeholder="是否限牌"
              clearable
              @input="change($event)"
            >
              <el-option label="是" value="Y"></el-option>
              <el-option label="否" value="N"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="租金状态" prop="rentState">
            <el-select v-model="form.rentState" placeholder clearable @input="change($event)">
              <!-- 0空/1生效/2待会计审核/3待财务负责人审核 -->
              <el-option label="生效" value="1"></el-option>
              <el-option label="待业务审批" value="3"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-col>
    </el-row>
    <el-form-item class="submitBtn">
      <el-button type="primary" @click="onSubmit('form')">{{showSearch}}</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from '@/common/axios.js';
import common from '@/common/common.js';
export default {
  props: [
    'showMsg',
    'msgType',
    'showSearch',
    'agentFullNameViewForSearchFather',
    'agentCodeArrayFather',
  ],
  name: 'carInfoSearch',
  data() {
    return {
      form: {
        agentCode: [],
      },
      agentFullNameViewForSearch: [],
      agentCodeArray: [],
      province: '',
      city: '',
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf',
      },
      carseris: [], //品牌
      carParams: {
        carBrand: '',
        carSeries: '',
        carSeriesName: '',
        operation: '',
        turnPageBeginPos: '0',
        turnPageShowNum: '10',
      },
      carSeriesList: [],
      carModelList: [],
    };
  },

  created() {
    // this.form = this.showMsg;
    Object.assign(this.form, this.showMsg);
    this.agentCodeArray = this.agentCodeArrayFather;
    this.agentFullNameViewForSearch = this.agentFullNameViewForSearchFather;
  },
  mounted() {
    this.serchCarBrand();
  },
  methods: {
    change(e) {
      this.$forceUpdate();
    },
    removeTag(data) {
      console.log(this.agentCodeArray);
      for (let i = 0; i < this.agentCodeArray.length; i++) {
        if (this.agentCodeArray[i].agentFullName === data) {
          this.agentCodeArray.splice(i, 1);
        }
      }
      console.log(this.agentCodeArray);
    },
    nodeClick(data, node, component) {
      let flag = true;
      console.log(this.agentCodeArray);
      if (this.agentFullNameViewForSearch.length > 0) {
        this.agentFullNameViewForSearch.forEach((obj, index) => {
          if (obj === data.agentFullName) {
            flag = false;
          }
        });
      }
      if (flag) {
        console.log(data);
        this.agentFullNameViewForSearch.push(data.agentFullName);
        this.agentCodeArray.push(data);
        console.log(this.agentCodeArray);
      }
    },

    // 懒加载，加载树
    loadNode(node, resolve) {
      if (node.level === 0) {
        // 查询区域
        let url = common.findAreaInfoUrl;
        axios.post(url, {}).then((res) => {
          if (res.em === 'Success!') {
            res.data.areaList.forEach((obj, index) => {
              obj.name = obj.areaName;
            });
            return resolve(res.data.areaList);
          }
        });
      } else if (node.level === 1) {
        // 查询省份
        let url = common.findProviInfoUrl;
        axios.post(url, { areaCode: node.data.areaCode }).then((res) => {
          if (res.em === 'Success!') {
            res.data.provinceList.forEach((obj, index) => {
              obj.name = obj.provinceName;
            });
            return resolve(res.data.provinceList);
          }
        });
      } else if (node.level === 2) {
        // 查询城市
        let url = common.findCityInfoUrl;
        axios
          .post(url, { provinceCode: node.data.provinceCode })
          .then((res) => {
            if (res.em === 'Success!') {
              res.data.cityList.forEach((obj, index) => {
                obj.name = obj.cityName;
              });
              return resolve(res.data.cityList);
            }
          });
      } else {
        // 查询供应商
        let url = common.findCityAgentUrl;
        axios.post(url, { cityCode: node.data.cityCode }).then((res) => {
          // agentCode、agentFullName、agentShortName
          if (res.em === 'Success!') {
            res.data.cityAgent.forEach((obj, index) => {
              obj.name = obj.agentFullName;
              obj.leaf = true;
            });
            return resolve(res.data.cityAgent);
          }
        });
      }
    },
    onSubmit(name) {
      this.form.agentCode = [];
      if (this.agentCodeArray.length > 0) {
        this.agentCodeArray.forEach((obj, index) => {
          this.form.agentCode.push(obj.agentCode);
        });
      }
      for (var i = this.form.agentCode.length - 1; i >= 0; i--) {
        if (!this.form.agentCode[i]) this.form.agentCode.splice(i, 1);
      }

      if (this.form.agentCode.length >= 1) {
        this.form.operationType = '1';
      } else {
        this.form.operationType = '2';
      }
      console.log('very import');
      console.log(this.agentCodeArray);
      this.$emit(
        'onSearchSubmit',
        this.form,
        this.agentFullNameViewForSearch,
        this.agentCodeArray
      );
    },
    onCancel() {
      this.$emit(
        'onSearchSubmit',
        this.form,
        this.agentFullNameViewForSearch,
        this.agentCodeArray
      );
      this.$emit('onCancel');
    },
    serchCarBrand() {
      let url = common.carBrandOperationUrl;
      axios.post(url, {}).then((res) => {
        this.carseris = res.data.carBrankList;
      });
    },
    carBrandChanged() {
      let url = common.carSeriesOperationUrl;
      let temp = this.carseris;
      let _this = this;
      temp.forEach(function (obj, index) {
        if (obj.carBrandName == _this.form.carBrand) {
          _this.carParams.carBrand = obj.carBrand;
        }
      });
      axios.post(url, this.carParams).then((res) => {
        this.carSeriesList = res.data.carSeriesList;
        _this.carParams.carSeries = '';
      });
    },
    carSeriesChanged() {
      let url = common.carModelOperationUrl;
      let temp = this.carSeriesList;
      let _this = this;
      temp.forEach(function (obj, index) {
        if (obj.carSeriesName == _this.form.carSeries) {
          _this.carParams.carSeries = obj.carSeries;
          _this.carParams.carBrand = '';
        }
      });
      axios.post(url, this.carParams).then((res) => {
        this.carModelList = res.data.carModelList;
      });
    },
  },
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 10px;
}

.el-form-item__error {
  left: auto;
  right: 0;
  top: 30%;
}
</style>