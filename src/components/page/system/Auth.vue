<template>
  <div>
    <div class="auth">
      <p class="title">角色权限管理 > 角色权限设定</p>
      <el-tree
        ref="roleTree"
        :data="data4"
        :props="defaultProps"
        show-checkbox
        :render-content="renderContent"
        default-expand-all
        node-key="id"
        :expand-on-click-node="false"
      ></el-tree>
    </div>
    <div class="return_btn">
      <el-button @click="doSure" type="primary">确定</el-button>
      <router-link to="/authlist">
          <el-button type="primary" style="margin-left:2%">返回</el-button>
      </router-link>       
    </div>
  </div>
</template>
<script>
import axios from "@/common/axios.js";
import bus from "@/common/eventBus.js";
import common from "@/common/common.js";
let id = 1000;
export default {
  created() {
    
  },
  mounted() {
    this.initData()
  },
  data() {
    return {
      data4: [],
      selectDataArray: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },

  methods: {
    doSure() {
      let params = {}
      let checkedNodes = this.$refs.roleTree.getCheckedNodes()
      let halfCheckedNodes = this.$refs.roleTree.getHalfCheckedNodes()
      let nodes = checkedNodes.concat(halfCheckedNodes)
      let ids = []
      nodes.forEach((obj ,index) =>{
        ids.push(obj.id)
      })
      params.roleId = this.$route.query.roleId
      params.menuIds = ids

      let url = common.roleMenuUpdUrl
      axios.put(url, params).then(res => {
        if (res.status === 'SUCCEED') {
            let _this = this
            _this.$message({message: "操作成功!",type: "success",duration: 1500})
            setTimeout(function() { 
              // 刷新左边栏
              bus.$emit('changeAside')

                _this.$router.push({path: "/authlist"})
            }, 1500) 
        } else {
            this.$alert('操作失败，请联系管理员!', '提示', {confirmButtonText: '确定'})
        }        

      })      
    },
    recursionData(data) {
        data.forEach((obj, index) => {
          if (obj.spread) {
            this.recursionData(obj.children)
          } else {
            if (obj.authority === '1') {
              this.selectDataArray.push(obj)
            }
          }
        })
    },
    setSelectData() {
      this.$nextTick(function() {
        console.log(this.data4)
        
        this.recursionData(this.data4)
        console.log(this.selectDataArray)
        this.$refs.roleTree.setCheckedNodes(this.selectDataArray)
      })      
    },
    renderContent(h, { node, data, store }) {
      let classname = "";
      if (node.level === 4) {
        classname = "levelname";
      }
      // 由于项目中有三级菜单也有四级菜单，就要在此做出判断。
      if (node.level === 3 && node.childNodes.length === 0) {
        classname = "levelname";
      }
      return <p class={classname}>{node.label}</p>;
    },
    changeCss() {
        var levelName = document.getElementsByClassName("levelname"); // levelname是上面的最底层节点的名字
        for (var i = 0; i < levelName.length; i++) {
          // cssFloat 兼容 ie6-8  styleFloat 兼容ie9及标准浏览器
          levelName[i].parentNode.style.cssFloat = "left"; // 最底层的节点，包括多选框和名字都让他左浮动
          levelName[i].parentNode.style.styleFloat = "left";
          levelName[i].style.marginLeft = "5px";
        }    
    },
    initData() {
      let params = {roleCode: this.$route.query.roleCode}
      let url = common.roleMenuTreeUrl
      axios.get(url, params).then(res => {
        this.data4 = res
        // 这个时候再去更改css
        this.$nextTick(function() {
          this.changeCss() 
        })
        // 获取选择的数据，然后发送到后台
        this.setSelectData()
      })
    }
  }
};
</script>
<style scoped>
.auth .title {
  height: 40px;
  line-height: 40px;
  font-size: 17px;
  text-indent: 8px;
  margin-bottom: 20px;
  color: #666;
}
.return_btn {
  text-align: center;
}
</style>
