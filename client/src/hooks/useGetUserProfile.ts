import { useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';

const useGetUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);
  const [userData, setUserData] = useState<User | undefined>();

  const setLoadingState = (loading: boolean) => {
    loadingRef.current = loading;
    setLoading(loading);
  };

  const fetchUserProfileData = async (username: string) => {
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
        `${import.meta.env.VITE_API_URL}/users/profile/${username}`,
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
        toast.error('Error fetching user profile');
        return;
      }

      const { user: userData } = await response.json();

      setLoadingState(false);
      setUserData(userData);

      if (!userData) {
        toast.error('Error fetching user profile');
      }
    } catch {
      toast.error('Error fetching user profile');
      setLoadingState(false);
    }
  };

  return { fetchUserProfileData, userData, loading };
};

export { useGetUserProfile };
