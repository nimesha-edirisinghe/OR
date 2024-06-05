export interface GroupDefResponseI {
    filters: [
      {
        type: string;
        code: number;
        isSelectAll: boolean;
        selectedItems: string[];
      }
    ];
    predictorConfiguration: [
      {
        predictorCode: number;
        predictorName: string;
        isAnchor: boolean;
        isSku: boolean;
      }
    ];
    groupName: string;
    frequencyType: 'WEEKLY' | 'MONTHLY' | 'DAILY';
    forecastHorizon: number;
    anchorLocation: number;
    skuLocation: number;
    whFlag: 0 | 1;
  }