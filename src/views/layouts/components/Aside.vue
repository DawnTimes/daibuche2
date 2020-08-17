<template>
  <div class="aside">
    <el-menu class="sidebar-menu" :router="true" :default-active="currMenu" :unique-opened="true">
      <template v-for="menuItem in menuList">
        <el-menu-item
          v-if="!menuItem.spread"
          :key="menuItem.id"
          :index="menuItem.path"
          :route="menuItem.path"
          :class="[menuItem.path === currMenu ? 'is-active':'']"
        >
          <i class="icon iconfont mr" :class="menuItem.icon"></i>
          {{menuItem.name}}
        </el-menu-item>
        <el-submenu v-else :index="menuItem.path" :key="menuItem.id">
          <span slot="title" class="title">
            <i class="icon iconfont mr" :class="menuItem.icon"></i>
            {{menuItem.name}}
          </span>
          <el-menu-item
            :index="item.path"
            v-for="item in menuItem.children"
            :key="item.id"
            :route="item.path"
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
    $route: 'getPath',
  },
  methods: {
    ...mapMutations(['setAsideInfo', 'setAsideInfoIds']),
    getPath() {
      let str = this.$route.path.split('/')[1];
      console.log(str);
      if (str.length === 0) {
        this.currMenu = '/';
      } else {
        this.currMenu = '/' + str;
      }
    },
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
    console.log('201909160952');
    this.initData();
    bus.$on('changeAside', () => {
      this.initData();
    });
  },
};
</script>

<style scoped>
</style>
