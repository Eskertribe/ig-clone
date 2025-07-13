import { faComment } from '@fortawesome/free-solid-svg-icons/faComment';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useContext, useMemo, useRef } from 'react';
import { useAddComment } from '../hooks/useAddComment';
import { useLike } from '../hooks/useLike';
import { PostModalContext } from '../PostModalContext/PostModalContext';
import { calculateTimeSince } from '../utils/timeDifference';
import { Comment } from './Comment';

export const PostModal: FC = () => {
  const { isOpen, post, postLikes, setModalOpen, fetchLikes } =
    useContext(PostModalContext);
  const { addComment, loading } = useAddComment();
  const { addLike, removeLike, loading: likeActionLoading } = useLike();
  const commentRef = useRef<HTMLInputElement>(null);
  const replyRef = useRef<string>(undefined);

  const handleSuccess = (newComment: PostComment) => {
    if (replyRef.current) {
      const postComment = post?.comments.find(
        (comment) => comment.id === replyRef.current
      );
      if (postComment) {
        postComment.replies.push(newComment);
      }
    } else {
      post?.comments.push(newComment);
    }

    replyRef.current = undefined;
    commentRef.current!.value = '';
  };

  const isLiked = useMemo(() => {
    if (!post) {
      return false;
    }

    return postLikes.some((like) => like.userId === post.user.id);
  }, [postLikes, post]);

  if (!isOpen || !post) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-[rgb(59,57,57)] p-4 w-[75%] rounded-lg h-[90vh] flex flex-row">
        <div className="flex justify-between items-start mb-4">
          <button onClick={() => setModalOpen()} className="text-white">
            X
          </button>
        </div>
        <div className="flex-[2] flex justify-center items-center">
          <img src={post.file.image} />
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
                      <b>{post.user.username}</b> {post.description}
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
                    reply={(id) => {
                      replyRef.current = id;
                      commentRef.current?.focus();
                      commentRef.current!.value =
                        '@' + comment.user.username + ' ';
                    }}
                    key={comment.id}
                    comment={comment}
                    postId={post.id}
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
                  removeLike(post.id, () => {
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
