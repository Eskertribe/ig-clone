import { FC } from 'react';

export const User: FC<{
  user: User | Following;
  onClick: () => void;
}> = ({ user, onClick }) => {
  return (
    <div
      key={user.id}
      className="flex items-center space-x-4 mb-2 cursor-pointer border-b border-gray-600 pb-2 margin-bottom-5"
      onClick={() => onClick()}
    >
      <img
        src={user.profilePicture.image}
        className="object-cover rounded-full w-[3em] h-[3em]"
      />
      <div>
        <p className="text-white break-all font-bold">{user.username}</p>
        <p className="text-gray-400 break-all">{user.name}</p>
      </div>
    </div>
  );
};
