import React, { useEffect } from 'react';
import Post from '../Post/Post';
import { useGetUserProfile } from '../hooks/useGetUserProfile';

const UserPage: React.FC = () => {
  const { userData, loading, fetchUserProfileData } = useGetUserProfile()

  useEffect(() => {
    fetchUserProfileData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-200 h-screen flex justify-center items-center">
        <h1>User Page</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 h-screen flex flex-col">
      <div className="h-[20vh]"><h1>asd</h1></div>
      <div className="h-[80vh] grid grid-rows-3 grid-cols-3 gap-1 p-2">
        {userData?.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div >
  )

};

export { UserPage };
