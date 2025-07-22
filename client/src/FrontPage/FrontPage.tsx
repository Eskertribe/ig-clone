import React, { useContext, useEffect } from 'react';
import { useFetchUserFeed } from '../hooks/useGetUserFeed';
import { FeedPost } from '../Post/FeedPost';
import { PostModal } from '../UserPage/PostModal';
import { PostModalContext } from '../PostModalContext/PostModalContext';

const FrontPage: React.FC = () => {
  const { userFeed, getUserFeed } = useFetchUserFeed();
  const { isOpen, setModalOpen } = useContext(PostModalContext);

  useEffect(() => {
    getUserFeed();
  }, []);

  return (
    <div className="bg-gray-200 h-screen flex flex-col  items-center overflow-y-scroll pt-4">
      {userFeed.map((post) => {
        return (
          <FeedPost
            key={post.id}
            post={post}
            openModal={() => setModalOpen(post)}
          />
        );
      })}
      {isOpen && <PostModal />}
    </div>
  );
};

export { FrontPage };
