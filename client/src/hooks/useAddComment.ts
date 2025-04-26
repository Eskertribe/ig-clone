import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { toast } from 'react-toastify';

const useAddComment = () => {
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);

  const setLoadingState = (loading: boolean) => {
    loadingRef.current = loading;
    setLoading(loading);
  };

  const addComment = async (
    postId: string,
    comment: string,
    replytoId?: string,
    callBack?: (newComment: any) => void // TODO: Define a proper type for newComment
  ) => {
    try {
      if (loadingRef.current) {
        return;
      }

      setLoadingState(true);
      const response = await fetch('http://localhost:3000/post/comment', {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify({ postId, comment, replytoId }),
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

      const data = await response.json();

      if (callBack) {
        callBack(data);
      }
      setLoadingState(false);
    } catch (error) {
      setLoadingState(false);
      toast.error('Error adding comment');
    }
  };

  return { addComment, loading };
};

export { useAddComment };
