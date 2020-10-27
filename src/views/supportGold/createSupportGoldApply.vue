<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-18 10:04:11
 * @LastEditTime: 2020-10-26 17:18:41
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
import { mapState } from 'vuex';
import common from '@/common/common.js';
import axios from '@/common/axios.js';

export default {
  name: 'createSupportGoldApply',
  props: {},
  components: {
    supportGoldModule,
  },
  data() {
    return {
      activeName: 'first',
      formData: {
        creater: '',
        applyDate: '',
        agList: [],
      },
      status: {
        loading: false,
      },
    };
  },
  computed: {
    ...mapState({
      userId: store => store.userId
    })
  },
  watch: {},
  created() {
    this.formData.creater = this.userId;
  },
  mounted() {},
  methods: {
    // 确定申请
    formDataSubmit(obj) {
      const data = obj.data;
      const url = common.supportFundUrl;
      this.status.loading = true;
      axios.post(url, data).then((res) => {
        // console.log(res);
        if (res.ec === '0') {
          this.status.loading = false;
          this.$notify.success({
            title: '温馨提示！',
            message: '申请成功！'
          })
          
          setTimeout(() => {
            this.$router.push({
              path: '/supportGoldApply'
            })
          }, 1000);
          Object.assign(this.formData, {
            applyDate: '',
            agList: [],
          })
        } else {
          this.status.loading = false;
          this.$notify.error({
            title: '温馨提示！',
            message: res.em || res.error || res.message || '申请失败，请联系管理员！'
          })
        }
      }).catch((err) => {
        this.status.loading = false;
        this.$notify.error({
          title: '温馨提示！',
          message: err.em || err.error || err.message || '申请失败，请联系管理员！'
        })
      })
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
</style>
