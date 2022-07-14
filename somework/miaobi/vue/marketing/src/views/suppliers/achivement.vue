<template>
  <el-card style="padding:20px;margin:69.5px;">
    <el-row>
      <el-col :span="8">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="供应商">
            <el-select
              v-model="form.suppliers"
              clearable
              collapse-tags
              style="margin-left: 20px;"
              placeholder="请选择"
            >
              <el-option v-for="item in dics" :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="text-align:left">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-select
            v-model="form.timeType"
            collapse-tags
            style="margin-left: 20px;"
            placeholder="请选择"
          >
            <el-option
              v-for="item in timeTypes"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>

          <!-- label="审核时间" title="二审的审核时间" -->
          <el-form-item>
            <el-date-picker
              v-model="form.datePickerValue"
              format="yyyy-MM-dd"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              @change="dtRangeChange"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="任务类型">
            <el-select
              v-model="form.taskTypes"
              multiple
              clearable
              collapse-tags
              style="margin-left: 20px;"
              placeholder="请选择"
            >
              <el-option
                v-for="item in tasktypeOptions"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="float:right;">
            <!-- <b style="font-size:30px">费用总计:</b>
            <b style="font-size:30px;display:inline-block;width:128px;text-align:center">{{remunerationSum||"-"}}</b>
            <b style="font-size:30px;">元</b>-->
            <b style="font-size:30px">费用总计:{{remunerationSum||"0"}}元</b>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="list" style="width: 100%;">
          <el-table-column prop="number" label="序号"></el-table-column>
          <el-table-column prop="weChatNickName" label="微信"></el-table-column>
          <el-table-column prop="openId" label="openid"></el-table-column>
          <el-table-column prop="taskTypeName" label="任务类型"></el-table-column>
          <el-table-column prop="taskCount" label="任务数量"></el-table-column>
          <el-table-column prop="firstAuditCount" label="一审通过"></el-table-column>
          <el-table-column prop="auditCount" label="二审通过"></el-table-column>
          <el-table-column prop="remuneration" label="费用"></el-table-column>
        </el-table>
        <el-pagination
          style="text-align:right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.page"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="form.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import service from "@/utils/request";
import options from "@/utils/type";
import {
  Col,
  Row,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  Input,
  Card,
  Pagination
} from "element-ui";

Vue.use(Col);
Vue.use(Row);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(Input);
Vue.use(Card);
Vue.use(Pagination);

//增加秒数,23:59:59
const lastSecendsOfDay = 86399;
const tasktypeOptions = [
  {
    key: 6,
    value: "评价句子对"
  },
  {
    key: 7,
    value: "改写句子对"
  }
];

const timeTypes = [
  {
    key: 0,
    value: "提交时间"
  },
  {
    key: 1,
    value: "一审时间"
  },
  {
    key: 2,
    value: "二审时间"
  }
];

// 句子对详情
export default {
  name: "WriterTaskTypeStatistics",
  data() {
    return {
      form: {
        startSubmitDt: null,
        endSubmitDdt: null,
        taskTypes: [],
        datePickerValue: [],
        suppliers: [],
        page: 1,
        size: 10,
        timeType: 2
      },
      dics: [],
      list: [],
      total: 0,
      timeTypes: timeTypes,
      remunerationSum: undefined,
      tasktypeOptions: tasktypeOptions,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  created: function() {
    service({
      url: "suppliers/dics",
      method: "get"
    }).then(response => {
      var data = response.data;
      this.dics = data.map(x => {
        return {
          key: x.id,
          value: x.name
        };
      });
    });
  },
  computed: {
    // supplierDics() {},
    // tasktypeOptions() {
    //   console.log(options);
    //   return options.taskTypes;
    // },
    formCom() {
      var result = {};
    }
  },
  methods: {
    dtRangeChange(value) {
      this.form.startSubmitDt = new Date(value[0]);
      this.form.endSubmitDdt = new Date(value[1]);
    },
    handleSizeChange(size) {
      this.form.size = size;
      this.getList();
    },
    handleCurrentChange(page) {
      this.form.page = page;
      this.getList();
    },
    doSearch() {
      this.getList();
      this.getCost();
    },
    getList() {
      var params =
        "?beginSubmitTime=" +
        Math.round(this.form.startSubmitDt / 1000) +
        "&endSubmitTime=" +
        (Math.round(this.form.endSubmitDdt / 1000) + lastSecendsOfDay) +
        "&timeType=" +
        this.form.timeType +
        "&taskType=" +
        this.form.taskTypes +
        "&page=" +
        this.form.page +
        "&size=" +
        this.form.size;
      service({
        url: "suppliers/" + this.form.suppliers + "/statistic" + params,
        method: "get"
      }).then(response => {
        var data = response.data;
        this.total = response.count;
        // console.log(tasktypeOptions);
        this.list = data.map(x => {
          var typeInfo = tasktypeOptions.find(f => f.key == x.type);
          return {
            weChatNickName: x.weChatNickName,
            openId: x.weChatOpenId,
            taskTypeName: typeInfo == undefined ? "-" : typeInfo.value,
            taskCount: x.taskAccount < 0 ? "-" : x.taskAccount,
            firstAuditCount: x.fvCount < 0 ? "-" : x.fvCount,
            auditCount: x.svCount < 0 ? "-" : x.svCount,
            remuneration: x.cost
          };
        });
      });
    },
    getCost() {
      console.log("getcost...");
      var params =
        "?beginSubmitTime=" +
        Math.round(this.form.startSubmitDt / 1000) +
        // this.form.startSubmitDt / 1000 +
        "&endSubmitTime=" +
        // this.form.endSubmitDdt / 1000 +
        (Math.round(this.form.endSubmitDdt / 1000) + lastSecendsOfDay) +
        "&taskType=" +
        this.form.taskTypes +
        "&timeType=" +
        this.form.timeType;
      service({
        url: "suppliers/" + this.form.suppliers + "/cost" + params,
        method: "get"
      }).then(response => {
        this.remunerationSum = response.data;
      });
    }
  }
};
</script>
<style lang="scss" >
.el-table th {
  background-color: #f2f3f8;
}
</style>