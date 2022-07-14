import emiter from 'element-ui/lib/mixins/emitter';

const imp = {
  mixins: [emiter],
  data() {
    return {};
  },
  methods: {
    close() {
      this.dispatch('ImpBox', 'close:impview');
    },
  },
};

export default imp;
