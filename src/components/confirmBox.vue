<template>
  <div class="mshbox">
    <div class="msgbox_contant">
      <button type="button" @click="cancel()" aria-label="Close" class="el-message-box__headerbtn">
        <i class="el-message-box__close el-icon-close"></i>
      </button>
      <i class="icon iconfont" :class="msgConfirBox.icon"></i>
      <p class="first">{{msgConfirBox.confirst}}</p>
      <p class="last">{{msgConfirBox.consecond}}</p>
      <button type="button" class="el-button el-button--default el-button--small" @click="cancel()">
        <span>取消</span>
      </button>
      <button
        type="button"
        class="el-button el-button--default el-button--small el-button--primary"
        @click="sure()"
      >
        <span>确 定</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'confirmBox',
  props: ['msgConfirBox'],
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
  z-index: 100;
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
.mshbox .msgbox_contant .icontixing {
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
  color: #9b9b9b;
  margin-bottom: 20px;
}
.mshbox .msgbox_contant .el-button--small,
.mshbox .msgbox_contant .el-button--small.is-round {
  padding: 9px 20px;
}
</style>
