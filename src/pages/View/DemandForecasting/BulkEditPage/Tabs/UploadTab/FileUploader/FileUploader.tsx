import { Box, useDisclosure } from '@chakra-ui/react';
import { useState, FC, useRef } from 'react';
import FileUploadingPanel from '../FileUploadingPanel/FileUploadingPanel';
import { formatFileSize } from 'utils/utility';
import { useDispatch } from 'react-redux';
import {
  bulkEditFileUploadRequest,
  getUploadHistoryDataRequest
} from 'state/pages/view/demandForecastView/dfViewPageState';
import { showErrorToast } from 'state/toast/toastState';
import AppButton from 'components/newTheme/AppButton/AppButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { blue_500 } from 'theme/colors';
import AppInput from 'components/AppInput/AppInput';
import { validateBulkEditForecastFile } from 'utils/fileValidations';

interface Props {}
const FileUploader: FC<Props> = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [initUpload, setInitUpload] = useState<boolean>(false);
  const { isOpen, onClose, onToggle } = useDisclosure();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const validation = validateBulkEditForecastFile(file);
      if (validation.isValid) {
        setSelectedFile(file);
        onToggle();
      } else {
        showErrorToast(validation.errorMessage!);
      }
    }
  };

  const onActionHandler = (actionType: string) => {
    onClose();
    setInitUpload(false);
    if (actionType === 'submit') {
      dispatch(
        getUploadHistoryDataRequest({
          pageNumber: 1
        })
      );
    }
  };

  const uploadPercentageHandler = (percentage: number) => {
    setUploadProgress(percentage);
  };

  const handleUpload = () => {
    if (selectedFile) {
      setInitUpload(true);
      dispatch(
        bulkEditFileUploadRequest({
          file: selectedFile,
          uploadPercentageCallback: uploadPercentageHandler
        })
      );
    }
  };

  const formattedFileSize = formatFileSize(selectedFile?.size!);

  const fileInformation = {
    fileName: selectedFile?.name!,
    fileSize: formattedFileSize,
    percentage: uploadProgress
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box cursor="pointer">
      <AppButton
        variant="secondary"
        size="medium"
        onClick={handleClick}
        px="14px"
        leftIcon={<AppIcon transition="transform 0.25s ease" name="upload" fill={blue_500} />}
      >
        Upload File
      </AppButton>
      <AppInput
        ref={fileInputRef}
        value=""
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {selectedFile && (
        <FileUploadingPanel
          fileInfo={fileInformation}
          uploadFileHandler={handleUpload}
          initUpload={initUpload}
          onActionHandler={onActionHandler}
          isOpen={isOpen}
        />
      )}
    </Box>
  );
};

export default FileUploader;
