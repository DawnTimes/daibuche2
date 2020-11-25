<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-25 14:02:13
 * @LastEditTime: 2020-11-18 15:25:53
 * @LastEditors: your name
 * @Description: 新增电催记录
 * @FilePath: \webcode2\src\views\overdueCollection\components\addRecordModule.vue
-->

<template>
  <div class="addRecordModule">
    <el-row :gutter="0">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="14">
        <el-form
          :model="formData"
          ref="formData"
          label-width="120px"
          class="demo-ruleForm"
          :rules="rules"
          status-icon
          size="medium"
        >
          <el-row :gutter="0">
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="电催人员"
                prop="electricExpeditor"
                v-show="!$formAtReadonly('electricExpeditor', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.electricExpeditor"
                  maxlength="30"
                  placeholder=""
                  :disabled="$formAtReadonly('electricExpeditor', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="电催日期"
                prop="electricDate"
                v-show="!$formAtReadonly('electricDate', formReadonly.hide)"
                class="form-item"
              >
                <el-date-picker
                  v-model="formData.electricDate"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  style="width: 100%"
                  :disabled="$formAtReadonly('electricDate', formReadonly.readonly)"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="最新联系人"
                prop="newLink"
                v-show="!$formAtReadonly('newLink', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.newLink"
                  maxlength="30"
                  placeholder=""
                  :disabled="$formAtReadonly('newLink', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
              <el-form-item
                label="承诺还款日期"
                prop="promisedRepayDate"
                v-show="!$formAtReadonly('promisedRepayDate', formReadonly.hide)"
                class="form-item"
              >
                <el-date-picker
                  v-model="formData.promisedRepayDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                  :disabled="$formAtReadonly('promisedRepayDate', formReadonly.readonly)"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="20" :md="24" :lg="24" :xl="24">
              <el-form-item
                label="逾期原因"
                prop="overdueReason"
                v-show="!$formAtReadonly('overdueReason', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.overdueReason"
                  type="textarea"
                  maxlength="300"
                  show-word-limit
                  :autosize="{ minRows: 2, maxRows: 5}"
                  :disabled="$formAtReadonly('overdueReason', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="24" :lg="24" :xl="24">
              <el-form-item
                label="电催情况"
                prop="electricCatalysis"
                v-show="!$formAtReadonly('electricCatalysis', formReadonly.hide)"
                class="form-item"
              >
                <el-input
                  v-model="formData.electricCatalysis"
                  type="textarea"
                  maxlength="300"
                  show-word-limit
                  :autosize="{ minRows: 2, maxRows: 5}"
                  :disabled="$formAtReadonly('electricCatalysis', formReadonly.readonly)"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
        <div style="padding: 5px 0 5px 0; text-align: center">
          <el-button size="medium" @click="handleGoToBack()">退 出</el-button>
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
export default {
  name: '',
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formReadonly: {
      type: Object,
      default: () => {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  components: {

  },
  data() {
    return {
      rules: {
        electricExpeditor: [{ required: true, message: '请输入电催人员姓名', trigger: 'blur'}],
        electricCatalysis: [{ required: true, message: '请输入电催人情况', trigger: 'blur'}],
        newLink: [{ required: false, message: '请输入最新联系人', trigger: 'blur'}],
        electricDate: [{ required: true, message: '请输入电催日期', trigger: 'change'}],
        promisedRepayDate: [{ required: false, message: '请输入承诺还款日期', trigger: 'change'}],
      },
    };
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    if (this.$formAtReadonly('*', this.formReadonly.readonly)) this.rules = {};
  },
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
      this.formData.newLink           = this.formData.newLink.trim();
      this.formData.overdueReason     = this.formData.overdueReason.trim();
      this.formData.electricCatalysis = this.formData.electricCatalysis.trim();
      this.$emit('formDataSubmit', {
        data: this.formData,
      });
    },

    // 退出
    handleGoToBack() {
      this.$router.push({
        path: '/overduceCollectionList'
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

</style>
