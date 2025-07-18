import { FC, useRef } from 'react';
import { useSearchUsers } from '../hooks/useSearch';
import { useNavigate } from 'react-router-dom';

export const SearchDrawer: FC<{ close: () => void }> = ({ close }) => {
  const debounceTimeout = useRef<number | null>(null);
  const { findUsers, loading, result } = useSearchUsers();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (value.trim().length >= 3 && !loading) {
        findUsers(value);
      }
    }, 500);
  };

  return (
    <div className="fixed translate-x-[50%] h-screen w-[20vw] bg-[#3b3939]">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-white">Search</h2>
          <button
            className=" text-xl leading-none hover:text-gray-700 focus:outline-none"
            onClick={close}
            type="button"
          >
            x
          </button>
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          onChange={(e) => handleInputChange(e)}
        />
        <div className="space-y-2">
          {!loading && result.length === 0 && (
            <p className="text-white">No results</p>
          )}
          {result.length > 0 && (
            <div className="overflow-y-auto overflow-x-hidden flex-1">
              {result.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center space-x-4 mb-2 cursor-pointer border-b border-gray-600 pb-2 margin-bottom-5"
                  onClick={() => {
                    close();
                    navigate(`/user/${user.username}`);
                  }}
                >
                  <img
                    src={user.profilePicture.image}
                    className="object-cover rounded-full w-[3em] h-[3em]"
                  />
                  <div>
                    <p className="text-white break-all font-bold">
                      {user.username}
                    </p>
                    <p className="text-gray-400 break-all">{user.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
