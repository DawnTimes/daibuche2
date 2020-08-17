<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-13 10:31:50
 * @LastEditTime: 2020-08-14 11:46:54
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
                label="任务编号"
                prop
                v-show="!$formAtReadonly('systemCode', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.id"
                  maxlength="30"
                  placeholder
                  :disabled="$formAtReadonly('systemCode', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="车型代码"
                prop
                v-show="!$formAtReadonly('systemCode', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.id"
                  maxlength="30"
                  placeholder
                  :disabled="$formAtReadonly('systemCode', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="车型名称"
                prop
                v-show="!$formAtReadonly('systemCode', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.id"
                  maxlength="30"
                  placeholder
                  :disabled="$formAtReadonly('systemCode', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="数量"
                prop="number"
                v-show="!$formAtReadonly('systemCode', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model.number="formData.number"
                  maxlength="4"
                  placeholder
                  :disabled="$formAtReadonly('systemCode', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="生效年月"
                prop
                v-show="!$formAtReadonly('id', formReadonly.hide)"
                class="form-item"
              >
                <el-date-picker
                  v-model="formData.value1"
                  style="width: calc(100% - 32px)"
                  type="month"
                  value-format="yyyy-MM"
                  :disabled="$formAtReadonly('', formReadonly.readonly)"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="是否限牌"
                prop="systemName"
                v-show="!$formAtReadonly('systemName', formReadonly.hide)"
                class="form-item"
              >
                <el-radio-group v-model="formData.radio" :disabled="$formAtReadonly('', formReadonly.readonly)">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="城市"
                prop="systemCode"
                v-show="!$formAtReadonly('systemCode', formReadonly.hide)"
                class="form-item"
              >
                <el-select v-model="formData.value" filterable clearable placeholder="请选择">
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="$formAtReadonly('', formReadonly.readonly)"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="牌照商"
                prop="systemCode"
                v-show="!$formAtReadonly('systemCode', formReadonly.hide)"
                class="form-item"
              >
                <el-select v-model="formData.value" filterable clearable placeholder="请选择">
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="$formAtReadonly('', formReadonly.readonly)"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="原月租金"
                prop="money"
                v-show="!$formAtReadonly('port', formReadonly.hide)"
                class="form-item"
              >
                <el-input
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
                label="原月牌照费"
                prop="money"
                v-show="!$formAtReadonly('port', formReadonly.hide)"
                class="form-item"
              >
                <el-input
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
                label="原月租金合计"
                prop="money"
                v-show="!$formAtReadonly('port', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.money"
                  maxlength="15"
                  placeholder="请输入数字且最多保留两位小数"
                  :disabled="$formAtReadonly('port', formReadonly.readonly)"
                ></el-input>
                <span style="text-align: center; display: inline-block; width: 26px">元</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <!-- <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="原尾款"
                prop="money"
                v-show="!$formAtReadonly('port', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.money"
                  maxlength="15"
                  placeholder="请输入数字且最多保留两位小数"
                  :disabled="$formAtReadonly('port', formReadonly.readonly)"
                ></el-input>
                <span style="text-align: center; display: inline-block; width: 26px">元</span>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="新月租金"
                prop="money"
                v-show="!$formAtReadonly('port', formReadonly.hide)"
                class="form-item"
              >
                <el-input
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
                label="新月牌照费"
                prop="money"
                v-show="!$formAtReadonly('port', formReadonly.hide)"
                class="form-item"
              >
                <el-input
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
                label="新月租金合计"
                prop="money"
                v-show="!$formAtReadonly('port', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.money"
                  maxlength="15"
                  placeholder="请输入数字且最多保留两位小数"
                  :disabled="$formAtReadonly('port', formReadonly.readonly)"
                ></el-input>
                <span style="text-align: center; display: inline-block; width: 26px">元</span>
              </el-form-item>
            </el-col>
            <!-- <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="新尾款"
                prop="money"
                v-show="!$formAtReadonly('port', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.money"
                  maxlength="15"
                  placeholder="请输入数字且最多保留两位小数"
                  :disabled="$formAtReadonly('port', formReadonly.readonly)"
                ></el-input>
                <span style="text-align: center; display: inline-block; width: 26px">元</span>
              </el-form-item>
            </el-col> -->
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item
                label="备注"
                prop
                v-show="!$formAtReadonly('createTime', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.createTime"
                  style="width: calc(100% - 32px)"
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
          <el-button @click="handleGoToBack()" size="medium">取 消</el-button>
          <el-button
            v-show="!$formAtReadonly('saveBtn', formReadonly.hide)"
            type="primary"
            size="medium"
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
      cityOptions: [],
      rules: {
        money: [
          {
            required: true,
            validator: checkNumber,
            trigger: 'blur',
          },
        ],
        number: [
          { required: true, message: '数量不能为空'},
          { type: 'number', message: '数量必须为数字值'}
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
      console.log(this.fatherPath);
      this.$router.push({
        path: this.fatherPath,
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