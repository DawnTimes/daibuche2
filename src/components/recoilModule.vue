<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-11 13:38:39
 * @LastEditTime: 2020-08-13 09:21:04
 * @LastEditors: your name
 * @Description: 反冲弹框
 * @FilePath: \webcode2\src\components\recoilModule.vue
-->
<template>
  <div class="recoilDialog">
    <el-dialog width="30%" :close-on-click-modal='false' title="反冲" :visible.sync="recoilFormVisible">
      <el-form :model="recoilForm" label-width="90px" size="medium">
        <el-form-item label="银行单据号">
          <el-input v-model="recoilForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="合同编号">
          <el-input v-model="recoilForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="期数">
          <el-input v-model="recoilForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="车架号">
          <el-input v-model="recoilForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="recoilForm.name" type="textarea" :autosize="{ minRows: 3, maxRows: 4}"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="recoilFormVisible = false" plain size="medium">取 消</el-button>
        <el-button type="primary" @click="recoilSubmit" :loading="loading" size="medium">反 冲</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    recoilForm: {
      type: Object,
      default: () => {
        return {}
      },
    },
    // 不要在props定义弹框的显示，不然取消、关闭的时候不会报错，在data里定义，然后利用父组件调用子组件函数的方法显示弹框
    // recoilFormVisible: {
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
      recoilFormVisible: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 反冲提交
    recoilSubmit() {
      // 防止重复提交
      if(this.loading === false) {
        this.handleEmitData();
      }
    },

    // 组件通讯
    handleEmitData() {
      this.$emit('formDataSubmit', {
        data: this.recoilForm,
      })
    },

    // 关闭
    // handleColse() {
    //   this.recoilFormVisible = false;
    // },

    // 利用父组件调用子组件的函数传参来显示弹框
    isShow(isVisible) {
      this.recoilFormVisible = isVisible;
    }
  },
  filters: {
    function() {},
  },
};
</script>

<style lang="scss">
  .recoilDialog {
    .dialog-footer {
      text-align: center;
    }

    .el-dialog__body {
      padding: 20px 20px 10px 10px;
    }
  }

</style>