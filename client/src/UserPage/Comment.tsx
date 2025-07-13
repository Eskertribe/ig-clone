import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useMemo, useState } from 'react';
import { useGetLikes } from '../hooks/useGetLikes';
import { useLike } from '../hooks/useLike';
import { calculateTimeSince } from '../utils/timeDifference';
import { Reply } from './Reply';

type CommentProps = {
  reply: (id: string) => void;
  comment: PostComment;
  isReply?: boolean;
  postId: string;
};

export const Comment: FC<CommentProps> = ({ postId, comment, reply }) => {
  const { user, text, createdAt: timeStamp, replies, likes } = comment;
  const [showReplies, setShowReplies] = useState(replies.length === 1);
  const { addLike, loading: likeActionLoading } = useLike();
  const { fetchLikes } = useGetLikes();

  const isLiked = useMemo(() => {
    return likes.some(
      (like) => like.commentId === comment.id && like.userId === user.id
    );
  }, [comment.id, likes, user.id]);

  return (
    <div className="my-2">
      <div className="flex items-center space-x-4">
        <img
          src={user.profilePicture.image}
          className="object-cover rounded-full w-[4em] h-[4em]"
        />
        <div className="flex flex-col w-full">
          <div className="flex items-center space-x-2 w-full">
            <p className="text-white w-5/6 break-all">
              <b>{user.username}</b> {text}
            </p>
            <p className="w-1/6 text-center">
              <FontAwesomeIcon
                icon={faHeart}
                className={`text-${isLiked ? 'red' : 'gray'}-500 h-[1.4em] cursor-pointer hover:text-red-500`}
                onClick={() => {
                  if (likeActionLoading) {
                    return;
                  }

                  addLike(postId, comment.id, () => {
                    fetchLikes(postId);
                  });

                  // isLiked
                  //   ? removeLike(post.id, () => {
                  //       fetchLikes(post.id);
                  //     })
                  //   : addLike(post.id, () => {
                  //       fetchLikes(post.id);
                  //     });
                }}
              />
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-xs text-white">
              {calculateTimeSince(timeStamp)}
            </p>
            {
              <button
                onClick={() => reply(comment.id)}
                className="text-white-500 text-xs"
              >
                Reply
              </button>
            }
            {replies?.length > 0 && (
              <button
                className="text-white-500 text-xs"
                onClick={() => {
                  setShowReplies(replies.length === 1 ? true : !showReplies);
                }}
              >
                Show replies
              </button>
            )}
          </div>
        </div>
      </div>
      {replies?.length > 0 && (
        <div className="ml-8">
          {showReplies && (
            <div>
              {replies.map((replyComment) => (
                <Reply
                  key={replyComment.id}
                  comment={replyComment}
                  reply={() => reply(replyComment.id)}
                  likeActionLoading={likeActionLoading}
                  addLike={() =>
                    addLike(postId, replyComment.id, () => {
                      fetchLikes(postId);
                    })
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
