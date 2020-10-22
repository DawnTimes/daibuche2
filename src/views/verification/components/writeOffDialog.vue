<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-11 13:38:39
 * @LastEditTime: 2020-10-21 18:10:19
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
      <el-form :model="writeOffForm" ref="writeOffForm" :rules="rules" label-width="110px" size="medium">
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
          <!-- <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-form-item label="牌照商">
              <el-input v-model="writeOffForm.name" disabled></el-input>
            </el-form-item>
          </el-col> -->
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
            <el-form-item label="代付标志" v-show="writeOffForm.isDebt == 'Y'">
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
        <el-button @click="writeOffFormVisible = false" size="medium" plain>取 消</el-button>
        <el-button type="primary" @click="writeOffSubmit('writeOffForm')" :loading="loading" size="medium">确定核销</el-button>
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
    padding: 20px 20px 10px 10px;
  }
}
</style>