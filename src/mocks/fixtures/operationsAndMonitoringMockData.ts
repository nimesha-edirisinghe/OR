export const activityLogDataResponse = {
  status: 1,
  message: 'success',
  data: {
    totalCount: 9,
    list: [
      {
        jobGroupId: '104',
        groupKey: 15,
        groupName: 'Dev Test',
        anchorLocations: 0,
        skuLocations: 5,
        activity: 'inv_plan',
        execType: 'On-Request',
        startTime: 1694166789822,
        elapsedTime: 1694167102185,
        status: 'C',
        user: 'Nirojithan S'
      },
      {
        jobGroupId: '103',
        groupKey: 15,
        groupName: 'Dev Test',
        anchorLocations: 0,
        skuLocations: 5,
        activity: 'inv_plan',
        execType: 'On-Request',
        startTime: 1694164132625,
        elapsedTime: 1694164461186,
        status: 'C',
        user: 'Nirojithan S'
      },
      {
        jobGroupId: '101',
        groupKey: 15,
        groupName: 'Dev Test',
        anchorLocations: 0,
        skuLocations: 5,
        activity: 'inv_plan',
        execType: 'On-Request',
        startTime: 1693977610520,
        elapsedTime: 1693977946877,
        status: 'C',
        user: 'Nirojithan S'
      },
      {
        jobGroupId: '102',
        groupKey: 15,
        groupName: 'Dev Test',
        anchorLocations: 2,
        skuLocations: 5,
        activity: 'training',
        execType: 'On-Request',
        startTime: 1693977610497,
        elapsedTime: null,
        status: 'P',
        user: 'Ajay K'
      },
      {
        jobGroupId: '100',
        groupKey: 15,
        groupName: 'Dev Test',
        anchorLocations: 2,
        skuLocations: 5,
        activity: 'training_forecasting',
        execType: 'On-Request',
        startTime: 1693890706723,
        elapsedTime: 1693891812661,
        status: 'C',
        user: 'Nimesha Edirisinghe'
      },
      {
        jobGroupId: '99',
        groupKey: 18,
        groupName: 'Warehouse group (WH) Dev Test Dev TE',
        anchorLocations: 0,
        skuLocations: 2114,
        activity: 'wh_forecast',
        execType: 'On-Request',
        startTime: 1693888148105,
        elapsedTime: null,
        status: 'P',
        user: 'Nirojithan S'
      },
      {
        jobGroupId: '98',
        groupKey: 15,
        groupName: 'Dev Test',
        anchorLocations: 2,
        skuLocations: 5,
        activity: 'forecasting',
        execType: 'On-Request',
        startTime: 1693887847965,
        elapsedTime: 1693888101955,
        status: 'C',
        user: 'Nirojithan S'
      },
      {
        jobGroupId: '97',
        groupKey: 15,
        groupName: 'Dev Test',
        anchorLocations: 0,
        skuLocations: 5,
        activity: 'inv_plan',
        execType: 'On-Request',
        startTime: 1693887338151,
        elapsedTime: 1693887708367,
        status: 'C',
        user: 'Nirojithan S'
      },
      {
        jobGroupId: '96',
        groupKey: 15,
        groupName: 'Dev Test',
        anchorLocations: 2,
        skuLocations: 5,
        activity: 'training',
        execType: 'On-Request',
        startTime: 1693886887456,
        elapsedTime: 1693887672632,
        status: 'C',
        user: 'Nirojithan S'
      }
    ]
  }
};

export const activityLogFilterCountResponse = {
  status: 1,
  message: 'success',
  data: {
    activity: 4,
    execType: 2,
    user: 114,
    status: 4,
    group: 3
  }
};

export const activityLogFilterDataResponse = {
  status: 1,
  message: 'success',
  data: {
    totalCount: 3,
    list: [
      {
        key: '15',
        value: 'Dev Test'
      },
      {
        key: '13',
        value: 'DF_Train_All_Alothaim'
      },
      {
        key: '18',
        value: 'Warehouse group'
      }
    ]
  }
};

export const activityLogStatusSummary = {
  status: 1,
  message: 'success',
  data: {
    jobGroupId: 205,
    groupKey: 13,
    orgKey: 1,
    details: [
      {
        jobKey: 679,
        jobType: 'inv_plan',
        jobTypeDesc: 'Replenishment Planning',
        executionLevel: 'sku',
        status: 'C',
        anchorLocations: 0,
        skuLocations: 511413,
        totalCount: null,
        successCount: 2000,
        failureCount: 1000
      }
    ]
  }
};
