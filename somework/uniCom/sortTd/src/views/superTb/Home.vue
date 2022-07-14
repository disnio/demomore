<template>
  <div class="home">

    <tb
      ref="tb"
      :data="dataList"
      @handleSelectionChange="handleSelectionChange"
      :showPage="true"
      :pageOptions="pageOptions"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :checkModel="dataList"
      :rules="rules"
      :border="true"
      :columns="columns"
      :isMerge="true"
      :mergeRules="mergeRules"
    >
      <template v-slot:address="scope">
        <i class="el-icon-location"></i> {{ scope.row.address }}
      </template>
      <template slot="operate" slot-scope="scope">
        <el-button type="text" @click="todo(scope.row)">编辑</el-button>
        <el-button type="text" @click="todo(scope.row)">查看</el-button>
        <el-button type="text" @click="todo(scope.row)">删除</el-button>
      </template>
    </tb>
  </div>
</template>

<script>
import { add, div, minus, toFixed } from "@/utils/count";
import tb from "./superTb/tb";
export default {
  name: "Home",
  components: { tb },
  data() {
    return {
      n: 0,
      pageOptions: {
        page: 1,
        limit: 10,
        total: 100,
      },
      rules: {
        shengao: [
          { required: true, message: "请输入身高", trigger: "blur" },
          { min: 4, max: 6, message: "长度最大6位，最小4位", trigger: "blur" },
        ],
        xingzuo: [{ required: true, message: "请选择身高", trigger: "change" }],
        aihao: [{ required: true, message: "请输入爱好", trigger: "blur" }],
        time: [{ required: true, message: "请选择时间", trigger: "change" }],
      },
      checkModel: {},
      dataList: [],
      mergeRules: {
        // 要纵向合并的单元格的key数组 纵向合并必须
        mergekeys: ["name"], //'aihao', 'mengxiang'
        // 横向合并必须 rIndex 行索引，s 从哪列开始，e 到哪列结束
        mergeLists: [
          { rIndex: 0, s: 3, e: 5 },
          { rIndex: 3, s: 3, e: 4 },
          { rIndex: 6, s: 4, e: 5 },
        ],
      },
      columns: [
        {
          showType: "selection",
          // selectable: function 与官网保持一致
          // reserve: Boolean 与官网保持一致
          // fixed 与官网保持一致
          // align 与官网保持一致
        },
        {
          label: "序号",
          showType: "index",
        },
        {
          label: "个人信息",
          children: [
            {
              prop: "name",
              label: "姓名",
              showType: "text",
              minWidth: 120,
            },
            {
              prop: "age",
              label: "年龄",
              showType: "text",
            },
          ],
        },

        {
          prop: "address",
          label: "地址",
          showType: "custom",
          minWidth: 168,
        },
        {
          prop: "sex",
          label: "性别",
          showType: "text",
        },
        {
          prop: "shengao",
          label: "身高",
          showType: "input",
          isCheck: true,
          minWidth: 168,
        },
        {
          prop: "xingzuo",
          label: "星座",
          showType: "select",
          options: [
            {
              label: "摩羯",
              value: "mojie",
            },
            {
              label: "射手",
              value: "sheshou",
            },
          ],
          minWidth: 168,
          isCheck: true,
        },
        {
          prop: "aihao",
          label: "爱好",
          showType: "textarea",
          isCheck: true,
          minWidth: 168,
        },
        {
          prop: "status",
          label: "是否自闭",
          showType: "switch",
          isCheck: true,
        },
        {
          prop: "time",
          label: "时间",
          showType: "date",
          isCheck: true,
          minWidth: 240,
        },
        {
          label: "操作",
          showType: "operate",
          width: 168,
        },
      ],
    };
  },
  created() {
    this.dataList = require("./data.json").data;
  },
  methods: {
    /**
     * @description 分页处理
     */
    handleSizeChange(val) {
      // 条数改变
      this.pageOptions.limit = val;
      // 调用翻页接口 todo...
    },
    handleCurrentChange(val) {
      // 页数改变
      this.pageOptions.page = val;
      // 调用翻页接口 todo...
    },
    handleSelectionChange(val) {
      console.log(val);
    },
    save() {
      this.$refs.tb.validate((valid) => {
        console.log(valid);
        if (valid) {
        }
      });
    },
    reset() {
      this.$refs.tb.resetFields();
    },
    colspanMethod(tableObj) {
      return handleObjectSpanMethod(
        tableObj,
        this.mergekeys,
        this.rowspanObj,
        this.mergeLists
      );
    },
    todo(row) {
      console.log(row);
    },
    ccc(s) {
      if (s=='+') {
        this.n = add(0.999999999, 0.000000001)
      } else if (s=='-') {
        this.n = minus(0.3, 0.2)
      } else if (s=='/') {
        this.n = div(0.6, 3)
      } else if (s=='t') {
        this.n = toFixed(0.31456, 2)
      }
    }
  },
};
</script>
