<!--
 * @Author: 廖亿晓
 * @Date: 2020-11-13 14:23:32
 * @LastEditTime: 2020-12-02 17:05:00
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\views\verification\bankWaterDrag.vue
-->

<template>
  <div>
    <div class="w-table" :class="{ 'w-table_moving': dragState.dragging }">
      <el-table
        :data="data"
        :border="option.border"
        :height="option.height"
        :max-height="option.maxHeight"
        :style="{ width: parseInt(option.width) + 'px' }"
        :cell-class-name="cellClassName"
        :header-cell-class-name="headerCellClassName"
        v-loading="tableLoading"
        :header-cell-style="{
          'text-align':'center',
          'font-weight':'bold',  
          'background':'#627CAF',    
          'color': '#fff !important',
          'font-size': '13px',
        }"
      >
        <slot name="fixed"></slot>
        <el-table-column
          v-for="(col, index) in bankWaterHeader"
          :key="index"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :min-width="col.minWidth"
          :type="col.type"
          :header-align="col.headerAlign"
          :column-key="index.toString()"
          :render-header="renderHeader"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <!-- 不是金额时显示原值 -->
            <span v-if="!formatMoney(col.prop)" :style="styleFunc(col.prop, scope.row)">{{ scope.row[col.prop] }}</span>
            <!-- 是金额时显示，格式化金额 -->
            <span v-if="formatMoney(col.prop)" :style="styleFunc(col.prop, scope.row)">{{ scope.row[col.prop] | moneyFormat }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>

import _ from 'lodash';
import axios from '@/common/axios.js';
import common from '@/common/common.js';

import { mapState, mapMutations } from 'vuex';

import { moneyFormat } from '@/common/moneyFormat.js';

export default {
  name: '',
  components: {},
  props: {
    data: {
      default: function () {
        return [];
      },
      type: Array,
    },
    header: {
      default: function () {
        return [];
      },
      type: Array,
    },
    option: {
      default: function () {
        return {};
      },
      type: Object,
    },
    tableLoading: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      bankWaterHeader: this.header,

      // 拖动过程中需要记录几个关键参数：
      dragState: {
        start: -9, // 起始元素的 index
        end: -9, // 移动鼠标时所覆盖的元素 index
        dragging: false, // 是否正在拖动
        direction: undefined, // 拖动方向
      },

      // 列表金额字段名称数组
      moneyArray: ['income', 'haveVerLines', 'notVerLines', 'refund'],
    };
  },
  computed: {},
  watch: {
    // 另外父元素传入了一个表头数据 header，但拖动完成后会修改这个数据
    // 在子组件中直接修改父元素的数据是不推荐的，所以这里初始化了一个 bankWaterHeader 用于托管表头数据 header
    // 但为了让 header 修改时，bankWaterHeader 也能响应修改，就得添加一个监视器 watch
    header(val, oldVal) {
      this.bankWaterHeader = val;
    },
  },
  created() {},
  mounted() {
    // this.formatMoney('dueAmount');
  },
  methods: {
    ...mapMutations({
      setBankWaterHeader: 'setBankWaterHeader',
    }),
    
    // Element-UI 的 Table 组件为了实现【拖拽边框以修改列宽】的功能，没有将 mousemove、mouseup、mousedown 这三个事件暴露出来
    // 所以需要自定义表头，并手动添加鼠标事件的处理函数，这就需要用到 renderHeader() 方法
    renderHeader(createElement, { column }) {
      return createElement(
        'div',
        {
          class: ['thead-cell'],
          // 三个鼠标事件中，第一个参数是事件对象，第二个是表头对象
          on: {
            mousedown: ($event) => {
              this.handleMouseDown($event, column);
            },
            mousemove: ($event) => {
              this.handleMouseMove($event, column);
            },
          },
        },
        [
          // 添加 <a> 用于显示表头 label
          createElement('a', column.label),
          // 添加一个空标签用于显示拖动动画  空标签 <span class="virtual"> 用来显示拖动时的动画（虚线）
          createElement('span', {
            class: ['virtual'],
          }),
        ]
      );
    },

    // 按下鼠标时，记录下起始列。鼠标抬起时，记录下结束列。根据二者之差计算出拖动的方向。
    // 然后根据起始列和结束列的位置，将表头数据重新排序，从而实现列的拖动
    // 按下鼠标开始拖动
    handleMouseDown(e, column) {
      this.dragState.dragging = true;
      this.dragState.start = parseInt(column.columnKey);
      // 给拖动时的虚拟容器添加宽高
      let table = document.getElementsByClassName('w-table')[0];
      let virtual = document.getElementsByClassName('virtual');
      for (let item of virtual) {
        item.style.height = table.clientHeight - 1 + 'px';
        item.style.width = item.parentElement.parentElement.clientWidth + 'px';
      }
      // 添加松开鼠标事件
      document.addEventListener('mouseup', this.handleMouseUp);
    },

    // 鼠标放开结束拖动
    handleMouseUp() {
      this.dragColumn(this.dragState);
      // 初始化拖动状态
      this.dragState = {
        start: -9,
        end: -9,
        dragging: false,
        direction: undefined,
      };

      // 移除事件
      document.removeEventListener('mouseup', this.handleMouseUp);
    },

    // 拖动中
    handleMouseMove(e, column) {
      if (this.dragState.dragging) {
        let index = parseInt(column.columnKey); // 记录起始列
        if (index - this.dragState.start !== 0) {
          this.dragState.direction =
            index - this.dragState.start < 0 ? 'left' : 'right'; // 判断拖动方向
          this.dragState.end = parseInt(column.columnKey);
        } else {
          this.dragState.direction = undefined;
        }
      } else {
        return false;
      }
    },

    // 拖动易位
    dragColumn({ start, end, direction }) {
      let tempData = [];
      let left = direction === 'left';
      let min = left ? end : start - 1;
      let max = left ? start + 1 : end;
      for (let i = 0; i < this.bankWaterHeader.length; i++) {
        if (i === end) {
          tempData.push(this.bankWaterHeader[start]);
        } else if (i > min && i < max) {
          tempData.push(this.bankWaterHeader[left ? i - 1 : i + 1]);
        } else {
          tempData.push(this.bankWaterHeader[i]);
        }
      }
      this.bankWaterHeader = tempData;
      // 存储在store中，保证刷新不变；退出登录时删除localStorage
      this.setBankWaterHeader(this.bankWaterHeader);
      // console.log(this.bankWaterHeader);
    },

    // 在拖动过程中，通过 mousemove 事件，改变当前列的表头状态
    // 然后借助 headerCellClassName, cellClassName 动态修改单元格 class
    headerCellClassName({ column, columnIndex }) {
      let active =
        columnIndex - 1 === this.dragState.end
          ? `darg_active_${this.dragState.direction}`
          : '';
      let start = columnIndex - 1 === this.dragState.start ? `darg_start` : '';
      // console.log('/' + `${active} ${start}` + '//');
      return `${active} ${start}`;
    },

    cellClassName({ column, columnIndex }) {
      return columnIndex - 1 === this.dragState.start ? `darg_start` : '';
    },


    // 字段颜色赋值
    styleFunc(prop, row) {
      // console.log(prop, row);
      // 核销状态颜色
      if (prop == 'verStateText') {
        if (row.verState == 'FULL') {
          return 'color: #67C23A'
        } else if (row.verState == 'PART') {
          return 'color: #409EFF'
        } else {
          return 'color:  #F56C6C'
        }
      }
      
    },

    // 格式化金额--千分位
    formatMoney(val) {
      // console.log(val);
      // console.log(this.moneyArray.includes(val));
      // array.includes(searchElement[, fromIndex])   此方法判断数组中是否存在某个值，如果存在返回 true，否则返回false。
      return this.moneyArray.includes(val);
    },
  },
  filters: {
    function() {},
  },
};
</script>

<style lang="scss">
.w-table {
  .el-table .darg_start {
    background-color: #f3f3f3;
  }
  .el-table th {
    padding: 0;
    .virtual {
      position: fixed;
      display: block;
      width: 0;
      height: 0;
      margin-left: -10px;
      background: none;
      border: none;
    }
    &.darg_active_left {
      .virtual {
        border-left: 1px dotted#409EFF;
        z-index: 99;
      }
    }
    &.darg_active_right {
      .virtual {
        border-right: 1px dotted#409EFF;
        z-index: 99;
      }
    }
  }
  .thead-cell {
    padding: 0;
    display: inline-flex;
    flex-direction: column;
    align-items: left;
    cursor: pointer;
    overflow: initial;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
  &.w-table_moving {
    .el-table th .thead-cell {
      cursor: move !important;
      
    }
    .el-table__fixed {
      cursor: not-allowed;
    }
  }
}
</style>
