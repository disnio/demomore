import fetch from '@common/utils/fetch';
import _ from 'lodash';
import { mapGetters } from 'vuex';

const btn_codes = [
  {
    klass: 'filter-item',
    btn_type: 'primary',
    icon: 'el-icon-plus',
    code: 'btn_add',
    name: '新增',
  },
  {
    klass: 'filter-item',
    btn_type: 'primary',
    icon: 'el-icon-delete',
    code: 'btn_del',
    name: '删除',
  },
  {
    klass: 'filter-item',
    btn_type: 'primary',
    icon: 'el-icon-edit',
    code: 'btn_edit',
    name: '编辑',
  },
  {
    klass: 'filter-item',
    btn_type: 'primary',
    icon: 'el-icon-view',
    code: 'btn_export',
    name: '导出',
  },
  {
    klass: 'filter-item',
    btn_type: 'primary',
    icon: 'el-icon-view',
    code: 'btn_allot',
    name: '分配',
  },
  {
    klass: 'filter-item',
    btn_type: 'primary',
    icon: 'el-icon-refresh',
    code: 'btn_freshen_status',
    name: '刷新',
  },
  {
    klass: 'filter-item',
    btn_type: 'primary',
    icon: 'el-icon-view',
    code: 'btn_list',
    name: '查看',
  },
  {
    klass: 'filter-item',
    btn_type: 'primary',
    icon: 'el-icon-upload',
    code: 'btn_import',
    name: '导入',
  },
  {
    klass: 'filter-item',
    btn_type: 'primary',
    icon: 'el-icon-view',
    code: 'btn_importAnalysis',
    name: '导入解析',
  },
  {
    klass: 'filter-item',
    btn_type: 'primary',
    icon: 'el-icon-view',
    code: 'btn_exportAll',
    name: '导出全部',
  },
  {
    klass: 'filter-item',
    btn_type: 'primary',
    icon: '',
    code: 'btn_mbDown',
    name: '模板下载',
  },
];

export default {
  name: 'btnBox',
  props: {
    // 资源前缀保留：tMdataCustomerManager:btn_add
    prefix: String,
    // 触发自定义事件的前缀，可选
    eventPrefix: String,
    // 要生成的按钮组，['tMdataCustomerManager:btn_add', 'tMdataCustomerManager:btn_edit']
    btns: Array,
  },
  watch: {
    groupTypes: {
      immediate: true,
      handler: function(n, o) {
        this.setList();
      },
      deep: true,
    },
  },

  computed: {
    ...mapGetters(['groupTypes', 'visitedSysInfo']),
  },

  data() {
    return {
      list: [],
      pq: {
        page: 1,
        limit: 100,
        name: '',
        menuId: this.menuId,
      },
      btnList: [],
      mList: [],
    };
  },

  created() {},
  methods: {
    setList() {
      this.mList = _.uniqBy(
        _.compact(
          this.flatList(_.flatMapDeep(this.groupTypes, v => v.children)),
          v => v.path
        )
      );
      let cur = _.find(this.mList, v => {
        return v.href === this.$route.path;
      });

      console.log('cur', cur);
      this.pq.menuId = cur.id;
      this.getList();
    },
    flatList(list) {
      return _.reduce(
        list,
        (t, v) => {
          if (_.has(v, 'children')) {
            return v.children.length > 0
              ? [v, ...this.flatList(v.children), ...t]
              : [v, ...t];
          }
          return [v, ...t];
        },
        []
      );
    },
    // 获取资源列表
    getList() {
      return fetch({
        url: '/api/admin/element/list',
        method: 'get',
        params: this.pq,
      })
        .then(res => {
          if (res) {
            this.list = res.data.rows;
            this.getBtns();
          } else {
            console.log(res.msg);
          }
        })
        .catch(e => {
          console.log(res.msg);
        });
    },

    getBtns() {
      this.btnList = this.list.filter(v => {
        if (
          _.findIndex(this.btns, btn => {
            return btn.code === v.code;
          }) !== -1
        ) {
          return v;
        }
      });
    },

    renderButton(v) {
      let bz = _.find(btn_codes, b => {
        return _.includes(v.code, b.code);
      });

      let btn = _.find(this.btns, btn => {
        return btn.code === v.code;
      });

      let btn_props = {
        props: {
          ...this.$attrs,
          class: v.klass || bz.klass,
          type: v.btn_type || bz.btn_type,
          icon: v.icon || bz.icon,
        },

        on: {
          click: e => {
            btn.click(e);
            this.$emit(this.eventPrefix || 'cus' + ':' + bz.code);
          },
        },
      };
      return <el-button {...btn_props}>{v.name}</el-button>;
    },
  },

  render(h, context) {
    return (
      <el-button-group>
        {this.btnList.map(v => {
          return this.renderButton(v);
        })}
      </el-button-group>
    );
  },
};
