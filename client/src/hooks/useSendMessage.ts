import { useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';

const useSendMessage = () => {
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);

  const sendMessage = async (conversationId: string, message: string) => {
    console.log(message);
    if (!token) {
      toast.error('You must be logged in');
      return;
    }

    if (!conversationId) {
      toast.error('Invalid conversation');
      return;
    }

    if (message.trim() === '') {
      toast.error('Message cannot be empty');
      return;
    }

    try {
      if (loadingRef.current) {
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/messages/sendToConversation/${conversationId}`,
        {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({ message }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        toast.error('Error sending message');
        return;
      }
    } catch {
      toast.error('Error sending message');
    }
  };

  return { useSendMessage, sendMessage };
};

export { useSendMessage };
