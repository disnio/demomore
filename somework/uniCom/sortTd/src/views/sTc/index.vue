<template>
  <div class="home">
    <sort-tc
      :columns="columns"
      :tableData="tableData"
      :tableProp="tableProp"
      :tableEvent="tableEvent"
      :tableMethod="tableMethod"
      :tableCol="tableCol"
      :colAction="colAction"
      :upload="upload"
      :query="tableQuery"
    ></sort-tc>
  </div>
</template>

<script>
import sortTc from '@/components/sortTc';
export default {
  name: 'STC',

  data() {
    return {
      // 要合并的单元格的rowspan 数据 纵向合并必须
      rowspanObj: {},

      tableProp: {
        height: '500',
        'show-header': true,
      },
      // 表格事件
      tableEvent: {
        // 行排序
        'sort-change': (a, b) => {
          console.log('sort-change', a, b);
        },
      },
      tableMethod: {
        lastOpts: false,
      },
      // 表格选择的行
      selRows: [],
      tableCol: {
        // 显示时候头排除
        exclude: [],
        order: false,
        nosort: ['status', 'enclosure'],
        // 没有 columns 列数据时，表头的键值对
        headKv: {},
        // 取值从数据
        heads: false,
        enclosure: false,
        replace: {},
      },
      upload: {
        multiple: false,
        limitNumber: 1,
        disabled: true,
        noPreview: true,
        prop: 'enclosure',
      },
      tableQuery: {
        page: 1,
        limit: 10,
        total: 100,
      },

      tableData: [],

      columns: [],

      colAction: [],

      csize: 20,
      rsize: 200,
    };
  },
  components: {
    'sort-tc': sortTc,
  },
  watch: {
    tableData: {
      // 每个属性值发生变化就会调用这个函数
      handler(newVal, oldVal) {},
      // 立即处理 进入页面就触发
      immediate: true,
      // 深度监听 属性的变化
      deep: true,
    },
  },
  created() {
    this.mockColumns(this.csize);
    this.mockList(this.rsize, this.csize);
  },
  methods: {
    mockColumns(size) {
      const cols = [];
      for (let index = 0; index < size; index++) {
        if (index === 0) {
          cols.push({
            label: `Col_${index}`,
            type: 'seq',
            fixed: 'left',
            width: 100,
          });
        } else if (index === size - 1) {
          cols.push({
            label: `Col_${index}`,
            prop: `col${index}`,
            fixed: 'right',
            width: 140,
          });
        } else {
          cols.push({
            label: `Col_${index}`,
            prop: `col${index}`,
            width: 160,
          });
        }
      }
      this.columns = cols;
    },
    mockList(size, colSize) {
      const list = [];
      for (let index = 0; index < size; index++) {
        let obj = {
          name: `名称${index}`,
          checked: false,
        };
        for (let i = 0; i < colSize; i++) {
          obj['col' + i] = '' + i + index;
        }
        list.push(obj);
      }
      this.tableData = list;
    },
  },
};
</script>
