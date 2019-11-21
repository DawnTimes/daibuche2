<template>
  <div class="main-header">
    <a>
      <div class="logo fl">
        <img src="@/assets/images/logo.png" class="fl"/>
        <span class="usertitle">代步车内部运营管理系统</span>
      </div>
    </a>
    <div class="user fr">
      <!-- <i class="el-icon-document"></i> -->
      <dropDown name="dropdown"></dropDown>
    </div>
    
  </div>
</template>

<script>
import dropDown from '@/components/page/common/dropDown'
export default{
    name:'Header',
    components:{
      dropDown
    }
}
</script>

<style scoped>
.main-header{
  width: 100%;
  height: 60px;
  line-height: 60px;
}
.usertitle{
    display:inline-block;
    font-size: 24px;
    color: #fff;
  }
.el-dropdown{color: #fff}
</style>
