import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { IDFView, dfViewSliceSelector } from 'state/pages/view/demandForecastView/dfViewPageState';
import { ocean_blue_600 } from 'theme/colors';
import InitialUploadPanel from './InitialUploadPanel';
import InprogressPanel from './InprogressPanel';
import {
  IRPLView,
  rplViewSliceSelector
} from 'state/pages/view/replenishmentView/rplViewPageState';
import { IAlert, alertSliceSelector } from 'state/pages/monitoringAndResolution/Alert/alertState';
import { AlertTypeEnum } from 'state/pages/monitoringAndResolution/Alert/sagaHelpers/sgH_alert';

export interface FileInfoI {
  fileName: string;
  fileSize: string;
  percentage: number;
}

interface Props {
  fileInfo: FileInfoI;
  isOpen: boolean;
  uploadFileHandler: () => void;
  onActionHandler: (actionType: string) => void;
  initUpload?: boolean;
}

const FileUploadingPanel: FC<Props> = ({
  fileInfo,
  isOpen = false,
  uploadFileHandler,
  onActionHandler,
  initUpload = false
}) => {
  const dfViewState: IDFView = useSelector(dfViewSliceSelector);
  const alertState: IAlert = useSelector(alertSliceSelector);
  const forecastFileUploadError = dfViewState.fileUploadError;
  const rplFileUploadError = dfViewState.fileUploadError;
  const { fileName, fileSize, percentage } = fileInfo;
  const selectedAlertType = alertState.alertLocalScope.selectedAlertTypeObj.alertType;

  const isForecastAlert =
    selectedAlertType === AlertTypeEnum.DE_GROWTH || selectedAlertType === AlertTypeEnum.GROWTH;
  const fileUploadError = isForecastAlert ? forecastFileUploadError : rplFileUploadError;
  const renderUploadingContent = useCallback(() => {
    const headerName = fileUploadError
      ? 'Upload Failed'
      : percentage === 100
      ? 'Upload successful'
      : 'Uploading file';
    return (
      <InprogressPanel
        fileInfo={fileInfo}
        fileUploadError={fileUploadError}
        headerName={headerName}
        onActionHandler={onActionHandler}
      />
    );
  }, [initUpload, percentage, fileSize, fileName, fileUploadError]);

  const renderInitContent = useCallback(() => {
    return (
      <InitialUploadPanel
        fileName={fileName}
        fileSize={fileSize}
        onActionHandler={onActionHandler}
        uploadFileHandler={uploadFileHandler}
        isForecastAlert={isForecastAlert}
      />
    );
  }, [fileName, fileSize, isForecastAlert]);
  return (
    <Modal onClose={() => {}} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent w="488px" h="auto" bg={ocean_blue_600} p="24px">
        {initUpload ? renderUploadingContent() : renderInitContent()}
      </ModalContent>
    </Modal>
  );
};

export default FileUploadingPanel;
