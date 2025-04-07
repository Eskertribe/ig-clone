import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { toast } from "react-toastify";

const useFetchImage = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const [image, setImage] = useState<string | undefined>(undefined);

  const fetchImage = async (fileName: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/files/${fileName}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setLoading(false);
        toast.error("Error fetching image");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      setLoading(false);
      setImage(url);
    } catch (error) {
      toast.error("Error fetching image");
    }
  };

  return { fetchImage, image, loading };
};

export { useFetchImage };
