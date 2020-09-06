<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-13 10:31:50
 * @LastEditTime: 2020-09-04 17:40:56
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
                v-show="!$formAtReadonly('idCode', formReadonly.hide)"
                class="form-item"
              >
                <el-input v-model="formData.id" maxlength="30" placeholder :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="车型代码"
                prop
                v-show="!$formAtReadonly('systemCode', formReadonly.hide)"
                class="form-item"
              >
                <el-input v-model="formData.id" maxlength="30" placeholder :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="车型名称"
                prop
                v-show="!$formAtReadonly('systemCode', formReadonly.hide)"
                class="form-item"
              >
                <el-input v-model="formData.id" maxlength="30" placeholder :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="数量"
                prop
                v-show="!$formAtReadonly('systemCode', formReadonly.hide)"
                class="form-item"
              >
                <el-input v-model="formData.number" maxlength="4" placeholder :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="生效年月"
                prop="effectiveMonth"
                v-show="!$formAtReadonly('effectiveMonth', formReadonly.hide)"
                class="form-item"
              >
                <el-date-picker
                  v-model="formData.effectiveMonth"
                  type="month"
                  value-format="yyyy-MM"
                  :disabled="$formAtReadonly('effectiveMonth', formReadonly.readonly)"
                  placeholder="选择月份"
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
                <el-radio-group
                  v-model="formData.radio"
                  :disabled="$formAtReadonly('', formReadonly.readonly)"
                >
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="城市"
                prop="city"
                v-if="!$formAtReadonly('city', formReadonly.hide)"
                class="form-item"
              >
                <!-- <el-select v-model="formData.city" filterable clearable placeholder="请选择">
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="$formAtReadonly('city', formReadonly.readonly)"
                  ></el-option>
                </el-select>-->

                <el-cascader v-model="formData.value" filterable :options="areaArr" :props="props" style="width: 100%"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="牌照商"
                prop="Licence"
                v-if="!$formAtReadonly('Licence', formReadonly.hide)"
                class="form-item"
              >
                <el-select v-model="formData.Licence" filterable clearable placeholder="请选择">
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="$formAtReadonly('Licence', formReadonly.readonly)"
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
            </el-col>-->
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
            </el-col>-->
            <el-col :xs="24" :sm="20" :md="24" :lg="24" :xl="24">
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
          <el-button @click="handleGoToBack1()" size="medium" v-show="!$formAtReadonly('cancelBtn1', formReadonly.hide)">取 消</el-button>
          <el-button @click="handleGoToBack2()" size="medium" v-show="!$formAtReadonly('cancelBtn2', formReadonly.hide)">取 消</el-button>
          <el-button @click="handleGoToBack3()" size="medium" v-show="!$formAtReadonly('cancelBtn3', formReadonly.hide)">取 消</el-button>
          <el-button
            v-show="!$formAtReadonly('saveBtn', formReadonly.hide)"
            type="primary"
            size="medium"
            @click="handleSubmit('formData')"
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
let id = 0;

import axios from '@/common/axios.js';
import common from '@/common/common.js';

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
        effectiveMonth: [
          {
            required: true,
            message: '生效年月不能为空',
            trigger: ['blur', 'change'],
          },
        ],
        city: [
          {
            required: true,
            message: '城市不能为空',
            trigger: ['blur', 'change'],
          },
        ],
        Licence: [
          {
            required: true,
            message: '牌照商不能为空',
            trigger: ['blur', 'change'],
          },
        ],
      },

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
      ],

      cascaderProps: {
        lazy: true,
        lazyLoad(node, resolve) {
          console.log(node, resolve);
          
          const { level } = node;
          console.log(Array.from({ length: level + 1 }));
          setTimeout(() => {
            console.log(Array.from({ length: level + 1 }));
            const nodes = Array.from({ length: level + 1 }).map((item) => ({
              value: ++id,
              label: `选项${id}`,
              leaf: level >= 2,
            }));
            console.log(nodes);
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes);
          }, 100);
        },
      },

      props: {
        value: 'value',
        label: 'label',
        children: 'children',
      },
    };
  },
  computed: {},
  watch: {},
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