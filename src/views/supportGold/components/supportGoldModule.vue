
<!--
 * @Author: 廖亿晓
 * @Date: 2020-08-17 18:11:48
 * @LastEditTime: 2020-11-18 15:22:22
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\supportGold\components\supportGoldModule.vue
 * @可以输入预定的版权声明、个性签名、空行等
 -->

<template>
  <div class="supportGoldModule">
    <div class="formBox">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
          <el-form
            :model="formData"
            ref="formData"
            label-width="110px"
            class="demo-ruleForm"
            :rules="rules"
            status-icon
            size="medium"
          >
            <el-row :gutter="0">
              <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
                <el-form-item label="申请日期:" prop="applyDate" class="form-item">
                  <el-date-picker
                    v-model="formData.applyDate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                    style="width: 100%"
                    @change="changeDate"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <!-- <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
                <el-form-item label="申请日期:" prop="applyDate" class="form-item">
                  <el-date-picker
                    v-model="formData.applyDate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                    style="width: 100%"
                    :picker-options="pickerOptionsDate"
                    @change="changeDate"
                  ></el-date-picker>
                </el-form-item>
              </el-col> -->
              <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
                <el-form-item label="支援金月份:" prop="yearMonth" class="form-item">
                  <el-date-picker
                    v-model="formData.yearMonth"
                    value-format="yyyy-MM"
                    type="month"
                    placeholder="选择月份"
                    style="width: 100%"
                    :picker-options="pickerOptionsMonth"
                    @change="changeMonth"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="20" :md="24" :lg="24" :xl="24">
                <el-form-item label="备注:" prop="remark" class="form-item">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 4}"
                    placeholder="请输入内容"
                    maxlength="300"
                    show-word-limit
                    v-model="formData.remark"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </div>

    <div class="tableBox">
      <div class="choiceBtn">
        <el-button type="primary" size="mini" @click="handleChoose">选择经销店</el-button>
      </div>
      <div class="table dealerFrom">
        <el-form :rules="rules" :model="formData" ref="formData1" status-icon>
          <el-table
            :data="formData.agList"
            border
            stripe
            ref="table"
            style="width: 100%"
            :header-cell-style="{
            'text-align':'center',
            'font-weight':'bold',  
            'background':'#627CAF',    
            'color': '#fff',
          }"
          >
            <el-table-column width="50" align="center" label="序号" type="index" fixed></el-table-column>
            <el-table-column
              prop="agentCode"
              label="经销店代码"
              show-overflow-tooltip
              min-width="120"
            ></el-table-column>
            <!-- <el-table-column prop="agId" label="经销店id" show-overflow-tooltip></el-table-column> -->
            <!-- <el-table-column prop="agentShortName" label="经销店简称" show-overflow-tooltip min-width="120"></el-table-column> -->
            <el-table-column prop="agentFullName" label="经销店名称" show-overflow-tooltip min-width="120"></el-table-column>
            <el-table-column prop="isGacShop" label="是否商贸店" show-overflow-tooltip min-width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.isGacShop | isGacShopFormat }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="agentCode" label="车辆数量" show-overflow-tooltip></el-table-column> -->
            <!-- <el-table-column
              align="center"
              prop
              :label="setMonthTotal(2)"
              show-overflow-tooltip
              width="140"
            ></el-table-column>
            <el-table-column
              align="center"
              prop
              :label="setMonthTotal(3)"
              show-overflow-tooltip
              width="140"
            ></el-table-column>
            <el-table-column
              align="center"
              prop
              :label="setMonth(2)"
              show-overflow-tooltip
              width="100"
            ></el-table-column>
            <el-table-column
              align="center"
              prop
              :label="setMonth(3)"
              show-overflow-tooltip
              width="100"
            ></el-table-column>
            <el-table-column
              align="center"
              prop
              :label="setMonth(4)"
              show-overflow-tooltip
              width="100"
            ></el-table-column>
            <el-table-column
              align="center"
              prop
              :label="setMonth(5)"
              show-overflow-tooltip
              width="100"
            ></el-table-column> -->
            <el-table-column
              align="center"
              prop="reason"
              label="申请原因"
              show-overflow-tooltip
              min-width="400"
            >
              <template slot-scope="scope">
                <el-form-item
                  label=" "
                  :prop="'agList.' + scope.$index + '.reason'"
                  :rules="rules.reason"
                >
                  <el-input
                    type="textarea"
                    maxlength="200"
                    show-word-limit
                    :autosize="{ minRows: 1, maxRows: 4}"
                    size="mini"
                    placeholder="请输入内容"
                    v-model="scope.row.reason"
                  ></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="80" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
      <p class="tipText">提示：申请支援金时经销店不是必选的；存在特殊情况下申请支援金时才需要选经销店。</p>
    </div>

    <el-row :gutter="0">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div style="padding: 20px 0 20px 0; text-align: center">
          <el-button size="small" @click="handleGoToBack()">取 消</el-button>
          <!-- <el-button
            size="small"
            type="primary"
            plain
            @click="handleSave('formData', 'formData1')"
          >保存</el-button>-->
          <el-button
            size="small"
            type="primary"
            @click="handleSubmit('formData', 'formData1')"
            :loading="loading"
          >确 定</el-button>
        </div>
      </el-col>
    </el-row>

    <dealerTable-dialog
      :dealerForm="dealerForm"
      ref="dealerTableDialog"
      @formDataSure="formDataSure"
    ></dealerTable-dialog>
  </div>
