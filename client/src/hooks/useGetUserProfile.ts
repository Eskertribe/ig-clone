import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const useGetUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);
  const [userData, setUserData] = useState<User | undefined>();

  const setLoadingState = (loading: boolean) => {
    loadingRef.current = loading;
    setLoading(loading);
  };

  const fetchUserProfileData = async () => {
    if (!token) {
      toast.error('You must be logged in');
      return;
    }

    const { userId } = (await jwtDecode(token)) as { userId: string };

    try {
      if (loadingRef.current) {
        return;
      }

      setLoadingState(true);
      const response = await fetch(
        `http://localhost:3000/users/profile/${userId}`,
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
