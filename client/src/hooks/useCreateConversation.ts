import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { toast } from 'react-toastify';

const useCreateConversation = () => {
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);

  const setLoadingState = (loading: boolean) => {
    loadingRef.current = loading;
    setLoading(loading);
  };

  const createConversation = async (
    participants: User[],
    callback: (id: string) => void
  ) => {
    if (!token) {
      toast.error('You must be logged in');
      return;
    }

    if (participants.length < 1) {
      toast.error('At least one participant is required');
      return;
    }

    try {
      if (loadingRef.current) {
        return;
      }

      setLoadingState(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/messages/createConversation`,
        {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            participants: participants.map(({ id }) => id),
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setLoadingState(false);
        toast.error('Error creating conversation');
        return;
      }

      const { id } = await response.json();

      callback(id);

      setLoadingState(false);
    } catch {
      setLoadingState(false);
      toast.error('Error creating conversation');
    }
  };

  return { createConversation, loading };
};

export { useCreateConversation };
