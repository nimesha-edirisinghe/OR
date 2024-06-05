import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ForecastConfigTableAction } from 'components/AppTable/TableDataMapping/ForecastingConfigTable';
import { OtherConfigCheckBoxName } from 'pages/AdvancedConfiguration/ForecastConfiguration/TrainingConfigurationDrawer/OtherTab/OtherTab';
import {
  AnchorPredictorConfigI,
  FCEstimatedTimeI,
  FCSKUPredictorI,
  ModelSelectionCriteria,
  TableDataI,
  TrainingConfigI,
  TrainingConfigLocalI,
  TrainingConfigPredictorsI
} from 'types/forecastConfig';
import {
  _getForecastConfigDataSuccess,
  _resetTrainingConfigurations,
  _updateTreeSelection
} from './stateHelpers/stH_TrainingConfigDrawer';
import { IRootState } from 'state/rootState';

export interface IPage {
  title: string;
  subTitle: string;
  tableData?: TableDataI[] | null;
  totalRecordsCount?: number;
  selectedRow?: TableDataI | null;
  selectedRowId: string;
  isLoading: boolean;
  estimatedTime: FCEstimatedTimeI;
  trainingConfigLocalScope: TrainingConfigLocalI;
  trainingConfigData: TrainingConfigI;
  influencingFactorsConfig: {
    anchorForecastPredictorsConfig: AnchorPredictorConfigI[] | [];
    sKUPredictorsConfig: FCSKUPredictorI[] | [];
  };
}

type PredictorActionType = 'sort' | 'check' | 'direction';

