<!--
 * @Author: 廖亿晓
 * @Date: 2020-07-14 16:16:47
 * @LastEditTime: 2020-09-03 18:08:11
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\layouts\components\Aside.vue
-->
<template>
  <div class="aside">
    <el-menu class="sidebar-menu" :router="true" :default-active="currMenu" :unique-opened="true">
      <template v-for="menuItem in menuList">
        <el-menu-item
          v-if="!menuItem.spread"
          :key="menuItem.id"
          :index="menuItem.path ? menuItem.path : ''"
          :route="menuItem.path ? menuItem.path : ''"
          :class="[menuItem.path === currMenu ? 'is-active':'']"
        >
          <i class="icon iconfont mr" :class="menuItem.icon"></i>
          {{menuItem.name}}
        </el-menu-item>
        <el-submenu v-else :index="menuItem.path ? menuItem.path : ''" :key="menuItem.id">
          <span slot="title" class="title">
            <i class="icon iconfont mr" :class="menuItem.icon"></i>
            {{menuItem.name}}
          </span>
          <el-menu-item
            :index="item.path ? item.path : ''"
            v-for="item in menuItem.children"
            :key="item.id"
            :route="item.path ? item.path : ''"
            :class="[item.path === currMenu? 'is-active':'']"
          >{{item.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import axios from '@/common/axios.js';
import { mapState, mapMutations } from 'vuex';
import bus from '@/common/eventBus.js';
import common from '@/common/common.js';
export default {
  name: 'Aside',
  data() {
    return {
      currMenu: '',
      menuList: [],
    };
  },
  computed: {
    ...mapState(['roles', 'userId']),
  },
  mounted() {
    this.getPath();
  },
  watch: {
    // 监听,当路由发生变化的时候执行
    $route: 'getPath',
  },
  methods: {
    ...mapMutations(['setAsideInfo', 'setAsideInfoIds']),
    // 监听路由的变化，激活当前路由
    getPath() {
      // console.log(this.$route);
      let str = this.$route.path.split('/')[1];
      // console.log(str);
      if (str.length === 0) {
        this.currMenu = '/';
      } else {
        this.currMenu = '/' + str;
      }
      console.log(this.currMenu);
    },

    // 获取菜单
    initData() {
      let url = '';
      if (this.userId === 'admin') {
        url = common.allTreeUrl;
      } else {
        url = common.userMenuUrl;
      }
      axios.get(url, { roles: this.roles }).then((res) => {
        console.log(res.menus);
        this.setAsideInfo(res.menus);
        this.setAsideInfoIds(res.ids);
        this.menuList = res.menus;
      });
    },
  },
  created() {
    this.initData();
    bus.$on('changeAside', () => {
      this.initData();
    });
  },
};
</script>

<style>
.aside .el-submenu .el-menu-item {
  height: 44px;
  line-height: 44px;
}

.aside .el-submenu .el-submenu__title {
  height: 52px;
  line-height: 52px;
}
</style>
