<!--
 * @Author: 廖亿晓
 * @Date: 2020-07-14 16:16:47
 * @LastEditTime: 2020-12-02 15:01:46
 * @LastEditors: your name
 * @Description: 删除弹窗
 * @FilePath: \webcode2\src\components\confirmBox.vue
-->
<template>
  <div class="mshbox">
    <div class="msgbox_contant">
      <button type="button" @click="cancel()" aria-label="Close" class="el-message-box__headerbtn">
        <i class="el-message-box__close el-icon-close"></i>
      </button>
      <i class="icon iconfont" :class="msgConfirBox.icon"></i>
      <p class="first">{{msgConfirBox.confirst}}</p>
      <p class="last">{{msgConfirBox.consecond}}</p>
      <el-button plain size="small" @click="cancel()">
        取 消
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="sure()"
        :loading="loading"
      >
       确 定
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'confirmBox',
  // props: ['msgConfirBox', 'loading'],
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    msgConfirBox: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    sure() {
      this.$emit('submitForm');
    },
    cancel() {
      this.$emit('cancelbox');
    },
  },
};
</script>
<style scoped>
.mshbox {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
}
.mshbox .msgbox_contant {
  width: 400px;
  height: 220px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -205px;
  margin-top: -110px;
  border-radius: 10px;
  text-align: center;
}
.mshbox .msgbox_contant .icon {
  display: inline-block;
  font-size: 40px;
  margin: 40px 0 10px 0;
}
.mshbox .msgbox_contant .iconchenggong- {
  color: #3973e7;
}
.mshbox .msgbox_contant .iconshibai,
.mshbox .msgbox_contant .icon-jinggao {
  color: #fda800;
}
.mshbox .msgbox_contant p {
  height: 25px;
  line-height: 25px;
}
.mshbox .msgbox_contant p.first {
  color: #3973e7;
}
.mshbox .msgbox_contant p.last {
  color:#909399;
  margin-bottom: 20px;
  font-size: 14px;
}
.mshbox .msgbox_contant .el-button--small,
.mshbox .msgbox_contant .el-button--small.is-round {
  padding: 9px 20px;
}
</style>
