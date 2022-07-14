/**
 * @file: sortTr.js
 * @method changeKeys
 * @param {Object} v
 * @return {Object}
 * @description: 对象属性值 1->true, 0->false
 * @author: wsc
 * @date: 2020-09-26
 */

import _ from 'lodash';

// 对 columns 里的 1 0 进行布尔化处理
export function changeKeys(v) {
  const boolHead = ['sortable', 'see'];
  Object.keys(v).forEach(k => {
    if (_.includes(boolHead, k)) {
      if (v[k] === 1) {
        v[k] = true;
      } else if (v[k] === 0) {
        v[k] = false;
      }
    }
  });

  return v;
}

// 根据表格数据和 字段名映射生成 columns
export function genColumns(list, colPair) {
  // console.log('🚀genColumns', list, colPair);
  return _.compact(
    _.keys(list[0]).map(v => {
      if (colPair[v]) {
        return {
          label: colPair[v],
          prop: v,
          sortable: true,
          width: '160',
        };
      }
    })
  );
}
// 根据字段名映射生成 columns
export function genColumnsNoTable(colPair) {
  let list = [];
  for (let key in colPair) {
    list.push({
      label: colPair[key],
      prop: key,
      sortable: false,
      width: '',
    });
  }
  return list
}

// 统一带 Name 和 对应 id 的表头
export function genIdName(list, replaceHead) {
  let hkeys = _.keys(replaceHead);
  _.forEach(hkeys, v => {
    let index = _.findIndex(list, val => {
      return val.prop === v;
    });
    if (index !== -1) {
      let obj = {
        ...list[index],
        prop: replaceHead[v],
      };
      list.splice(index, 1, obj);
    }
  });
}

// element 表格组件 jsx 写法封装
export const sortTr = {
  name: 'sortTr',
  props: {
    table: Object, // 表格属性
    data: Array, // 表格数据
    columns: Array, // 表头
    options: Array, // 操作列
    event: Object, // 表格事件回调
  },

  data() {
    return {
      cache: {},
    };
  },

  methods: {
    // 渲染单元格方法选取
    scopeCell(h, props, item) {
      if (typeof item.renderTpl === 'function') {
        return item.renderTpl(h, props, item);
      } else {
        return props.row[item.prop];
      }
    },
    // 渲染选择列
    renderSelect(h, item) {
      const cellProps = {
        props: {
          ...item,
        },
        'min-width': item['min-width'],
        on: {
          ...this.$listeners,
          ...this.event,
        },
      };
      return (
        <el-table-column type={item.prop} {...cellProps}></el-table-column>
      );
    },
    // 渲染单元格
    renderCell(h, item, children) {
      const cellProps = {
        props: {
          ...item,
        },
        ...item,
        on: {
          ...this.$listeners,
          ...this.event,
        },
        scopedSlots: {
          default: props => {
            return this.scopeCell(h, props, item);
          },
        },
      };
      return <el-table-column {...cellProps}>{children}</el-table-column>;
    },
  },
  render(h) {
    const tableProps = {
      props: {
        ...this.$attrs,
        data: this.data,
        ...this.table,
      },
      on: {
        ...this.$listeners,
        ...this.event,
      },
      ref: this.table.ref,
      scopedSlots: this.$scopedSlots,
    };

    return (
      <el-table width={'100%'} {...tableProps} ref={tableProps.ref}>
        {this.columns &&
          this.columns.map((item, i) => {
            if (item) {
              switch (item['prop']) {
                case 'selection':
                case 'index':
                  return this.renderSelect(h, item);
                case undefined:
                  // 行列合并的支持
                  if (item.children && item.children.length > 0) {
                    let ch = item.children.map((citem, index) => {
                      return this.renderCell(h, citem, '');
                    });
                    return this.renderCell(h, item, ch);
                  }
                  break;

                default:
                  return this.renderCell(h, item, '');
              }
            }
          })}
      </el-table>
    );
  },
};
