import { FC, useState } from 'react';
import { calculateTimeSince } from '../utils/timeDifference';

type CommentProps = {
  reply: () => void;
  comment: PostComment;
  isReply?: boolean;
};

export const Comment: FC<CommentProps> = ({
  comment,
  reply,
  isReply = false,
}) => {
  const { user, text, createdAt: timeStamp, replies } = comment;
  const [showReplies, setShowReplies] = useState(false);

  const parentComment = (
    <div className="flex flex-col">
      <p className="text-white">
        <b>{user.username}</b> {text}
      </p>
      <div className="flex items-center space-x-2">
        <p className="text-xs text-white">{calculateTimeSince(timeStamp)}</p>
        {
          <button onClick={() => reply()} className="text-white-500 text-xs">
            Reply
          </button>
        }
        {replies.length > 0 && (
          <button
            className="text-white-500 text-xs"
            onClick={() => setShowReplies(!showReplies)}
          >
            Show replies
          </button>
        )}
      </div>
    </div>
  );

  const replyComment = (
    <div className="flex flex-col">
      <p className="text-white text-xs">
        <b>{user.username}</b> {text}
      </p>
      <div className="flex items-center space-x-2">
        <p className="text-xs text-white">{calculateTimeSince(timeStamp)}</p>
        {
          <button onClick={() => reply()} className="text-white-500 text-xs">
            Reply
          </button>
        }
        {replies.length > 0 && (
          <button
            className="text-white-500 text-xs"
            onClick={() => setShowReplies(!showReplies)}
          >
            Show replies
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="my-2">
      <div className="flex items-center space-x-4">
        {isReply ? (
          <img
            src={user.profilePicture.image}
            className="object-cover rounded-full w-[2em] h-[2em]"
          />
        ) : (
          <img
            src={user.profilePicture.image}
            className="object-cover rounded-full w-[4em] h-[4em]"
          />
        )}
        {isReply ? replyComment : parentComment}
      </div>
      {replies.length > 0 && (
        <div className="ml-8">
          {showReplies && (
            <div>
              {replies.map((replyComment) => (
                <Comment
                  isReply
                  key={replyComment.id}
                  comment={replyComment}
                  reply={() => reply()}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
