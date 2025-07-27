import { FC } from 'react';

interface PostProps {
  post: Post;
  toggleModal: ({ post, image }: { post: string; image: string }) => void;
}
const Post: FC<PostProps> = ({ post, toggleModal }) => {
  if (!post) {
    return null;
  }

  return (
    <div
      key={post.id}
      className="border m-1 flex items-center justify-center h-full"
    >
      {post.file.image && (
        <img
          src={post.file.image}
          alt={post.description}
          onClick={() => toggleModal({ post: post.id, image: post.file.image })}
        />
      )}
    </div>
  );
};
export default Post;
