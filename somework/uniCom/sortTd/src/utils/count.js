import { BigNumber } from "bignumber.js";

// 加法---add

export const add = (a, b) => BigNumber(a).plus(b).toNumber()

// 减法---minus

export const minus = (a, b) => BigNumber(a).minus(b).toNumber()

// 乘法---times

export const times = (a, b) => BigNumber(a).times(b).toNumber()

// 除法---div

export const div = (a, b) => BigNumber(a).div(b).toNumber()

// 取模/取余---mod

export const mod = (a, b) => BigNumber(a).mod(b).toNumber()

// 指数运算-->pow

export const pow = (a, b) => BigNumber(a).pow(b).toNumber()

// 开平方-->sqrt

export const sqrt = (a, b) => BigNumber(a).sqrt(b).toNumber()

// 四舍五入-->toFixed

export const toFixed = (a, n) => BigNumber(a).toFixed(n)
