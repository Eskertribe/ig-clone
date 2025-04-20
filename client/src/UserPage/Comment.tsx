import { FC } from "react";
import { calculateTimeSince } from "../utils/timeDifference"

export const Comment: FC<{ user: PostUser | CommentUser; text: string; timeStamp: string | Date }> = ({ user, text, timeStamp }) => {
  return (
    <div className="my-2">
      <div className="flex items-center space-x-4">
        <img
          src={user.profilePicture.image}
          className="object-cover rounded-full w-[4em] h-[4em]"
        />
        <div>
          <p className="text-white">
            <b>{user.username}</b> {text}
          </p>
          <p className="text-xs text-white">{calculateTimeSince(timeStamp)}</p>
        </div>
      </div>
    </div>
  )
}