import { useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const setLoadingState = (loading: boolean) => {
    loadingRef.current = loading;
    setLoading(loading);
  };

  const fetchConversations = async () => {
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
        `${import.meta.env.VITE_API_URL}/messages/getConversations`,
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
      setConversations(data);
    } catch {
      setLoadingState(false);
      toast.error('Error fetching conversations');
    }
  };

  return { fetchConversations, conversations, loading };
};

export { useGetConversations };
