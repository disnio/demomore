<template>
  <div>
    <el-tabs
      v-model="activeName"
      type="border-card"
      :style="{ paddingRight: '10px', height: '80%' }"
    >
      <el-tab-pane label="待入库数据" name="success" @tab-click="tabClick">
        <div class="mb10" style="margin-bottom:10px;">
          <sort-tc
            :columns="successCol"
            :tableData="successList"
            :tableProp="tableProp"
            :tableMethod="tbMethod"
            :tableCol="tbCol"
            :query="hQuerySuccess"
          ></sort-tc>
          <div class="pagination-container">
            <el-pagination
              @size-change="pageSizeSuccess"
              @current-change="pageNumSuccess"
              :current-page.sync="hQuerySuccess.page"
              :page-sizes="[10, 20, 30, 50, 100, 200, 500, 1000]"
              :page-size="hQuerySuccess.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="successTotal"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="异常数据" name="fail">
        <sort-tc
          :columns="failCol"
          :tableData="failList"
          :tableProp="tableProp"
          :tableMethod="tbMethod"
          :tableCol="tbCol"
          :query="hQueryFail"
        ></sort-tc>
        <div class="pagination-container">
          <el-pagination
            @size-change="pageSizeFail"
            @current-change="pageNumFail"
            :current-page.sync="hQueryFail.page"
            :page-sizes="[10, 20, 30, 50, 100, 200, 500, 1000]"
            :page-size="hQueryFail.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="failTotal"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
/**
 * @description: 导入解析
 * @author: wsc
 * @date: 2021-02-24
 */
import { exportFile } from '@common/components/uniCom/utils';
import fetch from '@common/utils/fetch';
import sortTc from '@common/components/uniCom/sortTc';

export default {
  name: 'viewEcl',
  props: {
    row: { type: Object, default: null },
    ids: Object,
    replace: Object,
    urls: Object,
  },
  components: {
    'sort-tc': sortTc,
  },
  watch: {
    row: {
      immediate: true,
      handler: function(n, o) {
        if (n !== o) {
          this.hQuerySuccess[this.ids.id] = this.row.id;
          this.hQueryFail[this.ids.id] = this.row.id;
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      activeName: '',

      successCol: [],
      successList: [],
      successTotal: 0,

      hQuerySuccess: {
        page: 1,
        limit: 10,
        [this.ids.id]: this.row.id,
        iscorrect: '1',
      },
      tableProp: {
        height: this.scrollbarHeight,
      },
      tbMethod: {
        lastOpts: false,
      },
      tbCol: {
        // 显示时候头排除
        exclude: [],
        nosort: ['status'],
        replace: {
          orgId: 'orgName',
          ...this.replace,
        },
      },

      failList: [],
      failCol: [],
      failTotal: 0,
      hQueryFail: {
        page: 1,
        limit: 10,
        [this.ids.id]: this.row.id,
        iscorrect: '0',
      },

      isImport: false,
    };
  },
  methods: {
    resetData() {
      this.successCol = [];
      this.successList = [];
      this.successTotal = 0;
      this.failList = [];
      this.failCol = [];
      this.failTotal = 0;
    },
    getData() {
      console.log('get data');
      this.getSuccessList();
      this.getFailList();
    },

    tabClick(t) {
      // 进来传模板类型
      this.$emit('change:tab', t);
    },

    async getSuccessList() {
      let params = { ...this.hQuerySuccess };
      console.log('get success', params);

      this.successList = [];
      try {
        const res = await fetch({
          url: this.urls.get_url,
          method: 'get',
          params: params,
        });

        if (res) {
          this.successCol = res.data.columns;
          this.successList = res.data.rows;
          this.successTotal = res.data.total;
        } else {
          this.$message({
            message: res.msg,
            type: 'warning',
          });
        }
      } catch (e) {
        this.$message({
          message: '获取列表出错',
          type: 'warning',
        });
      }
    },
    async getFailList() {
      let params = { ...this.hQueryFail };
      console.log('get fail', params);
      this.failList = [];
      try {
        const res = await fetch({
          url: this.urls.get_url,
          method: 'get',
          params: params,
        });

        if (res) {
          this.failCol = res.data.columns;
          this.failList = res.data.rows;
          this.failTotal = res.data.total;
        } else {
          this.$message({
            message: res.msg,
            type: 'warning',
          });
        }
      } catch (e) {
        this.$message({
          message: '获取列表出错',
          type: 'warning',
        });
      }
    },

    pageSizeSuccess(val) {
      this.hQuerySuccess.limit = val;
      this.getSuccessList();
    },

    pageNumSuccess(val) {
      this.hQuerySuccess.page = val;
      this.getSuccessList();
    },

    pageSizeFail(val) {
      this.hQueryFail.limit = val;
      this.getFailList();
    },

    pageNumFail(val) {
      this.hQueryFail.page = val;
      this.getFailList();
    },

    //导出
    exportData() {
      exportFile(this.urls.export_url + this.row.id);
    },

    //保存导入
    importData() {
      fetch({
        url: this.urls.import_url,
        method: 'get',
        params: {
          id: this.row.id,
          batch:sessionStorage.getItem('fileBatch')
        },
      })
        .then(res => {
          if (res.rel) {
            this.$notify({
              title: '提示',
              message: '导入保存成功',
              type: 'success',
              duration: 2000,
            });
          } else {
            this.$notify({
              title: '提示',
              message: res.msg,
              type: 'warning',
              duration: 2000,
            });
          }
        })
        .catch(e => {
          this.$notify({
            title: '提示',
            message: e.message,
            type: 'warning',
            duration: 2000,
          });
        });
    },
  },
};
</script>

<style scoped></style>