export const PageSlice = createSlice({
  name: 'fcConfigPage',
  initialState: {
    title: '',
    subTitle: '',
    tableData: [{}],
    totalRecordsCount: 0,
    selectedRow: null,
    selectedRowId: '',
    isLoading: false,
    trainingConfigData: {},
    estimatedTime: {},
    trainingConfigLocalScope: {
      trainingConfigurationDrawer: false,
      influencingFactorDrawer: false,
      runNowDrawer: false,
      jobScheduleDrawer: false,
      exemptionPeriodsCheckboxChecked: false,
      checkAllPredictionsCheckBoxChecked: false,
      trainModelFromCheckBoxChecked: false,
      selectedFcConfigObj: {},
      currentPageNo: 1
    },
    influencingFactorsConfig: {
      anchorForecastPredictorsConfig: [],
      sKUPredictorsConfig: []
    }
  } as IPage,
  reducers: {
    getTableDataRequest: (state, action) => {
      try {
        state.isLoading = true;
      } catch (error) {
        console.error('collapsibleMenuToggler ', error);
      }
    },
    getTableDataSuccess: (state, action) => {
      try {
        state.isLoading = false;
        state.tableData = action.payload.data;
        state.tableData?.map((group) => {
          return (group.groupDetails.groupDisplayName = `${group.groupDetails.groupKey} - ${group.groupDetails.groupName}`);
        });
        state.totalRecordsCount = action.payload.page ? action.payload.page.total : null;
      } catch (error) {
        console.error('collapsibleMenuToggler ', error);
      }
    },
    getTableDataFailure: (state) => {
      state.isLoading = false;
    },
    tableCellAction: (
      state,
      action: {
        payload: { actionType: ForecastConfigTableAction; rawId: string };
      }
    ) => {
      const _action = action.payload.actionType;
      switch (_action) {
        case 'openTrainingConfigDrawer':
          state.trainingConfigLocalScope.trainingConfigurationDrawer = true;
          break;
        case 'openInfluencingFactorDrawer':
          state.trainingConfigLocalScope.influencingFactorDrawer = true;
          break;
        case 'openRunNowDrawer':
          state.trainingConfigLocalScope.runNowDrawer = true;
          break;
        case 'openJobScheduleDrawer':
          state.trainingConfigLocalScope.jobScheduleDrawer = true;
          break;
      }
      state.selectedRowId = action.payload.rawId;
      const _selectedRowObj = state.tableData?.find((row) => row.uuid === action.payload.rawId);
      state.trainingConfigLocalScope.selectedFcConfigObj = _selectedRowObj!;
    },
    closeDrawer: (state) => {
      state.trainingConfigLocalScope.trainingConfigurationDrawer = false;
      state.trainingConfigLocalScope.influencingFactorDrawer = false;
      state.trainingConfigLocalScope.runNowDrawer = false;
      state.trainingConfigLocalScope.jobScheduleDrawer = false;
    },
    getForecastConfigDataRequest: (state, action) => {
      try {
        state.isLoading = true;
      } catch (error) {
        console.error('get forecast config request ', error);
      }
    },
    getForecastConfigDataSuccess: _getForecastConfigDataSuccess,
    getForecastConfigDataFailure: (state) => {
      state.isLoading = false;
    },
    updateTreeSelection: (state, action) => {
      _updateTreeSelection(state, action);
    },
    toggleExemptionCheckBox: (state, action: { payload: boolean }) => {
      state.trainingConfigLocalScope.exemptionPeriodsCheckboxChecked = action.payload;
    },
    addNewExemptionPeriod: (state) => {
      state.trainingConfigData.algorithmSettings.advanced_configurations.exemption_periods.push({
        start_date: '',
        end_date: ''
      });
    },
    removeExemptionPeriod: (state, action: { payload: number }) => {
      state.trainingConfigData.algorithmSettings.advanced_configurations.exemption_periods.splice(
        action.payload,
        1
      );
    },
    updateExemptionPeriod: (
      state,
      action: {
        payload: {
          field: 'start_date' | 'end_date';
          index: number;
          value: string;
        };
      }
    ) => {
      const exemptionPeriod =
        state.trainingConfigData.algorithmSettings.advanced_configurations.exemption_periods.at(
          action.payload.index
        )!;
      exemptionPeriod[action.payload.field] = action.payload.value;
    },

    addNewPenalizedError: (state) => {
      const matrix = state.trainingConfigData.algorithmSettings.penalized_error.weight_matrix;
      const lastPenalizedError = matrix[matrix.length - 1];

      if (lastPenalizedError.lower_limit === '' || lastPenalizedError.upper_limit === '') {
        return;
      }

      if (lastPenalizedError.upper_limit === 'inf') {
        lastPenalizedError.upper_limit = '';
      }

      matrix.push({
        lower_limit: lastPenalizedError.upper_limit,
        upper_limit: 'inf',
        penalty: ''
      });
    },
    removePenalizedError: (state, action: { payload: number }) => {
      state.trainingConfigData.algorithmSettings.penalized_error.weight_matrix.splice(
        action.payload,
        1
      );
      state.trainingConfigData.algorithmSettings.penalized_error.weight_matrix[0].lower_limit =
        '-inf';
    },
    updatePenalizedError: (
      state,
      action: {
        payload: {
          field: 'lower_limit' | 'upper_limit' | 'penalty';
          index: number;
          value: string;
        };
      }
    ) => {
      const matrix = state.trainingConfigData.algorithmSettings.penalized_error.weight_matrix;
      const index = action.payload.index;
      const value = action.payload.value;
      const penalizedError = matrix.at(action.payload.index)!;

      penalizedError[action.payload.field] = value;

      if (action.payload.field === 'lower_limit') {
        if (index > 0) {
          matrix[index - 1].upper_limit = value;
        }
      }

      if (action.payload.field === 'upper_limit') {
        if (matrix.length > index + 1) {
          matrix[index + 1].lower_limit = value;
        }
      }
    },
    saveTrainingConfigSettingsRequest: {
      reducer: (
        state,
        action: PayloadAction<{
          isDefault: boolean;
        }>
      ) => {
        state.isLoading = true;
      },
      prepare: (isDefault: boolean) => {
        return {
          payload: {
            isDefault
          }
        };
      }
    },
    saveTrainingConfigSettingsFailure: (state, action) => {
      state.isLoading = false;
    },
    saveTrainingConfigSettingsSuccess: (state, action) => {
      state.isLoading = false;
    },

    toggleOtherConfigurationCheckBox: (
      state,
      action: { payload: { algo: OtherConfigCheckBoxName } }
    ) => {
      //@ts-ignore
      state.trainingConfigData.algorithmSettings.advanced_configurations[action.payload.algo] =
        //@ts-ignore
        !state.trainingConfigData.algorithmSettings.advanced_configurations[action.payload.algo];
    },
    changeModelSelectionCriteria: (state, action: { payload: ModelSelectionCriteria }) => {
      state.trainingConfigData.algorithmSettings.advanced_configurations.model_selection_criteria =
        action.payload;
    },
    toggleTrainModelFromCheckBox: (state) => {
      state.trainingConfigLocalScope.trainModelFromCheckBoxChecked =
        !state.trainingConfigLocalScope.trainModelFromCheckBoxChecked;
    },
    updateTrainModelFrom: (state, action) => {
      state.trainingConfigData.algorithmSettings.start_date = action.payload;
    },
    updatePredictors: (
      state,
      action: {
        payload: { actionType: PredictorActionType; data: {}; index: number };
      }
    ) => {
      const predictor = state.trainingConfigData.predictors.at(action.payload.index)!;
      switch (action.payload.actionType) {
        case 'check':
          if (predictor.isActive) {
            state.trainingConfigLocalScope.checkAllPredictionsCheckBoxChecked = false;
          }
          predictor.isActive = !!predictor.isActive ? 0 : 1;
          break;
        case 'direction':
          predictor.direction = action.payload.data as TrainingConfigPredictorsI['direction'];
          break;
      }
    },
    reOrderPredictorList: (state, action: { payload: TrainingConfigPredictorsI[] }) => {
      let _predictors: TrainingConfigPredictorsI[] = [];
      action.payload.map((predictor, key) => {
        _predictors.push({ ...predictor, predictorRank: key + 1 });
      });
      state.trainingConfigData.predictors = _predictors;
    },
    checkAllPredictionsToggle: (state) => {
      const toggledValue = !state.trainingConfigLocalScope.checkAllPredictionsCheckBoxChecked;
      state.trainingConfigData.predictors.map((predictor) => {
        predictor.isActive = toggledValue ? 1 : 0;
      });
      state.trainingConfigLocalScope.checkAllPredictionsCheckBoxChecked = toggledValue;
    },
    resetTrainingConfigurations: (state) => {
      _resetTrainingConfigurations(state);
    },
    getAnchorPredictorsConfig: (state, action) => {
      state.influencingFactorsConfig.anchorForecastPredictorsConfig = [];
      state.isLoading = true;
    },
    getAnchorPredictorsConfigSuccess: (state, action: { payload: AnchorPredictorConfigI[] }) => {
      try {
        state.influencingFactorsConfig.anchorForecastPredictorsConfig = action.payload.map(
          (anchor) => {
            anchor.config_type = anchor.config_type === null ? 'From database' : anchor.config_type;
            return anchor;
          }
        );
      } catch (error) {
        console.error('getAnchorPredictorsConfigSuccess ', error);
      }
    },
    getAnchorPredictorsConfigFailure: (state, action) => {
      state.isLoading = false;
    },
    getSKUPredictorRequest: (state, action) => {
      try {
        state.isLoading = true;
      } catch (error) {
        console.error('getSKUPredictorRequest ', error);
      }
    },
    getSKUPredictorSuccess: (state, action: { payload: FCSKUPredictorI[] }) => {
      try {
        state.isLoading = false;
        state.influencingFactorsConfig.sKUPredictorsConfig = action.payload.map((sku) => {
          sku.configType = sku.configType === null ? 'From database' : sku.configType;
          return sku;
        });
      } catch (error) {
        console.error('getSKUPredictorSuccess ', error);
      }
    },
    getSKUPredictorFailure: (state) => {
      state.isLoading = false;
    },
    updateAnchorPredictorsConfig: (
      state,
      action: {
        payload: {
          field: 'config_type' | 'predictor_value';
          index: number;
          value: string | number;
        };
      }
    ) => {
      try {
        const config = state.influencingFactorsConfig.anchorForecastPredictorsConfig.at(
          action.payload.index
        )!;
        switch (action.payload.field) {
          case 'config_type':
            config[action.payload.field] = action.payload
              .value as AnchorPredictorConfigI['config_type'];
            config.predictor_value = 0;
            break;
          case 'predictor_value':
            config[action.payload.field] = action.payload
              .value as AnchorPredictorConfigI['predictor_value'];
            break;
        }
      } catch (e) {
        console.error('updateAnchorPredictorsConfig ', e);
      }
    },
    updateSKUPredictorsConfig: (
      state,
      action: {
        payload: {
          field: 'configType' | 'predictorValue';
          index: number;
          value: string | number;
        };
      }
    ) => {
      try {
        const config = state.influencingFactorsConfig.sKUPredictorsConfig.at(action.payload.index)!;
        switch (action.payload.field) {
          case 'configType':
            config[action.payload.field] = action.payload.value as FCSKUPredictorI['configType'];
            config.predictorValue = 0;
            break;
          case 'predictorValue':
            config[action.payload.field] = action.payload
              .value as FCSKUPredictorI['predictorValue'];
            break;
        }
      } catch (e) {
        console.error('updateAnchorPredictorsConfig ', e);
      }
    },

    saveAnchorPredictorsRequest: (state) => {
      state.isLoading = true;
    },
    saveAnchorPredictorsSuccess: (state, action) => {
      state.isLoading = false;
    },
    saveAnchorPredictorsFailure: (state) => {
      state.isLoading = false;
    },
    saveSKUPredictorsRequest: (state) => {
      state.isLoading = true;
    },
    saveSKUPredictorsSuccess: (state, action) => {
      state.isLoading = false;
    },
    saveSKUPredictorsFailure: (state) => {
      state.isLoading = false;
    },
    executeRunNowRequest: {
      reducer: (
        state,
        action: PayloadAction<{
          isSelectedTraining: boolean;
          isSelectedForecasting: boolean;
        }>
      ) => {
        state.isLoading = false;
      },
      prepare: (isSelectedTraining: boolean, isSelectedForecasting: boolean) => {
        return {
          payload: {
            isSelectedTraining,
            isSelectedForecasting
          }
        };
      }
    },
    executeRunNowSuccess: (state, action) => {
      state.isLoading = false;
    },
    executeRunNowFailure: (state) => {
      state.isLoading = false;
    },
    getEstimatedTimeRequest: {
      reducer: (
        state,
        action: PayloadAction<{
          isSelectedTraining: boolean;
          isSelectedForecasting: boolean;
        }>
      ) => {
        state.isLoading = false;
      },
      prepare: (isSelectedTraining: boolean, isSelectedForecasting: boolean) => {
        return {
          payload: {
            isSelectedTraining,
            isSelectedForecasting
          }
        };
      }
    },
    getEstimatedTimeSuccess: (state, action) => {
      state.estimatedTime = action.payload.data;
    },
    getEstimatedTimeFailure: (state) => {
      state.isLoading = false;
    },
    setFcConfigCurrentPage: (state, action: PayloadAction<number>) => {
      state.trainingConfigLocalScope.currentPageNo = action.payload;
    }
  },
  extraReducers: {
    getUserFetch: (state, action) => {
      // state.someValue += action.payload
    }
  }
});

