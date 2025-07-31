import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDeleteMessage } from '../hooks/useDeleteMessage';

export const Message: React.FC<{
  message: Message;
  observer?: string;
  deleteCallback?: () => void;
}> = ({ message, observer, deleteCallback }) => {
  const { deleteMessage } = useDeleteMessage();
  const isOwnMessage = observer === message.sender.id;
  const date = new Date(message.createdAt);
  const messageSentAt = `${date.getDate().toString().padStart(2, '0')}.${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}.${date.getFullYear()} ${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

  return (
    <div
      key={message.id}
      className={`flex flex-col ${isOwnMessage ? 'self-end' : 'self-start'} max-w-[45%]`}
    >
      <div
        className={`rounded-lg p-2 shadow text-gray-800 ${isOwnMessage ? 'bg-green-200' : 'bg-white'} flex items-center justify-between`}
      >
        <div className="flex flex-col flex-1">
          <span className="font-semibold mb-1">
            {!isOwnMessage && `${message.sender.username}:`}
          </span>
          <p>{message.content}</p>
          <span className="text-gray-500 text-xs">{messageSentAt}</span>
        </div>
        {isOwnMessage && (
          <button
            className="ml-4 text-red-600 hover:text-red-800 flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FontAwesomeIcon
              icon={faTrash}
              className="h-5 w-5"
              onClick={() => {
                deleteMessage(message.id, () => deleteCallback?.());
              }}
            />
          </button>
        )}
      </div>
    </div>
  );
};
