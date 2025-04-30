import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { toast } from 'react-toastify';

const useAddLike = () => {
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);

  const setLoadingState = (loading: boolean) => {
    loadingRef.current = loading;
    setLoading(loading);
  };

  const addLike = async (
    postId: string,
    callBack?: () => void // TODO: Define a proper type for newComment
  ) => {
    try {
      if (loadingRef.current) {
        return;
      }

      setLoadingState(true);

      const response = await fetch('http://localhost:3000/post/like', {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify({ postId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setLoadingState(false);
        toast.error('Error adding comment');
        return;
      }

      if (callBack) {
        callBack();
      }

      setLoadingState(false);
    } catch (error) {
      setLoadingState(false);
      toast.error('Error adding comment');
    }
  };

  return { addLike, loading };
};

export { useAddLike };
