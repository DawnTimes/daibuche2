<template>
    <el-tabs v-model="editableTabsValue" type="card" @tab-click="tabClick">
        <el-tab-pane label="待确认任务列表" name="adjustmentInfoConfirm">
            <adjustmentInfoConfirm></adjustmentInfoConfirm>
        </el-tab-pane>
        <el-tab-pane label="调剂任务历史" name="contractToBeReviewed">
            <adjustmentInfoHistory></adjustmentInfoHistory>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import adjustmentInfoConfirm from '@/components/page/adjustment/AdjustmentInfoConfirm'
import adjustmentInfoHistory from '@/components/page/adjustment/adjustmentInfoHistory'


export default {
    components:{
      adjustmentInfoConfirm,
      adjustmentInfoHistory
    }, 
    data() {
      return {
        editableTabsValue: 'adjustmentInfoConfirm',
      };
    },
    methods: {
        tabClick() {
            console.log('sx')
        }
    } 

}
</script>

<style  lang="scss" scoped>
</style>