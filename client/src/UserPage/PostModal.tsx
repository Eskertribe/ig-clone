import { FC, useContext, useState } from 'react';
import { PostModalContext } from '../PostModalContext/PostModalContext';
import { Comment } from './Comment';
import { useAddComment } from '../hooks/useAddComment';

export const PostModal: FC = () => {
  const { isOpen, post, setModalOpen } = useContext(PostModalContext);
  const [comment, setComment] = useState<string>('');
  const { addComment, loading } = useAddComment();

  const handleSuccess = (newComment: any) => { // TODO: Define a proper type for newComment
    setComment('');
    post?.comments.push(newComment);
  };

  if (!isOpen || !post) {
    return null
  };

  console.log(post);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-[rgb(59,57,57)] p-4 w-[75%] rounded-lg h-[90vh] flex flex-row">
        <div className="flex justify-between items-start mb-4">
          <button onClick={() => setModalOpen()} className="text-white">X</button>
        </div>
        <div className="flex-[2] flex justify-center items-center">
          <img src={post.file.image} />
        </div>
        <div className="flex-[1] m-4 flex flex-col justify-between">
          <div>
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
            <div className="border-t border-gray-600 my-4" />
            <div className="scroll-y h-[60vh] overflow-y-auto">
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
          <div className="flex items-center space-x-2">
            <input
              placeholder="Add a comment..."
              className="bg-transparent border-b border-gray-600 text-gray-300 placeholder-gray-300 focus:outline-none flex-1"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button disabled={loading} className="text-blue-500" onClick={() => addComment(post.id, comment, handleSuccess)}>Send</button>
          </div>
        </div>
      </div>
    </div >
  )

};