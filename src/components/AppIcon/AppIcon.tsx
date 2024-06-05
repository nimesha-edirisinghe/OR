import { IconProps } from '@chakra-ui/react';
import {
  ILogo,
  iconName,
  HDoubleArrowIcon,
  InsightIcon,
  MonitoringIcon,
  GroupIcon,
  ProductIcon,
  ChevIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SingleRightArrowIcon,
  CrossIcon,
  SingleLeftArrowIcon,
  BellIcon,
  QuestionCircleIcon,
  ProfileIcon,
  ForwardRightIcon,
  WarningToastIcon,
  WarningPromptIcon,
  ChevronUpIcon,
  PlusIcon,
  SearchIcon,
  RefreshIcon,
  FilterIcon,
  DownloadIcon,
  ChevronDownIcon,
  DropDownIcon,
  MoreOptionIcon,
  AnalyzerIcon,
  GridViewIcon,
  MaximizeIcon,
  CalenderIcon,
  UpArrowIcon,
  MinimizeIcon,
  CompassIcon,
  SendIcon,
  MayaLogoIcon,
  LogoutIcon,
  AdminIcon,
  MayaDiscoverIcon,
  InfoIcon,
  CopyIcon,
  LikeIcon,
  DislikeIcon,
  RightIcon,
  FilledLikeIcon,
  FilledDislikeIcon,
  TableViewIcon,
  EditIcon,
  FixIcon,
  IgnoreIcon,
  ReportIcon,
  UploadIcon,
  CsvFileIcon,
  InfoCircleIcon,
  EmptyLogoIcon,
  SettingIcon,
  CloseIcon,
  DashBracketIcon,
  WorkbenchIcon,
  DemandForecastIcon,
  ReplenishmentRecommendationIcon,
  StoreIcon,
  MenuSettingIcon,
  OrderReviewAndApprovalIcon,
  HomeIcon,
  TelescopeIcon,
  BaselineAutoGraphIcon,
  ModuleGroupIcon,
  PredictiveAlertIcon,
  RedirectIcon,
  AvatarIcon,
  AdminPortalIcon,
  SignOutIcon,
  WrenchIcon,
  PlayIcon,
  HistoryIcon,
  Collapse,
  ValidateIcon,
  CalenderWithDateIcon,
  Expand,
  ClockIcon,
  CircleIcon,
  MinusIcon,
  TrashIcon
} from './svgIcons';

interface AppIconProps extends IconProps {
  name: iconName;
}

