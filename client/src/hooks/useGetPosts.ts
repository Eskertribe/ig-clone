import { useContext, useState } from "react";
import { AuthContext, Post } from "../AuthContext/AuthContext";
import { toast } from "react-toastify";

const useGetPosts = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/post/getPosts", {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setLoading(false);
        toast.error("Error fetching posts");
        return;
      }

      const { posts } = await response.json();
      setLoading(false);
      setPosts(posts);
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching posts");
    }
  };

  return { fetchPosts, posts, loading };
};

export { useGetPosts };
