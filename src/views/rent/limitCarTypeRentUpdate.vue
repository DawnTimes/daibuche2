<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-13 11:13:20
 * @LastEditTime: 2020-08-13 16:32:00
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\rent\limitCarTypeRentUpdate.vue
-->

<template>
  <div class="limitCarTypeRentUpdate">
    <div class="wrapper">
      <el-tabs type="card" v-model="formTemp.label" class="noBorder">
        <el-tab-pane class="title" name="info" label="限牌地租金修改">
          <rentUpdate-module
            :formData="formData"
            :formReadonly="formReadonly"
            :loading="status.loading"
            :fatherPath="fatherPath"
            v-on:formDataSubmit="handleFormDataSubmit"
          ></rentUpdate-module>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import rentUpdateModule from './components/rentUpdateModule';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
// import { mapState } from 'vuex';

export default {
  name: 'limitCarTypeRentUpdate',
  props: {},
  components: {
    rentUpdateModule,
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
        hide: [],
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
    // 新增提交
    handleFormDataSubmit(object) {
      const data = object.data;
      this.status.loading = true;
      // const url = common.systemAddUrl;

      // axios.post(url, data).then(res => {
      //   if (res.code === '0') {
      //     this.$notify.success({
      //       title: '温馨提示！',
      //       message: '新增成功！'
      //     });

      //     setTimeout(() => {
      //       this.$router.push({
      //         path: '/systemList'
      //       });
      //     }, 1000);
      //     this.status.loading = false;
      //     this.formData = {
      //       status: 'Y',
      //       createUser: this.userId
      //     }
      //   } else {
      //     this.status.loading = false;
      //     this.$notify.error({
      //       title: '温馨提示！',
      //       message: res.msg || '新增失败!'
      //     });
      //   }
      // }).catch(err => {
      //   this.status.loading = false;
      //   this.$notify.error({
      //     title: '温馨提示！',
      //     message: err ? err.em : '新增失败，请联系管理员!',
      //   });
      // });
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
</style>