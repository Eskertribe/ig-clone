import { useContext, useEffect } from 'react';
import { useGetConversations } from '../hooks/useGetConversations';
import { NewConversationFab } from './NewConversationFab';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDeleteConversation } from '../hooks/useDeleteConversation';
import { AuthContext } from '../AuthContext/AuthContext';

export const ConversationList = () => {
  const { userId } = useContext(AuthContext);
  const { fetchConversations, conversations, loading } = useGetConversations();
  const { deleteConversation } = useDeleteConversation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <div
      className={`bg-gray-200 h-screen flex flex-col items-center pt-4 ${
        conversations.length > 0 ? 'overflow-y-scroll' : 'overflow-y-hidden'
      }`}
    >
      <NewConversationFab />
      <h2>Conversations</h2>
      {loading && <p>Loading conversations...</p>}
      {!loading && conversations.length === 0 && <p>No conversations found.</p>}
      {conversations.length > 0 && (
        <div className="w-full flex flex-col items-center">
          {conversations.map((conversation: Conversation) => (
            <div
              key={conversation.id}
              className="flex items-center justify-between p-4 border-b border-gray-300 cursor-pointer max-w-md bg-white rounded-lg shadow-md mt-4 w-full"
              onClick={() => navigate('/conversation/' + conversation.id)}
            >
              <div className="flex-1 min-w-0">
                <p className="truncate">
                  Participants:{' '}
                  {conversation.participants
                    .map((participant: User) => participant.username)
                    .join(', ')}
                </p>
                <p>Messages: {conversation.messages.length}</p>
                {conversation.messages.length > 0 && (
                  <p className="truncate">
                    Last message:{' '}
                    {
                      conversation.messages[conversation.messages.length - 1]
                        .content
                    }
                  </p>
                )}
              </div>
              {userId === conversation.createdBy && (
                <button
                  className="ml-4 text-red-600 hover:text-red-800 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="h-5 w-5"
                    onClick={() => deleteConversation(conversation.id)}
                  />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
