import { useShowAlert, useShowAlertEffect } from "#/hooks/useShowAlert";
import { StorageReference, UploadResult } from "firebase/storage";
import { useDownloadURL, useUploadFile } from "react-firebase-hooks/storage";

type UploadFileHandler = (file: File) => Promise<UploadResult | undefined>;

type UploadOptions = {
  sizeLimitInMB?: number;
};
export function useFirebaseUploadFile(
  ref: StorageReference | undefined,
  options?: UploadOptions
) {
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const showAlert = useShowAlert();
  const [downloadUrl, loading] = useDownloadURL(ref);

  const wrappedHandleUploadFile: UploadFileHandler = async (file) => {
    if (ref) {
      if (
        options?.sizeLimitInMB &&
        file.size > options.sizeLimitInMB * 1024 * 1024
      ) {
        showAlert(`File vượt quá giới hạn ${options.sizeLimitInMB}MB`, "error");
        return;
      }

      const result = await uploadFile(ref, file);
      showAlert("Tải file lên thành công", "success");
      return result;
    }
  };

  useShowAlertEffect(error?.message, "error");

  return {
    uploadToFirebase: wrappedHandleUploadFile,
    uploading: uploading || loading,
    snapshot,
    downloadUrl,
  };
}
