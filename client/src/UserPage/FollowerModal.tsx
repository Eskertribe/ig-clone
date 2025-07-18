import { FC, useEffect } from 'react';
import { useGetFollowing } from '../hooks/useGetFollowing';
import { useNavigate } from 'react-router-dom';
import { User } from '../UserListComponent/User';

export const FollowerModal: FC<{
  dataType: 'following' | 'followers';
  userId: string;
  closeModal: () => void;
}> = ({ dataType, userId, closeModal }) => {
  const { followers, fetchFollowers, following, fetchFollowing } =
    useGetFollowing();
  const navigate = useNavigate();

  useEffect(() => {
    if (dataType === 'following') {
      fetchFollowing(userId);
    } else {
      fetchFollowers(userId);
    }
  }, [userId]);

  if (!userId) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-[rgb(59,57,57)] p-4 w-[30%] rounded-lg h-[50vh] flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-white text-lg font-bold">Followers</h2>
          <button onClick={() => closeModal()} className="text-white">
            X
          </button>
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-1">
          {followers.length > 0 &&
            dataType === 'followers' &&
            followers.map((follower) => (
              <User
                key={follower.id}
                user={follower}
                onClick={() => {
                  close();
                  navigate(`/user/${follower.username}`);
                }}
              />
            ))}
          {following.length > 0 &&
            dataType === 'following' &&
            following.map((following) => (
              <User
                key={following.id}
                user={following}
                onClick={() => {
                  close();
                  navigate(`/user/${following.username}`);
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
