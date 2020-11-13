<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-11 13:38:39
 * @LastEditTime: 2020-11-13 18:49:45
 * @LastEditors: your name
 * @Description: 核销弹框
 * @FilePath: \webcode2\src\views\verification\components\writeOffDialog.vue
-->
<template>
  <div class="writeOffDialog">
    <el-dialog
      width="50%"
      :close-on-click-modal="false"
      title="核销"
      :visible.sync="writeOffFormVisible"
      :destroy-on-close="true"
    >
      <el-form :model="writeOffForm" ref="writeOffForm" :rules="rules" label-width="120px" size="small">
        <el-row :gutter="0">
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-form-item label="银行单据号">
              <el-input v-model="writeOffForm.serialNumber" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-form-item label="承租人/牌照商">
              <el-input v-model="writeOffForm.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-form-item label="合同编号">
              <el-input v-model="writeOffForm.contractNumber" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-form-item label="期数">
              <el-input v-model="writeOffForm.nper" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-form-item label="是否代付" prop="isDebt" class="form-item">
              <el-radio-group v-model="writeOffForm.isDebt">
                <el-radio label="Y">是</el-radio>
                <el-radio label="N">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <!-- <el-form-item label="车辆数量">
          <el-input v-model="writeOffForm.name" disabled></el-input>
            </el-form-item>-->
            <el-form-item label="代付标志" prop="debtIdentification" v-if="writeOffForm.isDebt == 'Y'">
              <el-input
                v-model="writeOffForm.debtIdentification"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 3}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="备注">
              <el-input
                v-model="writeOffForm.remark"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 4}"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="writeOffFormVisible = false" size="small" plain>取 消</el-button>
        <el-button type="primary" @click="writeOffSubmit('writeOffForm')" :loading="loading" size="small">确定核销</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    writeOffForm: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 不要在props定义弹框的显示，不然取消、关闭的时候不会报错，在data里定义，然后利用父组件调用子组件函数的方法显示弹框
    // writeOffFormVisible: {
    //   type: Boolean,
    //   default: false,
    // },
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
    return {
      writeOffFormVisible: false,
      rules: {
        isDebt: [
          {
            required: true,
            message: '请选择是否代付',
            trigger: ['blur', 'change'],
          },
        ],
        debtIdentification: [
          {
            required: true,
            message: '请输入代付标志',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 核销提交
    writeOffSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 防止重复提交
          if (this.loading === false) {
            this.handleEmitData();
          }
        } else {
          return false;
        }
      });
      
    },

    // 组件通讯
    handleEmitData() {
      this.writeOffForm.debtIdentification = this.writeOffForm.debtIdentification.trim();
      this.writeOffForm.remark = this.writeOffForm.remark.trim();
      this.$emit('formDataSubmit', {
        data: this.writeOffForm,
      });
    },

    // 关闭
    // handleColse() {
    //   this.writeOffFormVisible = false;
    // },

    // 利用父组件调用子组件的函数传参来显示弹框
    isShow(isVisible) {
      this.writeOffFormVisible = isVisible;
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style lang="scss">
.writeOffDialog {
  .dialog-footer {
    text-align: center;
  }

  .el-dialog__body {
    padding: 10px;
  }

  .el-dialog__title {
    font-weight: bold;
  }
}

.writeOffDialog .el-form-item__label, .hearderBoxNerp .el-input__inner {
  font-size: 13px;
}
</style>