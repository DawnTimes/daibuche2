<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-26 09:32:16
 * @LastEditTime: 2020-10-21 13:49:57
 * @LastEditors: your name
 * @Description: 新增牌照商
 * @FilePath: \webcode2\src\views\customer\editOrganization.vue
-->


<template>
  <div class="editOrganization">
    <div class="wrapper">
      <el-tabs type="card" v-model="formTemp.label" class="noBorder">
        <el-tab-pane class="title" name="info" label="牌照商编辑">
          <organizationModule
            :formData="formData"
            :formReadonly="formReadonly"
            :loading="status.loading"
            v-on:formDataSubmit="handleFormDataSubmit"
            ref="orgnization"
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
  name: 'editOrganization',
  props: {},
  components: {
    organizationModule,
  },
  data() {
    return {
      id: '',
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
        status: '',
        type: '2', // 1 新增； 2 编辑
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
    ...mapState({
      userId: store => store.userId
    }),
  },
  watch: {},
  created() {
    // console.log(this.$route);
    this.id = this.$route.query.id;
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例
      vm.fatherPath = from.path;
    });
  },
  mounted() {
    // this.formData.createUse = this.userId;
    this.formData.lastModifie = this.userId;
    this.formData.lastModifiedT = moment().format('YYYY-MM-DD HH:mm:ss');
    this.getLicenceDetail();
  },
  methods: {
    // 获取详情
    getLicenceDetail() {
      const url = common.selectLicenceByCodeUrl;
      const params = {
        licenCode: this.id,
      };
      axios.post(url, params).then((res) => {
        if (res.ec === '0') {
          Object.assign(this.formData, res.data);

          // this.$refs.orgnization.changeArea(this.formData.areaCode);
        }
      })
    },
    // 编辑提交
    handleFormDataSubmit(object) {
      const data = object.data;
      this.status.loading = true;
      const url = common.addOrUpdateLicenceUrl;

      axios.post(url, data).then(res => {
        if (res.ec === '0') {
          this.$notify.success({
            title: '温馨提示！',
            message: '更新成功！'
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
            isGalcComp: 'N',
            isLimitLicen: 'Y',
            lastModifie: this.userId,
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
            type: '2', // 1 新增； 2 编辑
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
            message: res.em || '更新失败!'
          });
        }
      }).catch(err => {
        this.status.loading = false;
        this.$notify.error({
          title: '温馨提示！',
          message: err ? err.em : '更新失败，请联系管理员!',
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