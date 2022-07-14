/*
 * @Author: fengzp
 * @Date: 2021-06-29 09:28:25
 * @LastEditors: fengzp
 * @LastEditTime: 2021-06-29 11:22:17
 * @Introduce: Do not edit
 */
// 使用
// import Pagination from '@common/components/uniCom/Pagination';
// <Pagination
//   :total="total"
//   :page="listQuery.page"
//   :limit="listQuery.limit"
//   @size-change="sizeChange"
//   @limit-change="limitChange"
// ></Pagination>

//     sizeChange(val) {
//       this.listQuery.limit = val;
//       this.getList();
//     },
//     limitChange(val) {
//       this.listQuery.page = val;
//       this.getList();
//     },

import { getSelectList } from '@common/api/base';

export default {
  name: 'Pagination',
  props: {
    total: Number,
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      pageSize: [],
    };
  },

  created() {
    getSelectList('pageSize').then(res => {
      let list = [];
      res.map((i, v) => {
        list.push(Number(i.propCode));
      });
      this.pageSize = list;
    });
  },
  methods: {
    handleSizeChange(val) {
      console.log(val, 'aa');
      this.size = val;
      this.$emit('size-change', val);
    },
    handleCurrentChange(val) {
      console.log(val, 'bb');
      this.limit = val;
      this.$emit('limit-change', val);
    },
  },

  render(h, context) {
    let sel_props = {
      on: {
        'size-change': val => {
          this.handleSizeChange(val);
        },
        'current-change': val => {
          this.handleCurrentChange(val);
        },
      },
    };
    return (
      <el-pagination
        {...sel_props}
        currentPage={this.page}
        pageSizes={this.pageSize}
        pageSize={this.limit}
        layout={'total, sizes, prev, pager, next, jumper'}
        total={this.total}
      ></el-pagination>
    );
  },
};
