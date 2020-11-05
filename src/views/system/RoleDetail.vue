<template>
  <div class="main">
    <p class="title">角色权限管理 > 角色详情</p>
    <table id="tab" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td class="name">序号</td>
        <td>21111</td>
        <td class="name">角色名称</td>
        <td>会计</td>
      </tr>
      <tr>
        <td class="name">角色描述</td>
        <td>会计</td>
        <td class="name">所属部门</td>
        <td>运营部</td>
      </tr>
      <tr>
        <td class="name">创建时间</td>
        <td>2019/03/22</td>
        <td class="name"></td>
        <td></td>
      </tr>
    </table>
    <div class="back">
      <el-button type="primary" @click="back()">返回</el-button>
    </div>
  </div>
</template>
<script>
import axios from '@/common/axios.js';
export default {
  methods: {
    back() {
      this.$router.push({
        path: '/authlist',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: #fff;
  padding: 30px 0;
}
.main .title {
  height: 40px;
  line-height: 40px;
  font-size: 17px;
  text-indent: 8px;
  margin-bottom: 20px;
  color: #666;
}
#tab {
  border: 1px solid #aaa;
  border-bottom: none;
}
#tab td {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #666;
  border: 1px solid #aaa;
  text-indent: 10px;
  border-top: none;
}

#tab td.name {
  width: 120px;
  background: #eee;
}
.back {
  text-align: center;
  margin-top: 30px;
}
</style>
