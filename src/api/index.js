/*
 * @Author: 廖亿晓
 * @Date: 2020-08-10 17:34:49
 * @LastEditTime: 2020-08-10 17:35:30
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\api\index.js
 */

import axios from '@/common/axios.js';
import common from '@/common/common.js';

export const queryDict = (params) => {
  const url = common.queryDictUrl;
  return axios.post(url, params).then((res) => {
    return res
  })
}