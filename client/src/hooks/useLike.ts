import { useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';

const useLike = () => {
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);

  const setLoadingState = (loading: boolean) => {
    loadingRef.current = loading;
    setLoading(loading);
  };

  const sendLike = async (postId: string, commentId?: string) => {
    const url = commentId
      ? 'http://localhost:3000/post/likeComment'
      : 'http://localhost:3000/post/like';

    return fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({ postId, commentId }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const addLike = async (
    postId: string,
    commentId?: string,
    callBack?: () => void // TODO: Define a proper type for newComment
  ) => {
    try {
      if (loadingRef.current) {
        return;
      }

      setLoadingState(true);

      const response = await sendLike(postId, commentId);

      if (!response.ok) {
        setLoadingState(false);
        toast.error('Error adding like');
        return;
      }

      if (callBack) {
        callBack();
      }

      setLoadingState(false);
    } catch {
      setLoadingState(false);
      toast.error('Error adding like');
    }
  };

  const removeLike = async (
    postId: string,
    callBack?: () => void // TODO: Define a proper type for newComment
  ) => {
    try {
      if (loadingRef.current) {
        return;
      }

      setLoadingState(true);

      const response = await fetch('http://localhost:3000/post/like', {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify({ postId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setLoadingState(false);
        toast.error('Error removing like');
        return;
      }

      if (callBack) {
        callBack();
      }

      setLoadingState(false);
    } catch {
      setLoadingState(false);
      toast.error('Error removing like');
    }
  };

  return { addLike, removeLike, loading };
};

export { useLike };
