import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';

const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [hashtags, setHashtags] = useState<{ name: string; id: string }[]>([]);
  const { token } = useContext(AuthContext);

  const search = async (searchQuery: string) => {
    const isHashtag = searchQuery.startsWith('#');

    if (isHashtag) {
      await findHashtags(searchQuery.slice(1));
    } else {
      await findUsers(searchQuery);
    }

    setLoading(false);
  };

  const findHashtags = async (query: string) => {
    if (!token) {
      toast.error('You must be logged in');
      return;
    }

    const searchQuery = query.trim();

    if (searchQuery.length < 3) {
      setUsers([]);
      setHashtags([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/hashtags/find/${searchQuery}`,
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
      setHashtags(data);
      setUsers([]);
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error('Search failed. Please try again.');
    }
  };

  const findUsers = async (query: string) => {
    if (!token) {
      toast.error('You must be logged in');
      return;
    }

    const searchQuery = query.trim();

    if (searchQuery.length < 3) {
      setUsers([]);
      setHashtags([]);
      setLoading(false);
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
      setUsers(data);
      setHashtags([]);
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error('Search failed. Please try again.');
    }
  };

  return { search, loading, users, hashtags };
};

export { useSearch };
