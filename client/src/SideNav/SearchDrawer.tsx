import { FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import { User } from '../UserListComponent/User';

export const SearchDrawer: FC<{ close: () => void }> = ({ close }) => {
  const debounceTimeout = useRef<number | null>(null);
  const { search, loading, users, hashtags } = useSearch();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (!loading) {
        search(value);
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
          placeholder="Search user or #hashtag"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          onChange={(e) => handleInputChange(e)}
        />
        <div className="space-y-2">
          {!loading && users.length === 0 && hashtags.length === 0 && (
            <p className="text-white">No results</p>
          )}
          {users.length > 0 && (
            <div className="overflow-y-auto overflow-x-hidden flex-1">
              {users.map((user) => (
                <User
                  key={user.id}
                  user={user}
                  onClick={() => {
                    close();
                    navigate(`/user/${user.username}`);
                  }}
                />
              ))}
            </div>
          )}
          {hashtags.length > 0 && (
            <div className="mt-4">
              <ul className="list pl-5">
                {hashtags.map((hashtag) => (
                  <li
                    key={hashtag.id}
                    className="text-white cursor-pointer hover:underline"
                    onClick={() => {
                      close();
                      navigate(`/hashtag/${hashtag.name}`);
                    }}
                  >
                    #{hashtag.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
