/**
 * @author wangqiang
 * @description 基于 Element Table 组件扩展的自动合并方法
 * @date 2020-03-25 15:49:00
 * 使用方法：
 * <el-table :data="dataList" :span-method="colspanMethod">
 * </el-table>
 * import { handleTableSpan, handleObjectSpanMethod } from '@common/utils/tbMerge'
 * data() {
 *   return {
 *      dataList: [],
 *      // 要合并的单元格的rowspan 数据 纵向合并必须
 *      rowspanObj: {}, 
 *      // 要纵向合并的单元格的key数组 纵向合并必须
 *      mergekeys: ['name1', 'name2', 'name3'],
 *      // 横向合并必须 rIndex 行索引，s 从哪列开始，e 到哪列结束
 *      mergeLists: [{rIndex: 0, s: 1, e: 3}, {rIndex: 1, s: 2, e: 4}]
 *    };
 * }
 * dataList 为接口返回的 table list 
 * // 先处理一下数据，拿到要合并单元格的 rowspan 数据，纵向合并必须，横向忽略
 * this.rowspanObj = handleTableSpan(this.mergekeys, this.dataList)
 * 合并方法：
 * colspanMethod(tableObj) {
 *   return handleObjectSpanMethod(tableObj, this.mergekeys, this.rowspanObj, this.mergeLists)
 * }
 **************************************************************************************************
 *****      特别说明：开发不易，修改请务必保持用法一致，如有新增用法，使用方法务必添加致头部注释中!！        *****
 **************************************************************************************************
 */

/**
 * @description 此方法适用于与table纵向合并，计算位置
 * @param {Array} mergeKeys  要合并的keys数组
 * @param {Array} tableData  渲染table组件的原始数据
 */
 export function handleTableSpan(mergeKeys, tableData) {
  const spanObj = {}
  if (mergeKeys instanceof Array && tableData instanceof Array && mergeKeys.length && tableData.length) {
    mergeKeys.forEach(key => {
      spanObj[key] = []
      let position = 0
      tableData.forEach((item, index) => {
        if (index === 0) {
          spanObj[key].push(1)
          position = 0
        } else {
          // 如果要合并的key 值是引用数据类型，我们要先把 数组或者 对象转成json 格式然后对比
          if (tableData[index][key] instanceof Array || tableData[index][key] instanceof Object) {
            if (JSON.stringify(tableData[index][key]) === JSON.stringify(tableData[index - 1][key])) {
              spanObj[key][position] +=1
              spanObj[key].push(0)
            } else {
              spanObj[key].push(1)
              position = index
            }
          } else {
            if (tableData[index][key] === tableData[index - 1][key]) {
              spanObj[key][position] +=1
              spanObj[key].push(0)
            } else {
              spanObj[key].push(1)
              position = index
            }
          }
        }
      })
    })
    return spanObj
  }
};

/**
 * @description 合并
 * @param {Object} tableObj table组件 span-method 方法四个参数{ row, column, rowIndex, columnIndex } 的对象
 * @param {Array} mergeKeys 要合并的keys数组
 * @param {Object} rowspanObj 经过 handleTableSpan 方法处理tableData 数据，得到的单元格的合并行数对象
 * @param {Array} mergeLists 横向强制合并 [{rIndex: 0, s: 1, e: 3}] rIndex 行索引，s 从哪列开始，e 到哪列结束
 */
export function handleObjectSpanMethod (tableObj, mergeKeys, rowspanObj, mergeLists) {
  const { row, column, rowIndex, columnIndex } = tableObj
  // 纵向合并
  if (mergeKeys instanceof Array && rowspanObj instanceof Object) {
    for (let i = 0 ; i < mergeKeys.length; i++) {
      let term = column.property === mergeKeys[i]
      if (term) {
        const _row = rowspanObj[mergeKeys[i]][rowIndex]
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
  }
  // 横向合并
  if (mergeLists instanceof Array && mergeLists.length) {
    for(let i=0;i<mergeLists.length;i++) {
      if (rowIndex === mergeLists[i].rIndex) {
        for (let a=mergeLists[i].s; a<mergeLists[i].e;a++) {
          if (columnIndex === mergeLists[i].s) {
            return [1, mergeLists[i].e+1-mergeLists[i].s];
          } 
          if (columnIndex === a+1) {
            return [0, 0];
          }
        }
      }   
    }
  }
}
