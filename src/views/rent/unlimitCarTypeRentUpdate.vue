<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-13 11:13:20
 * @LastEditTime: 2020-11-04 18:24:05
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\rent\unlimitCarTypeRentUpdate.vue
-->

<template>
  <div class="unlimitCarTypeRentUpdate">
    <div class="wrapper">
      <el-tabs type="card" v-model="formTemp.label" class="noBorder">
        <el-tab-pane class="title" name="info" label="非限牌地租金修改">
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
import { mapState } from 'vuex';

export default {
  name: 'unlimitCarTypeRentUpdate',
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
        isLimitLicence: 'N',
        modelCode: '',
        modelName: '',
        monthlyRent: '',
        totalMonthlyRent: '',
        seriesName: '',
        num: '',
        approvalStatus: '1',
        newMonthlyRent: '',
        newtotalMonthlyRent: '',
        brandName: '',
        modifier: '',
        remark: '',
        validDate: '',
        rentLicenceFee: '0',
        newLicenceFee: '0',
      },
      formReadonly: {
        hide: ['id', 'cityName', 'licenceName', 'rentLicenceFee', 'totalMonthlyRent', 'newLicenceFee', 'newtotalMonthlyRent', 'cancelBtn1', 'cancelBtn3'],
        readonly: [],
      },
      status: {
        loading: false,
      },
      fatherPath: '',
    };
  },
  computed: {
    ...mapState({
      userId: store => store.userId
    }),
  },
  watch: {},
  created() {
    const query = JSON.parse(this.$route.query.row);
    Object.assign(this.formData, query);
    this.formData.modifier = this.userId;
    // 非限牌租金合计等于租金
    this.formData.totalMonthlyRent = this.formData.monthlyRent;
    // console.log(query);
    console.log(this.formData);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例
      vm.fatherPath = from.path;
    });
  },
  mounted() {},
  methods: {
    // 提交
    handleFormDataSubmit(object) {
      const data = object.data;
      delete data.rowId;
      // delete data.licenceName;
      // delete data.cityName;
      this.status.loading = true;
      const url = common.rentSubmitUrl;

      axios.post(url, data).then(res => {
        if (res.ec === '0') {
          this.$notify.success({
            title: '温馨提示！',
            message: '修改成功！'
          });

          setTimeout(() => {
            this.$router.push({
              path: '/unlimitCarTypeList'
            });
          }, 1000);
          this.status.loading = false;
          Object.assign(this.formData, {
            isLimitLicence: 'Y',
            modelCode: '',
            modelName: '',
            monthlyRent: '',
            totalMonthlyRent: '',
            seriesName: '',
            num: '',
            approvalStatus: '1',
            newMonthlyRent: '',
            newtotalMonthlyRent: '',
            brandName: '',
            modifier: this.userId,
            remark: '',
            // validDate: '',
            rentLicenceFee: '0',
            newLicenceFee: '0',
          });
        } else {
          this.status.loading = false;
          this.$notify.error({
            title: '温馨提示！',
            message: res.em || '修改失败!'
          });
        }
      }).catch(err => {
        this.status.loading = false;
        this.$notify.error({
          title: '温馨提示！',
          message: err ? err.em : '修改失败，请联系管理员!',
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