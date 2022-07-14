<!-- 
 * @author wangqiang
 * @description 基于 Element Table 封装的 tb
 * @date 2020-03-25 15:49:00
 * 使用方法这里不做描述，详情请移步本人文档地址：makeadmin.com
 * 申明：
 * 为了保持文档同步，组件禁止私自修改，如有需要联系本人！！！
 -->
<template>
  <div>
    <el-table
      :data="data"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :span-method="spanMethod"
      ref="tableRef"
      :cell-style="{ height: 'auto' }"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :show-header="showHeader"
      :row-key="rowKey"
      :size="size"
      :boder="border"
      v-bind="$attrs"
    >
      <!-- tb is selection -->
      <el-table-column
        :selectable="colSelect.selectable"
        type="selection"
        width="60"
        :reserve-selection="colSelect.reserve"
        :fixed="colSelect.fixed"
        :align="colSelect.align || 'center'"
        v-if="isShowSelect"
      >
      </el-table-column>
      <!-- tb is index -->
      <el-table-column
        type="index"
        width="80"
        :fixed="colIndex.fixed"
        :label="colIndex.label"
        :align="colIndex.align || 'center'"
        v-if="isShowIndex"
        :index="setIndex"
      >
      </el-table-column>
      <!-- tb is text and many head -->
      <el-table-column
        v-for="(column, index) in columns"
        :key="index"
        v-if="
          column.showType != 'selection' &&
          column.showType != 'index' &&
          column.showType != 'operate'
        "
        :prop="column.prop"
        :width="column.width"
        :label="column.label"
        :fixed="column.fixed"
        :min-width="column.minWidth"
        :show-overflow-tooltip="column.tooltip"
        :sortable="column.sortable"
        :render-header="column.renderHeader"
        :align="column.align || 'center'"
      >
        <el-table-column
          v-if="
            column.children != 'undefined' &&
            column.children instanceof Array &&
            column.children.length
          "
          v-for="(itemx, idx) in column.children"
          :key="idx"
          :prop="itemx.prop"
          :width="itemx.width"
          :label="itemx.label"
          :fixed="itemx.fixed"
          :min-width="itemx.minWidth"
          :show-overflow-tooltip="itemx.tooltip"
          :sortable="itemx.sortable"
          :render-header="itemx.renderHeader"
          :align="itemx.align || 'center'"
        >
          <template slot-scope="scope" v-if="itemx.showType == 'text'">
            {{ scope.row[itemx.prop] }}
          </template>
          <template v-else-if="column.showType == 'custom'">
            <slot :name="column.prop" :row="scope.row"></slot>
          </template>
          <template slot-scope="scope" v-else>
            <tb-form
              v-if="itemx.showType == 'input'"
              :index="scope.$index"
              :keys="column.prop+scope.$index"
              :prop="itemx.isCheck ? itemx.prop : ''"
            >
              <el-input
                placeholder="请输入内容"
                v-model="scope.row[itemx.prop]"
                clearable
                style="width: 100%"
                @blur="handleBlur($event, column.prop+scope.$index)"
              >
              </el-input>
            </tb-form>
            <tb-form
              v-if="itemx.showType == 'textarea'"
              :index="scope.$index"
              :keys="column.prop+scope.$index"
              :prop="itemx.isCheck ? itemx.prop : ''"
            >
              <el-input
                placeholder="请输入内容"
                v-model="scope.row[itemx.prop]"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                clearable
                style="width: 100%"
                @blur="handleBlur($event, column.prop+scope.$index)"
              >
              </el-input>
            </tb-form>
            <tb-form
              v-if="itemx.showType == 'select'"
              :index="scope.$index"
              :keys="column.prop+scope.$index"
              :prop="itemx.isCheck ? itemx.prop : ''"
            >
              <el-select
                placeholder="请输入内容"
                v-model="scope.row[itemx.prop]"
                clearable
                style="width: 100%"
                @change="handleChange($event, column.prop+scope.$index)"
              >
                <el-option
                  v-for="item in itemx.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </tb-form>
            <tb-form
              v-if="itemx.showType == 'switch'"
              :index="scope.$index"
              :keys="column.prop+scope.$index"
              :prop="itemx.isCheck ? itemx.prop : ''"
            >
              <el-switch
                v-model="scope.row[itemx.prop]"
                @change="handleChange($event, column.prop+scope.$index)"
              ></el-switch>
            </tb-form>
            <tb-form
              v-if="itemx.showType == 'date'"
              :index="scope.$index"
              :keys="column.prop+scope.$index"
              :prop="itemx.isCheck ? itemx.prop : ''"
            >
              <el-date-picker
                v-model="scope.row[itemx.prop]"
                type="date"
                @change="handleChange($event, column.prop+scope.$index)"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </tb-form>
            <tb-form
              v-if="itemx.showType == 'datetime'"
              :index="scope.$index"
              :keys="column.prop+scope.$index"
              :prop="itemx.isCheck ? itemx.prop : ''"
            >
              <el-date-picker
                v-model="scope.row[itemx.prop]"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="handleChange($event, column.prop+scope.$index)"
                placeholder="选择日期"
              >
              </el-date-picker>
            </tb-form>
          </template>
        </el-table-column>
        <template
          slot-scope="scope"
          v-if="
            !(
              column.children != 'undefined' &&
              column.children instanceof Array &&
              column.children.length
            )
          "
        >
          <template v-if="column.showType == 'text'">
            {{ scope.row[column.prop] }}
          </template>
          <template v-else-if="column.showType == 'custom'">
            <slot :name="column.prop" :row="scope.row"></slot>
          </template>
          <template v-else>
            <tb-form
              v-if="column.showType == 'input'"
              :index="scope.$index"
              :keys="column.prop+scope.$index"
              :prop="column.isCheck ? column.prop : ''"
            >
              <el-input
                placeholder="请输入内容"
                v-model="scope.row[column.prop]"
                clearable
                @blur="handleBlur($event, column.prop+scope.$index)"
                style="width: 100%"
              >
              </el-input>
            </tb-form>
            <tb-form
              v-if="column.showType == 'textarea'"
              :index="scope.$index"
              :keys="column.prop+scope.$index"
              :prop="column.isCheck ? column.prop : ''"
            >
              <el-input
                placeholder="请输入内容"
                v-model="scope.row[column.prop]"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                clearable
                @blur="handleBlur($event, column.prop+scope.$index)"
                style="width: 100%"
              >
              </el-input>
            </tb-form>
            <tb-form
              v-if="column.showType == 'select'"
              :index="scope.$index"
              :keys="column.prop+scope.$index"
              :prop="column.isCheck ? column.prop : ''"
            >
              <el-select
                placeholder="请输入内容"
                v-model="scope.row[column.prop]"
                clearable
                @change="handleChange($event, column.prop+scope.$index)"
                style="width: 100%"
              >
                <el-option
                  v-for="item in column.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </tb-form>
            <tb-form
              v-if="column.showType == 'switch'"
              :index="scope.$index"
              :keys="column.prop+scope.$index"
              :prop="column.isCheck ? column.prop : ''"
            >
              <el-switch
                v-model="scope.row[column.prop]"
                @change="handleChange($event, column.prop+scope.$index)"
              ></el-switch>
            </tb-form>
            <tb-form
              v-if="column.showType == 'date'"
              :index="scope.$index"
              :keys="column.prop+scope.$index"
              :prop="column.isCheck ? column.prop : ''"
            >
              <el-date-picker
                v-model="scope.row[column.prop]"
                type="date"
                value-format="yyyy-MM-dd"
                @change="handleChange($event, column.prop+scope.$index)"
                placeholder="选择日期"
              >
              </el-date-picker>
            </tb-form>
            <tb-form
              v-if="column.showType == 'datetime'"
              :index="scope.$index"
              :keys="column.prop+scope.$index"
              :prop="column.isCheck ? column.prop : ''"
            >
              <el-date-picker
                v-model="scope.row[column.prop]"
                type="datetime"
                @change="handleChange($event, column.prop+scope.$index)"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
              >
              </el-date-picker>
            </tb-form>
          </template>
        </template>
      </el-table-column>
      <!-- tb is Operate -->
      <el-table-column
        :width="colOperate.width"
        :label="colOperate.label"
        :fixed="colOperate.fixed"
        :align="colOperate.align || 'center'"
        v-if="isShowOperate"
      >
        <template slot-scope="scope">
          <slot name="operate" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager" v-if="showPage">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageOptions.page"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="pageOptions.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageOptions.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Emitter from "./emitter";
