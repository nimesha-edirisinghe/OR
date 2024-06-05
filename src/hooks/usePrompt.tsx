import AppConfirmationPrompt from 'components/AppConfirmationPrompt/AppConfirmationPrompt';

const usePrompt = (
  isOpen: boolean,
  onClose: () => void,
  title: string,
  infoMessage: string,
  confirmationMessage: string,
  leftBtnName: string,
  rightBtnName: string,
  onConfirmHandler: () => void,
  onCloseHandler: () => void
) => {
  const AppPrompt = (
    <AppConfirmationPrompt
      isOpen={isOpen}
      onClose={onClose}
      leftBtnName={leftBtnName}
      rightBtnName={rightBtnName}
      infoMessage={infoMessage}
      confirmationMessage={confirmationMessage}
      title={title}
      onConfirmHandler={onConfirmHandler}
      onCloseHandler={onCloseHandler}
    />
  );

  return { AppPrompt };
};

export default usePrompt;
