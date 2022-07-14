<template>
  <div>
    <vxe-grid
      border
      show-overflow
      show-header-overflow
      highlight-hover-row
      highlight-current-row
      ref="xGrid"
      :height="tableProp.height"
      :loading="loading"
    >
    </vxe-grid>
  </div>
</template>

<script>
import Vue from 'vue';
import XEUtils from 'xe-utils';
import { VXETable, Button, Modal, Header, Grid, Table } from 'vxe-table';

Vue.use(Grid)
  .use(VXETable)
  .use(Button)
  .use(Modal)
  .use(Header)
  .use(Table);
  
export default {
  props: {
    columns: Array,
    tableData: Array,
    tableProp: Object,
  },
  watch: {
    // data 在最后生成
    tableData: {
      immediate: true,
      handler: function(n, o) {
        this.makeData();
      },
    },
  },
  data() {
    return {
      loading: false,
      cols: [],
      rows: [],
    };
  },
  methods: {
    makeData() {
      this.loading = true;

      this.cols = this.mockColumns();
      this.rows = this.mockList();

      this.$nextTick(() => {
        const xGrid = this.$refs.xGrid;

        if (this.cols.length > 0 && this.rows.length > 0 && xGrid) {
          xGrid.reloadColumn(this.cols);
          xGrid.reloadData(this.rows);
          this.loading = false;
        }
      });
    },
    mockColumns() {
      let cols = this.columns.map((v, i) => {
        return {
          type: v.type,
          visible: v.see || true,
          title: v.label,
          field: v.prop,
          fixed: v.fixed,
          width: v.width || 120,
        };
      });

      return cols;
    },
    mockList() {
      return this.tableData;
    },
  },
};
</script>
