export const Message: React.FC<{ message: Message; observer?: string }> = ({
  message,
  observer,
}) => {
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
      className={`flex flex-col self-${isOwnMessage ? 'end' : 'start'} max-w-[45%]`}
    >
      <div
        className={`rounded-lg p-2 shadow text-gray-800 ${isOwnMessage ? 'bg-green-200' : 'bg-white'}`}
      >
        <span className="font-semibold mb-1">
          {!isOwnMessage && `${message.sender.username}:`}
        </span>
        <p>{message.content}</p>
        <span className="text-gray-500 text-xs">{messageSentAt}</span>
      </div>
    </div>
  );
};
