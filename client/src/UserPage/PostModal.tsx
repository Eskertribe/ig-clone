import { faComment } from '@fortawesome/free-solid-svg-icons/faComment';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useContext, useMemo, useRef, useState } from 'react';
import { useAddComment } from '../hooks/useAddComment';
import { useDeleteComment } from '../hooks/useDeleteComment';
import { useLike } from '../hooks/useLike';
import { useUpdateComment } from '../hooks/useUpdateComment';
import { PostModalContext } from '../PostModalContext/PostModalContext';
import { calculateTimeSince } from '../utils/timeDifference';
import { Comment } from './Comment';
import { getImageUrl } from '../utils/getImage';
import { AuthContext } from '../AuthContext/AuthContext';

export const PostModal: FC = () => {
  const { userId } = useContext(AuthContext);
  const [editing, setEditing] = useState<string | undefined>();
  const { isOpen, post, postLikes, setModalOpen, fetchLikes, fetchPost } =
    useContext(PostModalContext);
  const { addComment, loading } = useAddComment();
  const { addLike, removeLike, loading: likeActionLoading } = useLike();
  const { updateComment } = useUpdateComment();
  const { deleteComment } = useDeleteComment();

  const commentRef = useRef<HTMLInputElement>(null);
  const replyRef = useRef<string>(undefined);

  const handleSuccess = () => {
    if (editing) {
      setEditing(undefined);
    }

    fetchPost(post!.id);

    if (commentRef.current) {
      commentRef.current.value = '';
    }

    replyRef.current = undefined;
  };

  const isLiked = useMemo(() => {
    if (!post) {
      return false;
    }

    return postLikes.some((like) => like.userId === userId);
  }, [postLikes, post, userId]);

  if (!isOpen || !post) {
    return null;
  }

  const parseText = (text: string) => {
    const parts = text.split(/(#\w+)/g);

    return parts.map((part, i) => {
      if (/^#\w+$/.test(part)) {
        return (
          <a
            key={i}
            href={`/hashtag/${part.substring(1)}`}
            className="text-blue-500 cursor-pointer"
          >
            {part}
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-[rgb(59,57,57)] p-4 w-[75%] rounded-lg h-[90vh] flex flex-row">
        <div className="flex justify-between items-start mb-4">
          <button onClick={() => setModalOpen()} className="text-white">
            X
          </button>
        </div>
        <div className="flex-[2] flex justify-center items-center">
          <img src={getImageUrl(post.file.url)} />
        </div>
        <div className="flex-[1] m-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-4">
              <img
                src={post.user.profilePicture.image}
                className="object-cover rounded-full w-[4em] h-[4em]"
              />
              <div>
                <p className="text-white">
                  <b>{post.user.username}</b>
                </p>
              </div>
            </div>
            <div className="border-t border-gray-600 my-4" />
            <div className="scroll-y h-[60vh] overflow-y-auto">
              <div className="my-2">
                <div className="flex items-center space-x-4">
                  <img
                    src={post.user.profilePicture.image}
                    className="object-cover rounded-full w-[4em] h-[4em]"
                  />
                  <div className="flex flex-col">
                    <p className="text-white">
                      <b>{post.user.username}</b> {parseText(post.description)}
                    </p>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-white">
                        {calculateTimeSince(post.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {post.comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    isOwnComment={post.user.id === comment.user.id}
                    parseText={parseText}
                    reply={(id) => {
                      replyRef.current = id;
                      commentRef.current?.focus();
                      commentRef.current!.value =
                        '@' + comment.user.username + ' ';
                    }}
                    comment={comment}
                    post={post}
                    editing={editing}
                    edit={(edit) => {
                      if (!commentRef.current) {
                        return;
                      }

                      if (!edit) {
                        commentRef.current.value = '';
                        commentRef.current?.blur();
                        setEditing(undefined);

                        return;
                      }

                      setEditing(edit);
                      commentRef.current.value = comment.text;
                      commentRef.current?.focus();
                    }}
                    deleteComment={(id) =>
                      deleteComment(id, () => fetchPost(post.id))
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <FontAwesomeIcon
              icon={faHeart}
              className={`text-${isLiked ? 'red' : 'gray'}-500 h-[1.5em] cursor-pointer hover:text-red-500`}
              onClick={() => {
                if (likeActionLoading) {
                  return;
                }

                if (isLiked) {
                  removeLike(post.id, undefined, () => {
                    fetchLikes(post.id);
                  });
                } else {
                  addLike(post.id, undefined, () => {
                    fetchLikes(post.id);
                  });
                }
              }}
            />
            <FontAwesomeIcon
              icon={faComment}
              className="text-gray-500 h-[1.5em] cursor-pointer hover:text-gray-300"
              onClick={() => {
                commentRef.current?.focus();
              }}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              ref={commentRef}
              placeholder="Add a comment..."
              className="bg-transparent border-b border-gray-600 text-gray-300 placeholder-gray-300 focus:outline-none flex-1"
            />
            <button
              disabled={loading}
              className="text-blue-500"
              onClick={() => {
                if (!commentRef.current?.value) {
                  return;
                }

                if (editing) {
                  updateComment(
                    editing,
                    post.id,
                    commentRef.current!.value,
                    handleSuccess
                  );

                  return;
                }

                addComment(
                  post.id,
                  commentRef.current.value,
                  replyRef.current,
                  handleSuccess
                );
              }}
            >
              Send
            </button>
            <button
              className="text-red-500"
              onClick={() => {
                commentRef.current!.value = '';
                replyRef.current = undefined;
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
