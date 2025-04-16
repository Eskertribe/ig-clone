import { createContext, ReactNode, useState } from "react";

type PostModalContextType = { post?: Post, isOpen: boolean, setModalOpen: (post?: Post) => void };

export const PostModalContext = createContext<PostModalContextType>({
  post: undefined,
  isOpen: false,
  setModalOpen: () => { },
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [isOpen, toggleOpen] = useState(false);

  const setModalOpen = (post?: Post) => {
    if (!post) {
      toggleOpen(false);
      return;
    }

    toggleOpen(!isOpen);
    setPost(post);
  }

  return (
    <PostModalContext.Provider
      value={{
        post,
        isOpen,
        setModalOpen,
      }}>
      {children}
    </PostModalContext.Provider>
  );
};
