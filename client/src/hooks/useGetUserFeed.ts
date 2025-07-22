import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { toast } from 'react-toastify';

const useFetchUserFeed = () => {
  const [loading, setLoading] = useState(false);
  const [userFeed, setUserFeed] = useState<Post[]>([]);
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);

  const setLoadingState = (loading: boolean) => {
    loadingRef.current = loading;
    setLoading(loading);
  };

  const getUserFeed = async (): Promise<void> => {
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
        `${import.meta.env.VITE_API_URL}/post/userFeed`,
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
        toast.error('Error fetching user feed');
        return;
      }

      const data = await response.json();

      setLoadingState(false);
      setUserFeed(data);
    } catch {
      setLoadingState(false);
      toast.error('Error fetching user feed');
    }
  };

  return { userFeed, loading, getUserFeed };
};

export { useFetchUserFeed };
