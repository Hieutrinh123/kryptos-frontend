import { useShowAlert } from "#/hooks/useShowAlert";
import { StorageReference, UploadResult } from "firebase/storage";
import { useDownloadURL, useUploadFile } from "react-firebase-hooks/storage";

type UploadFileHandler = (file: File) => Promise<UploadResult | undefined>;

export function useFirebaseUploadFile(ref?: StorageReference) {
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const showAlert = useShowAlert();
  const [downloadUrl, loading] = useDownloadURL(ref);

  const wrappedHandleUploadFile: UploadFileHandler = async (file) => {
    if (ref) {
      const result = await uploadFile(ref, file);
      showAlert("File successfully uploaded", "success");
      return result;
    }
  };
  return {
    uploadToFirebase: wrappedHandleUploadFile,
    uploading: uploading || loading,
    error,
    snapshot,
    downloadUrl,
  };
}
