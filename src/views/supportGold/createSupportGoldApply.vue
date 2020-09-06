<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-18 10:04:11
 * @LastEditTime: 2020-08-18 10:32:42
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

export default {
  name: 'createSupportGoldApply',
  props: {},
  components: {
    supportGoldModule,
  },
  data() {
    return {
      activeName: 'first',
      formData: {},
      status: {
        loading: false,
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    formDataSubmit(data) {},
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
</style>
