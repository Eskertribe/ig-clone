import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateConversation } from '../hooks/useCreateConversation';
import { useSearch } from '../hooks/useSearch';
import { User } from '../UserListComponent/User';

export const NewConversationFab = () => {
  const [open, setOpen] = useState(false);
  const [recipients, setRecipients] = useState<User[]>([]);
  const { search, users, loading } = useSearch();
  const { createConversation } = useCreateConversation();
  const navigate = useNavigate();
  const debounceTimeout = useRef<number | null>(null);

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

  const navigateToConversation = (conversationId: string) => {
    navigate(`/conversation/${conversationId}`);
  };

  const newMessage = <FontAwesomeIcon size="xl" icon={faPlus} />;

  return (
    <div className="relative top-6 left-[45%] ">
      <div
        className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-white cursor-pointer shadow-lg hover:bg-blue-600 transition-colors"
        onClick={() => setOpen((prev) => !prev)}
      >
        {newMessage}
      </div>
      {open && (
        <div className="absolute right-0 top-14 bg-white shadow-lg rounded-lg p-4 z-40 w-[35rem] min-h-[20rem]">
          <input
            type="text"
            placeholder="Search recipients"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            onChange={(e) => handleInputChange(e)}
          />
          <div className="max-h-60 flex space-x-4 h-[15rem]">
            <div className="w-1/2 overflow-y-auto border-r pr-2">
              <div className="text-gray-500 text-sm mb-2">Recipients</div>
              {recipients.length === 0 ? (
                <div className="text-gray-400">No recipients</div>
              ) : (
                <div className="space-y-2">
                  {recipients.map((user) => (
                    <User key={user.id} user={user} onClick={() => {}} />
                  ))}
                </div>
              )}
            </div>
            <div className="w-1/2 overflow-y-auto pl-2">
              <div className="space-y-2">
                {!loading && users.length === 0 && (
                  <p className="text-gray-500">No results</p>
                )}
                {users.length > 0 && (
                  <div>
                    {users.map((user) => (
                      <User
                        key={user.id}
                        user={user}
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                          if (!recipients.some((u) => u.id === user.id)) {
                            setRecipients((state) => [...state, user]);
                          }
                          e.stopPropagation();
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600 transition-colors"
            onClick={() =>
              createConversation(recipients, navigateToConversation)
            }
          >
            Create conversation
          </button>
        </div>
      )}
    </div>
  );
};
