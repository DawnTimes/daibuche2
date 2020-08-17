<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-13 11:13:20
 * @LastEditTime: 2020-08-14 11:46:41
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\rent\baseInformationDetail.vue
-->

<template>
  <div class="baseInformationDetail">
    <div class="wrapper">
      <el-tabs type="card" v-model="formTemp.label" class="noBorder">
        <el-tab-pane class="title" name="info" label="基本信息">
          <baseInformationDetail-module
            :formData="formData"
            :formReadonly="formReadonly"
            :loading="status.loading"
            :fatherPath="fatherPath"
            v-on:formDataSubmit="handleFormDataSubmit"
          ></baseInformationDetail-module>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import baseInformationDetailModule from './components/baseInformationDetailModule';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
// import { mapState } from 'vuex';

export default {
  name: 'baseInformationDetail',
  props: {},
  components: {
    baseInformationDetailModule,
  },
  data() {
    return {
      formTemp: {
        label: 'info',
      },
      formData: {
        status: 'Y',
      },
      formReadonly: {
        hide: ['saveBtn'],
        readonly: [],
      },
      status: {
        loading: false,
      },
      fatherPath: '',
    };
  },
  computed: {
    // ...mapState('menu', {
    //   userId: store => store.userId
    // }),
  },
  watch: {},
  created() {},
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例
      vm.fatherPath = from.path;
    });
  },
  mounted() {},
  methods: {
    handleFormDataSubmit() {},
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
  .baseInformationDetail {
    
  }
</style>