import { FC } from 'react';

interface PostProps {
  post: Post;
  toggleModal: ({ post, url }: { post: string; url: string }) => void;
}
const Post: FC<PostProps> = ({ post, toggleModal }) => {
  if (!post) {
    return null;
  }

  return (
    <div
      key={post.id}
      className="border m-1 flex items-center justify-center w-full h-full overflow-hidden"
    >
      {post.file.image && (
        <img
          src={post.file.image}
          alt={post.description}
          onClick={() => toggleModal({ post: post.id, url: post.file.image })}
          className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
          loading="lazy"
        />
      )}
    </div>
  );
};
export default Post;
