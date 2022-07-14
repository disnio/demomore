<template>
  <sort-tr
    :ref="sref"
    v-bind:table="table"
    v-bind:columns="cols"
    v-bind:data="list"
    v-bind:event="tableEvent"
  ></sort-tr>
</template>

<script>
/**
 * @file: sortTc.vue
 * @return {type} 表格生成及单元格编辑
 * @description: 此组件为了实现动态表头及表格内使用表单组件
 * @author: wsc
 * @version: beta
 * @email: 291166364@qq.com
 * @date: 2020-12-11
 */

import { initLayout } from '@common/utils/init';
import { sortTr, genIdName, changeKeys, genColumns } from './sortTr';
import dw from '@common/components/uniCom/down';
import { validate } from '@common/components/uniCom/valid';

export default {
  name: 'sortTc',
  // 下载方法混入
  mixins: [dw],
  components: {
    // 基础 Element 表格封装
    'sort-tr': sortTr,
  },
  props: {
    // 本地引用
    sref: { type: String, default: 'sort_tb' },
    // 表头
    columns: Array,
    // element 的 表格属性
    tableProp: {
      type: Object,
      default: {
        options: {},
        index: true,
      },
    },
    // 渲染的数据
    tableData: { type: Array, default: [] },
    // element 的表格事件监听，如 selection-change
    tableEvent: { type: Object, default: {} },
    // 表格最后要加的操作：查看、编辑等，没有操作 false，配置加非电力合同
    tableMethod: {
      type: Object,
      default: {
        lastOpts: true,
      },
    },
    // 表格列属性、columns 生成需要的额外字段
    tableCol: {
      type: Object,
      default: {
        // 打开选择列
        selection: true,
        // 要排除的字段
        exclude: [],
        // 要排序的字段
        order: [],
        // 替换掉表头数据中的字段：比如 status: 'statusName'
        replace: [],
        // 当需要手动生成 columns 时的 属性名字段和名称的映射 indexItemName: '数据项名称'
        headKv: [],
        // 从 tableData 中要提取的字段
        heads: [],
        // 附件
        enclosure: false,
        // 当表格中包含表单组件时需要验证的字段
        validation: [],
      },
    },
    /**
     * @参数 {type} argName - description
     * @参数 {type} argName - description
     * @返回值 {type} argName - description
     * @描述: 自定义的列内部操作，输入、上传
     */
    colAction: { type: Array, default: [] },

    noRenderRow: { type: Array, default: [] },
    upload: {
      type: Object,
      default: {
        prop: 'enclosure',
        batch: 'batch',
        key: 'id',
      },
    },
    noRender: {
      type: Object,
    },
    query: { type: Object, default: { limit: 10, page: 1 } },
  },
  data() {
    return {
      // 选择列
      selTpl: {
        prop: 'selection',
        width: '55',
        fixed: true,
        align: 'center',
        selectable: this.mtColSel,
      },
      // 序号列
      indexTpl: {
        prop: 'index',
        label: '序号',
        width: '50',
        fixed: true,
        align: 'center',
        index: this.mtColIndex,
      },
      // 操作列
      optTpl: {
        prop: 'options',
        label: '操作',
        fixed: 'right',
        width: '160',
        renderTpl: this.renderLastTpl,
        see: true,
        align: 'center',
        'header-align': 'center',
      },
      // 表格属性
      table: {
        ref: 'sr_table',
        height: '290',
        border: true,
        'highlight-current-row': true,
        fit: true,
        defaultSort: {
          prop: 'index',
          order: 'ascending',
        },
        ...this.tableProp,
      },
      // 操作列默认
      options: [
        {
          types: 'view',
          type: 'text',
          size: 'small',
          label: '查看',
          isShow: true,
        },
        {
          types: 'edit',
          type: 'text',
          size: 'small',
          label: '编辑',
          isShow: true,
        },

        {
          types: 'del',
          type: 'text',
          size: 'small',
          label: '删除',
          isShow: true,
        },
        {
          types: 'add',
          type: 'text',
          size: 'small',
          label: '添加',
          isShow: true,
        },
      ],
      //表头
      cols: [],
      // 表格数据
      list: [],
    };
  },

  watch: {
    tableData: {
      immediate: true,
      deep: true,
      handler: function (n, o) {
        this.createCols();
      },
    },
    tableProp: {
      immediate: true,
      deep: true,
      handler: function (n, o) {
        this.createCols();
      },
    },
    colAction: {
      immediate: true,
      deep: true,
      handler: function (n, o) {
        this.createCols();
      },
    },
    columns: {
      immediate: true,
      deep: true,
      handler: function (n, o) {
        this.createCols();
      },
    },
  },
  methods: {
    // 生成表头并绑定渲染函数
    createCols() {
      let len, cols, dt;

      if (this.columns) {
        len = this.columns.length;
        cols = this.columns.map((v, i) => {
          if (v.width === '' && i < len - 2) {
            v.width = 150;
          }
          return v;
        });
      } else {
        cols = [];
      }
      dt = this.tableData.length > 0 ? [...this.tableData] : [];

      if (this.columns === undefined && dt.length > 0) {
        dt = dt.map(v => {
          let obj = {};

          if (
            _.has(v, this.tableProp['tree-props']) &&
            _.has(v, this.tableProp['tree-props'].children)
          ) {
            obj[this.tableProp['tree-props'].children] =
              v[this.tableProp['tree-props'].children];
          }
          _.forEach(this.tableCol.heads, h => {
            obj[h] = v[h];
            if (this.tableProp.valid) {
              let act = _.includes(this.tableCol.validation, h);
              if (act) {
                let s = [h + 'State', h + 'Message'];
                _.forEach(s, t => {
                  obj[t] = v[t];
                });
              }
            }
          });

          return obj;
        });
        cols = genColumns(dt, this.tableCol.headKv);
      }
      if (this.tableCol.nosort) {
        if (_.isArray(this.tableCol.nosort)) {
          cols = _.map(cols, v => {
            if (_.includes(this.tableCol.nosort, v.prop)) {
              v.sortable = false;
            }
            return v;
          });
        }

        if (this.tableCol.nosort === '*') {
          cols = _.map(cols, v => {
            v.sortable = false;
            return v;
          });
        }
      }

      if (!!this.tableCol.replace) {
        genIdName(cols, this.tableCol.replace);
      }
      cols = _.uniqBy(cols, v => {
        return v.prop;
      });

      if (
        this.tableCol.exclude &&
        this.tableCol.exclude.length > 0 &&
        cols.length > 0
      ) {
        cols = _.filter(cols, v => {
          let ex = false;
          this.tableCol.exclude.forEach(e => {
            if (!_.startsWith(e, '-') && e === v.prop) {
              ex = true;
            }

            if (_.startsWith(e, '-')) {
              if (v.prop.includes(e.slice(1))) {
                ex = true;
              }
            }
          });

          return !ex;
          // return !_.includes(this.tableCol.exclude, v.prop);
        });
      }

      if (this.tableCol.enclosure) {
        // enclosure 不解析，用 formFile
        // dt = this.appendFiles(dt);
        let fIndex = _.findIndex(cols, v => {
          // v.prop === "files" ||
          return v.prop === (this.upload.prop || 'enclosure');
        });
        // 附件显示与下载
        // cols[fIndex].renderTpl = this.renderFiles;
        if (fIndex > -1) {
          cols[fIndex].renderTpl = this.mtUpload.bind(this);
        }
      }

      cols = cols.map(v => {
        v = changeKeys(v);
        return v;
      });

      if (
        this.tableCol.order &&
        this.tableCol.order.length > 0 &&
        cols.length > 0
      ) {
        cols = this.mtColSort(this.tableCol.order, cols);
      }

      cols = _.compact(cols);

      // console.log('cols:  ', cols);

      if (this.colAction.length > 0) {
        cols = _.map(cols, v => {
          let index = _.findIndex(this.colAction, k => {
            if ('prop' in v) {
              return k.prop === v.prop;
            } else {
              return false;
            }
          });

          if (index !== -1) {
            switch (this.colAction[index].type) {
              case 'upload':
                v.renderTpl = (h, scope, item) => {
                  return this.colAction[index].renderTpl
                    ? this.colAction[index].renderTpl
                    : this.mtUpload(h, scope, item, this.colAction);
                };
                break;
              case 'select':
                v.renderTpl = (h, scope, item) => {
                  return this.colAction[index].renderTpl
                    ? this.colAction[index].renderTpl
                    : this.mtColFormSelect(h, scope, item, this.colAction);
                };
                break;
              case 'switch':
                v.renderTpl = (h, scope, item) => {
                  return this.colAction[index].renderTpl
                    ? this.colAction[index].renderTpl
                    : this.mtColSwitch(h, scope, item, this.colAction);
                };
                break;
              case 'date':
                v.renderTpl = (h, scope, item) => {
                  return this.colAction[index].renderTpl
                    ? this.colAction[index].renderTpl
                    : this.mtDate(h, scope, item, this.colAction);
                };
                break;
              default:
                v.renderTpl = (h, scope, item) => {
                  return this.colAction[index].renderTpl
                    ? this.colAction[index].renderTpl
                    : this.mtColFormInput(h, scope, item, this.colAction);
                };
            }
          }
          return v;
        });
      }

      if (!this.tableProp.disabled && !!this.tableMethod.lastOpts) {
        if (
          !!this.tableMethod.lastOptWidth &&
          typeof this.tableMethod.lastOptWidth === 'function'
        ) {
          this.optTpl.width = this.tableMethod.lastOptWidth();
        } else if (
          !!this.tableMethod.lastOptWidth &&
          typeof this.tableMethod.lastOptWidth === 'string'
        ) {
          this.optTpl.width = this.tableMethod.lastOptWidth;
        }
        cols = [...cols, this.optTpl];
      }

      cols = _.compact(cols);
      if (this.tableProp.index) {
        cols = [this.indexTpl, ...cols];
      }
      if (this.tableCol.selection) {
        cols = [this.selTpl, ...cols];
      }
      if (cols.length > 2) {
        this.cols = cols;
      } else {
        this.cols = [];
      }

      if (this.tableData.length === 0) {
        this.list = [];
      } else {
        this.list = dt;
      }
    },
    // 表格高度
    setHeight() {
      this.tabHeight = initLayout() - 220;
      this.$set(this.table, 'height', this.tabHeight);
    },

    noRenderRow(scope) {
      if (!_.isEmpty(this.noRender)) {
        return scope.row[this.noRender.prop] === this.noRender.key;
      }
    },
    // 操作列
    renderLastTpl(h, scope, item) {
      let optArr = this.tableMethod.lastOpts;

      let opts =
        optArr &&
        optArr.map(v => {
          let index = _.findIndex(this.options, m => {
            return m.types === v.types;
          });
          return {
            ...this.options[index],
            ...v,
          };
        });

      return (
        opts &&
        opts.map(btn => {
          if (typeof btn.isShow === 'function') {
            btn.isShow = btn.isShow(scope, item);
          }
          if (typeof btn.label === 'function') {
            btn.label = btn.label(scope, item);
          }

          return btn.isShow ? (
            <el-button
              icon={btn.icon}
              type={btn.type}
              onClick={() => btn.event(scope.row, item)}
            >
              {btn.label}
            </el-button>
          ) : null;
        })
      );
    },
    // 序列号
    mtColIndex(index) {
      return index + 1 + (this.query.page - 1) * this.query.limit;
    },
    // 排序拣选
    mtColSort(order, columns) {
      let cArr = columns.map(v => v.prop);
      let restArr = _.difference(cArr, order);
      let arr = _.concat(order, restArr);
      return _.map(arr, v => {
        return _.find(columns, { prop: v });
      });
    },
    // 表单验证通过触发
    validCallback(row, index, prop, errors, invalidFields) {
      this.$emit('change', this.list);
      this.$emit(
        'validate',
        prop,
        !errors,
        row[`${prop}Message`] || null,
        index,
        row
      );
    },
    // 输入框
    mtColFormInput(h, scope, item, colAct) {
      let act = _.find(colAct, v => {
        return v.prop === item.prop;
      });
      if (this.noRenderRow(scope)) return;

      let typeIn = act.typeIn ? act.typeIn : 'text';
      let hasError = scope.row && scope.row[`${item.prop}State`] === 'error';

      let in_props = {
        on: {
          blur: e => {
            if (act.rules) {
              validate(
                scope.row,
                item.prop,
                act.rules,
                'blur',
                this.validCallback
              );
            }
            if (act.on) {
              act.on.blur(e.target.value, scope, item);
            } else {
              this.mtInputBlur(e, scope.row, item, act);
            }
          },
          input: val => {
            this.mtInputChange(val, scope.row, item, act);
          },
        },
        class: {
          [this.tableProp.err]: hasError,
        },
      };
      let disProp = item.prop + 'Disabled';
      let disabled = _.has(scope.row, disProp) && scope.row[disProp];

      const input_node = (
        <el-input
          type={typeIn}
          vModel={scope.row[item.prop]}
          {...in_props}
          disabled={
            this.tableProp.disabled ||
            disabled ||
            act.disabled ||
            scope.row.disabled
          }
        ></el-input>
      );
      let msg = hasError ? scope.row[`${item.prop}Message`] : '';

      return (
        <el-tooltip
          class="item"
          effect="dark"
          disabled={!hasError}
          content={msg}
          placement="top"
        >
          {input_node}
        </el-tooltip>
      );
    },
    // 输入框 change 事件
    mtInputChange(val, row, item, act) {
      let index = _.findIndex(this.list, v => {
        return v[act.key] === row[act.key];
      });

      if (index !== -1) {
        this.$set(this.list[index], item.prop, val);
      }
    },
    // 输入框 blur 事件
    mtInputBlur(e, row, item, act) {
      let index = _.findIndex(this.list, v => {
        return v[act.key] === row[act.key];
      });

      if (index !== -1) {
        this.$emit('line-change', this.list[index]);
        this.$emit('change', this.list);
      }
    },
    // 上传组件调用
    mtUpload(h, scope, item) {
      let file_props = {
        attrs: {
          ...this.upload,
          enclosure: scope.row[this.upload.prop || 'enclosure'],
          disabled: this.tableProp.disabled || this.upload.disabled,
          event: {
            success: res => this.upload.event.success(res, scope),
            delete: res => this.upload.event.delete(res, scope),
            change: res => this.upload.event.change(res, scope),
          },
        },
      };

      return scope.row[this.upload.prop || 'enclosure'] !== undefined ? (
        <form-file {...file_props}></form-file>
      ) : (
        ''
      );
    },
    // 下载
    renderFiles(h, scope, item) {
      return (
        scope.row.files &&
        scope.row.files.map((btn, i) => {
          return (
            <el-button size="small" type="text" key={i}>
              <span onClick={() => this.downloadOut(btn)}>{btn.name}</span>
            </el-button>
          );
        })
      );
    },
    // 选择框
    mtColFormSelect(h, scope, item, colAct) {
      let act = colAct.find(v => {
        return v.prop === item.prop;
      });
      let options = [];
      if (
        item.prop in this.tableProp.options &&
        this.tableProp.options[item.prop].length !== 0
      ) {
        options = this.tableProp.options[item.prop][scope.$index];
        // options = this.tableProp.options[item.prop];
      }
      let props = act.props ? act.props : {};
      let sel_props = {
        props: {
          ...props,
          'remote-method': v => {
            props['remote-method'](v, scope, item);
          },
        },
        on: {
          change: val => {
            if (act.rules) {
              validate(
                scope.row,
                item.prop,
                act.rules,
                'change',
                this.validCallback
              );
            }
            if (act.on) {
              act.on.change(val, scope, item);
            }

            this.mtSelectChange(val, scope, item, act);
          },
          blur: () => {
            if (act.rules) {
              validate(
                scope.row,
                item.prop,
                act.rules,
                'blur',
                this.validCallback
              );
            }
          },
        },
        class: {
          [this.tableProp.err]:
            scope.row && scope.row[`${item.prop}State`] === 'error',
        },
      };
      return (
        <el-select
          {...sel_props}
          vModel={scope.row[item.prop]}
          disabled={this.tableProp.disabled}
        >
          {options &&
            options.map((v, i) => {
              return (
                <el-option label={v.label} value={v.value} key={i}></el-option>
              );
            })}
        </el-select>
      );
    },
    // 选择框 change 事件
    mtSelectChange(val, scope, item, act) {
      let index = _.findIndex(this.list, v => {
        return v[act.key] === scope.row[act.key];
      });
      let options = this.tableProp.options[item.prop][scope.row.$index] || [];

      let opt = options.find(v => v.value === val);

      if (_.has(act, 'props') && _.has(act.props, 'remote')) {
        options = options.filter(v => {
          return v.value.indexOf(val) !== -1;
        });
        this.tableProp.options[item.prop][scope.$index] = [...options];
      }

      if (index !== -1) {
        this.$set(this.list[index], item.prop, val);

        if (_.has(act, 'propName') && _.has(opt, 'label')) {
          this.$set(this.list[index], act.propName, opt.label);
        }

        this.$emit('line-change', this.list[index]);
        this.$emit('change', this.list);
      }
    },
    // switch 组件
    mtColSwitch(h, scope, item, colAct) {
      let act = colAct.find(v => {
        return v.prop === item.prop;
      });

      // console.log('sw:', act, act.prop, colAct);

      let hasError = scope.row && scope.row[`${item.prop}State`] === 'error';

      let sw_props = {
        props: {
          ...act,
        },
        on: {
          change: val => {
            if (act.rules) {
              validate(
                scope.row,
                item.prop,
                act.rules,
                'change',
                this.validCallback
              );
            }
            if (act.on) {
              act.on.change(val, scope, item);
            }
          },
        },
        class: {
          [this.tableProp.err]: hasError,
        },
      };
      let vl = scope.row[item.prop];

      const sw_node = (
        <el-switch
          vModel={vl}
          {...sw_props}
          disabled={this.tableProp.disabled}
        ></el-switch>
      );

      let msg = hasError ? scope.row[`${item.prop}Message`] : '';

      return (
        <el-tooltip
          class="item"
          effect="dark"
          disabled={!hasError}
          content={msg}
          placement="top"
        >
          {sw_node}
        </el-tooltip>
      );
    },
    // 日期组件
    mtDate(h, scope, item, colAct) {
      let act = colAct.find(v => {
        return v.prop === item.prop;
      });

      let typeIn = act.typeIn ? act.typeIn : 'date';

      let hasError = scope.row && scope.row[`${item.prop}State`] === 'error';

      let date_props = {
        props: {
          ...act.props,
        },
        on: {
          blur: e => {
            if (act.rules) {
              validate(
                scope.row,
                item.prop,
                act.rules,
                'blur',
                this.validCallback
              );
            }
          },
        },
        class: {
          [this.tableProp.err]: hasError,
        },
      };

      const date_node = (
        <el-date-picker
          type={typeIn}
          vModel={scope.row[item.prop]}
          {...date_props}
          disabled={this.tableProp.disabled}
        ></el-date-picker>
      );

      let msg = hasError ? scope.row[`${item.prop}Message`] : '';

      return (
        <el-tooltip
          class="item"
          effect="dark"
          disabled={!hasError}
          content={msg}
          placement="top"
        >
          {date_node}
        </el-tooltip>
      );
    },
    // 其它 form 组件添加参照上面即可
  },
};
</script>
