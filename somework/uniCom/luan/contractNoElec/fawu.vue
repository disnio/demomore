<template>
  <el-form
    ref="goods"
    :model="legal"
    label-width="150px"
    style="width:94%"
  >
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="相对方名称:" prop="oppositeName">
          <el-input disabled v-model="legal.oppositeName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="类型:" prop="oppositeType">
          <el-select
            v-model="legal.oppositeType"
            :placeholder="state?'':'请选择'"
            :disabled="state"
          >
            <el-option
              v-for="item in oppositeTypes"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="来源:" prop="oppositeSourceType">
          <el-select
            v-model="legal.oppositeSourceType"
            :placeholder="state?'':'请选择'"
            :disabled="state"
          >
            <el-option
              v-for="item in oppositeSourceTypes"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="相对方性质:" prop="oppositeEnterpriseType">
          <el-select
            v-model="legal.oppositeEnterpriseType"
            :placeholder="state?'':'请选择'"
            :disabled="state"
          >
            <el-option
              v-for="item in oppositeEnterpriseTypes"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="国家:" prop="oppositeCountryType">
          <el-select
            v-model="legal.oppositeCountryType"
            :placeholder="state?'':'请选择'"
            :disabled="state"
          >
            <el-option
              v-for="item in oppositeCountryTypes"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="签约主体编号:" prop="contratSubjectCode">
          <el-input disabled v-model="legal.contratSubjectCode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="合同类型编号:" prop="oppositeContractType">
          <el-select
            v-model="legal.oppositeContractType"
            :placeholder="state?'':'请选择'"
            :disabled="state"
          >
            <el-option
              v-for="item in oppositeContractTypes"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="收付方向:" prop="payeeDirection">
          <el-select
            v-model="legal.payeeDirection"
            :placeholder="state?'':'请选择'"
            :disabled="state"
          >
            <el-option
              v-for="item in payeeDirections"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="计价方式:" prop="priceMethod">
          <el-select
            v-model="legal.priceMethod"
            :placeholder="state?'':'请选择'"
            :disabled="state"
          >
            <el-option
              v-for="item in priceMethods"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="采购方式:" prop="buyMethod">
          <el-select
            v-model="legal.buyMethod"
            :placeholder="state?'':'请选择'"
            :disabled="state"
          >
            <el-option
              v-for="item in buyMethods"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="资金来源:" prop="fundSource">
          <el-select
            v-model="legal.fundSource"
            :placeholder="state?'':'请选择'"
            :disabled="state"
          >
            <el-option
              v-for="item in fundSources"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="合同币种:" prop="contractCurrencyType">
          <el-select
            v-model="legal.contractCurrencyType"
            :placeholder="state?'':'请选择'"
            :disabled="state"
          >
            <el-option
              v-for="item in contractCurrencyTypes"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="合同金额/暂估金额:" prop="contractpayee">
          <el-input v-model="legal.contractpayee" :disabled="state"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="合同标的:" prop="contractCodeType">
          <el-select
            v-model="legal.contractCodeType"
            :placeholder="state?'':'请选择'"
            :disabled="state"
          >
            <el-option
              v-for="item in contractCodeTypes"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="适合语言:" prop="useLanguage">
          <el-select
            v-model="legal.useLanguage"
            :placeholder="state?'':'请选择'"
            :disabled="state"
          >
            <el-option
              v-for="item in useLanguages"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="涉外合同:" prop="relateToOutside">
          <el-select
            v-model="legal.relateToOutside"
            :placeholder="state?'':'请选择'"
            :disabled="state"
          >
            <el-option
              v-for="item in relateToOutsides"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="关联项目:" prop="relateToProject">
          <el-select
            v-model="legal.relateToProject"
            :placeholder="state?'':'请选择'"
            :disabled="state"
          >
            <el-option
              v-for="item in relateToProjects"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="重大合同:" prop="greatContract">
          <el-select
            v-model="legal.greatContract"
            :placeholder="state?'':'请选择'"
            :disabled="state"
          >
            <el-option
              v-for="item in greatContracts"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="合同担保:" prop="contractGuarantee">
          <el-select
            v-model="legal.contractGuarantee"
            :placeholder="state?'':'请选择'"
            :disabled="state"
          >
            <el-option
              v-for="item in contractGuarantees"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="内部合同:" prop="contractInside">
          <el-select
            v-model="legal.contractInside"
            :placeholder="state?'':'请选择'"
            :disabled="state"
          >
            <el-option
              v-for="item in contractInsides"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="使用范本:" prop="useModel">
          <el-select
            v-model="legal.useModel"
            :placeholder="state?'':'请选择'"
            :disabled="state"
          >
            <el-option
              v-for="item in useModels"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="承办人员编码:" prop="undertakePersonCode">
          <el-input
            :disabled="state"
            v-model="legal.undertakePersonCode"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="承办日期:" prop="undertakeDate">
          <el-date-picker
            :disabled="state"
            type="date"
            placeholder="选择日期"
            v-model="legal.undertakeDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="24">
        <el-form-item label="合同简介:" prop="contractContentBrief">
          <el-input
            type="textarea"
            placeholder="合同简介..."
            rows="6"
            :maxlength="400"
            resize="none"
            :disabled="state"
            v-model="legal.contractContentBrief"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="24">
        <el-form-item label="签订依据:" prop="signBasis">
          <el-input
            type="input"
            :disabled="state"
            placeholder="签订依据..."
            v-model="legal.signBasis"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="合同收付款笔数:" prop="payeeNumber">
          <el-input
            :disabled="state"
            v-model="legal.payeeNumber"
          ></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="收/付款比例:" prop="payeePercent">
          <el-input
            :disabled="state"
            v-model="legal.payeePercent"
          ></el-input>
        </el-form-item>
      </el-col>

    </el-row>

    <el-row :gutter="10">

      <el-col :span="12">
        <el-form-item label="收/付款金额:" prop="paymount">
          <el-input
            :disabled="state"
            v-model="legal.paymount"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="提醒天数:" prop="warnDays">
          <el-input
            :disabled="state"
            v-model="legal.warnDays"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="收/付款计划:" prop="payeePlan">
          <el-input
            :disabled="state"
            v-model="legal.payeePlan"
          ></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="层次:" prop="levels">
          <el-input
            :disabled="state"
            v-model="legal.levels"
          ></el-input>
        </el-form-item>
      </el-col>

    </el-row>

    <el-row :gutter="10">

      <el-col :span="12">
        <el-form-item label="顺序:" prop="orderBy">
          <el-input
            :disabled="state"
            v-model="legal.orderBy"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="节点说明:" prop="nodeDescription">
          <el-input
            :disabled="state"
            v-model="legal.nodeDescription"
          ></el-input>
        </el-form-item>
      </el-col>

    </el-row>

    <el-row :gutter="10">


      <el-col :span="12">
        <el-form-item label="审批人:" prop="approvalNameCode">
          <el-input
            :disabled="state"
            v-model="legal.approvalNameCode"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否内控审查节点:" prop="internalReviewCode">
          <el-input
            :disabled="state"
            v-model="legal.internalReviewCode"
          ></el-input>
        </el-form-item>
      </el-col>

    </el-row>

  </el-form>
