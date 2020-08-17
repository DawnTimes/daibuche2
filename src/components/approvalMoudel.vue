
<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-12 18:11:48
 * @LastEditTime: 2020-08-14 13:41:38
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\components\approvalMoudel.vue
 * @可以输入预定的版权声明、个性签名、空行等
 -->

<template>
  <div class="approvalMoudel">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
        <el-form
          :model="formData"
          ref="formData"
          label-width="100px"
          class="demo-ruleForm"
          :rules="rules"
          status-icon
          size="medium"
        >
          <el-row :gutter="0">
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="审批操作:"
                prop="approvalOperation"
                v-show="!$formAtReadonly('approvalOperation', formReadonly.hide)"
                class="form-item"
              >
                <el-select
                  style="width: 100%"
                  v-model="formData.approvalOperation"
                  placeholder
                  :disabled="$formAtReadonly('approvalOperation', formReadonly.readonly)"
                  @change="handleChange"
                >
                  <el-option
                    v-for="item in dictOperationTemp"
                    :key="item.columnValueCode"
                    :label="item.columnValueDesc"
                    :value="item.columnValueCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="审批人:"
                prop="verson"
                v-show="!$formAtReadonly('verson', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.approvalUser"
                  maxlength="30"
                  :disabled="$formAtReadonly('verson', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="审批时间:"
                prop="approvalUser"
                v-show="!$formAtReadonly('approvalUser', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.approvalUser"
                  maxlength="30"
                  :disabled="$formAtReadonly('approvalUser', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="24" :lg="24" :xl="24">
              <el-form-item
                label="审批意见:"
                prop
                v-show="!$formAtReadonly('approvalOpinion', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.approvalOpinion"
                  maxlength="1000"
                  :autosize="{ minRows: 4, maxRows: 6}"
                  type="textarea"
                  clearable
                  show-word-limit
                  :disabled="$formAtReadonly('approvalOpinion', formReadonly.readonly)"
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
          <el-button size="medium" @click="handleGoToBack()">取 消</el-button>
          <el-button size="medium" type="primary" plain @click="prevStep">上一步</el-button>
          <el-button
            v-show="!$formAtReadonly('saveBtn', formReadonly.hide)"
            size="medium"
            type="primary"
            @click="handleSubmit('formData')"
            :loading="loading"
          >审批提交</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import _ from 'lodash';

import moment from 'moment';
import { queryDict } from '@/api/index.js';

export default {
  name: 'approvalMoudel',
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    formReadonly: {
      type: Object,
      default: () => {
        return {};
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      // 审批操作下拉选项
      approvalOptions: [
        { id: 'approved', name: '审批通过' },
        { id: 'refuse', name: '审批拒绝' },
      ],

      rules: {
        approvalOperation: [
          {
            required: true,
            message: '请选择审批操作',
            trigger: 'change',
          },
        ],
      },

      // 数据字典集
      dictOperationTemp: [],
    };
  },

  computed: {},
  watch: {},
  created() {
    this.getDictStatus('approval_operation', 'UNIFY_INTERFACE_APPROVAL');
    // this.getSystemOptions();
    // console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
  },
  mounted() {
    if (this.$formAtReadonly('*', this.formReadonly.readonly)) this.rules = {};
  },
  methods: {
    // 获取状态数据字典
    getDictStatus(columnName, tabName) {
      const data = {
        columnName: columnName,
        tabName: tabName,
      };
      queryDict(data).then((res) => {
        if (res.code === '0') {
          this.dictOperationTemp = res.data.dictList;
        }
      });
    },

    // 确定提交
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
          // 审批状态改为待提交
          this.formData.approvalStatus = 'toBeSubmit';
          this.handleEmitData();
        }
      });
    },

    // 组件通讯
    handleEmitData() {
      const params = {
        approvalOperation: this.formData.approvalOperation, // 审批操作
        verson: this.formData.verson, // 版本
        approvalUser: this.formData.approvalUser, // 创建人
        id: this.formData.id || null, // id
        approvalOpinion: this.formData.approvalOpinion || null, // 审批意见
      };
      this.$emit('formDataSubmit', {
        data: params,
      });
    },

    // 取消
    handleGoToBack() {
      this.$router.push({
        path: '/approvalList',
      });
    },

    // 上一步
    prevStep() {
      this.$emit('prevStep', {
        data: 'first',
      });
    },

    handleChange(val) {
      // console.log(val)
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style lang="scss">
.approvalMoudel {
  // padding-top: 40px;
}
</style>
