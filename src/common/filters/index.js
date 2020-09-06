/*
 * @Author: 廖亿晓
 * @Date: 2020-08-10 14:16:06
 * @LastEditTime: 2020-08-27 11:32:14
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\common\filters\index.js
 */
import _ from 'lodash';
import Vue from 'vue';
import Dictionary from './dictionary';

// 遍历字典
for (const key in Dictionary) {
  if (key) {
    Vue.filter(key, (data, agm) => {
      const dict = Dictionary[key];

      // 如果类型是function的话，则回调
      if (_.isFunction(dict)) {
        return _.isArray(agm) ? dict(data, ...agm) : dict(data, agm);
      }

      // object or array
      // if (_.isObject(data) || _.isArray(data) || _.isEmpty(data)) {  //使用方法：this.$options.filters.status()
      if (_.isObject(data) || _.isArray(data)) {  // 使用方法：this.$options.filters.status([]) 或 this.$options.filters.status({})
        return dict;
      }

      let item = _.find(dict, {
        value: data
      });
      if (!_.isEmpty(item)) {
        return item.label;
      }

      item = _.find(dict, {
        label: data
      });
      if (!_.isEmpty(item)) {
        return item.value;
      }

      return data;
    });
  }
}

export default {
  Dictionary,
};
