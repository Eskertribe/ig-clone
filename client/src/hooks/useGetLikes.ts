import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { toast } from 'react-toastify';

const useGetLikes = () => {
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);
  const [likes, setLikes] = useState<{ userId: string }[]>([]);

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
        `http://localhost:3000/post/getLikes/${postId}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
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
    } catch (error) {
      setLoadingState(false);
      toast.error('Error fetching likes');
    }
  };

  return { fetchLikes, likes, loading };
};

export { useGetLikes };
