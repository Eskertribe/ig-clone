import { FC, useContext } from 'react';
import { PostModalContext } from '../PostModalContext/PostModalContext';
import { Comment } from './Comment';

export const PostModal: FC = () => {
  const { isOpen, post, setModalOpen } = useContext(PostModalContext);

  if (!isOpen || !post) {
    return null
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-[rgb(59,57,57)] p-4 w-[75%] rounded-lg h-[90vh] flex flex-row">
        <div className="flex justify-between items-start mb-4">
          <button onClick={() => setModalOpen()} className="text-white">X</button>
        </div>
        <div className="flex-[2] flex justify-center items-center">
          <img src={post.file.image} />
        </div>
        <div className="flex-[1] m-4">
          <div className="flex items-center space-x-4">
            <img
              src={post.user.profilePicture.image}
              className="object-cover rounded-full w-[4em] h-[4em]"
            />
            <div>
              <p className="text-white">
                <b>{post.user.username}</b>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-600 my-4"></div>
          <Comment user={post.user} text={post.description} timeStamp={post.createdAt} />
          <div>
            {post.comments.map((comment) => (
              <Comment
                key={comment.id}
                user={comment.user}
                text={comment.text}
                timeStamp={comment.createdAt}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )

};