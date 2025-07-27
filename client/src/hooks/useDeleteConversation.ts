import { useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';

const useDeleteConversation = () => {
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);

  const deleteConversation = async (conversationId: string) => {
    if (!token) {
      toast.error('You must be logged in');
      return;
    }

    try {
      if (loadingRef.current) {
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/messages/deleteConversation/${conversationId}`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        toast.error('Error deleting conversation');
        return;
      }
    } catch {
      toast.error('Error deleting conversation');
    }
  };

  return { deleteConversation };
};

export { useDeleteConversation };
