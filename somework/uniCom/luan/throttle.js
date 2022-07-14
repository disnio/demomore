/*
 * @Author: wsc
 * @Date: 2021-03-17 19:30:25
 * @LastEditors: fengzp
 * @LastEditTime: 2021-03-18 13:58:57
 * @Introduce: Do not edit
 */
// wsc 2021-03-17 节流阀
export default {
  name: 'Throttle',
  abstract: true,
  props: {
    time: Number,
    events: String,
    isDebounce: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.eventKeys = this.events.split(',');
    this.originMap = {};
    this.throttledMap = {};
  },
  render() {
    const vnode = this.$slots.default[0];
    this.eventKeys.forEach(key => {
      // const fn = vnode.data.on[key];
      const fn = vnode.componentOptions.listeners[key];

      if (fn === this.originMap[key] && this.throttledMap[key]) {
        vnode.componentOptions.listeners[key] = this.throttledMap[key];
      } else if (fn) {
        this.originMap[key] = fn;
        this.throttledMap[key] = _.throttle(
          fn,
          this.time,
          this.isDebounce,
          vnode
        );
        vnode.componentOptions.listeners[key] = this.throttledMap[key];
      }
    });
    return vnode;
  },
};
