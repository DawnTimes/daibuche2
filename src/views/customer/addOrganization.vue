<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-26 09:32:16
 * @LastEditTime: 2020-09-28 14:33:16
 * @LastEditors: your name
 * @Description: 新增牌照商
 * @FilePath: \webcode2\src\views\customer\addOrganization.vue
-->


<template>
  <div class="addOrganization">
    <div class="wrapper">
      <el-tabs type="card" v-model="formTemp.label" class="noBorder">
        <el-tab-pane class="title" name="info" label="新增牌照商">
          <organizationModule
            :formData="formData"
            :formReadonly="formReadonly"
            :loading="status.loading"
            v-on:formDataSubmit="handleFormDataSubmit"
          ></organizationModule>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import organizationModule from './components/organizationModule';
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import { mapState } from 'vuex';

import moment from 'moment';

export default {
  name: 'addOrganization',
  props: {},
  components: {
    organizationModule,
  },
  data() {
    return {
      formTemp: {
        label: 'info',
      },
      formData: {
        areaCode: '',
        bankAccName: '',
        bankAccountNumber: '',
        billingAddr: '',
        billingPhone: '',
        cityCode: '',
        contactPers: '',
        contactPersonPhone: '',
        createUse: '',
        isGalcComp: 'N',
        isLimitLicen: 'Y',
        lastModifie: '',
        lastModifiedT: '',
        legalPhone: '',
        legalRepresent: '',
        lessor: '',
        licenCode: '',
        licenceName: '',
        provinceCode: '',
        registerAddr: '',
        socialCreditCode: '',
        status: 'Y',
        type: '1', // 1 新增； 2 编辑
      },
      formReadonly: {
        hide: [],
        readonly: ['status'],
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
  created() {},
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例
      vm.fatherPath = from.path;
    });
  },
  mounted() {
    this.formData.createUse = this.userId;
    // this.formData.lastModifie = this.userId;
    // this.formData.lastModifiedT = moment().format('YYYY-MM-DD HH:mm:ss');
  },
  methods: {
    // 新增提交
    handleFormDataSubmit(object) {
      const data = object.data;
      this.status.loading = true;
      const url = common.addOrUpdateLicenceUrl;

      axios.post(url, data).then(res => {
        if (res.ec === '0') {
          this.$notify.success({
            title: '温馨提示！',
            message: '新增成功！'
          });

          Object.assign(this.formData, {
            areaCode: '',
            bankAccName: '',
            bankAccountNumber: '',
            billingAddr: '',
            billingPhone: '',
            cityCode: '',
            contactPers: '',
            contactPersonPhone: '',
            createUse: this.userId,
            isGalcComp: 'N',
            isLimitLicen: 'Y',
            lastModifie: '',
            lastModifiedT: '',
            legalPhone: '',
            legalRepresent: '',
            lessor: '',
            licenCode: '',
            licenceName: '',
            provinceCode: '',
            registerAddr: '',
            socialCreditCode: '',
            status: 'Y',
            type: '1', // 1 新增； 2 编辑
          });

          setTimeout(() => {
            this.$router.push({
              path: '/rentManagement'
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