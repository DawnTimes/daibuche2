<template>
  <div class="main">
       <p class="title">待办任务</p>
    <dl class="waitList">
        <!-- <a href="">
             <dt>租金待审批</dt>
            <dd>您有<span>5</span>条租金单待审批</dd>
        </a> -->
       <a  @click="$router.push('./contractApproveMain')" v-if="haveTodo">
             <dt>合同待审批</dt>
            <dd>您有<span>{{num}}</span>条合同待审批</dd>
        </a>

        <p  v-if="!haveTodo">
             无待办事项
        </p>
        <!-- <a href="">
             <dt>开票通知单</dt>
            <dd>您有<span>5</span>条开票通知单待审批</dd>
        </a>
        <a href="">
             <dt>无需开票通知单</dt>
            <dd>您有<span>5</span>条无需开票通知单待审批</dd>
        </a> -->
    </dl>
  </div>
</template>
<script>
import axios from "@/common/axios.js";
import common from "@/common/common.js";
import { mapState, mapMutations } from 'vuex';
export default {
    data(){
        return {
            num:"",
            haveTodo:false,
            params:{
                turnPageBeginPos:"0",
                turnPageShowNum:"10",
                contractFlowStatus:[],
            }
        }
    },

  computed: {
  ...mapState(['roles','userId'])
  },    
    created() {
        
        var that = this;



      let url = ''
      if (this.userId === 'admin') {
        url = common.allTreeUrl
      } else {
        url = common.userMenuUrl
      }
      axios.get(url, {roles:this.roles}).then(res => {
        that.initData(res.ids);
       res.ids.forEach(function(val,index){
           if(val == 161){
             that.haveTodo=true
           }
        })        
      }) 




    },
   methods:{
       initData(ids) {
       common.checkConstractFlow(162,ids,'1',this.params.contractFlowStatus);
       common.checkConstractFlow(163,ids,'2',this.params.contractFlowStatus);
       common.checkConstractFlow(164,ids,'3',this.params.contractFlowStatus);
       if (this.params.contractFlowStatus.length === 0) {
         this.params.contractFlowStatus.push('5')
       }
          let url = common.findCarContractApprUrl
          axios.post(url,this.params).then(res => {
              let data=res.data.turnPageTotalNum
              this.num=data
          });
      },
   }
  }
</script>

<style lang="scss" scoped>
.main{
  background: #fff;
  padding: 30px 0;
}
.main .title{
    height: 40px;
    line-height: 40px;
    font-size: 17px;
    text-indent: 8px;
    margin-bottom: 20px;
    color: #666;
}
.waitList a{
    font-size:16px;
    display: inline-block;
    height: 50px;
    color: #666;
    text-indent: 10px;
    width: 100%;
    cursor:pointer;
    margin-bottom: 20px;
    background:#F1F2F4;
}
.waitList a dt{
    height:30px;
    line-height:30px;
    font-size:16px;
    color: #666;
}
.waitList a dd{
    height: 20px;
    line-height: 20px;
    font-size:14px;
    color: #999;
}
</style>
