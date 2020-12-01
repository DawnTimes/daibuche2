<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-28 15:58:57
 * @LastEditTime: 2020-12-01 10:17:28
 * @LastEditors: your name
 * @Description: 导航标签
 * @FilePath: \webcode2\src\views\layouts\components\tags.vue
-->

<template>
  <div class="tags">
    <ul>
      <li
        class="tags_li"
        v-for="(item, index) in tagsList"
        :key="index"
        :class="{ 'active': isActive(item.path) }"
      >
        <router-link :to="item.fullPath" class="tags_li_title">{{ item.title }}</router-link>
        <span>
          <i class="el-icon-close" style="cursor: pointer;" @click="colseTags(index)"></i>
        </span>
      </li>
    </ul>
    <div class="tags_close_box">
      <el-dropdown @command="handleCommand">
        <el-button size="mini" type="primary">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="current">关闭当前</el-dropdown-item>
          <el-dropdown-item command="others">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <br style="clear:both" />
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'tags',
  props: {},
  components: {},
  data() {
    return {
      tagsList: JSON.parse(sessionStorage.getItem('tagsArr')) || [],
    };
  },
  computed: {},
  watch: {
    // 监听路由的变化
    $route(newVal, oldVal) {
      if (newVal) {
        this.setTags(newVal);
      }
    },
  },
  created() {
    this.setTags(this.$route);
  },
  mounted() {},
  methods: {
    // 激活标签的样式
    isActive(path) {
      return this.$route.path === path;
    },

    // 创建标签
    setTags(route) {
      // console.log(route);
      // some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
      // some() 方法会依次执行数组的每个元素：如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。如果没有满足条件的元素，则返回false。
      // 注意： some() 不会对空数组进行检测。
      // 注意： some() 不会改变原始数组。
      // 返回值：	布尔值。如果数组中有元素满足条件返回 true，否则返回 false。
      // 判断是否已存在该标签
      const isExit = this.tagsList.some(val => {
        return val.path === route.path; // 用path判断是否新增tabs标签，不用fullPath是为了避免编辑和详情的时候新增多个
      });

      if (!isExit) {
        this.tagsList.push({
          path: route.path, // 用path判断是否新增tabs标签，不用fullPath是为了避免编辑和详情的时候新增多个
          title: route.meta.title,
          name: route.name,
          fullPath: route.fullPath,
        });
      }

      // 存储起来，避免刷新页面时tab导航标签没了
      sessionStorage.setItem('tagsArr', JSON.stringify(this.tagsList));

    },

    // 关闭单个标签
    colseTags(index) {
      // console.log(this.$route);
      // 返回被删除的项组成的数组，splice()会改变原数组
      // const delItem = this.tagsList[index];
      // this.tagsList.splice(index, 1);
      const delItem = this.tagsList.splice(index, 1)[0]; // 等于上两句结合

      let item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1];
      // 判断下一项或前一项是否存在
      if (item) {
        // 判断删除的是否是当前激活的路由，如果是则激活后一项或前一项；如果不是，则激活项不变
        delItem.path === this.$route.path && this.$router.push(item.fullPath);
      } else {
        this.$router.push('common');
      }
      
      // 存储起来，避免刷新页面时tab导航标签没了
      sessionStorage.setItem('tagsArr', JSON.stringify(this.tagsList));
    },

    // 关闭当前标签
    colseCurrentTags() {
      const fullPath = this.$route.fullPath;
      let currentIndex = null;
      this.tagsList.forEach((val, index) => {
        if (val.fullPath === fullPath) {
          currentIndex = index;
          // 删除
          this.tagsList.splice(index, 1);
        }
      });

      // 删除当前标签后，自动激活后一个标签（如果存在的话）或前一个标签（如果后一个标签不存在的话）
      let item = this.tagsList[currentIndex]
        ? this.tagsList[currentIndex]
        : this.tagsList[currentIndex - 1];
      if (item) {
        this.$router.push({
          path: item.fullPath,
        });
      } else {
        this.$router.push({
          path: 'common',
        });
      }

      // 存储起来，避免刷新页面时tab导航标签没了
      sessionStorage.setItem('tagsArr', JSON.stringify(this.tagsList));
    },

    // 关闭其他标签
    colseOthersTags() {
      // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。注意： filter() 不会对空数组进行检测。注意： filter() 不会改变原始数组。
      const fullPath = this.$route.fullPath;
      // let currentArr = [];
      // this.tagsList.forEach((val, index) => {
      //   if (val.fullPath === fullPath) {
      //     currentArr.push(val);
      //   }
      // })
      let currentArr = this.tagsList.filter((val, i) => {
        return val.fullPath === fullPath;
      });
      this.tagsList = currentArr;

      // 存储起来，避免刷新页面时tab导航标签没了
      sessionStorage.setItem('tagsArr', JSON.stringify(this.tagsList));
    },

    // 关闭全部标签
    colseAllTags() {
      this.tagsList = [];
      this.$router.push({
        path: 'common',
      });
      
      // 存储起来，避免刷新页面时tab导航标签没了
      sessionStorage.removeItem('tagsArr');
    },

    // 下拉关闭
    handleCommand(command) {
      if (command === 'current') this.colseCurrentTags();
      if (command === 'others') this.colseOthersTags();
      if (command === 'all') this.colseAllTags();
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style scoped lang="scss">
.tags {
  background: #fff;
  padding-right: 120px;
  position: relative;
  box-shadow: 0 10px 20px 0 #eff6fe;

  ul {
    .tags_li {
      height: 30px;
      line-height: 30px;
      margin: 3px;
      float: left;
      padding: 0 5px 0 12px;
      font-size: 12px;
      border: 1px solid #e9eaec;
      background: #fff;
      border-radius: 3px;

      .tags_li_title {
        margin-right: 5px;
      }
    }

    .active {
      color: #0094ff;
      background: #fff;

      .tags_li_title {
        color: #0094ff;
      }
    }
  }

  .tags_close_box {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 110px;
    height: 30px;
    text-align: center;
  }
}
</style>
