import { createContext, ReactNode, useState } from 'react';
import { useGetLikes } from '../hooks/useGetLikes';
import { useGetPost } from '../hooks/useGetPost';

type PostModalContextType = {
  post?: Post;
  postLikes: {
    userId: string;
  }[];
  isOpen: boolean;
  setModalOpen: (post?: Post) => void;
  fetchPost: (postId: string) => void;
  fetchLikes: (postId: string) => void;
};

export const PostModalContext = createContext<PostModalContextType>({
  post: undefined,
  isOpen: false,
  postLikes: [],
  setModalOpen: () => {},
  fetchPost: () => {},
  fetchLikes: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
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
