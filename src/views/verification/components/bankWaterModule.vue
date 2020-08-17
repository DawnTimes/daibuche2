<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-11 16:33:36
 * @LastEditTime: 2020-08-14 17:48:04
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
                prop
                v-show="!$formAtReadonly('id', formReadonly.hide)"
                class="form-item"
              >
                <el-date-picker
                  v-model="formData.value1"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                  :disabled="$formAtReadonly('', formReadonly.readonly)"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="银行单据号"
                prop="systemCode"
                v-show="!$formAtReadonly('systemCode', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.systemCode"
                  maxlength="30"
                  placeholder=""
                  :disabled="$formAtReadonly('systemCode', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="收款名称"
                prop="systemName"
                v-show="!$formAtReadonly('systemName', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.systemName"
                  maxlength="30"
                  placeholder=""
                  :disabled="$formAtReadonly('systemName', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="收款账号"
                prop="username"
                v-show="!$formAtReadonly('username', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.username"
                  maxlength="30"
                  placeholder=""
                  :disabled="$formAtReadonly('username', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="收款开户行"
                prop="ipaddr"
                v-show="!$formAtReadonly('ipaddr', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.ipaddr"
                  maxlength="30"
                  placeholder=""
                  :disabled="$formAtReadonly('ipaddr', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="收款金额"
                prop="money"
                v-show="!$formAtReadonly('port', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  style="width: calc(100% - 32px)"
                  v-model="formData.money"
                  maxlength="15"
                  placeholder="请输入数字且最多保留两位小数"
                  :disabled="$formAtReadonly('port', formReadonly.readonly)"
                ></el-input>
                <span style="text-align: center; display: inline-block; width: 26px">元</span>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="汇款名称"
                prop="sch"
                v-show="!$formAtReadonly('sch', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.sch"
                  maxlength="30"
                  placeholder=""
                  :disabled="$formAtReadonly('sch', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="汇款账号"
                prop
                v-show="!$formAtReadonly('createUser', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.createUser"
                  maxlength="30"
                  :disabled="$formAtReadonly('createUser', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="是否虚拟收款"
                prop
                v-show="!$formAtReadonly('modifyTime', formReadonly.hide)"
                class="form-item"
              >
                <el-radio-group v-model="formData.radio" :disabled="$formAtReadonly('createTime', formReadonly.readonly)">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item
                label="摘要"
                prop
                v-show="!$formAtReadonly('createTime', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.createTime"
                  type="textarea"
                  maxlength="300"
                  :autosize="{ minRows: 3, maxRows: 5}"
                  :disabled="$formAtReadonly('createTime', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item
                label="备注"
                prop
                v-show="!$formAtReadonly('createTime', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.createTime"
                  type="textarea"
                  maxlength="300"
                  :autosize="{ minRows: 3, maxRows: 5}"
                  :disabled="$formAtReadonly('createTime', formReadonly.readonly)"
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
        return callback(new Error('银行单据号不能为空'));
      }
      if (!reg.test(value)) {
        callback(new Error('银行单据号格式错误'));
      } else {
        callback();
      }
    };

    return {
      rules: {
        money: [
          { 
            required: true,
            validator: checkNumber,
            trigger: 'blur'
          }
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
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
