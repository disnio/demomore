<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <c-head
        :query.sync="hQuery"
        @update:query="changeQuery"
        @search="getList"
      ></c-head>
    </div>

    <div class="filter-container">
      <el-button-group>
        <el-button
          class="filter-item"
          @click="mtCreate"
          icon="el-icon-plus"
          type="primary"
          >新增
        </el-button>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-delete"
          @click="mtDeltesSome"
          >删除
        </el-button>
      </el-button-group>
    </div>

    <sort-tc
      :columns="columns"
      :tableData="spList"
      :tableProp="tableProp"
      :tableEvent="tableEvent"
      :tableMethod="tbMethod"
      :tableCol="tbCol"
      :upload="upload"
      :query="hQuery"
    ></sort-tc>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="pageSize"
        @current-change="pageNum"
        :current-page.sync="hQuery.page"
        :page-sizes="[10, 20, 30, 50, 100, 200, 500, 1000]"
        :page-size="hQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="spTotal"
      ></el-pagination>
    </div>

    <no-elec-form
      ref="applicant"
      :visible.sync="formVisible"
      :action="action"
      :state="state"
      :editState="editState"
      :viewId="viewId"
      :rowData="rowData"
      :statusType="statusType"
      @visible="changeVisible"
      @close="getList"
    ></no-elec-form>
  </div>
</template>

<script>
import fetch from '@common/utils/fetch';
import { mapGetters } from 'vuex';
import sortTc from '@common/components/uniCom/sortTc';
import htb from '@common/components/uniCom/mixins/htb';
import head from './head';
import NoElecForm from './noElecForm';
import dw from '@common/components/uniCom/down';

