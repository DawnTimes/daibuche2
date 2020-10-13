<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-13 10:31:50
 * @LastEditTime: 2020-10-12 16:58:04
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\rent\components\rentUpdateModule.vue
-->

<template>
  <div class="rentUpdateModule">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="16">
        <el-form
          :model="formData"
          ref="formData"
          label-width="140px"
          class="demo-ruleForm"
          :rules="rules"
          status-icon
        >
          <el-row :gutter="0">
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="id编号"
                prop
                v-show="!$formAtReadonly('id', formReadonly.hide)"
                class="form-item"
              >
                <el-input v-model="formData.id" placeholder :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="车型代码"
                prop
                v-show="!$formAtReadonly('modelCode', formReadonly.hide)"
                class="form-item"
              >
                <el-input v-model="formData.modelCode" placeholder :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="车型名称"
                prop
                v-show="!$formAtReadonly('modelName', formReadonly.hide)"
                class="form-item"
              >
                <el-input v-model="formData.modelName" placeholder :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="品牌"
                prop
                v-show="!$formAtReadonly('brandName', formReadonly.hide)"
                class="form-item"
              >
                <el-input v-model="formData.brandName" placeholder :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="车系"
                prop
                v-show="!$formAtReadonly('seriesName', formReadonly.hide)"
                class="form-item"
              >
                <el-input v-model="formData.seriesName" placeholder :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="数量"
                prop
                v-show="!$formAtReadonly('num', formReadonly.hide)"
                class="form-item"
              >
                <el-input v-model="formData.num" placeholder :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="城市"
                prop="cityName"
                v-show="!$formAtReadonly('cityName', formReadonly.hide)"
                class="form-item"
              >
              <el-input v-model="formData.cityName" placeholder :disabled="true"></el-input>
                <!-- <el-select v-model="formData.cityCode" filterable clearable placeholder="请选择">
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.cityCode"
                    :label="item.cityName"
                    :value="item.cityCode"
                    :disabled="$formAtReadonly('cityCode', formReadonly.readonly)"
                  ></el-option>
                </el-select> -->

                <!-- <el-cascader v-model="formData.value" filterable :options="areaArr" :props="props" style="width: 100%"></el-cascader> -->
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="牌照商"
                prop="licenceName"
                v-show="!$formAtReadonly('licenceName', formReadonly.hide)"
                class="form-item"
              >
              <el-input v-model="formData.licenceName" placeholder :disabled="true"></el-input>
                <!-- <el-select v-model="formData.licenceCode" filterable clearable placeholder="请选择">
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.licenceCode"
                    :label="item.licenceName"
                    :value="item.licenceCode"
                    :disabled="$formAtReadonly('licenceCode', formReadonly.readonly)"
                  ></el-option>
                </el-select> -->
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="生效日期"
                prop="validDate"
                v-show="!$formAtReadonly('validDate', formReadonly.hide)"
                class="form-item"
              >
                <el-date-picker
                  v-model="formData.validDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :disabled="$formAtReadonly('validDate', formReadonly.readonly)"
                  placeholder="选择日期"
                  :picker-options="pickerOptionsDate"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="是否限牌"
                prop="isLimitLicence"
                v-show="!$formAtReadonly('isLimitLicence', formReadonly.hide)"
                class="form-item"
              >
                <el-radio-group
                  v-model="formData.isLimitLicence"
                  disabled
                >
                  <el-radio label="Y">是</el-radio>
                  <el-radio label="N">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            
          </el-row>
          <el-row :gutter="0">
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="原月租金"
                prop="monthlyRent"
                v-show="!$formAtReadonly('monthlyRent', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.monthlyRent"
                  maxlength="15"
                  placeholder=""
                  disabled
                ></el-input>
                <span style="text-align: center; display: inline-block; width: 26px">元</span>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="原月牌照费"
                prop="rentLicenceFee"
                v-show="!$formAtReadonly('rentLicenceFee', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.rentLicenceFee"
                  maxlength="15"
                  placeholder=""
                  disabled
                ></el-input>
                <span style="text-align: center; display: inline-block; width: 26px">元</span>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="原月租金合计"
                prop="totalMonthlyRent"
                v-show="!$formAtReadonly('totalMonthlyRent', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.totalMonthlyRent"
                  maxlength="15"
                  placeholder=""
                  disabled
                ></el-input>
                <span style="text-align: center; display: inline-block; width: 26px">元</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="新月租金"
                prop="newMonthlyRent"
                v-show="!$formAtReadonly('newMonthlyRent', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.newMonthlyRent"
                  maxlength="15"
                  placeholder="请输入数字且最多保留两位小数"
                  :disabled="$formAtReadonly('newMonthlyRent', formReadonly.readonly)"
                ></el-input>
                <span style="text-align: center; display: inline-block; width: 26px">元</span>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="新月牌照费"
                prop="newLicenceFee"
                v-if="!$formAtReadonly('newLicenceFee', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.newLicenceFee"
                  maxlength="15"
                  placeholder="请输入数字且最多保留两位小数"
                  :disabled="$formAtReadonly('newLicenceFee', formReadonly.readonly)"
                ></el-input>
                <span style="text-align: center; display: inline-block; width: 26px">元</span>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="新月租金合计"
                prop="newtotalMonthlyRent"
                v-show="!$formAtReadonly('newtotalMonthlyRent', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.newtotalMonthlyRent"
                  maxlength="15"
                  placeholder=""
                  disabled
                ></el-input>
                <span style="text-align: center; display: inline-block; width: 26px">元</span>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="24" :lg="24" :xl="24">
              <el-form-item
                label="备注"
                prop
                v-show="!$formAtReadonly('remark', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.remark"
                  style="width: calc(100% - 32px)"
                  type="textarea"
                  maxlength="300"
                  :autosize="{ minRows: 3, maxRows: 5}"
                  :disabled="$formAtReadonly('remark', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
        <div style="padding: 20px 0 20px 0; text-align: center">
          <el-button @click="handleGoToBack1()" size="medium" v-show="!$formAtReadonly('cancelBtn1', formReadonly.hide)">取 消</el-button>
          <el-button @click="handleGoToBack2()" size="medium" v-show="!$formAtReadonly('cancelBtn2', formReadonly.hide)">取 消</el-button>
          <el-button @click="handleGoToBack3()" size="medium" v-show="!$formAtReadonly('cancelBtn3', formReadonly.hide)">取 消</el-button>
          <el-button
            v-show="!$formAtReadonly('saveBtn', formReadonly.hide)"
            type="primary"
            size="medium"
            @click="handleSave('formData')"
            :loading="loading"
          >保 存</el-button>
          <el-button
            v-show="!$formAtReadonly('saveToSubmit', formReadonly.hide)"
            type="primary"
            size="medium"
            @click="handleSubmit('formData')"
            :loading="loading"
          >保存并提交</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import { effectDate } from '@/common/dateDisabled.js';

