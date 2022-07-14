<template>
  <el-form ref="headQuery" :model="headQuery" :inline="true" label-width="80px">
    <c-item :inline="true" :itemProps.sync="itemProps" :values.sync="headQuery">
    </c-item>
  </el-form>
</template>

<script>
import { getContractTypeCode } from '@common/api/contractManage/contractLedger/index';
import { parseTime } from '@common/utils/index';
import { cItem } from '@common/components/uniCom/cItem';
import { getSelectList } from '@common/api/base';
import { mapGetters, mapActions } from 'vuex';
import { getStateCode } from '@common/api/contractManage/contractLedger/index';

export default {
  name: 'HeadSearch',
  components: {
    'c-item': cItem,
  },
  props: {
    query: {
      type: Object,
      default: {},
    },
  },
  watch: {
    query: {
      immediate: true,
      handler: function(n, o) {
        if (n !== o) {
          this.headQuery = {
            ...n,
          };
        }
      },
      deep: true,
    },
    headQuery: {
      handler: function(n, o) {
        if (!_.isEqual(n, this.query)) {
          this.$emit('update:query', n);
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      headQuery: {},
      itemProps: [
        [
          {
            types: 'cus',
            type: 'org',
            item: {
              prop: 'orgId',
              label: '组织',
              'label-width': '80px',
              size: 'small',
            },
            el: {
              clear: false,
              values: '',
              disabled: false,
            },
            // 监听
            event: {
              'update:orgId': this.setOrgId,
            },
          },
          {
            types: 'input',
            type: 'text',
            item: {
              prop: 'contractName',
              label: '合同名称',
              'label-width': '80px',
              size: 'small',
            },
            el: {
              clearable: true,
              disabled: false,
              placeholder: '合同名称',
            },
          },

          {
            types: 'input',
            type: 'text',
            item: {
              prop: 'contractCode',
              label: '合同编码',
              'label-width': '80px',
              size: 'small',
            },
            el: {
              clearable: true,
              disabled: false,
              placeholder: '合同编码',
            },
          },

          {
            types: 'select',
            item: {
              prop: 'contractTypeCode',
              label: '合同类型',
              'label-width': '80px',
              size: 'small',
            },
            el: {
              disabled: this.state,
              clearable: true,
              placeholder: '合同类型',
            },
            options: [],
          },
          {
            types: 'select',
            item: {
              prop: 'status',
              label: '合同状态',
              'label-width': '80px',
              size: 'small',
            },
            el: {
              disabled: this.state,
              clearable: true,
              placeholder: '合同状态',
            },
            options: [],
          },
          {
            types: 'date',
            type: 'date',
            item: {
              prop: 'beginDate',
              label: '签订时间',
              'label-width': '80px',
              size: 'small',
            },
            el: {
              'value-format': 'yyyy-MM-dd',

              size: 'small',
              disabled: false,
              style: 'width:100%',
            },
          },
          {
            types: 'date',
            type: 'date',
            item: {
              prop: 'endDate',
              label: '至',
              'label-width': '20px',
              size: 'small',
            },
            el: {
              'value-format': 'yyyy-MM-dd',

              size: 'small',
              disabled: false,
              style: 'width:100%',
            },
          },
          {
            types: 'button',
            item: {
              label: '',
              'label-width': '20px',
              size: 'small',
            },
            el: {
              type: 'primary',
              text: '查询',
              disabled: false,
            },
            click: _.throttle(this.search, 2000),
          },
        ],
      ],
    };
  },

  created() {
    // 合同类型
    this.getSelect({ dim: 'contract_type_no_non_electric' }).then(res => {
      let ct = this.itemProps[0].find(v => {
        return v.item.prop === 'contractTypeCode';
      });
      ct.options = res.map(v => {
        return {
          label: v.propName,
          value: v.propCode,
        };
      });
    });
    // 获取合同状态值
    getStateCode('3,7,9,10,11,12,yty237').then(res => {
      let ct = this.itemProps[0].find(v => {
        return v.item.prop === 'status';
      });
      ct.options = res.map(v => {
        return {
          label: v.propName,
          value: v.propCode,
        };
      });
    });
  },

  methods: {
    checkTime() {
      let beginDate = new Date(this.headQuery.beginDate).getTime();
      let endDate = new Date(this.headQuery.endDate).getTime();

      if (beginDate === 0 || endDate === 0) {
        return true;
      }

      if (beginDate > endDate) {
        this.$notify({
          title: '消息提醒',
          message: '结束日期必须大于起始日期!',
          type: 'warning',
          duration: 2000,
        });
        return false;
      } else {
        return true;
      }
    },
    // 组织
    setOrgId(id) {
      this.headQuery.orgId = id;
    },

    search() {
      if (this.checkTime()) {
        this.$emit('search', this.headQuery);
      }
    },
    ...mapActions(['getSelect']),
  },
};
</script>
