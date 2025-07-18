import React, { useContext, useEffect, useState } from 'react';
import { useGetPosts } from '../hooks/useGetPosts';
import { useGetUserProfile } from '../hooks/useGetUserProfile';
import Post from '../Post/Post';
import { PostModalContext } from '../PostModalContext/PostModalContext';
import { FollowerModal } from './FollowerModal';
import { PostModal } from './PostModal';
import { useParams } from 'react-router-dom';
import { useFollow } from '../hooks/useFollow';
import { AuthContext } from '../AuthContext/AuthContext';

const UserPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { username } = useParams<{ username: string }>();
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const { userData, loading, fetchUserProfileData } = useGetUserProfile();
  const { posts, loading: postsLoading, fetchPosts } = useGetPosts();
  const { setModalOpen, isOpen } = useContext(PostModalContext);
  const { addFollow, removeFollow } = useFollow();

  useEffect(() => {
    if (username) {
      fetchUserProfileData(username);
      fetchPosts(username);
    }
  }, [username]);

  if (loading) {
    return (
      <div className="bg-gray-200 h-screen flex justify-center items-center">
        <h1>User Page</h1>
      </div>
    );
  }

  if (!userData || !username) {
    return (
      <div className="bg-gray-200 h-screen flex justify-center items-center">
        <h1>User not found</h1>
      </div>
    );
  }

  const isOwnPage = user === username;

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
              <div className="flex flex-row items-center space-x-2">
                <h2 className="text-xl font-bold">@{userData.username}</h2>
                {!isOwnPage && (
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                    onClick={() => {
                      if (!userData.isFollowed) {
                        addFollow(username, () =>
                          fetchUserProfileData(username)
                        );
                      } else {
                        removeFollow(username, () =>
                          fetchUserProfileData(username)
                        );
                      }
                    }}
                  >
                    {!userData?.isFollowed ? 'Follow' : 'Unfollow'}
                  </button>
                )}
              </div>
              <div className="flex flex-row space-x-4">
                <p className="text-gray-500">
                  <b>{posts?.length ?? 0}</b> posts
                </p>
                <p className="text-gray-500">
                  <a
                    onClick={() => setIsFollowerModalOpen(true)}
                    className="cursor-pointer"
                  >
                    <b>{userData.followers}</b> followers
                  </a>
                </p>
                <p className="text-gray-500">
                  <a
                    onClick={() => setIsFollowingModalOpen(true)}
                    className="cursor-pointer"
                  >
                    <b>{userData.following}</b> following
                  </a>
                </p>
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
            {posts.length > 0 ? (
              posts?.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  toggleModal={() => setModalOpen(post)}
                />
              ))
            ) : (
              <p>No posts found</p>
            )}
          </div>
        )}
      </div>
      {isOpen && <PostModal />}
      {/* TODO: Refactor */}
      {isFollowerModalOpen && (
        <FollowerModal
          dataType="followers"
          userId={userData.id}
          closeModal={() => setIsFollowerModalOpen(false)}
        />
      )}
      {isFollowingModalOpen && (
        <FollowerModal
          dataType="following"
          userId={userData.id}
          closeModal={() => setIsFollowingModalOpen(false)}
        />
      )}
    </>
  );
};

export { UserPage };
