import { useParams } from 'react-router-dom';
import { useGetConversation } from '../hooks/useGetConversation';
import { useContext, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useSendMessage } from '../hooks/useSendMessage';
import { Message } from './Message';
import { AuthContext } from '../AuthContext/AuthContext';

export const Conversation = () => {
  const { userId } = useContext(AuthContext);
  const { conversation, loading, fetchConversation } = useGetConversation();
  const { sendMessage } = useSendMessage();
  const { id } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      fetchConversation(id);
    }
  }, [id]);

  if (!conversation || loading) {
    return null;
  }

  return (
    <div className="bg-gray-200 h-screen flex flex-col items-center pt-4">
      <h2>Conversating:</h2>
      <p className="truncate">
        {conversation.participants
          .map((participant: User) => participant.username)
          .join(', ')}
      </p>
      <div
        style={{ height: '80vh' }}
        className="w-full overflow-y-auto flex flex-col gap-2 mt-4 px-4"
      >
        {conversation.messages.length > 0
          ? conversation.messages.map((message: Message) => (
              <Message
                key={message.id}
                message={message}
                observer={userId}
                deleteCallback={() => (id ? fetchConversation(id) : null)}
              />
            ))
          : 'No messages... Yet!'}
      </div>
      <div
        className="w-full px-4 py-2 bg-gray-100 flex items-center"
        style={{ position: 'sticky', bottom: 0 }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message..."
          className="flex-1 rounded-full border border-gray-300 px-4 py-2 mr-2 focus:outline-none"
        />
        <button
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => {
            if (inputRef.current && inputRef.current.value.trim() !== '') {
              sendMessage(conversation.id, inputRef.current.value, () =>
                id ? fetchConversation(id) : null
              );
              inputRef.current.value = '';
            }
          }}
        >
          {<FontAwesomeIcon icon={faPaperPlane} className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
};
