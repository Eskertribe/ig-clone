import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { toast } from 'react-toastify';

const useGetLikes = () => {
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);
  const [postLikes, setLikes] = useState<{ userId: string }[]>([]);

  const setLoadingState = (loading: boolean) => {
    loadingRef.current = loading;
    setLoading(loading);
  };

  const fetchLikes = async (
    postId: string
  ): Promise<{ userId: string }[] | undefined> => {
    if (!token) {
      toast.error('You must be logged in');
      return;
    }

    try {
      if (loadingRef.current) {
        return;
      }

      setLoadingState(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/post/getLikes/${postId}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
          },
        }
      );

      if (!response.ok) {
        setLoadingState(false);
        toast.error('Error fetching likes');
        return;
      }

      const data = await response.json();

      setLoadingState(false);
      setLikes(data);
    } catch {
      setLoadingState(false);
      toast.error('Error fetching likes');
    }
  };

  return { fetchLikes, postLikes, loading };
};

export { useGetLikes };
