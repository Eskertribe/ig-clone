import { useEffect } from 'react';
import { useGetConversations } from '../hooks/useGetConversations';
import { NewConversationFab } from './NewConversationFab';
import { useNavigate } from 'react-router-dom';

export const ConversationList = () => {
  const { fetchConversations, conversations, loading } = useGetConversations();
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
      {!loading && conversations.length === 0 && <p>No conversations found.</p>}
      {loading && <p>Loading conversations...</p>}
      <ul className="w-full max-w-md">
        {conversations.map((conversation: Conversation) => (
          <li
            key={conversation.id}
            className="p-4 border-b border-gray-300 cursor-pointer"
            onClick={() => navigate('/conversation/' + conversation.id)}
          >
            <p className="truncate">
              Participants:{' '}
              {conversation.participants
                .map((participant: User) => participant.username)
                .join(', ')}
            </p>
            <p>Messages: {conversation.messages.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
