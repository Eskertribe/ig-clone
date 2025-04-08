import { useEffect } from "react";
import { useFetchImage } from "../hooks/useFetchImage";

const Post = ({ post }: any) => {
  const { image, loading, fetchImage } = useFetchImage();

  useEffect(() => {
    fetchImage(post.file.name);
  }, [])

  if (loading) {
    return (
      <div key={post.id} className="border p-4 m-2 bg-white">
        <h2 className="text-xl font-bold">{post.title}</h2>
      </div>
    )
  }

  return (
    <div key={post.id} className="border m-1 flex items-center justify-center h-full">
      <img src={image} alt={post.title} />
    </div>
  );
}
export default Post;