import { useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';

const useDeletePost = () => {
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);

  const deletePost = async (postId: string, callBack?: () => void) => {
    if (!token) {
      toast.error('You must be logged in');
      return;
    }

    try {
      if (loadingRef.current) {
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/post/${postId}`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        toast.error('Error deleting post');
        return;
      }

      callBack?.();
    } catch {
      toast.error('Error deleting post');
    }
  };

  return { deletePost };
};

export { useDeletePost };
