import { FC, useEffect } from 'react';
import { useGetFollowing } from '../hooks/useGetFollowing';

export const FollowerModal: FC<{
  dataType: 'following' | 'followers';
  userId: string;
  closeModal: () => void;
}> = ({ dataType, userId, closeModal }) => {
  const { followers, fetchFollowers, following, fetchFollowing } =
    useGetFollowing();

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
              <div
                key={follower.id}
                className="flex items-center space-x-4 mb-2"
              >
                <img
                  src={follower.profilePicture.image}
                  className="object-cover rounded-full w-[3em] h-[3em]"
                />
                <div>
                  <p className="text-white break-all font-bold">
                    {follower.username}
                  </p>
                  <p className="text-gray-400 break-all">{follower.name}</p>
                </div>
              </div>
            ))}
          {following.length > 0 &&
            dataType === 'following' &&
            following.map((following) => (
              <div
                key={following.id}
                className="flex items-center space-x-4 mb-2"
              >
                <img
                  src={following.profilePicture.image}
                  className="object-cover rounded-full w-[3em] h-[3em]"
                />
                <div>
                  <p className="text-white break-all font-bold">
                    {following.username}
                  </p>
                  <p className="text-gray-400 break-all">{following.name}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
