import {useEffect, useMemo} from "react";

function useImagePreviewUrl(file: File | null, fallbackUrl: string) {
  const objectUrl = useMemo(() => {
    if (!file) {
      return null;
    }

    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  return objectUrl ?? fallbackUrl;
}

export default useImagePreviewUrl;