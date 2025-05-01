import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { toast } from 'react-toastify';

const useGetPost = () => {
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);
  const [post, setPost] = useState<Post>();

  const setLoadingState = (loading: boolean) => {
    loadingRef.current = loading;
    setLoading(loading);
  };

  const fetchPost = async (postId: string) => {
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
        `http://localhost:3000/post/getPost/${postId}`,
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
        toast.error('Error fetching post');
        return;
      }

      const data = await response.json();

      setLoadingState(false);
      setPost(data);
    } catch (error) {
      setLoadingState(false);
      toast.error('Error fetching post');
    }
  };

  return { fetchPost, post, loading };
};

export { useGetPost };
