import { useEffect } from 'react';
import { useGetConversations } from '../hooks/useGetConversations';
import { NewConversationFab } from './NewConversationFab';

export const ConversationList = () => {
  const { fetchConversations, conversations, loading } = useGetConversations();

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
          <li key={conversation.id} className="p-4 border-b border-gray-300">
            <h3 className="font-bold">Conversation ID: {conversation.id}</h3>
            <p>Participants:</p>
            <ul>
              {conversation.participants.map((participant: User) => (
                <li key={participant.id}>{participant.username}</li>
              ))}
            </ul>
            <p>Messages:</p>
            <ul>
              {conversation.messages.map((message: Message) => (
                <li key={message.id}>{message.content}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