</template>

<script>
import axios from '@/common/axios.js';
import common from '@/common/common.js';
import _ from 'lodash';

import moment from 'moment';

import dealerTableDialog from './dealerTableDialog';
import { dateDisabled, monthDisabled, supportApplyDate } from '@/common/dateDisabled.js';

export default {
  name: 'supportGoldModule',
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    dealerTableDialog,
  },
  data() {
    return {
      // agList: [],
      tableHeight: 200,
      dealerForm: {
        currentMonth: null,
        agentCode2: '',
        agentName: '',
        isGacShop: '',
        socialCreditCode: '',
        status: '',
        pageSize: 10,
        pageNum: 1,
      },
      currentMonth: null,

      // 只能选择4号或19号
      pickerOptionsDate: {
        disabledDate: (time) => {
          // return dateDisabled(time);
          return supportApplyDate(time);
        },
      },
      // 只能选择当月之前的月份
      pickerOptionsMonth: {
        disabledDate: (time) => {
          // console.log(new Date());
          return monthDisabled(time);
        },
      },

      rules: {
        applyDate: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change',
          },
        ],
        yearMonth: [
          {
            required: true,
            message: '请选择月份',
            trigger: 'change',
          },
        ],
        reason: [
          {
            required: true,
            message: '请输入原因',
            trigger: 'blur',
          },
        ],
      },
    };
  },

  computed: {},
  watch: {},
  created() {
    // this.getDictStatus('approval_operation', 'UNIFY_INTERFACE_APPROVAL');
    // this.getSystemOptions();
    // console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
  },
  mounted() {},
  methods: {
    // 选择日期
    changeDate(val) {
      console.log(val);
    },

    // 选择月份
    changeMonth(val) {
      if (val) {
        const time = new Date(val);
        const month = time.getMonth() + 1;
        this.currentMonth = month;
      } else {
        this.currentMonth = null;
      }
    },

    // 设置截止月份总欠款
    setMonthTotal(num) {
      // 判断this.currentMonth - num 是否小于等于 0，小于等于则是上一年，需 +12
      return this.currentMonth
        ? '截止' +
            (this.currentMonth - num <= 0
              ? this.currentMonth - num + 12
              : this.currentMonth - num) +
            '月总欠款'
        : `截止n-${num}月总欠款`;
    },

    // 设置欠款月份
    setMonth(num) {
      // 判断this.currentMonth - num 是否小于等于 0，小于等于则是上一年，需 +12
      return this.currentMonth
        ? (this.currentMonth - num <= 0
            ? this.currentMonth - num + 12
            : this.currentMonth - num) + '月欠款'
        : `n-${num}月欠款`;
    },

    // 选择经销店
    handleChoose() {
      // if (_.isEmpty(this.formData.monthTime)) {
      //   this.$notify.warning({
      //     title: '温馨提示！',
      //     message: '请先选择支援金月份',
      //   });
      //   return;
      // }
      this.dealerForm.currentMonth = this.currentMonth;
      this.$refs.dealerTableDialog.isShow(true);
    },


    // 选择经销店确定
    formDataSure(obj) {
      // console.log(obj);
      // this.$set(this.formData, 'agList', obj.data);
      // this.formData
      this.$nextTick(() => {
        // 解构赋值
        this.formData.agList.push(...obj.data);
        // 对json数组去重， 使用js hash去重；js中使用hash去重，需要建立在对象的基础之上，因为对象的存储采用的是hash表
        /*
         * hash去重：不是自己去写hash算法  利用对象属性的添加内部应用了hash算法
         * 思路：将元素 作为对象的属性进行添加 当对象内没有此属性时   将此元素作为属性添加  否则不添加
         * hash表：线性表+链表
         * 功能：无论查找还是添加都非常快
         */
        let hash = {};
        this.formData.agList = this.formData.agList.reduce((temp, item) => {
          hash[item.agId] ? '' : hash[item.agId] = true && temp.push(item)
          return temp
        }, [])
        // console.log(this.formData.agList);
      })
      // this.formData.agList = obj.data;
      this.$refs.dealerTableDialog.isShow(false);
    },

    // 保存提交
    handleSubmit(formName, formName1) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs[formName1].validate((valid) => {
            if (valid) {
              // 防止重复提交
              if (this.loading === false) {
                // 审批状态改为待提交
                // this.formData.approvalStatus = 'toBeSubmit';
                this.handleEmitData();
              }
            } else {
              this.$notify.warning({
                title: '温馨提示',
                message: '请正确填写表单',
              });
              return;
            }
          });
        } else {
          this.$notify.warning({
            title: '温馨提示',
            message: '请正确填写表单',
          });
          return;
        }
      });
    },

    // 组件通讯
    handleEmitData() {
      this.$emit('formDataSubmit', {
        data: this.formData,
      });
    },

    // 删除
    handleDelete(row) {
      this.formData.agList.forEach((val, index) => {
        if (val.agId === row.agId) {
          this.formData.agList.splice(index, 1);
          // console.log(this.formData.agList);
        }
      });
    },

    // 取消
    handleGoToBack() {
      this.$router.push({
        path: '/supportGoldApply',
      });
    },

    // 保存
    // handleSave(formName, formName1) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       this.$refs[formName1].validate((valid) => {
    //         if (valid) {
    //           // 防止重复提交
    //           if (this.loading === false) {
    //             // 审批状态改为待提交
    //             this.formData.approvalStatus = 'toBeSubmit';
    //             this.handleEmitData();
    //           }
    //         } else {
    //           this.$notify.warning({
    //             title: '温馨提示',
    //             message: '请正确填写表单',
    //           });
    //           return;
    //         }
    //       });
    //     } else {
    //       this.$notify.warning({
    //         title: '温馨提示',
    //         message: '请正确填写表单',
    //       });
    //       return;
    //     }
    //   });
    // },

    handleChange(val) {
      // console.log(val)
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style lang="scss">
.supportGoldModule {
  padding-top: 10px;

  .formBox {
    border-bottom: 1px solid #eee;
  }

  .tableBox {
    padding: 10px 0 0 20px;

    .choiceBtn {
      padding-bottom: 10px;
    }
  }
}

.supportGoldModule .table .el-form-item {
  margin-bottom: 12px;
}

.supportGoldModule .table .el-form-item .el-form-item__error {
  top: 86%;
  left: 10px;
}

.supportGoldModule .dealerFrom .el-form-item__label {
  padding: 0;
}

.supportGoldModule .dealerFrom .el-table td {
  padding: 0 !important;
}

.supportGoldModule .dealerFrom .el-textarea {
  vertical-align: middle;
}
</style>
