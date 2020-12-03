<!--
 * @Author: 廖亿晓
 * @Date: 2020-07-14 16:16:47
 * @LastEditTime: 2020-12-03 19:34:50
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
import _ from 'lodash';

export default {
  name: 'Aside',
  data() {
    return {
      currMenu: '',
      // menuList: [],
    };
  },
  computed: {
    ...mapState(['roles', 'userId']),

    menuList: {
      get() {
        return this.$store.state.asideInfo;
      },

      set(val) {

      }
    },
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
      // console.log(this.currMenu);
    },

    // 获取菜单
    // initData() {
    //   let url = '';
    //   if (this.userId === 'admin') {
    //     url = common.allTreeUrl;
    //   } else {
    //     url = common.userMenuUrl;
    //   }
    //   axios.get(url, { roles: this.roles }).then((res) => {
    //     // console.log(res.menus);
    //     this.setAsideInfo(res.menus);
    //     this.setAsideInfoIds(res.ids);
    //     this.menuList = res.menus;
    //   });
    // },

    // 获取用户菜单
    getUserMenuList() {
      let url = '';
      if (this.userId === 'admin') {
        url = common.allTreeUrl;
      } else {
        url = common.userMenuUrl;
      }

      const roles = {
        roles: this.roles
      };
      axios.get(url, roles).then(res => {
        // 对菜单数据根据id进行排序
        const menusArr = res.menus;
        let menusList = [];
        if (!_.isEmpty(menusArr)) {
          menusList = menusArr.sort(this.sortUp);

          menusList.forEach((val) => {
            if (!_.isEmpty(val.children)) {
              val = val.children.sort(this.sortUp);
            }
          })
        }        
        // this.$store.commit('setAsideInfo', menusList);
        // this.$store.commit('setAsideInfoIds', res.ids);

        this.setAsideInfo(menusList);
        this.setAsideInfoIds(res.ids);

      });
    },

    // 升序排序
    sortUp(x, y) {
      return x.sort - y.sort;
    }
  },
  created() {
    this.getUserMenuList();
    // 权限更新之后 刷新页面重新获取菜单
    bus.$on('changeAside', () => {
      this.getUserMenuList();
    });
  },
};
</script>

<style>
.aside .el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}

.aside .el-submenu .el-submenu__title {
  height: 46px;
  line-height: 46px;
}
</style>
