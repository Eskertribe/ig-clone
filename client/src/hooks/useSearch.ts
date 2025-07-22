import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';

const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<User[]>([]);
  const { token } = useContext(AuthContext);

  const findUsers = async (query: string) => {
    if (!token) {
      toast.error('You must be logged in');
      return;
    }

    const searchQuery = query.trim();

    if (searchQuery.length < 3) {
      setResult([]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/find/${searchQuery}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const { message } = await response.json();
        toast.error(message);
        setLoading(false);

        return;
      }

      const data = await response.json();
      setResult(data);
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error('Login failed. Please try again.');
    }
  };

  return { findUsers, loading, result };
};

export { useSearch };
