import _ from 'lodash';
import moment from 'moment';

window.moment = moment;

/* eslint-disable */
const Dictionary = {
  // 状态
  state: [{
      label: '正常',
      value: 1
    },
    {
      label: '取消',
      value: 2
    },
    {
      label: '冻结',
      value: 3
    },
    {
      label: '删除',
      value: 4
    },
  ],

  // 用户角色状态
  delFlag: [{
      label: '有效',
      value: '0'
    },
    {
      label: '无效',
      value: '1'
    },
  ],

  // 有效无效状态
  status: [{
      label: '有效',
      value: 'Y'
    },
    {
      label: '无效',
      value: 'N'
    },
  ],
  // 是否状态
  flagValue: [{
      label: '是',
      value: 'Y'
    },
    {
      label: '否',
      value: 'N'
    },
  ],

  // 流程状态
  processFlow: [{
      label: '失效状态',
      value: 'invalidFlow'
    },
    {
      label: '变更状态',
      value: 'changeFlow'
    },
  ],

  // 审批状态
  approvalStatus: [{
      label: '待提交',
      value: 'toBeSubmit'
    },
    {
      label: '待审批',
      value: 'waitApproval'
    },
    {
      label: '审批拒绝',
      value: 'refuse'
    },
    {
      label: '审批通过',
      value: 'approved'
    },
  ],

  // 保留多少位小数点
  FilterFixed: (data, fixed) => {
    if (data) {
      return _.isNumber(fixed * 1) ? data.toFixed(fixed) : data.toFixed(2);
    }
    return data;
  },

  // 格式化时间 YYYY-MM-DD
  timeFormat(data) {
    if (data) {
      const time = new Date(data);
      const year = time.getFullYear();
      const month = time.getMonth() + 1;
      const day = time.getDate();
      // const hour = time.getHours();
      // const minute = time.getMinutes();
      // const second = time.getSeconds();
      return `${year}-${month}-${day}`;
    }

    return data;
  },
  // 格式化时间 YYYY-MM-DD HH:mm:ss
  timeFormatTemp(data) {
    if (data) {
      const time = new Date(data);
      const year = time.getFullYear();
      const month = time.getMonth() + 1;
      const day = time.getDate();
      const hour = time.getHours();
      const minute = time.getMinutes();
      const second = time.getSeconds();
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }

    return data;
  },

  formatTime: (data) => {
    if (!data) {
      return null;
    }

    const formatTime = moment.unix(data).format('YYYY-MM-DD HH:mm:ss');
    // const formatTime = moment.unix(moment(data).unix()).format('YYYY-MM-DD HH:mm:ss');
    return formatTime !== 'Invalid date' ? formatTime : data;
  },

  formatDate: (data) => {
    if (!data) {
      return null;
    }

    const formatTime = moment.unix(data).format('YYYY-MM-DD');
    return formatTime !== 'Invalid date' ? formatTime : data;
  },

  formTimestamp: (data) => {
    const item = moment(new Date(data)).unix();
    return item ? item : data;
  },

  // 显示什么时间前
  FilterVisitTime(data) {

    if (data) {
      // 当前时间减去传入时间，返回时间戳
      const t = parseInt(new Date().getTime() / 1000) - parseInt(new Date(data).getTime() / 1000);

      const time = t / 60;

      if (time < 2) {
        data = '刚刚';
      } else if (time >= 2 && time < 60) {
        data = `${parseInt(time)}分钟前`;
      } else if (time >= 60 && time < 86400) {
        data = `${parseInt(time / 60)}小时前`;
      } else if (time >= 86400) {
        data = `${parseInt(time / 86400)}天前`;
      }

      return data;
    }

    return data;
  },


  FilterDecodeURI(data) {
    if (data) {
      return window.decodeURIComponent(data);
    }
    return data;
  },

  // 格式化年龄段名称
  formAtAgeToName(data) {
    data = data * 1;
    let name = null;

    if (data < 18) {
      name = '少儿';
    } else if (data >= 18 && data < 30) {
      name = '青年';
    } else if (data >= 30 && data < 40) {
      name = '中青';
    } else if (data >= 40 && data < 60) {
      name = '中年';
    } else {
      name = '老年';
    }

    return name;
  },

  // 检测是否存在
  formAtHas(data, value) {
    return _.findIndex(data, value) !== -1 ? true : false;
  },

  /**
   * [ArrayToString 数组转换字符串]
   * @param {[array]} array [传入数组]
   * @param {[sting]} field [需要转换的字段]
   */
  ArrayToString(array, field) {
    if (_.isArray(array) && !_.isEmpty(field)) {
      let data = [];
      _.each(array, (item) => {
        data.push(item[field]);
      });

      return data.join();
    }

    return '';
  },

};

export default Dictionary;
/* eslint-enable */
