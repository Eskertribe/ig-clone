import { FC } from 'react';

interface PostModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
}

export const PostModal: FC<PostModalProps> = ({ isOpen, imageUrl, onClose }) => {
  if (!isOpen) {
    return null
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-[rgb(59,57,57)] p-4 w-1/2 aspect-square rounded-lg ">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="text-white">X</button>
        </div>
        <img src={imageUrl} />
      </div>
    </div>
  )

};