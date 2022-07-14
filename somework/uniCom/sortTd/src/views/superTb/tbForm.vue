<!-- 
 * @author wangqiang
 * @description 基于 Element Table 封装的 tb-form
 * @date 2020-03-25 15:49:00
 * 使用方法这里不做描述，详情请移步本人文档地址：makeadmin.com
 * 申明：
 * 为了保持文档同步，组件禁止私自修改，如有需要联系本人！！！
 -->
<template>
  <div>
    <div class="tb-form" :class="{ 'is-error': validateState === 'error' }">
      <slot></slot>
      <transition name="el-zoom-in-top">
        <slot
          v-if="validateState === 'error' && showMessage"
          name="error"
          :error="validateMessage"
        >
          <div class="tb-form__error">{{ validateMessage }}</div>
        </slot>
      </transition>
    </div>
  </div>
</template>

<script>
import Emitter from "./emitter";
import schema from "async-validator";
export default {
  name: "tbForm",
  componentName: "tbForm",
  mixins: [Emitter],
  inject: ["tb"],
  data() {
    return {
      initialValue: "", // 默认值
      validateState: "",
      validateMessage: "",
    };
  },
  props: {
    prop: {
      type: String,
    },
    index: {
      type: Number,
    },
    keys: {
      type: '',
    },
    showMessage: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    fieldValue() {
      return this.tb.checkModel[this.index][this.prop];
    },
  },
  // 组件渲染时，将实例缓存
  mounted() {
    // 如果没有传入 prop，则无需校验，也就无需缓存
    if (this.prop) {
      this.dispatch("tb", "on-tb-add", this);
      // 设置初始值，以便在重置时恢复默认值
      this.initialValue = this.fieldValue;
      /**
       * blur 事件
       */
      this.$on("on-tb-blur", this.onFieldBlur);
      /**
       * change 事件
       */
      this.$on("on-tb-change", this.onFieldChange);
    }
  },
  // 组件销毁前，将实例从缓存中移除
  beforeDestroy() {
    this.dispatch("tb", "on-tb-remove", this);
  },
  methods: {
    /**
     *  rules 属性中，获取当前 tdItem 的校验规则
     */
    getRules() {
      let that = this;
      let rules = that.tb.rules;
      rules = rules ? rules[that.prop] : [];
      return [].concat(rules || []); //这种写法可以让规则肯定是一个数组的形式
    },
    /**
     * Blur 进行表单验证
     */
    onFieldBlur(val) {
      if (this.keys == val) {
        this.validation("blur");
      }
    },
    /**
     * change 进行表单验证
     */
    onFieldChange(val) {
      if (this.keys == val) {
        this.validation("change");
      } 
    },
    /**
     * 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
     */
    getFilteredRule(trigger) {
      let rules = this.getRules();
      // !res.trigger 没有调用方式的时候默认就校验的
      // filter 过滤出当前需要的规则
      return rules.filter(
        (res) => !res.trigger || res.trigger.indexOf(trigger) !== -1
      );
    },
    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback 回调函数
     */
    validation(trigger, callback = function () {}) {
      // blur 和 change 是否有当前方式的规则
      let rules = this.getFilteredRule(trigger);
      // 判断当前是否有规则
      if (!rules || rules.length === 0) {
        return;
      }
      // 设置状态为校验中
      // async-validator的使用形式
      this.validateState = "validating";
      var validator = new schema({ [this.prop]: rules });
      // firstFields: true 只会校验一个
      validator.validate(
        { [this.prop]: this.fieldValue },
        { firstFields: true },
        (errors, fields) => {
          this.validateState = !errors ? "success" : "error";
          this.validateMessage = errors ? errors[0].message : "";
          callback(this.validateMessage);
          //this.tb && this.tb.$emit('validate', this.prop, !errors, this.validateMessage || null);
        }
      );
    },
    /**
     * 清空当前的 tbform
     */
    resetField() {
      this.validateState = "";
      this.validateMessage = "";
      this.tb.checkModel[this.index][this.prop] = this.initialValue;
    },
  },
};
</script>

<style>
.tb-form {
  font-size: 14px;
}
.tb-form.is-error .el-input__inner,
.tb-form.is-error .el-input__inner:focus,
.tb-form.is-error .el-textarea__inner,
.tb-form.is-error .el-textarea__inner:focus {
  border-color: #f56c6c;
}
.tb-form__error {
  text-align: left;
  color: #f56c6c;
  font-size: 14px;
  line-height: 1;
  padding-top: 4px;
}
.tb-form:after {
  clear: both;
}
.tb-form:after,
.tb-form:before {
  display: table;
  content: "";
}
</style>
