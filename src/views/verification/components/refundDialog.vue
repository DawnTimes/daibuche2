<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-11 13:38:39
 * @LastEditTime: 2020-08-13 09:22:36
 * @LastEditors: your name
 * @Description: 核销弹框
 * @FilePath: \webcode2\src\views\verification\components\refundDialog.vue
-->
<template>
  <div class="refundDialog">
    <el-dialog width="30%" :close-on-click-modal='false' title="退款" :visible.sync="refundFormVisible">
      <el-form :model="refundForm" label-width="100px" size="medium">
        <el-form-item label="银行单据号">
          <el-input v-model="refundForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="对方账户名称">
          <el-input v-model="refundForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="对方账户">
          <el-input v-model="refundForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="退款金额">
          <el-input v-model="refundForm.name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="refundForm.name" type="textarea" :autosize="{ minRows: 3, maxRows: 4}"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refundFormVisible = false" size="medium" plain>取 消</el-button>
        <el-button type="primary" @click="refundSubmit" :loading="loading" size="medium">退 款</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    refundForm: {
      type: Object,
      default: () => {
        return {}
      },
    },
    // 不要在props定义弹框的显示，不然取消、关闭的时候不会报错，在data里定义，然后利用父组件调用子组件函数的方法显示弹框
    // refundFormVisible: {
    //   type: Boolean,
    //   default: false,
    // },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {
      refundFormVisible: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 核销提交
    refundSubmit() {
      // 防止重复提交
      if(this.loading === false) {
        this.handleEmitData();
      }
    },

    // 组件通讯
    handleEmitData() {
      this.$emit('formDataSubmit', {
        data: this.refundForm,
      })
    },

    // 关闭
    // handleColse() {
    //   this.refundFormVisible = false;
    // },

    // 利用父组件调用子组件的函数传参来显示弹框
    isShow(isVisible) {
      this.refundFormVisible = isVisible;
    }
  },
  filters: {
    function() {},
  },
};
</script>

<style lang="scss">
  .refundDialog {
    .dialog-footer {
      text-align: center;
    }

    .el-dialog__body {
      padding: 20px 20px 10px 10px;
    }
  }

</style>