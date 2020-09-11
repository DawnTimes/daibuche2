<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-13 11:13:20
 * @LastEditTime: 2020-09-09 17:19:45
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
import { mapState } from 'vuex';

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
        isLimitLicence: 'Y',
        modelCode: '',
        modelName: '',
        licenceCode: '',
        licenceName: '',
        cityCode: '',
        cityName: '',
        monthlyRent: '',
        rentLicenceFee: '',
        totalMonthlyRent: '',
        seriesName: '',
        num: '',
        approvalStatus: '1',
        newLicenceFee: '',
        newMonthlyRent: '',
        newtotalMonthlyRent: '',
        brandName: '',
        modifier: '',
        remark: '',
      },
      formReadonly: {
        hide: ['id', 'modelCode', 'cancelBtn2', 'cancelBtn3'],
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
    // console.log(this.formData);
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
              path: '/limitCarTypeList'
            });
          }, 1000);
          this.status.loading = false;
          Object.assign(this.formData, {
            isLimitLicence: 'Y',
            modelCode: '',
            modelName: '',
            licenceCode: '',
            licenceName: '',
            cityCode: '',
            cityName: '',
            monthlyRent: '',
            rentLicenceFee: '',
            totalMonthlyRent: '',
            seriesName: '',
            num: '',
            approvalStatus: '1',
            newLicenceFee: '',
            newMonthlyRent: '',
            newtotalMonthlyRent: '',
            brandName: '',
            modifier: this.userId,
            remark: '',
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