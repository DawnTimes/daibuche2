<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-19 15:27:34
 * @LastEditTime: 2020-11-16 11:33:21
 * @LastEditors: your name
 * @Description: 登记弹窗
 * @FilePath: \webcode2\src\views\supportGold\components\editDialog.vue
-->


<template>
  <div class="editSupportDialog">
    <el-dialog
      width="30%"
      :close-on-click-modal="false"
      title="支援金编辑"
      :visible.sync="editFormVisible"
    >
      <el-form :model="editForm" label-width="100px" size="medium">
        <el-form-item label="支援金id">
          <el-input v-model="editForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="支援金月份">
          <el-input v-model="editForm.yearMonth" disabled></el-input>
        </el-form-item>
        <el-form-item label="批次号">
          <el-input v-model="editForm.batchNumber" disabled></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            v-model="editForm.remark"
            type="textarea"
            maxlength="500"
            :autosize="{ minRows: 3, maxRows: 4}"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false" plain size="medium">取 消</el-button>
        <el-button type="primary" @click="editSubmit" :loading="loading" size="medium">登 记</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'editDialog',
  props: {
    editForm: {
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
      editFormVisible: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 编辑提交
    editSubmit() {
      // 防止重复提交
      if (this.loading === false) {
        this.handleEmitData();
      }
    },

    // 组件通讯
    handleEmitData() {
      this.editForm.remark = this.editForm.remark.trim();
      this.$emit('formDataSubmit', {
        data: this.editForm,
      });
    },

    // 利用父组件调用子组件的函数传参来显示弹框
    isShow(isVisible) {
      this.editFormVisible = isVisible;
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style lang="scss">
.editSupportDialog {
  .dialog-footer {
    text-align: center;
  }

  .el-dialog__body {
    padding: 10px 20px 0px 10px;
  }
}
</style>
