<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-11 16:33:36
 * @LastEditTime: 2020-10-15 16:50:25
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\verification\components\bankWaterModule.vue
-->
<template>
  <div class="bankWaterModule">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="16">
        <el-form
          :model="formData"
          ref="formData"
          label-width="120px"
          class="demo-ruleForm"
          :rules="rules"
          status-icon
        >
          <el-row :gutter="0">
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="交易时间"
                prop="tradeDate"
                v-show="!$formAtReadonly('tradeDate', formReadonly.hide)"
                class="form-item"
              >
                <el-date-picker
                  v-model="formData.tradeDate"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  style="width: 100%"
                  :disabled="$formAtReadonly('tradeDate', formReadonly.readonly)"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="银行单据号"
                prop="serialNumber"
                v-show="!$formAtReadonly('serialNumber', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.serialNumber"
                  maxlength="30"
                  placeholder=""
                  :disabled="$formAtReadonly('serialNumber', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="收款金额"
                prop="income"
                v-show="!$formAtReadonly('income', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  style="width: calc(100% - 32px)"
                  v-model="formData.income"
                  maxlength="15"
                  placeholder="请输入数字且最多保留两位小数"
                  :disabled="$formAtReadonly('income', formReadonly.readonly)"
                ></el-input>
                <span style="text-align: center; display: inline-block; width: 26px">元</span>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="收款账号"
                prop="bankAccountNo"
                v-show="!$formAtReadonly('bankAccountNo', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.bankAccountNo"
                  maxlength="30"
                  placeholder=""
                  :disabled="$formAtReadonly('bankAccountNo', formReadonly.readonly)"
                  @input="inputChange"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="收款名称"
                prop="companyName"
                v-show="!$formAtReadonly('companyName', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.companyName"
                  maxlength="50"
                  placeholder=""
                  :disabled="$formAtReadonly('companyName', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            

            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="收款开户行"
                prop="bankAccountName"
                v-show="!$formAtReadonly('bankAccountName', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.bankAccountName"
                  maxlength="50"
                  placeholder=""
                  :disabled="$formAtReadonly('bankAccountName', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="汇款名称"
                prop="sideAccountName"
                v-show="!$formAtReadonly('sideAccountName', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.sideAccountName"
                  maxlength="50"
                  placeholder=""
                  :disabled="$formAtReadonly('sideAccountName', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="汇款账号"
                prop="sideAccount"
                v-show="!$formAtReadonly('sideAccount', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.sideAccount"
                  maxlength="30"
                  :disabled="$formAtReadonly('sideAccount', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            
            <!-- <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="是否虚拟收款"
                prop
                v-show="!$formAtReadonly('', formReadonly.hide)"
                class="form-item"
              >
                <el-radio-group v-model="formData.radio" :disabled="$formAtReadonly('', formReadonly.readonly)">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="项目类别"
                prop="projectCategory"
                v-show="!$formAtReadonly('projectCategory', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.projectCategory"
                  maxlength="50"
                  placeholder=""
                  :disabled="$formAtReadonly('projectCategory', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="新台账标志"
                prop="newLedgerLogo"
                v-show="!$formAtReadonly('newLedgerLogo', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.newLedgerLogo"
                  maxlength="50"
                  placeholder=""
                  :disabled="$formAtReadonly('newLedgerLogo', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="代付标志"
                prop="paidLogo"
                v-show="!$formAtReadonly('paidLogo', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.paidLogo"
                  maxlength="50"
                  placeholder=""
                  :disabled="$formAtReadonly('paidLogo', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="20" :md="24" :lg="24" :xl="24">
              <el-form-item
                label="摘要"
                prop="digest"
                v-show="!$formAtReadonly('digest', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.digest"
                  type="textarea"
                  maxlength="300"
                  :autosize="{ minRows: 3, maxRows: 5}"
                  :disabled="$formAtReadonly('digest', formReadonly.readonly)"
                ></el-input>
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
          <el-button @click="handleGoToBack()">取 消</el-button>
          <el-button
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
import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';

export default {
  name: 'bankWaterModule',
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
        return {}
      }
    },
    // rowClick: {
    //   type: Function,
    //   default: function() {}
    // },
  },
  components: {},
  data() {
    // 匹配银行卡号
    const checkBankCode = (rule, value, callback) => {
      const reg = /^([1-9]{1})[0-9]+$/;
      if (!value) {
        return callback(new Error('银行账号不能为空'));
      }
      if (!reg.test(value)) {
        callback(new Error('银行账号格式错误'));
      } else {
        callback();
      }
    };

    // 验证数字且最多2位小数
    const checkNumber = (rule, value, callback) => {
      const reg = /^\d+(\.\d{1,2})?$/;
      if (!value) {
        return callback(new Error('收款金额不能为空'));
      }
      if (!reg.test(value)) {
        callback(new Error('收款金额格式错误'));
      } else {
        callback();
      }
    };

    // 匹配由数字和26个英文字母组成的字符串
    const checkCode = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9]+$/;
      if (!value) {
        return callback(new Error('银行流水单据号不能为空'));
      }
      if (!reg.test(value)) {
        callback(new Error('银行流水单据号格式错误：只能是数字、字母'));
      } else {
        callback();
      }
    };

    return {
      rules: {
        income: [
          { 
            required: true,
            validator: checkNumber,
            trigger: 'blur'
          }
        ],
        tradeDate: [
          { 
            required: true,
            message: '请选择交易时间',
            trigger: ['blur', 'change'],
          }
        ],
        serialNumber: [
          { 
            required: true,
            validator: checkCode,
            trigger: 'blur',
          }
        ],
        bankAccountNo: [
          { 
            required: true,
            validator: checkBankCode,
            trigger: 'blur',
          }
        ],
        companyName: [
          { 
            required: true,
            message: '请输入收款名称',
            trigger: ['blur', 'change'],
          }
        ],
        bankAccountName: [
          { 
            required: true,
            message: '请输入收款开户行',
            trigger: ['blur', 'change'],
          }
        ],
        sideAccount: [
          { 
            required: true,
            validator: checkBankCode,
            trigger: 'blur',
          }
        ],
        sideAccountName: [
          { 
            required: true,
            message: '请输入汇款名称',
            trigger: 'blur',
          }
        ],
      },
    };
  },
  computed: {},
  watch: {
    'formData.bankAccountNo'(newVal) {
      if (newVal) {
        console.log(newVal);
        this.queryBankAccountData(newVal);
      }
    }
  },
  created() {},
  mounted() {
    if (this.$formAtReadonly('*', this.formReadonly.readonly)) this.rules = {};
  },
  methods: {
    // 查询银行账号信息
    queryBankAccountData(bankAccount) {
      const url = common.queryBankInfoUrl;
      const params = {
        bankAccount: bankAccount,
        bankAccountName: '',
        bankName: '',
      };
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          // console.log(res);
          const data = res.data;
          if (!_.isEmpty(data.bankInfoList)) {
            this.formData.companyName = data.bankInfoList[0].bankAccountName;
            this.formData.bankAccountName = data.bankInfoList[0].bankName;
          } else {
            this.formData.companyName = '';
            this.formData.bankAccountName = '';
          }
        }
      })
    },

    inputChange(val) {
      // console.log(val);
      // this.queryBankAccountData(val);
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
      this.$emit('formDataSubmit', {
        data: this.formData,
      });
    },

    // 取消
    handleGoToBack() {
      this.$router.push({
        path: '/bankWaterList',
      });
    }
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
</style>