export const AppIcon = ({ name, ...rest }: AppIconProps) => {
  switch (name) {
    case 'logo':
      return <ILogo {...rest} />;
    case 'logOut':
      return <LogoutIcon {...rest} />;
    case 'admin':
      return <AdminIcon {...rest} />;
    case 'hDoubleArrow':
      return <HDoubleArrowIcon {...rest} />;
    case 'insights':
      return <InsightIcon {...rest} />;
    case 'monitoringResolution':
      return <MonitoringIcon {...rest} />;
    case 'view':
      return <GroupIcon {...rest} />;
    case 'advancedConfig':
      return <ProductIcon {...rest} />;
    case 'chev':
      return <ChevIcon {...rest} />;
    case 'chevronLeft':
      return <ChevronLeftIcon {...rest} />;
    case 'chevronRight':
      return <ChevronRightIcon {...rest} />;
    case 'singleRightArrow':
      return <SingleRightArrowIcon {...rest} />;
    case 'bell':
      return <BellIcon {...rest} />;
    case 'questionCircle':
      return <QuestionCircleIcon {...rest} />;
    case 'profile':
      return <ProfileIcon {...rest} />;
    case 'forwardRight':
      return <ForwardRightIcon {...rest} />;
    case 'cross':
      return <CrossIcon {...rest} />;
    case 'singleLeftArrow':
      return <SingleLeftArrowIcon {...rest} />;
    case 'warning':
      return <WarningToastIcon {...rest} />;
    case 'warningPrompt':
      return <WarningPromptIcon {...rest} />;
    case 'chevronUp':
      return <ChevronUpIcon {...rest} />;
    case 'chevronDown':
      return <ChevronDownIcon {...rest} />;
    case 'plus':
      return <PlusIcon {...rest} />;
    case 'search':
      return <SearchIcon {...rest} />;
    case 'refresh':
      return <RefreshIcon {...rest} />;
    case 'filter':
      return <FilterIcon {...rest} />;
    case 'download':
      return <DownloadIcon {...rest} />;
    case 'dropdown':
      return <DropDownIcon {...rest} />;
    case 'moreOption':
      return <MoreOptionIcon {...rest} />;
    case 'analyzer':
      return <AnalyzerIcon {...rest} />;
    case 'gridView':
      return <GridViewIcon {...rest} />;
    case 'maximize':
      return <MaximizeIcon {...rest} />;
    case 'calender':
      return <CalenderIcon {...rest} />;
    case 'calenderWithDate':
      return <CalenderWithDateIcon {...rest} />;
    case 'upArrow':
      return <UpArrowIcon {...rest} />;
    case 'minimize':
      return <MinimizeIcon {...rest} />;
    case 'compass':
      return <CompassIcon {...rest} />;
    case 'send':
      return <SendIcon {...rest} />;
    case 'mayaLogo':
      return <MayaLogoIcon {...rest} />;
    case 'discover':
      return <MayaDiscoverIcon {...rest} />;
    case 'info':
      return <InfoIcon {...rest} />;
    case 'infoCircle':
      return <InfoCircleIcon {...rest} />;
    case 'copy':
      return <CopyIcon {...rest} />;
    case 'like':
      return <LikeIcon {...rest} />;
    case 'dislike':
      return <DislikeIcon {...rest} />;
    case 'right':
      return <RightIcon {...rest} />;
    case 'filledLike':
      return <FilledLikeIcon {...rest} />;
    case 'filledDislike':
      return <FilledDislikeIcon {...rest} />;
    case 'tableView':
      return <TableViewIcon {...rest} />;
    case 'edit':
      return <EditIcon {...rest} />;
    case 'fix':
      return <FixIcon {...rest} />;
    case 'ignore':
      return <IgnoreIcon {...rest} />;
    case 'report':
      return <ReportIcon {...rest} />;
    case 'upload':
      return <UploadIcon {...rest} />;
    case 'csvFile':
      return <CsvFileIcon {...rest} />;
    case 'emptyLogo':
      return <EmptyLogoIcon {...rest} />;
    case 'setting':
      return <SettingIcon {...rest} />;
    case 'close':
      return <CloseIcon {...rest} />;
    case 'dashBracket':
      return <DashBracketIcon {...rest} />;
    case 'workbench':
      return <WorkbenchIcon {...rest} />;
    case 'demandForecast':
      return <DemandForecastIcon {...rest} />;
    case 'replenishmentRecommendations':
      return <ReplenishmentRecommendationIcon {...rest} />;
    case 'products':
      return <ProductIcon {...rest} />;
    case 'stores':
      return <StoreIcon {...rest} />;
    case 'settings':
      return <MenuSettingIcon {...rest} />;
    case 'orderReviewAndApproval':
      return <OrderReviewAndApprovalIcon {...rest} />;
    case 'home':
      return <HomeIcon {...rest} />;
    case 'telescope':
      return <TelescopeIcon {...rest} />;
    case 'baselineAutoGraph':
      return <BaselineAutoGraphIcon {...rest} />;
    case 'moduleGroup':
      return <ModuleGroupIcon {...rest} />;
    case 'predictiveAlerts':
      return <PredictiveAlertIcon {...rest} />;
    case 'redirect':
      return <RedirectIcon {...rest} />;
    case 'avatar':
      return <AvatarIcon {...rest} />;
    case 'adminPortal':
      return <AdminPortalIcon {...rest} />;
    case 'signOut':
      return <SignOutIcon {...rest} />;
    case 'history':
      return <HistoryIcon {...rest} />;
    case 'wrench':
      return <WrenchIcon {...rest} />;
    case 'play':
      return <PlayIcon {...rest} />;
    case 'collapse':
      return <Collapse {...rest} />;
    case 'validate':
      return <ValidateIcon {...rest} />;
    case 'expand':
      return <Expand {...rest} />;
    case 'clock':
      return <ClockIcon {...rest} />;
    case 'circle':
      return <CircleIcon {...rest} />;
    case 'minus':
      return <MinusIcon {...rest} />;
    case 'trash':
      return <TrashIcon {...rest} />;
    default:
      return <></>;
  }
};
