import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { toast } from 'react-toastify';

const useGetFollowing = () => {
  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState<Following[]>([]);
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);

  const setLoadingState = (loading: boolean) => {
    loadingRef.current = loading;
    setLoading(loading);
  };

  const fetchFollowers = async (
    userId: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
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
        `${import.meta.env.VITE_API_URL}/followers/followers/${userId}`,
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
        toast.error('Error fetching followers');
        return;
      }

      const data = await response.json();

      setLoadingState(false);
      setFollowers(data);
    } catch {
      setLoadingState(false);
      toast.error('Error fetching followers');
    }
  };

  return { fetchFollowers, loading, followers };
};

export { useGetFollowing };
