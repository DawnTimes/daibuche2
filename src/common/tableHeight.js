/*
 * @Author: 廖亿晓
 * @Date: 2020-08-10 18:20:33
 * @LastEditTime: 2020-08-11 10:26:01
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\common\tableHeight.js
 */

import Vue from 'vue'

 export const heightAuto = (tableHeight, refName) => {
  Vue.nextTick(function () {
    tableHeight = window.innerHeight - refName - 120;
    
    // 监听窗口大小变化
    // let self = this;
    window.onresize = function() {
     tableHeight = window.innerHeight - refName - 120;
    }
  })
  //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
  //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
 }


 
//  var setClass = {
//   setHeight() {},
//   setWidth() {},
//  };

// //  export function setHeight() {
// //  }
// //  export function setWidth() {
// //  }

//  export default {
//   setClass,
//   // setHeight,
//   // setWidth,
//  }