<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-25 16:55:26
 * @LastEditTime: 2020-12-02 15:48:37
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\customer\components\organizationModule.vue
-->


<template>
  <div class="organizationModule">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="22" :lg="20" :xl="16">
        <el-form
          :model="formData"
          ref="formData"
          label-width="140px"
          class="demo-ruleForm"
          :rules="rules"
          status-icon
          size="medium"
        >
          <el-row :gutter="0">
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="牌照商代码"
                prop="licenCode"
                v-show="!$formAtReadonly('licenCode', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.licenCode"
                  maxlength="20"
                  placeholder
                  :disabled="$formAtReadonly('licenCode', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="牌照商名称"
                prop="licenceName"
                v-show="!$formAtReadonly('licenceName', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.licenceName"
                  maxlength="30"
                  placeholder
                  :disabled="$formAtReadonly('licenceName', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="是否限牌"
                prop="isLimitLicen"
                v-show="!$formAtReadonly('isLimitLicen', formReadonly.hide)"
                class="form-item"
              >
                <el-radio-group
                  v-model="formData.isLimitLicen"
                  :disabled="$formAtReadonly('isLimitLicen', formReadonly.readonly)"
                >
                  <el-radio label="Y">是</el-radio>
                  <el-radio label="N">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="是否租赁公司"
                prop="isGalcComp"
                v-show="!$formAtReadonly('isGalcComp', formReadonly.hide)"
                class="form-item"
              >
                <el-radio-group
                  v-model="formData.isGalcComp"
                  :disabled="$formAtReadonly('isGalcComp', formReadonly.readonly)"
                >
                  <el-radio label="Y">是</el-radio>
                  <el-radio label="N">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="出租方"
                prop="lessor"
                v-show="!$formAtReadonly('lessor', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.lessor"
                  maxlength="30"
                  placeholder
                  :disabled="$formAtReadonly('lessor', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="社会统一信用代码"
                prop="socialCreditCode"
                v-show="!$formAtReadonly('socialCreditCode', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.socialCreditCode"
                  maxlength="30"
                  placeholder
                  :disabled="$formAtReadonly('socialCreditCode', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="法人"
                prop="legalRepresent"
                v-show="!$formAtReadonly('legalRepresent', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.legalRepresent"
                  maxlength="20"
                  placeholder
                  :disabled="$formAtReadonly('legalRepresent', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="法人电话"
                prop="legalPhone"
                v-show="!$formAtReadonly('legalPhone', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.legalPhone"
                  maxlength="13"
                  placeholder
                  :disabled="$formAtReadonly('legalPhone', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="联系人"
                prop="contactPers"
                v-show="!$formAtReadonly('contactPers', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.contactPers"
                  maxlength="20"
                  placeholder
                  :disabled="$formAtReadonly('contactPers', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="联系人电话"
                prop="contactPersonPhone"
                v-show="!$formAtReadonly('contactPersonPhone', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.contactPersonPhone"
                  maxlength="13"
                  placeholder
                  :disabled="$formAtReadonly('contactPersonPhone', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="区域"
                prop="areaCode"
                v-show="!$formAtReadonly('areaCode', formReadonly.hide)"
                class="form-item"
              >
                <el-select
                  v-model="formData.areaCode"
                  style="width: 100%"
                  filterable
                  clearable
                  placeholder="请选择"
                  @change="changeArea"
                  :disabled="$formAtReadonly('areaCode', formReadonly.readonly)"
                >
                  <el-option
                    v-for="item in areaArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="省份"
                prop=""
                v-show="!$formAtReadonly('provinceCode', formReadonly.hide)"
                class="form-item"
              >
                <el-select
                  v-model="formData.provinceCode"
                  style="width: 100%"
                  filterable
                  clearable
                  placeholder="请选择"
                  @change="changeProvice"
                  @focus="focusProvice"
                  :disabled="$formAtReadonly('provinceCode', formReadonly.readonly)"
                >
                  <el-option
                    v-for="item in provinceArr"
                    :key="item.provinceCode"
                    :label="item.provinceName"
                    :value="item.provinceCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="城市"
                prop=""
                v-show="!$formAtReadonly('cityCode', formReadonly.hide)"
                class="form-item"
              >
                <el-select
                  v-model="formData.cityCode"
                  style="width: 100%"
                  filterable
                  clearable
                  placeholder="请选择"
                  @change="changeCity"
                  @focus="focusCity"
                  :disabled="$formAtReadonly('cityCode', formReadonly.readonly)"
                >
                  <el-option
                    v-for="item in cityArr"
                    :key="item.cityCode"
                    :label="item.cityName"
                    :value="item.cityCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="email地址"
                prop="email"
                v-show="!$formAtReadonly('email', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.email"
                  maxlength="60"
                  placeholder
                  :disabled="$formAtReadonly('email', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="开户银行账号"
                prop="bankAccountNumber"
                v-show="!$formAtReadonly('bankAccountNumber', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.bankAccountNumber"
                  maxlength="30"
                  :disabled="$formAtReadonly('bankAccountNumber', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="开户银行名称"
                prop="bankAccName"
                v-show="!$formAtReadonly('bankAccName', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.bankAccName"
                  maxlength="30"
                  :disabled="$formAtReadonly('bankAccName', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="开票电话"
                prop="billingPhone"
                v-show="!$formAtReadonly('billingPhone', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.billingPhone"
                  maxlength="13"
                  :disabled="$formAtReadonly('billingPhone', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="状态"
                prop="status"
                v-show="!$formAtReadonly('status', formReadonly.hide)"
                class="form-item"
              >
                <el-radio-group
                  v-model="formData.status"
                  :disabled="$formAtReadonly('status', formReadonly.readonly)"
                >
                  <el-radio label="Y">有效</el-radio>
                  <el-radio label="N">无效</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="24" :lg="24" :xl="24">
              <el-form-item
                label="开票地址"
                prop="billingAddr"
                v-show="!$formAtReadonly('billingAddr', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.billingAddr"
                  type="textarea"
                  maxlength="300"
                  show-word-limit
                  :autosize="{ minRows: 2, maxRows: 3}"
                  :disabled="$formAtReadonly('billingAddr', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="20" :md="24" :lg="24" :xl="24">
              <el-form-item
                label="注册地址"
                prop="registerAddr"
                v-show="!$formAtReadonly('registerAddr', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.registerAddr"
                  type="textarea"
                  maxlength="300"
                  show-word-limit
                  :autosize="{ minRows: 2, maxRows: 3}"
                  :disabled="$formAtReadonly('registerAddr', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :xs="24" :sm="20" :md="24" :lg="24" :xl="24">
              <el-form-item
                label="备注"
                prop
                v-show="!$formAtReadonly('remark', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.remark"
                  type="textarea"
                  maxlength="300"
                  :autosize="{ minRows: 3, maxRows: 5}"
                  :disabled="$formAtReadonly('remark', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
        <div style="padding: 10px 0 20px 0; text-align: center">
          <el-button size="medium" @click="handleGoToBack()">取 消</el-button>
          <el-button size="medium"
            v-show="!$formAtReadonly('saveBtn', formReadonly.hide)"
            type="primary"
            @click="handleSubmit('formData')"
            :loading="loading"
          >确 定</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from '@/common/axios.js';
