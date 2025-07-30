import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';
import { useFollow } from '../hooks/useFollow';
import { useGetPosts } from '../hooks/useGetPosts';
import { useGetUserProfile } from '../hooks/useGetUserProfile';
import { PostModalContext } from '../PostModalContext/PostModalContext';
import { getImageUrl } from '../utils/getImage';
import { FollowerModal } from './FollowerModal';
import { PostModal } from './PostModal';

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
      <div className="bg-gray-200 min-h-screen flex flex-col">
        <div className="px-4 py-6 md:px-8">
          <div
            key={userData.id}
            className="flex flex-col sm:flex-row items-center sm:space-x-6"
          >
            <div className="border m-1 flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full">
              {userData.profilePicture?.image && (
                <img
                  src={userData.profilePicture?.image}
                  alt={`${userData.username}'s profile`}
                  className="object-cover h-full w-full rounded-full"
                />
              )}
            </div>
            <div className="mt-4 sm:mt-0 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
                <h2 className="text-xl font-bold">@{userData.username}</h2>
                {!isOwnPage && (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-1 rounded mt-2 sm:mt-0"
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
              <div className="flex flex-row space-x-4 justify-center sm:justify-start mt-3">
                <p className="text-gray-500">
                  <b>{posts?.length ?? 0}</b> posts
                </p>
                <p className="text-gray-500">
                  <a
                    onClick={() =>
                      userData.followers && setIsFollowerModalOpen(true)
                    }
                    className="cursor-pointer"
                  >
                    <b>{userData.followers}</b> followers
                  </a>
                </p>
                <p className="text-gray-500">
                  <a
                    onClick={() =>
                      userData.following && setIsFollowingModalOpen(true)
                    }
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
          <div className="flex-1 grid grid-cols-2 gap-1 sm:gap-2 p-2">
            {posts.length > 0 ? (
              posts?.map((post) => (
                <div
                  key={post.id}
                  className="border m-1 flex items-center justify-center aspect-square w-full overflow-hidden"
                >
                  {post.file.url && (
                    <img
                      src={getImageUrl(post.file.url)}
                      alt={post.description}
                      onClick={() =>
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        setModalOpen({ id: post.id, url: post.file.url })
                      }
                      className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
                      loading="lazy"
                    />
                  )}
                </div>
              ))
            ) : (
              <p className="col-span-full text-center py-8 text-gray-500">
                No posts found
              </p>
            )}
          </div>
        )}
      </div>
      {isOpen && <PostModal />}
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
