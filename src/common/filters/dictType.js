/*
 * @Author: 廖亿晓
 * @Date: 2020-06-18 16:25:58
 * @LastEditTime: 2020-06-18 16:39:43
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\common\filters\dictType.js
 */

import Vue from 'vue';

const formatStatus = (row, array) => {
  let columnValueDesc = '';
  array.forEach((v) => {
    if (row.status == v.columnValueCode) {
      return columnValueDesc = v.columnValueDesc
    }
  })
  return columnValueDesc;
}

export default formatStatus
