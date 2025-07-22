import { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { toast } from 'react-toastify';

const useMarkPostSeen = () => {
  const { token } = useContext(AuthContext);

  const markPostSeen = async (postId: string) => {
    if (!token) {
      toast.error('You must be logged in');
      return;
    }

    try {
      fetch(`${import.meta.env.VITE_API_URL}/post/markSeen`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId }),
      });
    } catch {
      return;
    }
  };

  return { markPostSeen };
};

export { useMarkPostSeen };
