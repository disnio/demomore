/*
 * @Author: fengzp
 * @Date: 2021-06-17 18:18:36
 * @LastEditors: fengzp
 * @LastEditTime: 2021-07-14 15:43:04
 * @Introduce: Do not edit
 */
// 乘法
export function accMul(arg1 = '', arg2 = '') {
  var m = 0;
  var s1 = arg1.toString();
  var s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {}
  try {
    m += s2.split('.')[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
    Math.pow(10, m)
  );
}

// 除法
export function accDiv(arg1 = '', arg2 = '') {
  var t1 = 0;
  var t2 = 0;
  var r1;
  var r2;
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) {}
  // with (Math) {
  r1 = Number(arg1.toString().replace('.', ''));
  r2 = Number(arg2.toString().replace('.', ''));
  return accMul(r1 / r2, Math.pow(10, t2 - t1));
  // }
}

// 减法
export function Subtr(arg1 = '', arg2 = '') {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 加法
export function accAdd(arg1 = '', arg2 = '') {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}

// 判断闰年的函数
export function isRunYear(year) {
  // 条件:能被4整除并且不能被100整除，或者被400整除的
  var flag = false;
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    flag = true;
  }
  return flag;
}
// 获取当前月份有多少天
export function getMonthDay(year, month) {
  let runYear = isRunYear(year);
  let dayNumEnd = '';
  let num1 = ['01', '03', '05', '07', '08', '10', '12']; //31天
  let num2 = ['04', '06', '09', '11']; //30天
  if (_.includes(num1, month)) {
    dayNumEnd = '31';
  } else if (_.includes(num2, month)) {
    dayNumEnd = '30';
  } else {
    // 2月处理平年闰年
    if (runYear) {
      dayNumEnd = '29';
    } else {
      dayNumEnd = '28';
    }
  }
  return dayNumEnd;
}
// 获取当前日期
export function getTodayDay() {
  let myDate = new Date();
  let year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
  let month = myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)
  if (month <10) {
    month = '0' + month;
  }
  let date = myDate.getDate(); //获取当前日(1-31)
  if (date < 10) {
    date = '0' + date;
  }
  let day = `${year}-${month}-${date}`
  return day;
}
// 获取前几十天
export function getAgoDay(time) {
  var date1 = new Date();
  var date2 = new Date(date1);
  time = Number(time);
  if (time > 0) {
    date2.setDate(date1.getDate() + Math.abs(time));
  }else {
    date2.setDate(date1.getDate() - Math.abs(time));
  }

  let year = date2.getFullYear(); //获取完整的年份(4位,1970-????)
  let month = date2.getMonth()+1; //获取当前月份(0-11,0代表1月)
  if (month <10) {
    month = '0' + month;
  }
  let date = date2.getDate(); //获取当前日(1-31)
  if (date < 10) {
    date = '0' + date;
  }
  let day = `${year}-${month}-${date}`
  return day;
}