import common from '@/common/common.js';

export default {
  name: 'organizationModule',
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
  },
  components: {},
  data() {
    // 匹配银行卡号
    const checkBankCode = (rule, value, callback) => {
      const reg = /^[0-9]+$/;
      if (!value) {
        return callback(new Error('银行账号不能为空'));
      }
      if (!reg.test(value)) {
        callback(new Error('银行账号格式错误'));
      } else {
        callback();
      }
    };

    // 验证手机号码1
    const checkPhone = (rule, value, callback) => {
      if (value && value !== '') {
        const phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
        if (!phoneReg.test(value)) {
          callback(new Error('请输入正确的11位手机号码'));
        } else {
          callback();
        }
      } else {
        callback(new Error('手机号码不能为空'));
      }
    };

    // 验证手机号码2
    const checkPhone2 = (rule, value, callback) => {
      if (value && value !== '') {
        const phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
        const telReg = /^([0-9]{3,4}-)?[0-9]{5,8}$/;
        if (!phoneReg.test(value) && !telReg.test(value)) {
          callback(new Error('请输入正确的11位手机号码或固定电话'));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    // 邮箱验证
    const validateEmail = (rule, value, callback) => {
      if (value) {
        if (value !== '') {
          // const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; // 名称允许汉字、字母、数字，域名只允许英文域名
          const reg = /^[A-Za-z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; // 只允许英文字母、数字、下划线、英文句号、以及中划线组成
          if (!reg.test(value)) {
            callback(new Error('请输入正确的邮箱地址,只允许英文字母、数字、下划线、英文句号、以及中划线组成'));
          }
        }
        callback();
      } else {
        callback();
      }
    };

    return {
      areaArr: [
        { label: '澳门', value: '001' },
        { label: '东北', value: '002' },
        { label: '华北', value: '003' },
        { label: '华东', value: '004' },
        { label: '华南', value: '005' },
        { label: '华中', value: '006' },
        { label: '台湾', value: '007' },
        { label: '香港', value: '008' },
        { label: '西部', value: '009' },
        { label: '西南', value: '010' },
        { label: '西北', value: '011' },
      ],
      areaCode: '',
      provinceArr: [],
      provinceCode: '',
      cityArr: [],
      cityCode: '',
      rules: {
        licenCode: [
          {
            required: true,
            message: '牌照商代码不能为空',
            trigger: 'blur',
          },
        ],
        licenceName: [
          {
            required: true,
            message: '牌照商名称不能为空',
            trigger: 'blur',
          },
        ],
        lessor: [
          {
            required: true,
            message: '出租方不能为空',
            trigger: 'blur',
          },
        ],
        socialCreditCode: [
          {
            required: true,
            message: '社会统一信用代码不能为空',
            trigger: 'blur',
          },
        ],
        // contactPerson: [
        //   {
        //     required: true,
        //     message: '联系人不能为空',
        //     trigger: 'blur'
        //   }
        // ],
        bankAccName: [
          {
            required: true,
            message: '开户银行名称不能为空',
            trigger: 'blur',
          },
        ],
        // billingAddr: [
        //   {
        //     required: true,
        //     message: '开票地址不能为空',
        //     trigger: 'blur'
        //   }
        // ],
        status: [
          {
            required: true,
            message: '状态不能为空',
            trigger: 'change',
          },
        ],
        isLimitLicen: [
          {
            required: true,
            message: '请选择是否限牌',
            trigger: 'change',
          },
        ],
        isGalcComp: [
          {
            required: true,
            message: '请选择是否租赁公司',
            trigger: 'change',
          },
        ],
        provinceCode: [
          {
            required: true,
            message: '省份不能为空',
            trigger: 'blur',
          },
        ],
        areaCode: [
          {
            required: true,
            message: '区域不能为空',
            trigger: 'blur',
          },
        ],
        cityCode: [
          {
            required: true,
            message: '城市不能为空',
            trigger: 'blur',
          },
        ],
        registerAddr: [
          {
            required: true,
            message: '注册地址不能为空',
            trigger: 'blur',
          },
        ],
        bankAccountNumber: [
          {
            required: true,
            validator: checkBankCode,
            trigger: 'blur',
          },
        ],
        legalPhone: [
          {
            required: false,
            validator: checkPhone2,
            trigger: 'blur',
          },
        ],
        contactPersonPhone: [
          {
            required: false,
            validator: checkPhone2,
            trigger: 'blur',
          },
        ],
        billingPhone: [
          {
            required: false,
            validator: checkPhone2,
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: false,
            validator: validateEmail,
            trigger: 'blur',
          },
        ],
      },
    };
  },
  computed: {},
  watch: {
    // 监听区域码的变化，获取省份list
    'formData.areaCode'(nval, oval) {
      // console.log(nval, oval);
      if (nval && this.$route.path === '/editOrganization') {
        const params = {
          areaCode: nval,
        };
        this.getprovinceData(params);
      }
    },
    
    // 监听省份码的变化，获取城市list
    'formData.provinceCode'(nval, oval) {
      // console.log(nval, oval);
      if (nval && this.$route.path === '/editOrganization') {
        const params = {
          provinceCode: nval,
        };
        this.getCityData(params);
      }
    },
  },
  created() {
  },
  mounted() {
    if (this.$formAtReadonly('*', this.formReadonly.readonly)) this.rules = {};
  },
  methods: {
    // 选择区域
    changeArea(val) {
      this.formData.provinceCode = '';
      this.formData.cityCode = '';
      this.provinceArr = [];
      this.cityArr = [];
      this.areaCode = val;
      const params = {
        areaCode: val,
      };
      this.getprovinceData(params);
    },
    // 选择区域后获取省份
    getprovinceData(params) {
      let url = common.findProviInfoUrl;
      axios.post(url, params).then((res) => {
        if (res.em == 'Success!') {
          const data = res.data.provinceList;
          this.provinceArr = data;
        }
      });
    },
    // 选择省份
    changeProvice(val) {
      if (this.formData.areaCode) {
        this.formData.cityCode = '';
        this.cityArr = [];
        this.provinceCode = val;
        const params = {
          provinceCode: val,
        };
        this.getCityData(params);
      } else {
        this.$notify.warning({
          title: '温馨提示',
          message: '请先选择区域',
        });
      }
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

    // 选择城市
    changeCity(val) {
      console.log(val);
      if (!this.formData.provinceCode) {
        this.$notify.warning({
          title: '温馨提示',
          message: '请先选择省份',
        });
      } else {
        // this.formData.cityCode = val;
        // this.$set(this.formData, 'cityCode', val);
      }
    },

    // 聚焦省份
    focusProvice(e) {
      if (!this.formData.areaCode) {
        this.$notify.warning({
          title: '温馨提示',
          message: '请先选择区域',
        });
        
        return false
      };
    },

    // 聚焦城市
    focusCity(e) {
      // console.log(e);
      if (!this.formData.areaCode) {
        this.$notify.warning({
          title: '温馨提示',
          message: '请先选择区域',
        });
        
        return false
      };
      if (!this.formData.provinceCode) {
        this.$notify.warning({
          title: '温馨提示',
          message: '请先选择省份',
        });
        
        return false
      }
    },

    // 确定
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
          this.handleEmitData();
        }
      });
    },

    // 组件通讯
    handleEmitData() {
      this.formData.licenCode          = this.formData.licenCode.trim();
      this.formData.licenceName        = this.formData.licenceName.trim();
      this.formData.bankAccName        = this.formData.bankAccName ? this.formData.bankAccName.trim() : '';
      this.formData.bankAccountNumber  = this.formData.bankAccountNumber ? this.formData.bankAccountNumber.trim() : '';
      this.formData.billingAddr        = this.formData.billingAddr ? this.formData.billingAddr.trim() : '';
      this.formData.billingPhone       = this.formData.billingPhone ? this.formData.billingPhone.trim() : '';
      this.formData.contactPers        = this.formData.contactPers ? this.formData.contactPers.trim() : '';
      this.formData.contactPersonPhone = this.formData.contactPersonPhone ? this.formData.contactPersonPhone.trim() : '';
      this.formData.legalPhone         = this.formData.legalPhone ? this.formData.legalPhone.trim() : '';
      this.formData.legalRepresent     = this.formData.legalRepresent ? this.formData.legalRepresent.trim() : '';
      this.formData.lessor             = this.formData.lessor.trim();
      this.formData.registerAddr       = this.formData.registerAddr ? this.formData.registerAddr.trim() : '';
      this.formData.socialCreditCode   = this.formData.socialCreditCode.trim();
      this.formData.email              = this.formData.email ? this.formData.email.trim() : '';
      this.$emit('formDataSubmit', {
        data: this.formData,
      });
    },

    // 取消
    handleGoToBack() {
      this.$router.push({
        path: '/rentManagement',
      });
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
</style>
