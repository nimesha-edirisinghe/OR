import { GeneralResponse } from 'state/rootSaga';

export function downloadFile(response: GeneralResponse, fileName: string) {
  if (response) {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    return true;
  }
  return false;
}
