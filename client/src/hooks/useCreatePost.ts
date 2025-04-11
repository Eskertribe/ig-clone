import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { toast } from "react-toastify";

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

const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const createPost = async ({
    file,
    disableComments,
    disableLikes,
    description,
  }: UploadParams): Promise<UploadResponse | undefined> => {
    setLoading(true);

    if (!token) {
      toast.error("You must be logged in to upload files.");
      setLoading(false);
      return;
    }

    if (!file) {
      toast.error("Please select a file to upload.");
      setLoading(false);
      return;
    }

    if (!description) {
      toast.error("Please add a description.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("disableComments", disableComments.toString());
    formData.append("disableLikes", disableLikes.toString());

    try {
      const response = await fetch("http://localhost:3000/post/createPost", {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        toast.error("File upload failed");
        setLoading(false);
        return;
      }

      const data: UploadResponse = await response.json();
      setLoading(false);
      toast.success("File uploaded successfully!");

      return data;
    } catch (err) {
      setLoading(false);
      toast.error("File upload failed. Please try again.");

      return;
    }
  };

  return { createPost, loading };
};

export { useCreatePost };
