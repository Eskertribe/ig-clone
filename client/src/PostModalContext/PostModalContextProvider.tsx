import { ReactNode, useState } from 'react';
import { useGetLikes } from '../hooks/useGetLikes';
import { useGetPost } from '../hooks/useGetPost';
import { PostModalContext } from './PostModalContext';

export const PostModalProvider = ({ children }: { children: ReactNode }) => {
  const { postLikes, fetchLikes } = useGetLikes();
  const { post, fetchPost } = useGetPost();
  const [isOpen, toggleOpen] = useState(false);

  const setModalOpen = (post?: Post) => {
    if (!post) {
      toggleOpen(false);
      return;
    }

    fetchLikes(post.id);
    toggleOpen(!isOpen);
    fetchPost(post.id);
  };

  return (
    <PostModalContext.Provider
      value={{
        post,
        isOpen,
        postLikes,
        setModalOpen,
        fetchPost,
        fetchLikes,
      }}
    >
      {children}
    </PostModalContext.Provider>
  );
};
