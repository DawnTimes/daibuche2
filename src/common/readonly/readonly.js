import _ from 'lodash';

let Vue;
export default {
  install(externalVue) {
    if (this.installed) {
      return;
    }

    Vue = externalVue;
    Vue.prototype.$formAtReadonly = (str, array) => {
      if (_.indexOf(array, '*') !== -1) return true;
      return _.indexOf(array, str) === -1 ? false : true;
    };
    this.installed = true;
  },
};
