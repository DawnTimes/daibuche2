/*
 * @Author: 廖亿晓
 * @Date: 2020-07-27 11:46:30
 * @LastEditTime: 2020-07-27 15:57:35
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \webcode2\src\common\dateDisabled.js
 */


export const dateDisabled = (inputDate) => {
  var year = inputDate.getFullYear();
  var month = (inputDate.getMonth() + 1).toString();
  var day = (inputDate.getDate()).toString();
  if (month.length == 1) {
    month = "0" + month;
  }
  if (day.length == 1) {
    day = "0" + day;
  }
  var dateTime = year + "-" + month + "-" + day;
  // console.log(dateTime);
  var d = new Date(dateTime.replace(/\-/, "/ "));
  // console.log(d.getDate());
  // var nd = new Date(d.getTime() + 24 * 60 * 60 * 1000); //next day 
  // console.log(nd);
  // console.log(d.getDate() != 4);
  // debugger
  if (d.getDate() == 4 || d.getDate() == 19) {
    return false
  } else {
    return true
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
