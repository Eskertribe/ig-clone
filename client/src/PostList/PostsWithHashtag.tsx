import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostsWithHashtag } from '../hooks/useGetPostsWithHashTag';
import Post from '../Post/Post';

export const PostsWithHashtag = () => {
  const { hashtag } = useParams<{ hashtag: string }>();
  const { fetchPostsWithHashtag, posts, loading } = useGetPostsWithHashtag();

  useEffect(() => {
    if (hashtag) {
      fetchPostsWithHashtag(hashtag);
    }
  }, [hashtag]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Posts with #{hashtag} hashtag</h1>
      {loading && <p>Loading posts...</p>}
      {!loading && posts.length === 0 && (
        <p>No posts found with this hashtag.</p>
      )}
      {!loading && (
        <div className="h-[80vh] grid grid-rows-3 grid-cols-3 gap-1 p-2">
          {posts.length > 0 ? (
            posts?.map((post) => (
              <Post
                key={post.id}
                post={post}
                toggleModal={() => {
                  /* setModalOpen(post) */
                }}
              />
            ))
          ) : (
            <p>No posts found</p>
          )}
        </div>
      )}
    </div>
  );
};
