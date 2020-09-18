<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-18 10:04:11
 * @LastEditTime: 2020-09-17 18:07:53
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\supportGold\createSupportGoldApply.vue
-->


<template>
  <div class="createSupportGoldApply">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="支援金申请" name="first">
        <supportGold-module
          :formData="formData"
          :loading="status.loading"
          @formDataSubmit="formDataSubmit"
        ></supportGold-module>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import supportGoldModule from './components/supportGoldModule';
import { mapState } from 'vuex';
import common from '@/common/common.js';

export default {
  name: 'createSupportGoldApply',
  props: {},
  components: {
    supportGoldModule,
  },
  data() {
    return {
      activeName: 'first',
      formData: {
        creater: '',
        applyDate: '',
        agList: [
          { agId: '', reason: '' }
        ],
      },
      status: {
        loading: false,
      },
    };
  },
  computed: {
    ...mapState({
      userId: store => store.userId
    })
  },
  watch: {},
  created() {
    this.formData.creater = this.userId;
  },
  mounted() {},
  methods: {
    // 确定申请
    formDataSubmit(obj) {
      const data = obj.data;
      const url = common.supportFundUrl;
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
</style>
