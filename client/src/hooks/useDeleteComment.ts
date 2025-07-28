import { useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';

const useDeleteComment = () => {
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);

  const deleteComment = async (commentId: string, callBack?: () => void) => {
    if (!token) {
      toast.error('You must be logged in');
      return;
    }

    try {
      if (loadingRef.current) {
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/post/comment/remove/${commentId}`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        toast.error('Error updating message');
        return;
      }

      callBack?.();
    } catch {
      toast.error('Error updating message');
    }
  };

  return { deleteComment };
};

export { useDeleteComment };
