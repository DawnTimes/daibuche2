<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-10 15:58:16
 * @LastEditTime: 2020-09-11 17:32:46
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\verification\addBankWater.vue
-->
<template>
  <div class="addBankWater">
    <div class="wrapper">
      <el-tabs type="card" v-model="formTemp.label" class="noBorder">
        <el-tab-pane class="title" name="info" label="新增银行流水单">
          <bankWater-module
            :formData="formData"
            :formReadonly="formReadonly"
            :loading="status.loading"
            v-on:formDataSubmit="handleFormDataSubmit"
          ></bankWater-module>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import bankWaterModule from './components/bankWaterModule';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
// import { mapState } from 'vuex';

export default {
  name: 'addBankWater',
  props: {},
  components: {
    bankWaterModule,
  },
  data() {
    return {
      formTemp: {
        label: 'info',
      },
      formData: {
        abstract: '',
        bankAccountName: '',
        bankAccountNo: '',
        companyName: '',
        income: '',
        serialNumber: '',
        sideAccount: '',
        sideAccountName: '',
        tradeDate: '',
      },
      formReadonly: {
        hide: [],
        readonly: [],
      },
      status: {
        loading: false,
      },
    };
  },
  computed: {
    // ...mapState('menu', {
    //   userId: store => store.userId
    // }),
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 新增提交
    handleFormDataSubmit(object) {
      const data = object.data;
      this.status.loading = true;
      const url = common.addBankStatementUrl;

      axios.post(url, data).then(res => {
        if (res.ec === '0') {
          this.$notify.success({
            title: '温馨提示！',
            message: '新增成功！'
          });

        Object.assign(this.formData, {
          abstract: '',
          bankAccountName: '',
          bankAccountNo: '',
          companyName: '',
          income: '',
          serialNumber: '',
          sideAccount: '',
          sideAccountName: '',
          tradeDate: '',
        });

          setTimeout(() => {
            this.$router.push({
              path: '/bankWaterList'
            });
          }, 1000);
          this.status.loading = false;

        } else {
          this.status.loading = false;
          this.$notify.error({
            title: '温馨提示！',
            message: res.em || '新增失败!'
          });
        }
      }).catch(err => {
        this.status.loading = false;
        this.$notify.error({
          title: '温馨提示！',
          message: err ? err.em : '新增失败，请联系管理员!',
        });
      });
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
</style>