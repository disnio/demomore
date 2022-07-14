<template>
  <div>
    <!-- <sort-td
      :tableProp="tableProp"
      :tableData="tableData"
      :columns="columns"
    ></sort-td> -->

    <bar-char></bar-char>
  </div>
</template>

<script>
import sortTd from '@/components/sortTd';
import barChar from './Ec';
export default {
  components: {
    'sort-td': sortTd,
    'bar-char': barChar,
  },
  data() {
    return {
      tableData: [],
      columns: [],
      tableProp: {
        height: 500,
      },

      csize: 100,
      rsize: 5000,
    };
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
