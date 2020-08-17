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
      if (_.isObject(data) || _.isArray(data)) {
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
