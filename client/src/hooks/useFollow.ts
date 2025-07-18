import { useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';

const useFollow = () => {
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);

  const setLoadingState = (loading: boolean) => {
    loadingRef.current = loading;
    setLoading(loading);
  };

  const sendFollow = async (username: string) => {
    return fetch(`http://localhost:3000/followers/follow/${username}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const sendFollowRemove = async (username: string) => {
    return fetch(`http://localhost:3000/followers/unfollow/${username}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const addFollow = async (username: string, callBack?: () => void) => {
    try {
      if (loadingRef.current) {
        return;
      }

      setLoadingState(true);

      const response = await sendFollow(username);

      if (!response.ok) {
        setLoadingState(false);
        toast.error('Error adding follow');
        return;
      }

      if (callBack) {
        callBack();
      }

      setLoadingState(false);
    } catch {
      setLoadingState(false);
      toast.error('Error adding follow');
    }
  };

  const removeFollow = async (username: string, callBack?: () => void) => {
    try {
      if (loadingRef.current) {
        return;
      }

      setLoadingState(true);

      const response = await sendFollowRemove(username);

      if (!response.ok) {
        setLoadingState(false);
        toast.error('Error removing following');
        return;
      }

      if (callBack) {
        callBack();
      }

      setLoadingState(false);
    } catch {
      setLoadingState(false);
      toast.error('Error removing following');
    }
  };

  return { addFollow, removeFollow, loading };
};

export { useFollow };
