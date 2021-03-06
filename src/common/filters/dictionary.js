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

  // 租金审批状态
  approvalStatus: [{
      label: '待提交',
      value: '1'
    },
    {
      label: '待会计审批',
      value: '2'
    },
    {
      label: '待财务负责人审批',
      value: '3'
    },
    {
      label: '审批通过',
      value: '4'
    },
    {
      label: '审批拒绝',
      value: '5'
    },
  ],
  // 支援金审批状态
  supportApprovalStatus: [
    {
      label: '待提交',
      value: '1'
    },
    {
      label: '待财务审批',
      value: '2'
    },
    {
      label: '待资管负责人审批',
      value: '3'
    },
    {
      label: '审批通过',
      value: '4'
    },
    {
      label: '审批拒绝',
      value: '5'
    },
  ],

  // 租赁方式
  leaseWay: [
    { label: '直租', value: 'LEASE' },
    { label: '回租', value: 'BACK-LEASE' },
    { label: '经租', value: 'OPERATING-LEASE' },
  ],
  // 租赁方式
  isGacShopFormat: [
    { label: '商贸全资', value: 'Y' },
    { label: '非商贸', value: 'N' },
    { label: '商贸非全资', value: 'F' },
  ],
  // 纳税人类型
  taxPayerType: [
    { label: '一般纳税人', value: '0' },
    { label: '小规模纳税人', value: '1' },
    { label: '个人', value: '2' },
  ],

  // 合同类型
  contractType: [
    { label: '直租合同', value: 'LEASE' },
    { label: '回租合同', value: 'BACK-LEASE' },
    { label: '经租合同', value: 'OPERATING-LEASE' },
    { label: '直租变更协议', value: 'LEASE-CHANGE' },
    { label: '回租变更协议', value: 'BACK-LEASE-CHANGE' },
    { label: '经租变更协议', value: 'OPERATING-LEASE-CHANGE' },
    { label: '终止协议', value: 'END_CHANGE' },
    { label: '买断', value: 'BUY_OUT' },
  ],

  // 合同状态
  contractStatus: [
    { label: '正常', value: 'Y' },
    { label: '异常', value: 'N' },
  ],

  // 反冲状态
  recoilStatus: [
    { label: '已反冲', value: 'Y' },
    { label: '未反冲', value: 'N' },
  ],
  // 开票状态
  isOpenStatus: [
    { label: '是', value: 'Y' },
    { label: '否', value: 'N' },
  ],

  // 支付状态
  paymentStatus: [
    { label: '已支付', value: 'HAVEGRANT' },
    { label: '已申请', value: 'HAVEAPPLY' },
    { label: '未支付', value: 'NOT'},
    // { label: '未申请', value: '' },
  ],
  // 支援金状态
  payStatus: [
    { label: '已发放', value: 'HAVEGRANT' },
    { label: '已申请', value: 'HAVEAPPLY' },
    { label: '未申请', value: 'NOTAPPLY' || '' },
    // { label: '未申请', value: '' },
  ],

  // 核销状态
  verState: [
    { label: '已核销', value: 'FULL' },
    { label: '部分核销', value: 'PART' },
    { label: '未核销', value: 'NOT' },
  ],

  // 批次
  batchFormat: [
    { label: '第一批', value: '1' },
    { label: '第二批', value: '2' },
    { label: '第三批', value: '3' },
    { label: '第四批', value: '4' },
    { label: '第五批', value: '5' },
    { label: '第六批', value: '6' },
    { label: '第七批', value: '7' },
    { label: '第八批', value: '8' },
    { label: '第九批', value: '9' },
    { label: '第十批', value: '10' },
    { label: '第十一批', value: '11' },
    { label: '第十二批', value: '12' },
    { label: '第十三批', value: '13' },
    { label: '第十四批', value: '14' },
    { label: '第十五批', value: '15' },
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
      // const time = new Date(data);
      // const year = time.getFullYear();
      // const month = time.getMonth() + 1;
      // const day = time.getDate();
      // const hour = time.getHours();
      // const minute = time.getMinutes();
      // const second = time.getSeconds();
      // return `${year}-${month}-${day}`;

      return moment(data).format('YYYY-MM-DD')
    }

    return data;
  },
  // 格式化时间 YYYY-MM-DD HH:mm:ss
  // timeFormatTemp(data) {
  //   if (data) {
  //     const time = new Date(data);
  //     const year = time.getFullYear();
  //     const month = time.getMonth() + 1;
  //     const day = time.getDate();
  //     const hour = time.getHours();
  //     const minute = time.getMinutes();
  //     const second = time.getSeconds();
  //     return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  //   }

  //   return data;
  // },
  // 格式化时间 YYYY-MM-DD HH:mm:ss
  timeFormatTemp(data) {
    if (data) {
      return moment(data).format('YYYY-MM-DD HH:mm:ss')
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

  // 金额格式化
  moneyFormat(number, decimals = 2, dec_point = '.', thousands_sep = ',') {
    /* 
     * 参数说明：
     * number：要格式化的数字
     * decimals：保留几位小数
     * dec_point：小数点符号
     * thousands_sep：千分位符号
     * */
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    // isFinite() 函数用于检查其参数是否是无穷大。返回 true 或 false
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
      dec = typeof dec_point === 'undefined' ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.ceil(n * k) / k;
      };
  
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + sep + '$2');
    }
  
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  },

};

export default Dictionary;
/* eslint-enable */
