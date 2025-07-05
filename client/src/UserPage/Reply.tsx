import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useMemo } from 'react';
import { calculateTimeSince } from '../utils/timeDifference';

type CommentProps = {
  addLike: () => void;
  comment: PostComment;
  likeActionLoading: boolean;
  reply: () => void;
};

export const Reply: FC<CommentProps> = ({
  addLike,
  comment,
  likeActionLoading,
  reply,
}) => {
  const { user, text, createdAt: timeStamp, likes } = comment;

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
          className="object-cover rounded-full w-[2em] h-[2em]"
        />
        <div className="flex flex-col w-full">
          <div className="flex items-center space-x-2 w-full">
            <p className="text-white w-5/6 text-xs break-all">
              <b>{user.username}</b> {text}
            </p>
            <p className="w-1/6 text-center">
              {' '}
              <FontAwesomeIcon
                icon={faHeart}
                className={`text-${isLiked ? 'red' : 'gray'}-500 h-[1em] cursor-pointer hover:text-red-500`}
                onClick={() => {
                  if (likeActionLoading) {
                    return;
                  }

                  addLike();
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
                onClick={() => reply()}
                className="text-white-500 text-xs"
              >
                Reply
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
