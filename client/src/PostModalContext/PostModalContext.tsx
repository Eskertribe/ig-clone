import { createContext, ReactNode, useState } from 'react';
import { useGetLikes } from '../hooks/useGetLikes';

type PostModalContextType = {
  post?: Post;
  likes: {
    userId: string;
  }[];
  isOpen: boolean;
  setModalOpen: (post?: Post) => void;
};

export const PostModalContext = createContext<PostModalContextType>({
  post: undefined,
  isOpen: false,
  likes: [],
  setModalOpen: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const { likes, fetchLikes } = useGetLikes();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [isOpen, toggleOpen] = useState(false);

  const setModalOpen = (post?: Post) => {
    if (!post) {
      toggleOpen(false);
      return;
    }

    fetchLikes(post.id);
    toggleOpen(!isOpen);
    setPost(post);
  };

  return (
    <PostModalContext.Provider
      value={{
        post,
        isOpen,
        likes,
        setModalOpen,
      }}
    >
      {children}
    </PostModalContext.Provider>
  );
};
