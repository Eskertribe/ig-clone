import React, { useContext, useEffect } from 'react';
import Post from '../Post/Post';
import { useGetUserProfile } from '../hooks/useGetUserProfile';
import { PostModal } from './PostModal';
import { useGetPosts } from '../hooks/useGetPosts';
import { PostModalContext } from '../PostModalContext/PostModalContext';

const UserPage: React.FC = () => {
  const { userData, loading, fetchUserProfileData } = useGetUserProfile();
  const { posts, loading: postsLoading, fetchPosts } = useGetPosts();
  const { setModalOpen, isOpen } = useContext(PostModalContext);

  useEffect(() => {
    fetchUserProfileData();
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-200 h-screen flex justify-center items-center">
        <h1>User Page</h1>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-gray-200 h-screen flex justify-center items-center">
        <h1>User not found</h1>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-200 h-screen flex flex-col">
        <div className="h-[20vh]">
          <div
            key={userData.id}
            className="flex flex-row items-center space-x-4 h-full"
          >
            <div className="border m-1 flex items-center justify-center h-24 w-24 overflow-hidden rounded-full">
              {userData.profilePicture?.image && (
                <img
                  src={userData.profilePicture?.image}
                  className="object-cover h-full w-full rounded-full"
                />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">@{userData.username}</h2>
              <div className="flex flex-row space-x-4">
                <p className="text-gray-500">{posts?.length ?? 0} posts</p>
                <p className="text-gray-500">{userData.followers} followers</p>
                <p className="text-gray-500">{userData.following} following</p>
              </div>
              <div className="flex flex-col space-y-2 mt-4">
                <p className="text-gray-700">{userData?.name}</p>
                <p className="text-gray-500">{userData?.bio}</p>
              </div>
            </div>
          </div>
        </div>
        {!postsLoading && (
          <div className="h-[80vh] grid grid-rows-3 grid-cols-3 gap-1 p-2">
            {posts?.map((post) => (
              <Post
                key={post.id}
                post={post}
                toggleModal={() => setModalOpen(post)}
              />
            ))}
          </div>
        )}
      </div>
      {isOpen && <PostModal />}
    </>
  );
};

export { UserPage };