export default {
  name: 'rentUpdateModule',
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    formReadonly: {
      type: Object,
      default: () => {
        return {};
      },
    },
    fatherPath: {
      type: String,
      default: '',
    },
  },
  components: {},
  data() {

    // 验证数字且最多2位小数
    const checkNumber = (rule, value, callback) => {
      const reg = /^\d+(\.\d{1,2})?$/;
      if (!value) {
        return callback(new Error('金额不能为空'));
      }
      if (!reg.test(value)) {
        callback(new Error('金额格式错误，最多保留两位小数'));
      } else {
        callback();
      }
    };

    return {
      cityOptions: [],
      rules: {
        newMonthlyRent: [
          {
            required: true,
            validator: checkNumber,
            trigger: 'blur',
          },
        ],
        newLicenceFee: [
          {
            required: true,
            validator: checkNumber,
            trigger: 'blur',
          },
        ],
        validDate: [
          {
            required: true,
            message: '生效日期不能为空',
            trigger: 'change',
          },
        ],
      },

      // 只能选择每年一月一号
      pickerOptionsDate: {
        disabledDate: (time) => {
          return effectDate(time);
        },
      },

    };
  },
  computed: {},
  watch: {
    // 监听新租金的变化 计算月租金合计
    'formData.newMonthlyRent'(newVal, oldVal) {
      if (this.formData.isLimitLicence === 'Y') {
        this.formData.newtotalMonthlyRent = newVal * 1 + this.formData.newLicenceFee * 1 + '';
      }
      if (this.formData.isLimitLicence === 'N') {
        this.formData.newtotalMonthlyRent = newVal;
      }
      
    },
    // 监听新牌照费的变化 计算月租金合计
    'formData.newLicenceFee'(newVal, oldVal) {
      if (this.formData.isLimitLicence === 'Y') {
        this.formData.newtotalMonthlyRent = newVal * 1 + this.formData.newMonthlyRent * 1 + '';
      }
      if (this.formData.isLimitLicence === 'N') {
        this.formData.newtotalMonthlyRent = newVal;
      }
      
    },
  },
  created() {
    // this.areaArr.forEach((item, index) => {
    //   item.children = [];
    //   let url = common.findProviInfoUrl;
    //   const params = {
    //     areaCode: item.value
    //   };
    //   axios.post(url, params).then((res) => {
    //     if (res.em == 'Success!') {
    //       const data = res.data.provinceList;
    //       item.children = data;
    //     }
    //   });

      
    //   item.children.forEach((val, ind) => {
    //     let url1 = common.findCityInfoUrl;
    //     val.children = [];
    //     val.value = val.provinceCode;
    //     val.label = val.provinceName;
    //     const params1 = {
    //       provinceCode: val.provinceCode,
    //     };
    //     axios.post(url1, params1).then((res) => {
    //     if (res.em == 'Success!') {
    //       const data1 = res.data.cityList;
    //       val.children = data1;
    //     }
    //   });
    //   })

    // })
  },
  mounted() {
    if (this.$formAtReadonly('*', this.formReadonly.readonly)) this.rules = {};
  },
  methods: {
    // 选择区域后获取省份
    getprovinceData(params, arr) {
      let url = common.findProviInfoUrl;
      axios.post(url, params).then((res) => {
        if (res.em == 'Success!') {
          const data = res.data.provinceList;
          arr = data;
        }
      });
    },
    // 选择省份后获取城市
    getCityData(params) {
      let url = common.findCityInfoUrl;
      axios.post(url, params).then((res) => {
        if (res.em == 'Success!') {
          const data = res.data.cityList;
          this.cityArr = data;
        }
      });
    },

    // 保存
    handleSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$notify.warning({
            title: '温馨提示',
            message: '请正确填写表单',
          });
          return;
        }

        // 防止重复提交
        if (this.loading === false) {
          this.formData.approvalStatus = '1'; // 保存的状态
          this.handleEmitData();
        }
      });
    },

    // 提交
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$notify.warning({
            title: '温馨提示',
            message: '请正确填写表单',
          });
          return;
        }

        // 防止重复提交
        if (this.loading === false) {
          this.formData.approvalStatus = '2'; // 提交的状态
          this.handleEmitData();
        }
      });
    },

    // 组件通讯
    handleEmitData() {
      this.$emit('formDataSubmit', {
        data: this.formData,
      });
    },

    // 取消
    handleGoToBack1() {
      this.$router.push({
        path: '/limitCarTypeList',
      });
    },
    handleGoToBack2() {
      this.$router.push({
        path: '/unlimitCarTypeList',
      });
    },
    handleGoToBack3() {
      this.$router.push({
        path: '/rentApplyList',
      });
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style lang="scss">
.rentUpdateModule {
  .el-input {
    width: calc(100% - 32px);
  }

  .el-select {
    width: 100%;
  }
}
</style>