import { useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);
  const [conversation, setConversation] = useState<Conversation | null>(null);

  const setLoadingState = (loading: boolean) => {
    loadingRef.current = loading;
    setLoading(loading);
  };

  const fetchConversation = async (conversationId: string) => {
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
        `${import.meta.env.VITE_API_URL}/messages/getConversation/${conversationId}`,
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
        toast.error('Error fetching conversations');
        return;
      }

      const data = await response.json();

      setLoadingState(false);
      setConversation(data);
    } catch {
      setLoadingState(false);
      toast.error('Error fetching conversations');
    }
  };

  return { fetchConversation, conversation, loading };
};

export { useGetConversation };