export const fcConfigPageSliceSelector = (state: IRootState) => state.fcConfigPage;

export const {
  getTableDataRequest,
  getTableDataSuccess,
  tableCellAction,
  closeDrawer,
  getForecastConfigDataRequest,
  getForecastConfigDataSuccess,
  getForecastConfigDataFailure,
  updateTreeSelection,
  addNewExemptionPeriod,
  removeExemptionPeriod,
  toggleExemptionCheckBox,
  updateExemptionPeriod,
  addNewPenalizedError,
  removePenalizedError,
  updatePenalizedError,
  toggleOtherConfigurationCheckBox,
  saveTrainingConfigSettingsRequest,
  saveTrainingConfigSettingsFailure,
  saveTrainingConfigSettingsSuccess,
  changeModelSelectionCriteria,
  updateTrainModelFrom,
  updatePredictors,
  checkAllPredictionsToggle,
  reOrderPredictorList,
  resetTrainingConfigurations,
  getAnchorPredictorsConfig,
  getAnchorPredictorsConfigSuccess,
  getAnchorPredictorsConfigFailure,
  getSKUPredictorRequest,
  getSKUPredictorSuccess,
  getSKUPredictorFailure,
  updateAnchorPredictorsConfig,
  updateSKUPredictorsConfig,
  saveAnchorPredictorsRequest,
  saveAnchorPredictorsSuccess,
  saveAnchorPredictorsFailure,
  saveSKUPredictorsRequest,
  saveSKUPredictorsSuccess,
  saveSKUPredictorsFailure,
  executeRunNowRequest,
  executeRunNowSuccess,
  executeRunNowFailure,
  getEstimatedTimeRequest,
  getEstimatedTimeSuccess,
  getEstimatedTimeFailure,
  toggleTrainModelFromCheckBox,
  setFcConfigCurrentPage
} = PageSlice.actions;

export default PageSlice.reducer;
