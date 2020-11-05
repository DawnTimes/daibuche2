<!--
 * @Author: 廖亿晓
 * @Date: 2020-07-14 16:16:48
 * @LastEditTime: 2020-11-05 20:20:11
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\layouts\Common.vue
-->
<template>
  <div class="mainPage">
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="220px">
        <Aside></Aside>
      </el-aside>
      <el-main>
        <Tags></Tags>
        <keep-alive
          include="addOrganization,addBankWater,bankWaterList,carBook,dealershipBook,dealershipWriteOffQuery,overduceCollectionList,invoiceNoticeList,supportGoldApply,rentApplyList,carWriteOffQuery,contractListNper,writeOffDetail"
        >
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from './components/Header';
import Aside from './components/Aside';
import Tags from './components/tags';

export default {
  components: {
    Header,
    Aside,
    Tags,
  },
  data() {
    return {
      formInline: {
        user: '',
        name: '',
      },
    };
  },
  methods: {
    onSubmit() {
      // console.log('submit!');
    },
  },
};
</script>

<style lang="scss" scoped>
.mainPage {
  height: 100%;
  box-sizing: border-box;
  padding-top: 60px;
}
.el-container {
  height: 100%;
}
.el-main {
  height: 100%;
  padding: 0;
}
</style>