export default {
  name: 'contractNoElec',
  mixins: [htb, dw],
  components: {
    'c-head': head,
    'no-elec-form': NoElecForm,
    'sort-tc': sortTc,
  },
  computed: {
    // 编辑，新增
    editState() {
      return this.viewId !== '';
    },
    ...mapGetters(['orgId', 'sysOrg']),
  },
  watch: {
    orgId: {
      immediate: true,
      handler: function(n, o) {
        this.hQuery.orgId = n;
      },
    },
  },

  data() {
    // , "enclosure"
    let exclude = [
      'id',
      'status',
      'batch',
      'contractTypeCode',
      'oppositeCreditCode',
      'orgId',
    ];
    return {
      viewId: '',
      rowData: null,
      listLoading: false,
      //form 显示
      formVisible: false,
      // 表格数据
      spList: [],
      // 查询参数
      hQuery: {
        page: 1,
        limit: 10,
        orgId: this.orgId,
        contractName: '',
        contractCode: '',
        contractTypeCode: '',
        beginDate: '',
        endDate: '',
        status: '', //合同状态
      },
      spTotal: '',
      // 表格属性---------
      tableProp: {
        height: this.scrollbarHeight,
      },
      // 表格事件
      tableEvent: {
        // 行选择
        'selection-change': this.selsChange,
        // 行排序
        'sort-change': this.getList,
      },
      tbMethod: {
        lastOpts: [
          {
            types: 'view',
            event: this.openView.bind(this),
          },
          {
            types: 'edit',
            event: this.openEdit.bind(this),
            isShow: this.mtShowEdit.bind(this),
          },
          {
            types: 'del',
            event: this.mtDelete.bind(this),
            isShow: this.mtShowDel.bind(this),
          },
        ],
      },
      // 表格选择的行
      selRows: [],
      columns: [],
      tbCol: {
        // 显示时候头排除
        exclude: exclude,
        order: false,
        nosort: ['status', 'enclosure'],
        // 没有 columns 列数据时，表头的键值对
        headKv: {
          contractCode: '合同编码',
          contractName: '合同名称',
          contractTypeCodeName: '合同类型',
          status: '合同状态',
          statusName: '合同状态',
          signingDate: '合同签订时间',
          beginDate: '合同生效时间',
          endDate: '合同失效时间',
          enclosure: '附件',
          stopTime: '终止时间',
          rejectReason: '终止原因',
        },
        // 取值从数据
        heads: false,
        enclosure: true,
        replace: {
          status: 'statusName',
          orgId: 'orgName',
          // enclosure: "files",
        },
      },
      upload: {
        multiple: false,
        limitNumber: 1,
        disabled: true,
        noPreview: true,
        prop: 'enclosure',
        // // 批量号的名字
        // batch: "batch",
        // // 用于确定行数据的关键字段
        // key: "id",
        // 回调
        event: {
          success: this.upSuccess.bind(this),
          delete: this.upDelete.bind(this),
          change: this.upChange.bind(this),
        },
      },

      state: false,
      statusType: '',
    };
  },
  created() {
    this.getList();
  },

  methods: {
    upChange(file, fileList, scope) {
      console.log('upchange', fileList, scope);
      // if (fileList.length < 2) {
      //   scope.row[this.upload.prop] = "";
      // } else {
      //   scope.row[this.upload.prop] = scope.row[this.upload.batch];
      // }
    },
    // 上传成功
    upSuccess(res, scope) {
      console.log('upsuccess', res, scope);
      // if (res.rel
      //   && res.data[this.upload.batch] != ""
      //   && typeof res.data[this.upload.batch] != undefined
      // ) {
      //
      //   let index = _.findIndex(this.tableData, (v) => {
      //     return v[this.upload.key] === scope.row[this.upload.key];
      //   });
      //
      //   if (index !== -1) {
      //     this.$set(this.tableData[index], this.upload.prop, res.data[this.upload.batch]);
      //     this.$set(this.tableData[index], this.upload.batch, res.data[this.upload.key]);
      //     this.$emit("line-change", this.tableData[index]);
      //   }
      // }
    },
    // 文件移除 根据 file.id
    upDelete(file, fileList, scope) {
      console.log('updel', fileList, scope);
      // scope.row.files = fileList;
    },

    // 删除
    mtShowDel(scope, item) {
      if (
        scope.row.status === '3' ||
        scope.row.status === '12' ||
        scope.row.status === '10' ||
        scope.row.status === 'yty237'
      ) {
        return false;
      }
      return true;
    },
    // 编辑
    mtShowEdit(scope, item) {
      if (
        scope.row.status === '12' ||
        scope.row.status === '10' ||
        scope.row.status === 'yty237'
      ) {
        return false;
      }
      return true;
    },

    changeQuery(q) {
      this.hQuery = {
        ...this.hQuery,
        ...q,
      };
    },
    // 查看
    openView(row) {
      console.log('row22', row);
      this.statusType = row.status;
      this.formVisible = true;
      this.viewId = row.id;
      this.state = true;
    },
    // 编辑
    openEdit(row) {
      console.log('row11', row);
      this.rowData = row;
      this.formVisible = true;
      this.viewId = row.id;
      this.state = false;
    },

    changeVisible(v) {
      this.formVisible = v;
    },
    // 获取行数据 todo sort
    async getList(
      { prop, order } = {
        prop: this.hQuery.sortField || '',
        order: this.hQuery.sortCend || '',
      }
    ) {
      this.state = false;
      this.viewId = '';
      this.rowData = null;

      let invertHead = _.invert(this.tbCol.replace);
      if (_.includes(_.keys(invertHead), prop)) {
        prop = invertHead[prop];
      }
      console.log(prop, order);
      let ord =
        order !== undefined && order !== null
          ? order.replace('ending', '')
          : '';
      this.hQuery = { ...this.hQuery, sortField: prop, sortCend: ord };
      let params = { ...this.hQuery };
      this.listLoading = true;
      this.spList = [];
      try {
        const res = await fetch({
          url: '/api/contract/htContractNotElectricity/PageList',
          method: 'get',
          params: params,
        });

        if (res && res.rel) {
          this.columns = res.data.columns;
          this.spList = res.data.rows;
          this.spTotal = res.data.total;
          this.listLoading = false;
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

    // 新增
    mtCreate() {
      this.formVisible = true;
      this.$refs.applicant.contractTypeChangeInit('');
    },

    // 删除
    mtDelete(row) {
      let ids = '';
      if (row) {
        ids = row.id;
      } else {
        ids = this.selRows.length > 0 ? this.selRows.join(',') : '';
      }
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(async ({ value }) => {
        try {
          const res = await fetch({
            url: '/api/contract/htContractNotElectricity/deleteInfo',
            method: 'post',
            data: {
              id: ids,
            },
          });

          if (res) {
            this.$message({
              message: '删除成功',
              type: 'success',
            });
            this.getList();
          }
        } catch (e) {
          this.$message({
            message: '删除出错',
            type: 'warning',
          });
        }
      });
    },

    mtDeltesSome() {
      this.$confirm('此操作将批量删除选中的数据行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(async ({ value }) => {
        try {
          let ids = this.selRows.map(v => v.id).join(',');
          const res = await fetch({
            url: '/api/contract/htContractNotElectricity/' + ids,
            method: 'delete',
          });

          if (res) {
            this.$message({
              message: res.msg,
              type: 'success',
            });

            this.getList();
          }
        } catch (e) {
          this.$message({
            message: '删除出错',
            type: 'warning',
          });
        }
      });
    },

    // 选择的类
    selsChange(arr) {
      this.selRows = arr;
    },

    pageSize(val) {
      this.hQuery.limit = val;
      this.getList();
    },
    pageNum(val) {
      this.hQuery.page = val;
      this.getList();
    },
  },
};
</script>
