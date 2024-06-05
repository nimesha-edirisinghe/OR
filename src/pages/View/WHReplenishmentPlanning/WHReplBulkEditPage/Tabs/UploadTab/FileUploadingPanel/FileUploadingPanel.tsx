import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ocean_blue_600 } from 'theme/colors';
import InitialUploadPanel from './InitialUploadPanel';
import InprogressPanel from './InprogressPanel';
import {
  IRPLWhView,
  rplWHViewSliceSelector
} from 'state/pages/view/whReplenishmentView/whRplViewState';

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
  const rplWhViewState: IRPLWhView = useSelector(rplWHViewSliceSelector);
  const fileUploadError = rplWhViewState.rplWhFileUploadError;
  const { fileName, fileSize, percentage } = fileInfo;
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
      />
    );
  }, [fileName, fileSize]);
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
