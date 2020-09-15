<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-26 09:32:16
 * @LastEditTime: 2020-08-31 16:55:03
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
// import { mapState } from 'vuex';

export default {
  name: 'editOrganization',
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
        status: 'Y',
        isLimitLicence: 'Y',
        isGalcCompany: 1,
        areaCode: '',
        proviceCode: '',
        cityCode: '',
        licenceCode: '',
        licenceName: '',
        lessor: '',
        socialCreditCode: '',
        legalRepresentative: '',
        legalTelephone: '',
        contactPerson: '',
        contactPersonTelephone: '',
        bankAccountNo: '',
        bankAccountName: '',
        billingTelephone: '',
        billingAddress: '',
        registerAddress: '',
        remark: '',
      },
      formReadonly: {
        hide: [],
        readonly: ['licenceCode'],
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
  created() {
    // console.log(this.$route);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例
      vm.fatherPath = from.path;
    });
  },
  mounted() {},
  methods: {
    // 编辑提交
    handleFormDataSubmit(object) {
      const data = object.data;
      this.status.loading = true;
      // const url = common.addOrUpdateLicenceUrl;

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