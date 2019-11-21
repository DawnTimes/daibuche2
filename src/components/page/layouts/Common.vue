<template>
    <div class="mainPage">
      <el-header><Header></Header></el-header>
      <el-container>
          <el-aside width="200px">
              <Aside></Aside>
          </el-aside>
          <el-main>
            <router-view/>
          </el-main>
      </el-container>
    </div>
</template>

<script>
import Header from '@/components/layout/Header'
import Aside from '@/components/layout/Aside'
export default {
    components:{
      Header,
      Aside
    },
    data() {
      return {
        formInline: {
          user: '',
          name: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style lang="scss" scoped>
.mainPage{
  height: 100%;
  box-sizing: border-box;
  padding-top: 60px;
}
.el-container{
  height: 100%;
}
.el-main{
  height: 100%;
  padding:0
}
</style>
