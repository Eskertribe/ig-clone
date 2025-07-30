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
import { useDeletePost } from '../hooks/useDeletePost';

export const PostModal: FC = () => {
  const { userId } = useContext(AuthContext);
  const [editing, setEditing] = useState<string | undefined>();
  const { isOpen, post, postLikes, setModalOpen, fetchLikes, fetchPost } =
    useContext(PostModalContext);
  const { addComment, loading } = useAddComment();
  const { addLike, removeLike, loading: likeActionLoading } = useLike();
  const { updateComment } = useUpdateComment();
  const { deleteComment } = useDeleteComment();
  const { deletePost } = useDeletePost();

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 p-2 sm:p-4">
      <div className="bg-[rgb(59,57,57)] rounded-lg w-full h-full sm:w-[95%] sm:h-[95%] lg:w-[90%] lg:h-[90%] xl:w-[75%] xl:max-w-7xl flex flex-col lg:flex-row overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-600 lg:hidden">
          <div className="flex items-center space-x-3">
            <img
              src={post.user.profilePicture.image}
              className="object-cover rounded-full w-8 h-8"
              alt="Profile"
            />
            <span className="text-white font-semibold text-sm">
              {post.user.username}
            </span>
          </div>
          <div className="flex space-x-4">
            {userId && post.user.id && (
              <button
                onClick={() => {
                  deletePost(post.id);
                  setModalOpen();
                }}
                className="text-white text-sm font-bold hover:text-gray-300"
              >
                Delete
              </button>
            )}
            <button
              onClick={() => setModalOpen()}
              className="text-white text-xl font-bold hover:text-gray-300"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 lg:flex-[2] flex justify-center items-center bg-black">
          <img
            src={getImageUrl(post.file.url)}
            alt={post.description}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="flex-1 lg:flex-[1] flex flex-col min-h-0">
          <div className="hidden lg:flex justify-between items-center p-4 border-b border-gray-600">
            <div className="flex items-center space-x-4">
              <img
                src={post.user.profilePicture.image}
                className="object-cover rounded-full w-10 h-10"
                alt="Profile"
              />
              <span className="text-white font-semibold">
                {post.user.username}
              </span>
            </div>
            <div className="flex space-x-4">
              {userId && post.user.id && (
                <button
                  onClick={() => {
                    deletePost(post.id);
                    setModalOpen();
                  }}
                  className="text-white text-sm font-bold hover:text-gray-300"
                >
                  Delete
                </button>
              )}
              <button
                onClick={() => setModalOpen()}
                className="text-white text-xl font-bold hover:text-gray-300"
              >
                ×
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 min-h-0">
            <div className="mb-4 pb-4 border-b border-gray-600">
              <div className="flex items-start space-x-3">
                <img
                  src={post.user.profilePicture.image}
                  className="object-cover rounded-full w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"
                  alt="Profile"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm sm:text-base">
                    <span className="font-semibold">{post.user.username}</span>{' '}
                    <span className="break-words">
                      {parseText(post.description)}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {calculateTimeSince(post.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {post.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  isOwnComment={userId === comment.user.id}
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

          <div className="border-t border-gray-600 p-4 space-y-3">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <FontAwesomeIcon
                icon={faHeart}
                className={`${
                  isLiked ? 'text-red-500' : 'text-gray-500'
                } h-5 w-5 sm:h-6 sm:w-6 cursor-pointer hover:text-red-500 transition-colors`}
                onClick={() => {
                  if (likeActionLoading) return;

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
                className="text-gray-500 h-5 w-5 sm:h-6 sm:w-6 cursor-pointer hover:text-gray-300 transition-colors"
                onClick={() => {
                  commentRef.current?.focus();
                }}
              />
            </div>

            <p className="text-white text-sm font-semibold">
              {postLikes.length} {postLikes.length === 1 ? 'like' : 'likes'}
            </p>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <input
                ref={commentRef}
                placeholder="Add a comment..."
                className="bg-transparent border-b border-gray-600 text-gray-300 placeholder-gray-400 focus:outline-none flex-1 py-2 text-sm sm:text-base focus:border-gray-400 transition-colors"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (!commentRef.current?.value) return;

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
                  }
                }}
              />
              <button
                disabled={loading}
                className="text-blue-500 font-semibold text-sm hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors px-2"
                onClick={() => {
                  if (!commentRef.current?.value) return;

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
                {editing ? 'Update' : 'Post'}
              </button>
              {(commentRef.current?.value || editing) && (
                <button
                  className="text-gray-400 text-sm hover:text-gray-300 transition-colors"
                  onClick={() => {
                    if (commentRef.current) {
                      commentRef.current.value = '';
                    }
                    replyRef.current = undefined;
                    setEditing(undefined);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
