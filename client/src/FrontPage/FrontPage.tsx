import React, { useContext, useEffect, useState } from 'react';
import { useFetchUserFeed } from '../hooks/useGetUserFeed';
import { FeedPost } from '../Post/FeedPost';
import { PostModal } from '../UserPage/PostModal';
import { PostModalContext } from '../PostModalContext/PostModalContext';

const FrontPage: React.FC = () => {
  const { userFeed, getUserFeed } = useFetchUserFeed();
  const { isOpen, setModalOpen } = useContext(PostModalContext);
  const [showSeenPosts, setShowSeenPosts] = useState(false);

  useEffect(() => {
    getUserFeed(showSeenPosts);
  }, [showSeenPosts]);

  return (
    <div
      className={`bg-gray-200 h-screen flex flex-col items-center pt-4 ${
        userFeed.length > 0 ? 'overflow-y-scroll' : 'overflow-y-hidden'
      }`}
    >
      {userFeed.length > 0 ? (
        userFeed.map((post) => {
          return (
            <FeedPost
              key={post.id}
              post={post}
              openModal={() => setModalOpen(post)}
            />
          );
        })
      ) : (
        <div className="flex items-center justify-center flex-col h-full">
          <p>You are up to date...</p>
          <button
            onClick={() => setShowSeenPosts(true)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Show seen posts
          </button>
        </div>
      )}
      {isOpen && <PostModal />}
    </div>
  );
};

export { FrontPage };
