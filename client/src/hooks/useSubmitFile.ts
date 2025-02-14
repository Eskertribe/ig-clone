import { useState } from 'react';

interface UploadResponse {
  message: string;
  filename: string;
}

export interface UploadParams {
  description: string;
  disableComments: boolean;
  disableLikes: boolean;
  file: File;
}

const useSubmitFile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async ({ file, disableComments, disableLikes, description }: UploadParams): Promise<UploadResponse | null> => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    formData.append('disableComments', disableComments.toString());
    formData.append('disableLikes', disableLikes.toString());

    try {
      const response = await fetch('http://localhost:3000/post/createPost', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const data: UploadResponse = await response.json();
      setLoading(false);

      return data;
    } catch (err) {
      setLoading(false);
      setError('File upload failed. Please try again.');

      return null;
    }
  };

  return { uploadFile, loading, error };
};

export { useSubmitFile };
