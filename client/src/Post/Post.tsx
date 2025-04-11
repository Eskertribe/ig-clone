import { FC, useEffect } from "react";
import { useFetchImage } from "../hooks/useFetchImage";

type Post = {
  id: string;
  title: string;
  file: {
    name: string;
  };
}
interface PostProps {
  post: Post;
  toggleModal: (({ post, image }: { post: Post; image: string }) => void)
}
const Post: FC<PostProps> = ({ post, toggleModal }) => {
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
      {image && <img src={image} alt={post.title} onClick={() => toggleModal({ post, image })} />}
    </div>
  );
}
export default Post;