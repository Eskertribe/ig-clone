import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { toast } from 'react-toastify';

const useGetPostsWithHashtag = () => {
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState<Post[]>([]);

  const setLoadingState = (loading: boolean) => {
    loadingRef.current = loading;
    setLoading(loading);
  };

  const fetchPostsWithHashtag = async (hashtag: string) => {
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
        `${import.meta.env.VITE_API_URL}/post/getPostsWithHashTag/${hashtag}`,
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
        toast.error('Error fetching posts');
        return;
      }

      const data = await response.json();

      setLoadingState(false);
      setPosts(data);
    } catch {
      setLoadingState(false);
      toast.error('Error fetching posts');
    }
  };

  return { fetchPostsWithHashtag, posts, loading };
};

export { useGetPostsWithHashtag };
