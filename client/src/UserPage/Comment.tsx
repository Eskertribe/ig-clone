import { FC } from 'react';
import { calculateTimeSince } from '../utils/timeDifference';

type CommentProps = {
  reply: (commentId?: string) => void;
  comment: PostComment;
};

export const Comment: FC<CommentProps> = ({ comment, reply }) => {
  const { id, user, text, createdAt: timeStamp, replies } = comment;

  return (
    <div className="my-2">
      <div className="flex items-center space-x-4">
        <img
          src={user.profilePicture.image}
          className="object-cover rounded-full w-[4em] h-[4em]"
        />
        <div className="flex flex-col">
          <p className="text-white">
            <b>{user.username}</b> {text}
          </p>
          <div className="flex items-center space-x-2">
            <p className="text-xs text-white">
              {calculateTimeSince(timeStamp)}
            </p>
            {
              <button
                onClick={() => reply(id)}
                className="text-white-500 text-xs"
              >
                Reply
              </button>
            }
            {replies.length > 0 && (
              <button className="text-white-500 text-xs">Show replies</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
