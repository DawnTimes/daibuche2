/*
 * @Author: 廖亿晓
 * @Date: 2020-07-27 11:46:30
 * @LastEditTime: 2020-08-18 14:59:45
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\common\dateDisabled.js
 */


export const dateDisabled = (inputDate) => {
  // var year = inputDate.getFullYear();
  // var month = (inputDate.getMonth() + 1).toString();
  // var day = (inputDate.getDate()).toString();
  // if (month.length == 1) {
  //   month = "0" + month;
  // }
  // if (day.length == 1) {
  //   day = "0" + day;
  // }
  // var dateTime = year + "-" + month + "-" + day;
  // var d = new Date(dateTime.replace(/\-/, "/ "));

  if (inputDate.getDate() == 4 || inputDate.getDate() == 19) {
    return false
  } else {
    return true
  }
}


export const monthDisabled = (inputDate) => {
  var time = new Date();
  var year = time.getFullYear();
  var month = time.getMonth() + 1;

  // 大于今年的禁用
  if (inputDate.getFullYear() > year) {
    return true
  } else if (inputDate.getFullYear() == year) {
    // 大于当月的禁用
    if (inputDate.getMonth() + 1 > month) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }

}


// export default {
//   dateDisabled(inputDate) {
//     var year = inputDate.getFullYear();
//     var month = (inputDate.getMonth() + 1).toString();
//     var day = (inputDate.getDate()).toString();
//     if (month.length == 1) {
//       month = "0" + month;
//     }
//     if (day.length == 1) {
//       day = "0" + day;
//     }
//     var dateTime = year + "-" + month + "-" + day;
//     // console.log(dateTime);
//     var d = new Date(dateTime.replace(/\-/, "/ "));
//     // console.log(d.getDate());
//     // var nd = new Date(d.getTime() + 24 * 60 * 60 * 1000); //next day 
//     // console.log(nd);
//     // console.log(d.getDate() != 4);
//     // debugger
//     if(d.getDate() == 4 || d.getDate() == 19) {
//       return false
//     } else {
//       return true
//     }
//   }
// }
