import { useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';

const useDeleteMessage = () => {
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);

  const deleteMessage = async (messageId: string, callback?: () => unknown) => {
    if (!token) {
      toast.error('You must be logged in');
      return;
    }

    try {
      if (loadingRef.current) {
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/messages/deleteMessage/${messageId}`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        toast.error('Error deleting message');
        return;
      }

      callback?.();
    } catch {
      toast.error('Error deleting message');
    }
  };

  return { deleteMessage };
};

export { useDeleteMessage };
