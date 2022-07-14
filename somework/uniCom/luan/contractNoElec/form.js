/**
 * @file: fm.js
 * @description: 混入表单，新增和编辑
 * @author: wsc
 * @date: 2020-11-09
 */
import fetch from '@common/utils/fetch';
import { getSelectList } from "@common/api/base";
import {
  getAllocatedCustomerListByName,
  addedServicesName
} from "@common/api/contractManage/contractLedger/index";
// htContractLegal    htContractNotElectricity
const fm = {
  data() {
    return {
      flagOption: "add",
      addDialogVisible: false,
      dialogTitle: "非电力合同",
      // 法务字段 同步组件内

      legal: {
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
        //关联项目legal_interface1302
        relateToProject: "",
        //涉外合同，没有列表legal_interface1102
        relateToOutside: "",
        // 适合语言legal_interface1201
        useLanguage: "",
        // 合同标的编码
        contractCodeType: "",
        // 合同金额/暂估金额
        contractpayee: "",
        //合同币种legal_interface1001
        contractCurrencyType: "",
        // 采购方式
        buyMethod: "",
        //资金来源legal_interface0901
        fundSource: "",
        // 收付方向legal_interface0602
        payeeDirection: "",

        // 相对方合同类型legal_interface0501
        oppositeContractType: "",
        // 签约主体编号
        contratSubjectCode: "",
        // 国家legal_interface0401
        oppositeCountryType: "",
        // 相对方性质
        oppositeEnterpriseType: "",
        // 相对方名称
        oppositeName: "",
        // 统一社会信用代码
        socialCreditCode: "",
        // 类型
        oppositeType: "",
        // 相对方来源legal_interface0203
        oppositeSourceType: "",
      },
      goods: {
        contractCode: "", // 合同编码
        contractName: "", // 合同名称
        contractTypeCode: "", // 合同类型
        oppositeCustomerId: "", // 相对方Id
        oppositeName: "", // 相对方名称
        legalCode: "",
        status: "", // 合同状态
        signingDate: "", // 签订日期
        beginDate: "", // dateArr[0]
        endDate: "", // dateArr[1]
        enclosure: "", // 合同附件
        oppositeCreditCode: "", // 相对方信用代码
        addedServicesId: "",//关联增值服务
        steamPressureLower: "",//蒸汽压力(小)
        steamPressureUpper: "",//蒸汽压力(大)
        enthalpyOfSteamStability: "",//蒸汽稳定约定焓值
        addedServicesName:"",
      },
      itemProps: [
        // 0
        [{
          types: "input",
          type: "text",
          item: {
            prop: "contractCode",
            label: "系统合同编码",
            "label-width": "140px",
            size: "small",
            // rules: [
            //   {
            //     required: true,
            //     message: "必填项",
            //     trigger: "blur"
            //   },
            //   {
            //     min: 1,
            //     max: 100,
            //     message: "长度在 1 到 100 个字符",
            //     trigger: "blur"
            //   }
            // ],
          },
          el: {
            clearable: true,
            disabled: true,
            placeholder: "输入系统合同编码",
          },
        }, {
          types: "input",
          type: "text",
          item: {
            prop: "contractName",
            label: "合同名称",
            "label-width": "140px",
            size: "small",
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "blur"
              },
              {
                min: 1,
                max: 100,
                message: "长度在 1 到 100 个字符",
                trigger: "blur"
              }
            ],
          },
          el: {
            clearable: true,
            disabled: false,
            placeholder: "输入合同名称",
          },
        }],
        // 1
        [{
          types: "select",
          item: {
            prop: "oppositeCustomerId",
            label: "相对方名称",
            "label-width": "140px",
            size: "small",
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "blur"
              },
            ],
          },
          el: {
            disabled: false,
            clearable: true,
            filterable: true,
            remote: true,
            "remote-method": this.getOpposite,
            placeholder: "选择相对方名称",
          },
          on: {
            change: this.changeOpposite.bind(this)
          },
          options: []
        }, {
          types: "input",
          type: "text",
          item: {
            prop: "oppositeCreditCode",
            label: "相对方信用编码",
            "label-width": "140px",
            size: "small",
          },
          el: {
            clearable: true,
            disabled: true,
            placeholder: "输入相对方信用编码",
          },
        }],
        // 2
        [{
          types: "select",
          item: {
            prop: "contractTypeCode",
            label: "合同类型",
            "label-width": "140px",
            size: "small",
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "blur"
              },
            ],
          },
          el: {
            disabled: false,
            clearable: true,
            placeholder: "选择合同类型",
          },
          options: [],
          on: {
            change: this.contractTypeChange.bind(this),
          },
        }, {
          types: "input",
          type: "text",
          item: {
            prop: "statusName",
            label: "合同状态",
            "label-width": "140px",
            size: "small",
          },
          el: {
            clearable: true,
            disabled: true,
            placeholder: "输入合同状态",
          },
        }],
        // 3
        [{
          types: "date",
          type: "date",
          item: {
            prop: "signingDate",
            label: "签订日期",
            "label-width": "140px",
            size: "small",
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "blur"
              },
            ],
          },
          el: {
            "value-format": "yyyy-MM-dd",
            size: "small",
            disabled: false,
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            style: "width:100%"
          },
        }, {
          types: "input",
          type: "text",
          item: {
            prop: "legalCode",
            label: "法务系统合同编码",
            "label-width": "140px",
            size: "small",

          },
          el: {
            clearable: true,
            disabled: true,
            placeholder: "输入法务系统合同编码",
          },
        }],
        // 4
        [{
          types: "date",
          type: "date",
          item: {
            prop: "beginDate",
            label: "生效时间",
            "label-width": "140px",
            size: "small",
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "blur"
              },
            ],
          },
          el: {
            "value-format": "yyyy-MM-dd",
            size: "small",
            disabled: false,
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            style: "width:100%"
          },
        }, {
          types: "date",
          type: "date",
          item: {
            prop: "endDate",
            label: "失效时间",
            "label-width": "140px",
            size: "small",
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "blur"
              },
            ],
          },
          el: {
            "value-format": "yyyy-MM-dd",
            size: "small",
            disabled: false,
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            style: "width:100%"
          },
        }],

        // 5
        // [{
        //   types: "upload",
        //   item: {
        //     prop: "enclosure",
        //     label: "合同附件",
        //     "label-width": "140px",
        //     size: "small",
        //     rules: [
        //       {
        //         required: true,
        //         message: "必须上传附件",
        //         trigger: "blur"
        //       },
        //     ],
        //   },
        //   el: {
        //     disabled: false,
        //     multiple: false,
        //     limitNumber: 1,
        //     // 回调
        //     event: {
        //       success: this.upSuccess,
        //       delete: this.upDelete,
        //     }
        //   },

        // }]
      ],
      disabled: ["contractCode", "legalCode", "statusName", "oppositeCreditCode"],
      // 客户列表列表
      khlboptions: [],
      // 相对方列表
      oppositeList: [],
    }
  },

  created() {
    // 合同类型
    getSelectList("contract_type_no_non_electric").then(res => {
      this.khlboptions = res.map(v => {
        return {
          label: v.propName,
          value: v.propCode
        }
      });

      this.itemProps[2][0].options = this.khlboptions;
    });

  },
  mounted() {
    // todo wsc
  },
  methods: {
    // 相对方列表
    getOpposite(query) {
      this.oppositeList = [];
      if (query !== "") {
        let p = {
          cusType: "",
          custName: query,
          contractType: ""
        };
        getAllocatedCustomerListByName(p).then(res => {
          if (res.data.customerInfo
            && res.data.customerInfo.length > 0) {
            this.oppositeList = res.data.customerInfo.map(v => {
              return {
                label: v.customerName,
                value: v.customerId,
                ...v
              }
            });
            this.itemProps[1][0].options = this.oppositeList;
          }
        });
      }
    },

    //模糊查询相对方信息
    changeOpposite(val) {
      if (val === undefined || val === null || val === "") {
        this.goods.oppositeCustomerId = "";
        this.goods.oppositeName = "";
        this.goods.oppositeCreditCode = "";
        return;
      }

      this.oppositeList.map(item => {
        if (item.value.indexOf(val) !== -1) {
          this.goods.oppositeCustomerId = item.customerId;
          this.goods.oppositeName = item.customerName;
          this.goods.oppositeCreditCode = item.socialCreditCode;
        }
      });
    },

    // 上传成功
    upSuccess(sd) {
      console.log("upload success:", sd)
      if (sd.res
        && sd.res.batch !== ""
        && !_.isUndefined(sd.res.batch)
        && !_.isNull(sd.res.batch)
      ) {
        this.goods.enclosure = sd.res.batch;
      }
    },
    // 删除文件成功
    upDelete(files) {
      if (files.length === 0) {
        this.goods.enclosure = ""
      }
      console.log("delete success:", files)
    },
    // 增值服务模糊查询
    getAddServices(query) {
      this.oppositeList = [];
        if (query !== "") {
          addedServicesName(query).then(res => {
            if (res.data
              && res.data.length > 0) {
              this.oppositeList = res.data.map(v => {
                return {
                  label: v.addedServicesName,
                  value: v.id,
                  ...v
                }
              });
              this.$nextTick(function () {
                // DOM 现在更新了
                // `this` 绑定到当前实例
                this.$set(this.itemProps[5][0],'options',this.oppositeList);
                this.$forceUpdate()
              })
             
              console.log(this.itemProps[5][0],'this.itemProps[5][0]')
  
            }else {
              this.$set(this.itemProps[5][0],'options',[]);
            }
          });
        }else {
          this.$set(this.itemProps[5][0],'options',[]);
        }
     
    },
    // 增值服务变化
    changeAddServices(data) {
      this.$set(this.goods, "addedServicesId", data);
      if (this.itemProps[5][0].options.length > 0 && data != "") {
        let dataList = this.itemProps[5][0].options.filter((v) => {
          return data == v.id;
        });
        this.$set(this.goods, "addedServicesName", dataList[0].addedServicesName);
      }
    },
    // 合同类型变化
    contractTypeChange(val) {
      this.goods.addedServicesId =  "";//关联增值服务
      this.goods.steamPressureLower= "";//蒸汽压力(小)
      this.goods.steamPressureUpper= "";//蒸汽压力(大)
      this.goods.enthalpyOfSteamStability="";//蒸汽稳定约定焓值
      this.goods.addedServicesName="";
      let upload =  [{
        types: "upload",
        item: {
          prop: "enclosure",
          label: "合同附件",
          "label-width": "140px",
          size: "small",
          rules: [
            {
              required: true,
              message: "必须上传附件",
              trigger: "blur"
            },
          ],
        },
        el: {
          disabled: false,
          multiple: false,
          limitNumber: 1,
          // 回调
          event: {
            success: this.upSuccess,
            delete: this.upDelete,
          }
        },
      }]
      this.itemProps[6] = [];
      // 热力合同
      if (val == 'value_added_services') {
        let list = [{
          types: "select",
          item: {
            prop: "addedServicesName",
            label: "关联增值服务",
            "label-width": "140px",
            size: "small",
          },
          el: {
            disabled: false,
            clearable: true,
            filterable: true,
            remote: true,
            "remote-method": this.getAddServices,
            placeholder: "",
          },
          on: {
            change: this.changeAddServices.bind(this)
          },
          options: []
        }]
        this.$set(this.itemProps,5,list);
        this.$set(this.itemProps,6,upload);

      } else if (val == 'thermal_contract') {
        let list2 = [
          {
            types: "doubleInput",
            type: "text",
            item: {
              prop: "steamPressureLower",
              label: "蒸汽压力",
              "label-width": "140px",
              rules: [
                { pattern: /^(\-|\+)?\d+(\.\d+)?$/, message: '请输入数值类型', trigger: 'blur' }
              ],
            },
            el: {
              disabled: false,
              clearable: false,
              style: "width:35%",
              placeholder: "请输入",
            },
            textInfo: {
              // style: "position:absolute;right:0;"
            },
            text: "Mpa",
            douInput: {
              type: "text",
              item: {
                prop: "steamPressureUpper",
                label: "",
                "label-width": "1px",
                rules: [
                  { pattern: /^(\-|\+)?\d+(\.\d+)?$/, message: '请输入数值类型', trigger: 'blur' }
                ],
              },
              el: {
                disabled: false,
                clearable: false,
                style: "width:50%",
                placeholder: "请输入",
              },
              on: {
                // change: this.unitCodeChangeFirst.bind(this),
              },
              textInfo: {
                style: "position:absolute;right:35%;top:1px;"
              },
              text: "Mpa",
            }
          },
          {
            types: "input",
            type: "text",
            item: {
              prop: "enthalpyOfSteamStability",
              label: "蒸汽稳定约定焓值",
              "label-width": "140px",
              size: "small",
            },
            el: {
              clearable: true,
              disabled: false,
              placeholder: "输入值",
              style: "width:85%",
            },
            textInfo: {
              style: "position:absolute;right:0;"
            },
            text: "kJ/kg",
          }
        ];
        this.$set(this.itemProps,5,list2);
        this.$set(this.itemProps,6,upload);

      } else {
        this.$set(this.itemProps,5,[]);
        this.$set(this.itemProps,6,upload);

      }
    },
    // 合同类型变化
    contractTypeChangeInit(val) {
      let upload =  [{
        types: "upload",
        item: {
          prop: "enclosure",
          label: "合同附件",
          "label-width": "140px",
          size: "small",
          rules: [
            {
              required: true,
              message: "必须上传附件",
              trigger: "blur"
            },
          ],
        },
        el: {
          disabled: false,
          multiple: false,
          limitNumber: 1,
          // 回调
          event: {
            success: this.upSuccess,
            delete: this.upDelete,
          }
        },
      }]
      this.itemProps[6] = [];
      // 热力合同
      if (val == 'value_added_services') {
        let list = [{
          types: "select",
          item: {
            prop: "addedServicesName",
            label: "关联增值服务",
            "label-width": "140px",
            size: "small",
          },
          el: {
            disabled: false,
            clearable: true,
            filterable: true,
            remote: true,
            "remote-method": this.getAddServices,
            placeholder: "",
          },
          on: {
            change: this.changeAddServices.bind(this)
          },
          options: []
        }]
        this.$set(this.itemProps,5,list);
        this.$set(this.itemProps,6,upload);
      } else if (val == 'thermal_contract') {
        let list2 = [
          {
            types: "doubleInput",
            type: "text",
            item: {
              prop: "steamPressureLower",
              label: "蒸汽压力",
              "label-width": "140px",
              rules: [
                { pattern: /^(\-|\+)?\d+(\.\d+)?$/, message: '请输入数值类型', trigger: 'blur' }
              ],
            },
            el: {
              disabled: false,
              clearable: false,
              style: "width:35%",
              placeholder: "请输入",
            },
            textInfo: {
              // style: "position:absolute;right:0;"
            },
            text: "Mpa",
            douInput: {
              type: "text",
              item: {
                prop: "steamPressureUpper",
                label: "",
                "label-width": "1px",
                rules: [
                  { pattern: /^(\-|\+)?\d+(\.\d+)?$/, message: '请输入数值类型', trigger: 'blur' }
                ],
              },
              el: {
                disabled: false,
                clearable: false,
                style: "width:50%",
                placeholder: "请输入",
              },
              on: {
                // change: this.unitCodeChangeFirst.bind(this),
              },
              textInfo: {
                style: "position:absolute;right:35%;top:1px;"
              },
              text: "Mpa",
            }
          },
          {
            types: "input",
            type: "text",
            item: {
              prop: "enthalpyOfSteamStability",
              label: "蒸汽稳定约定焓值",
              "label-width": "140px",
              size: "small",
            },
            el: {
              clearable: true,
              disabled: false,
              placeholder: "输入值",
              style: "width:85%",
            },
            text: "kJ/kg",
            textInfo: {
              style: "position:absolute;right:0;"
            },
          }
        ];
        this.$set(this.itemProps,5,list2);
        this.$set(this.itemProps,6,upload);

      } else {
        this.$set(this.itemProps,5,[]);
        this.$set(this.itemProps,6,upload);

      }
    }
  }
};

export default fm;
