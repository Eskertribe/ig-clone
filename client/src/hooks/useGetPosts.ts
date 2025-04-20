import { useContext, useRef, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const useGetPosts = () => {
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState<Post[]>([]);

  const setLoadingState = (loading: boolean) => {
    loadingRef.current = loading;
    setLoading(loading);
  };

  const fetchPosts = async () => {
    if (!token) {
      toast.error("You must be logged in");
      return;
    }

    try {
      const { userId } = jwtDecode(token) as { userId: string };

      if (loadingRef.current) {
        return;
      }

      setLoadingState(true);

      const response = await fetch(
        `http://localhost:3000/post/getPosts/${userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setLoadingState(false);
        toast.error("Error fetching posts");
        return;
      }

      const data = await response.json();

      setLoadingState(false);
      setPosts(data);
    } catch (error) {
      setLoadingState(false);
      toast.error("Error fetching posts");
    }
  };

  return { fetchPosts, posts, loading };
};

export { useGetPosts };
