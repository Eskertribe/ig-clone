import { createContext } from 'react';

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
