export const fcAnalyzerKpiAccuracyMockData = {
  status: 1,
  message: 'success',
  data: {
    overallAccuracy: {
      heading: '1 fast moving SKU location',
      value: '81%'
    },
    averageAccuracy: {
      heading: '1 fast moving SKU location',
      value: '81%'
    },
    averageDeviation: {
      heading: '0 slow moving SKU-location',
      value: '-'
    }
  }
};

export const individualGraphMockData = {
  status: 1,
  message: 'success',
  data: [
    {
      date: '2023-12-27',
      actual: 37,
      forecasted: 24.85,
      avgSales: 35,
      historicalMin: 0,
      historicalMax: 117
    },
    {
      date: '2024-01-03',
      actual: 12,
      forecasted: 5.15,
      avgSales: 17,
      historicalMin: 0,
      historicalMax: 117
    },
    {
      date: '2024-01-10',
      actual: 98,
      forecasted: 139,
      avgSales: 96,
      historicalMin: 0,
      historicalMax: 117
    },
    {
      date: '2024-01-17',
      actual: 14,
      forecasted: 7.58,
      avgSales: 19,
      historicalMin: 0,
      historicalMax: 117
    },
    {
      date: '2024-01-24',
      actual: 17,
      forecasted: 6.9,
      avgSales: 20,
      historicalMin: 0,
      historicalMax: 117
    },
    {
      date: '2024-01-31',
      actual: 23,
      forecasted: 15.6,
      avgSales: 16,
      historicalMin: 0,
      historicalMax: 117
    },
    {
      date: '2024-02-07',
      actual: 11,
      forecasted: 5.8,
      avgSales: 19,
      historicalMin: 0,
      historicalMax: 117
    },
    {
      date: '2024-02-14',
      actual: 27,
      forecasted: 14.84,
      avgSales: 44,
      historicalMin: 0,
      historicalMax: 117
    }
  ]
};

export const aggregatedGraphMockData = {
  status: 1,
  message: 'success',
  data: [
    {
      date: '2023-12-27',
      actual: 76,
      forecasted: 75
    },
    {
      date: '2024-01-03',
      actual: 90,
      forecasted: 67
    },
    {
      date: '2024-01-10',
      actual: 125,
      forecasted: 153
    },
    {
      date: '2024-01-17',
      actual: 93,
      forecasted: 75
    },
    {
      date: '2024-01-24',
      actual: 94,
      forecasted: 68
    },
    {
      date: '2024-01-31',
      actual: 59,
      forecasted: 62
    },
    {
      date: '2024-02-07',
      actual: 51,
      forecasted: 57
    },
    {
      date: '2024-02-14',
      actual: 92,
      forecasted: 62
    }
  ]
};

export const exclusionCriteriaMockData = {
  status: 1,
  message: 'success',
  data: [
    {
      name: 'Out of Stock',
      alerted: false,
      value: null
    },
    {
      name: 'Discount Diff. (Planned vs. Actual)',
      alerted: false,
      value: null
    },
    {
      name: 'Unprecedented Peaks & Drops',
      alerted: false,
      value: null
    },
    {
      name: 'New Product(s)',
      alerted: false,
      value: null
    },
    {
      name: 'Zero Sales',
      alerted: false,
      value: null
    }
  ]
};

export const plannedActualMockData = {
  status: 1,
  message: 'success',
  data: [
    {
      date: '2023-12-27',
      plannedDiscount: 18,
      actualDiscount: 15,
      outOfStockDays: '1/7'
    },
    {
      date: '2024-01-03',
      plannedDiscount: 3,
      actualDiscount: 0,
      outOfStockDays: '0/7'
    },
    {
      date: '2024-01-10',
      plannedDiscount: 36,
      actualDiscount: 36,
      outOfStockDays: '0/7'
    },
    {
      date: '2024-01-17',
      plannedDiscount: 0,
      actualDiscount: 0,
      outOfStockDays: '0/7'
    },
    {
      date: '2024-01-24',
      plannedDiscount: 0,
      actualDiscount: 0,
      outOfStockDays: '0/7'
    },
    {
      date: '2024-01-31',
      plannedDiscount: 10,
      actualDiscount: 14,
      outOfStockDays: '0/7'
    },
    {
      date: '2024-02-07',
      plannedDiscount: 0,
      actualDiscount: 0,
      outOfStockDays: '0/7'
    },
    {
      date: '2024-02-14',
      plannedDiscount: 16,
      actualDiscount: 12,
      outOfStockDays: '0/7'
    }
  ]
};

export const kpiMockData = {
  status: 1,
  message: 'success',
  data: {
    averageSales: 24,
    medianSales: 25,
    minHistoricalDiscount: 0,
    maxHistoricalDiscount: 41,
    dataLength: 155,
    totalSku: 34,
    totalOutOfStockSku: 3,
    totalSkuWithDiscount: 7,
    newSku: 0,
    frequency: 'weeks'
  }
};

export const skuMockData = {
  status: 1,
  message: 'success',
  data: {
    sku: 'Grocery Salt_Oil_Extra Virgin Olive Oil_BAYTOUTI OLIVE OIL 1L',
    store: 'Midtown Hypermarket',
    department: 'Grocery Salt',
    anchor: 'Grocery Salt_Oil_Extra Virgin Olive Oil',
    validationPeriod: '2023-12-27 to 2024-02-14'
  }
};
export const distributionAccuracyMockData = {
  status: 1,
  message: 'success',
  data: { high: 1, average: 0, low: 0 }
};