import { handleTableSpan, handleObjectSpanMethod } from "@/utils/tbMerge";
import tbForm from "./tbForm.vue";
export default {
  name: "tb",
  componentName: "tb",
  mixins: [Emitter],
  data() {
    return {
      fields: [], // 储存当前的实例
      colSelect: {}, //多选列
      // 要合并的单元格的rowspan 数据 纵向合并必须
      rowspanObj: {},
      colIndex: {}, // 序号列
      colOperate: {}, // 操作列
    };
  },
  provide() {
    return {
      tb: this,
    };
  },
  computed: {
    isShowSelect() {
      return this.columns.some((val) => val.showType == "selection");
    },
    isShowIndex() {
      return this.columns.some((val) => val.showType == "index");
    },
    isShowOperate() {
      return this.columns.some((val) => val.showType == "operate");
    },
  },
  watch: {
    columns: {
      // 每个属性值发生变化就会调用这个函数
      handler(newVal, oldVal) {
        if (newVal.length) {
          newVal.forEach((item, index) => {
            if (item.showType == "selection") {
              this.colSelect = JSON.parse(JSON.stringify(item));
            } else if (item.showType == "index") {
              this.colIndex = JSON.parse(JSON.stringify(item));
            } else if (item.showType == "operate") {
              this.colOperate = JSON.parse(JSON.stringify(item));
            }
          });
          if (!newVal.some((val) => val.showType == "selection"))
            this.colSelect = {};
          if (!newVal.some((val) => val.showType == "index"))
            this.colIndex = {};
          if (!newVal.some((val) => val.showType == "operate"))
            this.colOperate = {};
          if (this.isMerge) {
            this.rowspanObj = handleTableSpan(this.mergekeys, this.dataList);
          }
        } else {
          this.colSelect = {};
          this.colIndex = {};
          this.colOperate = {};
        }
      },
      // 立即处理 进入页面就触发
      immediate: true,
      // 深度监听 属性的变化
      deep: true,
    },
    data: {
      // 每个属性值发生变化就会调用这个函数
      handler(newVal, oldVal) {
        if (
          this.isMerge &&
          this.mergeRules.mergekeys instanceof Array &&
          this.mergeRules.mergekeys.length
        ) {
          this.rowspanObj = handleTableSpan(this.mergeRules.mergekeys, newVal);
        } else {
          this.rowspanObj = {};
        }
      },
      // 立即处理 进入页面就触发
      immediate: true,
      // 深度监听 属性的变化
      deep: true,
    },
  },
  components: {
    tbForm,
  },
  props: {
    // 如果带输入框，需要验证的字段
    checkModel: {
      type: Array,
    },
    // 验证规则
    rules: {
      type: Object,
    },
    // 表头
    columns: {
      type: Array,
      default: () => [],
    },
    // 是否需要显示分页
    showPage: {
      type: Boolean,
      default: false,
    },
    // 分页配置
    pageOptions: {
      type: Object,
      default: () => {
        return {
          page: 1,
          limit: 10,
          total: 0,
        };
      },
    },
    // 是否需要合并单元格
    isMerge: {
      type: Boolean,
      default: false,
    },
    // 合并规则
    mergeRules: {
      type: Object,
    },
    // height
    height: {
      type: Number,
    },
    // max-height
    maxHeight: {
      type: Number,
    },
    // border
    border: {
      type: Boolean,
      default: false,
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    rowKey: {
      type: String,
    },
    size: {
      type: String,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    // 存当前实例
    let that = this;
    this.$on("on-tb-add", (item) => {
      if (item) {
        that.fields.push(item);
      }
    });
    // 删除当前有的实例
    this.$on("on-tb-remove", (item) => {
      if (item.prop) {
        // 如果当前没有prop的话表示当前不要进行删除（因为没有注入）
        that.fields.splice(that.fields.indexOf(item), 1);
      }
    });
  },
  methods: {
    /**
     * blur 事件
     * @param event
     */
    handleBlur(event, keys) {
      // 将当前的值发送到 tbForm 进行校验
      this.broadcast("tbForm", "on-tb-blur", keys);
    },
    /**
     * change 事件
     * @param val
     */
    handleChange(val, keys) {
      // 将当前的值发送到 tbForm 进行校验
      this.broadcast("tbForm", "on-tb-change", keys);
    },
    /**
     * 多选处理
     */
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    /**
     * 清除多选
     */
    clearSelection() {
      this.$refs.tableRef.clearSelection();
    },
    /**
     * 设置某一行选中
     */
    toggleRowSelection(row, selected = true) {
      this.$nextTick(() => {
        this.$refs.tableRef.toggleRowSelection(row, selected);
      });
    },
    /**
     * 切换选中的状态
     */
    toggleAllSelection() {
      this.$nextTick(() => {
        this.$refs.tableRef.toggleAllSelection();
      });
    },
    /**
     * @description 分页处理
     */
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    /**
     * @description 序号列处理
     */
    setIndex(index) {
      if (this.showPage) {
        return (
          this.pageOptions.page * this.pageOptions.limit -
          this.pageOptions.limit +
          index +
          1
        );
      } else {
        return index + 1;
      }
    },
    resetFields() {
      //添加resetFields方法使用的时候调用即可
      /**
       * 当前所有当tbform 进行赋值
       */
      this.fields.forEach((field) => {
        field.resetField();
      });
    },
    /**
     * 校验 公开方法：全部校验数据，支持 Promise
     */
    validate(callback) {
      return new Promise((resolve) => {
        /**
         * 当前所有当form进行校验
         */
        let valid = true; // 默认是通过
        let count = 0; // 来匹配当前是否是全部检查完
        this.fields.forEach((field) => {
          // 每个实例都会有 validation 的校验的方法
          field.validation("", (error) => {
            // 只要有一个不符合那么当前的校验就是未通过的
            if (error) {
              valid = false;
            }
            // 通过当前检查完所有的form-item的时候才会调用
            if (++count === this.fields.length) {
              resolve(valid); // 方法使用then
              if (typeof callback === "function") {
                callback(valid); // 直接调用注入的回调方法
              }
            }
          });
        });
      });
    },
    // 合并单元格
    spanMethod(tableObj) {
      if (this.isMerge) {
        return handleObjectSpanMethod(
          tableObj,
          this.mergeRules.mergekeys,
          this.rowspanObj,
          this.mergeRules.mergeLists
        );
      }
    },
  },
};
</script>

<style>
.pager {
  margin-top: 10px;
  text-align: right;
}
</style>
