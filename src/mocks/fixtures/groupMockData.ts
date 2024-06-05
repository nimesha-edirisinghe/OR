export const groupDefinition = {
  status: 1,
  message: 'success',
  data: {
    filters: [
      {
        type: 'product',
        code: 1,
        isSelectAll: false,
        selectedItems: ['311']
      },
      {
        type: 'anchor',
        code: 2,
        isSelectAll: false,
        selectedItems: ['16214']
      }
    ],
    predictorConfiguration: [
      {
        predictorCode: 1,
        predictorName: 'ramadan_days',
        isAnchor: true,
        isSku: false
      },
      {
        predictorCode: 2,
        predictorName: 'eid_fitr_days',
        isAnchor: true,
        isSku: false
      },
      {
        predictorCode: 3,
        predictorName: 'eid_adha_days',
        isAnchor: true,
        isSku: false
      },
      {
        predictorCode: 4,
        predictorName: 'boolean_holiday_nat_day_ind',
        isAnchor: true,
        isSku: false
      },
      {
        predictorCode: 5,
        predictorName: 'pre_ramadan_days',
        isAnchor: true,
        isSku: false
      },
      {
        predictorCode: 6,
        predictorName: 'salary_days',
        isAnchor: true,
        isSku: false
      },
      {
        predictorCode: 7,
        predictorName: 'salary_fitr_eid',
        isAnchor: true,
        isSku: false
      },
      {
        predictorCode: 8,
        predictorName: 'salary_ramadan',
        isAnchor: true,
        isSku: false
      },
      {
        predictorCode: 9,
        predictorName: 'fitr_eid_ramdan',
        isAnchor: true,
        isSku: false
      },
      {
        predictorCode: 10,
        predictorName: 'discount percentage',
        isAnchor: true,
        isSku: false
      },
      {
        predictorCode: 11,
        predictorName: 'regular price',
        isAnchor: true,
        isSku: false
      },
      {
        predictorCode: 12,
        predictorName: 'boolean_promotions',
        isAnchor: true,
        isSku: false
      }
    ],
    groupName: 'FE test',
    frequencyType: 'WEEKLY',
    forecastHorizon: 12,
    anchorLocation: 1,
    skuLocation: 89,
    whFlag: 0
  }
};

export const groupList = {
  status: 1,
  message: 'success',
  data: {
    totalCount: 5,
    list: [
      {
        key: '15',
        value: 'Dev Test Group 1'
      },
      {
        key: '13',
        value: "Don't use"
      },
      {
        key: '83',
        value: 'Test group 1 Long Test With 40 Chars'
      },
      {
        key: '94',
        value: 'test group niro'
      },
      {
        key: '96',
        value: 'WH Count (WH)'
      }
    ]
  }
};
