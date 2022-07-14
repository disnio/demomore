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
import { handleTableSpan, handleObjectSpanMethod } from '@/utils/tbMerge';
import sortTc from '@/components/sortTc';
export default {
  name: 'STB',

  data() {
    return {
      // 要合并的单元格的rowspan 数据 纵向合并必须
      rowspanObj: {},

      tableProp: {
        isMerge: true,
        height: 'auto',
        'span-method': this.spanMethod.bind(this),
        'show-header': true,
      },
      // 表格事件
      tableEvent: {
        // 行选择
        'selection-change': this.selsChange,
        // 行排序
        'sort-change': (a, b) => {
          console.log('sort-change', a, b);
        },
      },
      tableMethod: {
        spanMethod: this.spanMethod,
        lastOpts: [
          {
            types: 'view',
            event: this.openView.bind(this),
          },
        ],
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
      // 要纵向合并的单元格的key数组 纵向合并必须
      mergekeys: ['name'], //'aihao', 'mengxiang'
      // 横向合并必须 rIndex 行索引，s 从哪列开始，e 到哪列结束
      mergeLists: [
        // { rIndex: 0, s: 3, e: 5 },
        // { rIndex: 3, s: 3, e: 4 },
        // { rIndex: 6, s: 4, e: 5 },
      ],
      columns: [
        {
          label: '个人信息',
          children: [
            {
              prop: 'name',
              label: '姓名',
              minWidth: 120,
            },
            {
              prop: 'age',
              label: '年龄',
            },
          ],
        },

        {
          prop: 'address',
          label: '地址',
          minWidth: 168,
        },
        {
          prop: 'sex',
          label: '性别',
        },
        {
          prop: 'shengao',
          label: '身高',
          minWidth: 168,
        },
        {
          prop: 'xingzuo',
          label: '星座',

          minWidth: 168,
        },
        {
          prop: 'aihao',
          label: '爱好',
          minWidth: 168,
        },
        {
          prop: 'status',
          label: '是否自闭',
        },
        {
          prop: 'time',
          label: '时间',
          minWidth: 240,
        },
      ],

      colAction: [
        {
          prop: 'shengao',
          type: 'input',
          disabled: false,
          key: 'id',
          rules: [
            { required: true, message: '请输入身高', trigger: 'blur' },
            {
              min: 4,
              max: 6,
              message: '长度最大6位，最小4位',
              trigger: 'blur',
            },
          ],
        },
        {
          prop: 'xingzuo',
          type: 'input',
          disabled: false,
          key: 'id',
          rules: [{ required: true, message: '请选择星座', trigger: 'change' }],
          options: [
            {
              label: '摩羯',
              value: 'mojie',
            },
            {
              label: '射手',
              value: 'sheshou',
            },
          ],
        },
        {
          prop: 'aihao',
          type: 'input',
          disabled: false,
          key: 'id',
          rules: [{ required: true, message: '请输入爱好', trigger: 'blur' }],
        },
        {
          prop: 'status',
          type: 'switch',
          disabled: false,
          key: 'id',
          rules: [],
        },
        {
          prop: 'time',
          type: 'date',
          typeIn: 'date',
          disabled: false,
          key: 'id',
          rules: [{ required: true, message: '请选择时间', trigger: 'change' }],
        },
      ],
    };
  },
  components: {
    'sort-tc': sortTc,
  },
  watch: {
    columns: {
      // 每个属性值发生变化就会调用这个函数
      handler(newVal, oldVal) {
        if (newVal.length) {
          if (this.tableProp.isMerge) {
            this.rowspanObj = handleTableSpan(this.mergekeys, this.dataList);
          }
        }
      },
      // 立即处理 进入页面就触发
      immediate: true,
      // 深度监听 属性的变化
      deep: true,
    },
    tableData: {
      // 每个属性值发生变化就会调用这个函数
      handler(newVal, oldVal) {
        if (
          this.tableProp.isMerge &&
          this.mergekeys instanceof Array &&
          this.mergekeys.length
        ) {
          this.rowspanObj = handleTableSpan(this.mergekeys, newVal);
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
  created() {
    this.tableData = require('../data.json').data.map((v, i) => {
      v.id = i;
      return v;
    });
  },
  methods: {
    // 合并单元格
    spanMethod(tableObj) {
      // console.log('span', tableObj);
      if (this.tableProp.isMerge) {
        return handleObjectSpanMethod(
          tableObj,
          this.mergekeys,
          this.rowspanObj,
          this.mergeLists
        );
      }
    },
    // 查看
    openView(row) {
      console.log('view', row);
    },
    // 选择的类
    selsChange(arr) {
      this.selRows = arr;
    },
  },
};
</script>