</template>

<script>
import fetch from "@common/utils/fetch";

export default {
  name: "FaWu",
  props: {
    legalIn: {
      type: Object,
      default: {}
    },
    state: Boolean
  },

  watch: {
    legalIn: {
      handler: function (n, o) {
        this.legal = {
          ...n
        }
      },
      immediate: true,
      deep: true
    },
    legal: {
      handler: function (n, o) {
        if (!_.isEqual(n, this.legalIn)) {
          console.log("change fawu:", n, o)
          this.$emit("update:legal", n)
        }
      },
      deep: true
    }
  },
  data() {
    return {
      // 字段编辑 disabled
      // todo wsc 法务系统必填字段
      // 类型：供应商、客户、两者皆是，三者分别对应字典数值为 0,1,2
      oppositeTypes: [],
      // 来源列表
      oppositeSourceTypes: [],
      // 国家列表
      oppositeCountryTypes: [],
      // 相对方性质列表
      oppositeEnterpriseTypes: {},
      // 合同类型编号
      oppositeContractTypes: {},
      // 收付方向
      payeeDirections: {},
      // 计价方式
      priceMethods: {},
      // 采购方式
      buyMethods: {},
      //资金来源
      fundSources: {},
      //合同币种
      contractCurrencyTypes: {},

      // 合同标的编码
      contractCodeTypes: [],
      // 适合语言
      useLanguages: {},
      // 开始日期，结束日期是否选择正确
      legalCheckFlag: false,
      //适用范本
      useModels: [],

      // 法务 end
      dimApi: '/api/admin/dim/getDimByPropCode?propCode=',
      legal: {
        isVirtual: false,
        // 计价方式
        priceMethod: "",
        // 是否内控审查节点
        internalReviewCode: "",
        // 审批人
        approvalNameCode: "",
        // 节点说明
        nodeDescription: "",
        // 顺序
        orderBy: "",
        // 层次
        levels: "",
        // 审批行ID
        approvalRowId: "",
        // 审批头ID
        approvalHeadId: "",
        // 收/付款计划
        payeePlan: "",
        // 提醒天数
        warnDays: "",
        // 收/付款比例
        payeePercent: 0,
        // 收/付款金额
        paymount: 0,
        // 履行时间
        lxDate: "",
        // 履行计划编号
        lxjhbh: "",
        // 合同收付款笔数
        payeeNumber: "",
        // 签订依据
        signBasis: "",
        // 合同简介
        contractContentBrief: "",
        //承办日期
        undertakeDate: "",
        //承办人员编码
        undertakePersonCode: "",
        // 使用范本
        useModel: "",
        // 内部合同
        contractInside: "",
        //合同担保
        contractGuarantee: "",
        // 重大合同
        greatContract: "",
        //关联项目
        relateToProject: "legal_interface1302",
        //涉外合同，没有列表
        relateToOutside: "legal_interface1102",
        // 适合语言
        useLanguage: "legal_interface1201",
        // 合同标的编码
        contractCodeType: "",
        // 合同金额/暂估金额
        contractpayee: "",
        //合同币种
        contractCurrencyType: "legal_interface1001",
        // 采购方式
        buyMethod: "",
        //资金来源
        fundSource: "legal_interface0901",
        // 收付方向
        payeeDirection: "legal_interface0602",

        // 相对方合同类型
        oppositeContractType: "legal_interface0501",
        // 签约主体编号
        contratSubjectCode: "",
        // 国家
        oppositeCountryType: "legal_interface0401",
        // 相对方性质
        oppositeEnterpriseType: "",
        // 相对方名称
        oppositeName: "",
        // 统一社会信用代码
        socialCreditCode: "",
        // 类型
        oppositeType: "",
        // 相对方来源
        oppositeSourceType: "legal_interface0203",
      },
    }
  },

  async created() {
    //适用范本
    this.useModels = await this.get_opts(this.dimApi + 'legal_interface17');
    //内部合同
    this.contractInsides = await this.get_opts(this.dimApi + 'legal_interface16');
    //合同担保
    this.contractGuarantees = await this.get_opts(this.dimApi + 'legal_interface15');
    //重大合同
    this.greatContracts = await this.get_opts(this.dimApi + 'legal_interface14');
    //关联项目
    this.relateToProjects = await this.get_opts(this.dimApi + 'legal_interface13');
    //适用语言
    this.useLanguages = await this.get_opts(this.dimApi + 'legal_interface12');
    //涉外合同
    this.relateToOutsides = await this.get_opts(this.dimApi + 'legal_interface11');
    //合同币种
    this.contractCurrencyTypes = await this.get_opts(this.dimApi + 'legal_interface10');
    //资金来源
    this.fundSources = await this.get_opts(this.dimApi + 'legal_interface09');
    //采购方式
    this.buyMethods = await this.get_opts(this.dimApi + 'legal_interface08');

    //计价方式
    this.priceMethods = await this.get_opts(this.dimApi + 'legal_interface07');
    //收/付款方向
    this.payeeDirections = await this.get_opts(this.dimApi + 'legal_interface06');
    //相对方的合同类型
    this.oppositeContractTypes = await this.get_opts(this.dimApi + 'legal_interface05');
    //国家
    this.oppositeCountryTypes = await this.get_opts(this.dimApi + 'legal_interface04');

    //相对方性质
    this.oppositeEnterpriseTypes = await this.get_opts(this.dimApi + 'legal_interface03');
    //相对方来源
    this.oppositeSourceTypes = await this.get_opts(this.dimApi + 'legal_interface02');
    //相对方类型
    this.oppositeTypes = await this.get_opts(this.dimApi + 'legal_interface01');
    //合同标的
    this.contractCodeTypes = await this.get_opts(this.dimApi + 'legal_interface25');

  },

  methods: {
    // 重置法务字段
    resetLegal() {
      this.contractLedgerForm.legal = {
        isVirtual: false,
        // 计价方式
        priceMethod: "",
        // 是否内控审查节点
        internalReviewCode: "",
        // 审批人
        approvalNameCode: "",
        // 节点说明
        nodeDescription: "",
        // 顺序
        orderBy: "",
        // 层次
        levels: "",
        // 审批行ID
        approvalRowId: "",
        // 审批头ID
        approvalHeadId: "",
        // 收/付款计划
        payeePlan: "",
        // 提醒天数
        warnDays: "",
        // 收/付款比例
        payeePercent: 0,
        // 收/付款金额
        paymount: 0,
        // 履行时间
        lxDate: "",
        // 履行计划编号
        lxjhbh: "",
        // 合同收付款笔数
        payeeNumber: "",
        // 签订依据
        signBasis: "",
        // 合同简介
        contractContentBrief: "",
        //承办日期
        undertakeDate: "",
        //承办人员编码
        undertakePersonCode: "",
        // 使用范本
        useModel: "",
        // 内部合同
        contractInside: "",
        //合同担保
        contractGuarantee: "",
        // 重大合同
        greatContract: "",
        //关联项目
        relateToProject: "legal_interface1302",
        //涉外合同，没有列表
        relateToOutside: "legal_interface1102",
        // 适合语言
        useLanguage: "legal_interface1201",
        // 合同标的编码
        contractCodeType: "",
        // 合同金额/暂估金额
        contractpayee: "",
        //合同币种
        contractCurrencyType: "legal_interface1001",
        // 采购方式
        buyMethod: "",
        //资金来源
        fundSource: "legal_interface0901",
        // 收付方向
        payeeDirection: "legal_interface0602",
        // 开始日期，结束日期
        beginDate: "",
        endDate: "",
        // 相对方合同类型
        oppositeContractType: "legal_interface0501",
        // 签约主体编号
        contratSubjectCode: "",
        // 国家
        oppositeCountryType: "legal_interface0401",
        // 相对方性质
        oppositeEnterpriseType: "",
        // 相对方名称
        oppositeName: "",
        // 统一社会信用代码
        socialCreditCode: "",
        // 类型
        oppositeType: "",
        // 相对方来源
        oppositeSourceType: "legal_interface0203",
      }
    },

    async get_opts(url) {
      try {
        const res = await fetch({
          url: url,
          method: 'get',
        })
        return res.map(v => ({
          key: v.propCode,
          value: v.propName
        }));
      } catch (e) {
        this.$notify({
          title: "提示",
          message: e,
          type: "warning",
          duration: 2000
        });
      }
    },
    // 采购方式
    get_buyMethod() {
      fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=legal_interface08',
        method: 'get',
      }).then((res) => {
        this.buyMethods = res;
      })
    }
  }
}
</script>

<style scoped>

</style>
