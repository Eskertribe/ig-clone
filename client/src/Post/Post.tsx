import { FC } from 'react';
import { getImageUrl } from '../utils/getImage';

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
      className="border m-1 flex items-center justify-center h-full"
    >
      {post.file.url && (
        <img
          src={getImageUrl(post.file.url)}
          alt={post.description}
          onClick={() => toggleModal({ post: post.id, url: post.file.url })}
        />
      )}
    </div>
  );
};
export default Post;
