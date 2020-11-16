<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-13 11:13:20
 * @LastEditTime: 2020-11-15 15:38:04
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\rent\editRent.vue
-->

<template>
  <div class="editRent">
    <div class="wrapper">
      <el-tabs type="card" v-model="formTemp.label" class="noBorder">
        <el-tab-pane class="title" name="info" label="租金编辑">
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
import moment from 'moment';

export default {
  name: 'editRent',
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
        modId: '',
        isLimitLicence: 'Y',
        modelCode: '',
        modelName: '',
        licenceCode: '',
        licenceName: '',
        cityCode: '',
        cityName: '',
        monthlyRent: '',
        rentLicenceFee: '0',
        totalMonthlyRent: '',
        seriesName: '',
        num: '',
        approvalStatus: '1',
        newLicenceFee: '0',
        newMonthlyRent: '',
        newtotalMonthlyRent: '',
        brandName: '',
        modifier: '',
        remark: '',
        validDate: '',
      },
      formReadonly: {
        hide: ['id', 'saveBtn', 'cancelBtn1', 'cancelBtn2'],
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
    this.formData.id = query.modId;
    this.formData.licenceCode = query.licenceName;
    this.formData.licenceName = query.licenceCode;
    console.log(query);
    console.log(this.formData);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例
      vm.fatherPath = from.path;
    });
  },
  mounted() {
    // 判断是否是限牌的，隐藏城市、牌照商等信息
    if (this.formData.isLimitLicence === 'N') {
      this.formData.totalMonthlyRent = this.formData.monthlyRent;
      this.formReadonly.hide.push('licenceName', 'cityName', 'rentLicenceFee', 'newLicenceFee', 'totalMonthlyRent', 'newtotalMonthlyRent')
    }

    if (this.formData.isLimitLicence === 'Y') {
      this.formData.totalMonthlyRent = this.formData.monthlyRent * 1 + this.formData.rentLicenceFee * 1 + '';
    }
  },
  methods: {
    // 提交
    handleFormDataSubmit(object) {
      const data = object.data;
      // delete data.licenceName;
      // delete data.cityName;
      this.status.loading = true;
      const url = common.updateRentUrl;
      const params = {
        id: data.id,
        approvalStatus: data.approvalStatus,
        modifier: data.modifier,
        newLicenceFee: data.newLicenceFee,
        newMonthlyRent: data.newMonthlyRent,
        newtotalMonthlyRent: data.newtotalMonthlyRent,
        validDate:  moment(data.validDate).format('YYYY-MM-DD'),
        remark:  data.remark,
      };

      axios.post(url, params).then(res => {
        if (res.ec === '0') {
          this.$notify.success({
            title: '温馨提示！',
            message: '编辑成功！'
          });

          setTimeout(() => {
            this.$router.push({
              path: '/rentApplyList'
            });
          }, 1000);
          this.status.loading = false;
          Object.assign(this.formData, {
            modId: '',
            isLimitLicence: 'Y',
            modelCode: '',
            modelName: '',
            licenceCode: '',
            licenceName: '',
            cityCode: '',
            cityName: '',
            monthlyRent: '',
            rentLicenceFee: '0',
            totalMonthlyRent: '',
            seriesName: '',
            num: '',
            approvalStatus: '1',
            newLicenceFee: '0',
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
            message: res.em || '编辑失败!'
          });
        }
      }).catch(err => {
        this.status.loading = false;
        this.$notify.error({
          title: '温馨提示！',
          message: err ? err.em : '编辑失败，请联系管理员!',
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