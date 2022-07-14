<!--  -->
<template>
  <div class="pro-content">
    <span class="el-icon-success" v-if="this.progressStep === 100"></span>
    <div
      class="pro-title"
      v-if="this.progressStep === 100 && !this.importProBar"
    >
      数据解析成功
    </div>
    <div class="pro-title" v-if="this.importProBar">数据导入完成</div>
    <el-progress
      :text-inside="true"
      :stroke-width="24"
      :percentage="progressStep"
      status="success"
    ></el-progress>
    <div
      class="pro-desc"
      v-if="this.progressStep !== 100 && !this.importProBar"
    >
      正在解析({{ this.progressTotal }})条
    </div>
    <div
      class="pro-desc"
      v-if="this.progressStep === 100 && !this.importProBar"
    >
      已完成解析({{ this.progressTotal }})条
    </div>
    <div class="pro-desc" v-if="this.importProBar">
      已成功导入({{ this.progressTotal }})条数据
    </div>
    <div slot="footer" class="dialog-footer" v-if="this.importProBar">
      <el-button type="primary" @click="determine" class="imp-btn"
        >确 定</el-button
      >
    </div>
  </div>
</template>

<script>
import imp from './imp';
export default {
  data() {
    return {
      importProBar: false, //导入数据状态
    };
  },
  mixins: [imp],
  props: {
    // valStep:Number,
    progressTotal: Number, //数据条数
    progressStep: Number, //进度条
    importBar: Boolean,
  },
  watch: {
    progressStep: {
      immediate: true,
      handler(n, o) {
        console.log('progressStepN', n);
      },
    },
    progressTotal: {
      immediate: true,
      handler(n, o) {
        console.log('progressTotalN', n);
      },
    },
    importBar: {
      handler(n, o) {
        console.log('importBar', n);
        if (n) {
          this.importProBar = true;
        } else {
          this.importProBar = false;
        }
      },
      immediate: true,
    },
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    determine() {
      this.close();
    },
  },
};
</script>
<style scoped>
.pro-content {
  padding: 100px;
}
.pro-content .el-icon-success {
  width: 100%;
  text-align: center;
  font-size: 52px;
  color: #00cc00;
}
.pro-content .pro-title {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  padding: 5px 0px 20px 0px;
}
.pro-content .pro-desc {
  text-align: center;
  padding: 10px 0px 0px 0px;
  font-size: 16px;
}
</style>
