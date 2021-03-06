// 集中竞价，挂牌交易，双边协
// 省内直接交易、跨省交易、发电权交易

// 复式撮合 = 双边协商
// 集中撮合 = 集中竞价
// 扩需增发专场交易只有双边协商和集中竞价有
// 单边竞价和跨省跨区交易--的集中竞价

const transactions_variety_fd = {
  jypz01: {
    propCode: 'jypz01',
    propName: '省内直接交易',

    // propName: '双边协商',
    jyfs01: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'fdOrgName',
        'tradingUnitName',
        'tradingUser',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },

    // propName: '集中竞价',
    jyfs02: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'fdOrgName',
        'tradingUnitName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },

    // propName: '挂牌',
    jyfs03: {
      confirm: true,
      headKv: {
        'declarationElectricity': "意向挂牌电量",
        'declarationElectricityPrices': "意向挂牌电价",
      },
      head: [
        'fdOrgName',
        'tradingUnitName',
        'customerName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },

    // propName: '复式撮合',
    jyfs04: {
      confirm: true,
      headKv: {
        'quotationPeriodName': '报价阶段',
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'fdOrgName',
        'tradingUnitName',
        'quotationPeriodName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中撮合',
    jyfs05: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'fdOrgName',
        'tradingUnitName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '单边竞价',
    jyfs06: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'fdOrgName',
        'tradingUnitName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },

  },

  jypz02: {
    propCode: 'jypz02',
    propName: '跨省跨区交易',

    // propName: '双边协商',
    jyfs01: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'fdOrgName',
        'tradingUnitName',
        'transactionLineName',
        'tradingUser',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中竞价',
    jyfs02: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'fdOrgName',
        'tradingUnitName',
        'transactionLineName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },

    // propName: '挂牌',
    jyfs03: {
      confirm: true,
      headKv: {
        declarationElectricity: '意向挂牌电量',
        declarationElectricityPrices: '意向挂牌电价'
      },
      head: [
        'fdOrgName',
        'tradingUnitName',
        'transactionLineName',
        'customerName',
        'transactionLineName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },

    // propName: '复式撮合',
    jyfs04: {
      confirm: true,
      headKv: {
        quotationPeriodName: '报价阶段',
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'fdOrgName',
        'tradingUnitName',
        'transactionLineName',
        'quotationPeriodName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中撮合',
    jyfs05: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'fdOrgName',
        'tradingUnitName',
        'transactionLineName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '单边竞价',
    jyfs06: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'fdOrgName',
        'tradingUnitName',
        'transactionLineName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
  },

  jypz03: {
    propCode: 'jypz03',
    propName: '发电权转让交易',
    // propName: '双边协商',
    jyfs01: {
      confirm: true,
      headKv: {
        'sellTransfereeOrgName': "出/受让发电企业",
        'sellTransfereeUnit': "出/受让机组",
        'eleEnterpriseName': "用电企业",
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'sellTransfereeOrgName',
        'sellTransfereeUnit',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中竞价',
    jyfs02: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'quotationStallName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '挂牌',
    jyfs03: {
      confirm: true,
      headKv: {
        declarationElectricity: '意向挂牌电量',
        declarationElectricityPrices: '意向挂牌电价'
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '复式撮合',
    jyfs04: {
      confirm: false,
      headKv: {
        fdOrgName: '发电企业',
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'sellTransfereeOrgName',
        'sellTransfereeUnit',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中撮合',
    jyfs05: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'quotationStallName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '单边竞价',
    jyfs06: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
  },

  // 跨省替代交易 false
  jypz13: {
    propCode: 'jypz13',
    propName: '跨省替代交易',
    confirm: false,
    // propName: '双边协商',
    jyfs01: {
      confirm: false,
      headKv: {
        'sellTransfereeOrgName': "出/受让发电企业",
        'sellTransfereeUnit': "出/受让机组",
        'eleEnterpriseName': "用电企业",
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中竞价',
    jyfs02: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '挂牌',
    jyfs03: {
      confirm: false,
      headKv: {
        declarationElectricity: '挂牌电量',
        declarationElectricityPrices: '挂牌电价'
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '复式撮合',
    jyfs04: {
      confirm: false,
      headKv: {
        fdOrgName: '发电企业',
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'sellTransfereeOrgName',
        'sellTransfereeUnit',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中撮合',
    jyfs05: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '单边竞价',
    jyfs06: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
  },
  // 售电合同转让交易 false
  jypz09: {
    propCode: 'jypz09',
    propName: '售电合同转让交易',
    confirm: false,
    // propName: '集中竞价',
    jyfs02: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '挂牌',
    jyfs03: {
      confirm: false,
      headKv: {
        declarationElectricity: '挂牌电量',
        declarationElectricityPrices: '挂牌电价'
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '复式撮合',
    jyfs04: {
      confirm: false,
      headKv: {
        fdOrgName: '发电企业',
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'sellTransfereeOrgName',
        'sellTransfereeUnit',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中撮合',
    jyfs05: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '单边竞价',
    jyfs06: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
  },
  // 省内替代交易 false
  jypz12: {
    propCode: 'jypz12',
    propName: '省内替代交易',
    confirm: false,
    // propName: '集中竞价',
    jyfs02: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '挂牌',
    jyfs03: {
      confirm: false,
      headKv: {
        declarationElectricity: '挂牌电量',
        declarationElectricityPrices: '挂牌电价'
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '复式撮合',
    jyfs04: {
      confirm: false,
      headKv: {
        fdOrgName: '发电企业',
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'sellTransfereeOrgName',
        'sellTransfereeUnit',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中撮合',
    jyfs05: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '单边竞价',
    jyfs06: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
  },
  // 扩需增发专场交易 1 false
  jypz10: {
    propCode: 'jypz10',
    propName: '扩需增发专场交易',
    // propName: '双边协商',
    jyfs01: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'fdOrgName',
        'tradingUnitName',
        'tradingUser',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中竞价',
    jyfs02: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'fdOrgName',
        'tradingUnitName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '挂牌',
    jyfs03: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'fdOrgName',
        'tradingUnitName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '复式撮合',
    jyfs04: {
      confirm: false,
      headKv: {
        fdOrgName: '发电企业',
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'sellTransfereeOrgName',
        'sellTransfereeUnit',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中撮合',
    jyfs05: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'fdOrgName',
        'tradingUnitName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '单边竞价',
    jyfs06: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'fdOrgName',
        'tradingUnitName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
  },

}
// 售电侧
const transactions_variety_sd = {
  jypz01: {
    propCode: 'jypz01',
    propName: '省内直接交易',

    // propName: '双边协商',
    jyfs01: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'sdOrgName',
        'tradingUnitName',
        'tradingUser',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },

    // propName: '集中竞价',
    jyfs02: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'sdOrgName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },

    // propName: '挂牌',
    jyfs03: {
      confirm: true,
      headKv: {
        'declarationElectricity': '挂牌电量',
        'declarationElectricityPrices': '挂牌电价',
      },
      head: [
        'sdOrgName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },

    // propName: '复式撮合',
    jyfs04: {
      confirm: true,
      headKv: {
        quotationPeriodName: '报价阶段',
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'sdOrgName',
        'quotationPeriodName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中撮合',
    jyfs05: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'sdOrgName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '单边竞价',
    jyfs06: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'sdOrgName',
        'tradingUnitName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },

  },

  jypz02: {
    propCode: 'jypz02',
    propName: '跨省跨区交易',

    // propName: '双边协商',
    jyfs01: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'sdOrgName',
        'tradingUnitName',
        'transactionLineName',
        'tradingUser',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中竞价',
    jyfs02: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'sdOrgName',
        'transactionLineName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },

    // propName: '挂牌',
    jyfs03: {
      confirm: true,
      headKv: {
        declarationElectricity: '挂牌电量',
        declarationElectricityPrices: '挂牌电价'
      },
      head: [
        'sdOrgName',
        'transactionLineName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },

    // propName: '复式撮合',
    jyfs04: {
      confirm: true,
      headKv: {
        quotationPeriodName: '报价阶段',
        declarationElectricity: "申报电量",
        declarationElectricityPrices: "申报电价",
      },
      head: [
        'sdOrgName',
        'transactionLineName',
        'quotationPeriodName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中撮合',
    jyfs05: {
      confirm: true,
      headKv: {
        declarationElectricity: "申报电量",
        declarationElectricityPrices: "申报电价",
      },
      head: [
        'sdOrgName',
        'transactionLineName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '单边竞价',
    jyfs06: {
      confirm: true,
      headKv: {
        declarationElectricity: "申报电量",
        declarationElectricityPrices: "申报电价",
      },
      head: [
        'sdOrgName',
        'transactionLineName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
  },

  jypz03: {
    propCode: 'jypz03',
    propName: '发电权转让交易',
    // propName: '双边协商',
    jyfs01: {
      confirm: true,
      headKv: {
        'sellTransfereeOrgName': "出/受让发电企业",
        'sellTransfereeUnit': "出/受让机组",
        'eleEnterpriseName': "用电企业",
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'sdOrgName',
        'unit',
        'tradingProductName',
        'sellTransfereeOrgName',
        'sellTransfereeUnit',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中竞价',
    jyfs02: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'fdOrgName',
        'unit',
        'tradingProductName',
        'quotationStallName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '挂牌',
    jyfs03: {
      confirm: true,
      headKv: {
        declarationElectricity: '挂牌电量',
        declarationElectricityPrices: '挂牌电价'
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'sdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '复式撮合',
    jyfs04: {
      confirm: false,
      headKv: {
        sdOrgName: '发电企业',
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'sdOrgName',
        'unit',
        'tradingProductName',
        'sellTransfereeOrgName',
        'sellTransfereeUnit',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中撮合',
    jyfs05: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'sdOrgName',
        'unit',
        'tradingProductName',
        'quotationStallName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '单边竞价',
    jyfs06: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'sdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
  },

  // 跨省替代交易 false
  jypz13: {
    propCode: 'jypz13',
    propName: '跨省替代交易',
    confirm: false,
    // propName: '双边协商',
    jyfs01: {
      confirm: false,
      headKv: {
        'sellTransfereeOrgName': "出/受让发电企业",
        'sellTransfereeUnit': "出/受让机组",
        'eleEnterpriseName': "用电企业",
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中竞价',
    jyfs02: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '挂牌',
    jyfs03: {
      confirm: false,
      headKv: {
        declarationElectricity: '挂牌电量',
        declarationElectricityPrices: '挂牌电价'
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'sdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '复式撮合',
    jyfs04: {
      confirm: false,
      headKv: {
        sdOrgName: '发电企业',
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',

      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'sdOrgName',
        'unit',
        'tradingProductName',
        'sellTransfereeOrgName',
        'sellTransfereeUnit',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中撮合',
    jyfs05: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'sdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '单边竞价',
    jyfs06: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'sdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
  },
  // 售电合同转让交易 false
  jypz09: {
    propCode: 'jypz09',
    propName: '售电合同转让交易',
    confirm: false,
    // propName: '集中竞价',
    jyfs02: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingTypeName',
        'sdOrgName',
        'contractCode',
        'contractName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '挂牌',
    jyfs03: {
      confirm: false,
      headKv: {
        declarationElectricity: '挂牌电量',
        declarationElectricityPrices: '挂牌电价'
      },
      head: [
        'tradingTypeName',
        'sdOrgName',
        'contractCode',
        'contractName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '复式撮合',
    jyfs04: {
      confirm: false,
      headKv: {
        sdOrgName: '发电企业',
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',

      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'sdOrgName',
        'unit',
        'tradingProductName',
        'sellTransfereeOrgName',
        'sellTransfereeUnit',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中撮合',
    jyfs05: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'sdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '单边竞价',
    jyfs06: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'sdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
  },
  // 省内替代交易 false
  jypz12: {
    propCode: 'jypz12',
    propName: '省内替代交易',
    confirm: false,
    // propName: '集中竞价',
    jyfs02: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '挂牌',
    jyfs03: {
      confirm: false,
      headKv: {
        declarationElectricity: '挂牌电量',
        declarationElectricityPrices: '挂牌电价'
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'sdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '复式撮合',
    jyfs04: {
      confirm: false,
      headKv: {
        sdOrgName: '发电企业',
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'sdOrgName',
        'unit',
        'tradingProductName',
        'sellTransfereeOrgName',
        'sellTransfereeUnit',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中撮合',
    jyfs05: {
      confirm: false,
      headKv: {},
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'sdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '单边竞价',
    jyfs06: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'sdOrgName',
        'unit',
        'tradingProductName',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
  },
  // 扩需增发专场交易 1 false
  jypz10: {
    propCode: 'jypz10',
    propName: '扩需增发专场交易',
    // propName: '双边协商',
    jyfs01: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'sdOrgName',
        'tradingUnitName',
        'tradingUser',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中竞价',
    jyfs02: {
      confirm: true,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'sdOrgName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '挂牌',
    jyfs03: {
      confirm: false,
      headKv: {},
      head: [
        'sdOrgName',
        'tradingUnitName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '复式撮合',
    jyfs04: {
      confirm: false,
      headKv: {
        sdOrgName: '发电企业',
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'tradingClassificationName',
        'tradingTypeName',
        'sdOrgName',
        'unit',
        'tradingProductName',
        'sellTransfereeOrgName',
        'sellTransfereeUnit',
        'eleEnterpriseName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '集中撮合',
    jyfs05: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'sdOrgName',
        'tradingUnitName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
    // propName: '单边竞价',
    jyfs06: {
      confirm: false,
      headKv: {
        declarationElectricity: '申报电量',
        declarationElectricityPrices: '申报电价',
      },
      head: [
        'sdOrgName',
        'tradingUnitName',
        'quotationStallName',
        'declarationElectricity',
        'declarationElectricityPrices',
        'schemeDesc',
      ],
    },
  },

}

export default {
  transactionsVarietyfd: transactions_variety_fd,
  transactionsVarietysd: transactions_variety_sd,
}
