import { useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';

const useUpdateComment = () => {
  const loadingRef = useRef(false);
  const { token } = useContext(AuthContext);

  const updateComment = async (
    commentId: string,
    postId: string,
    updatedComment: string,
    callBack: (updatedComment: PostComment) => void
  ) => {
    console.log(commentId);
    console.log(postId);
    console.log(updatedComment);
    if (!token) {
      toast.error('You must be logged in');
      return;
    }

    try {
      if (loadingRef.current) {
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/post/edit/comment/${commentId}`,
        {
          method: 'PATCH',
          credentials: 'include',
          body: JSON.stringify({ postId, updatedComment }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        toast.error('Error updating message');
        return;
      }

      callBack(await response.json());
    } catch {
      toast.error('Error updating message');
    }
  };

  return { updateComment };
};

export { useUpdateComment };
