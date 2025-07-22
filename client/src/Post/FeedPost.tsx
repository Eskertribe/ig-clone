import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMarkPostSeen } from '../hooks/useMarkPostSeen';
import { useOnScreen } from '../hooks/useOnScreen';
import { calculateTimeSince } from '../utils/timeDifference';

export const FeedPost: React.FC<{ post: Post; openModal: () => void }> = ({
  post,
  openModal,
}) => {
  const { markPostSeen } = useMarkPostSeen();
  const markAsSeen = async () => {
    if (!post.seen) {
      post.seen = true;
      markPostSeen(post.id);
    }
  };

  const ref = useOnScreen(markAsSeen);
  const isLiked = false; // TODO: Remove

  return (
    <div
      ref={ref}
      className="w-[45%] border-b border-gray-300 p-2 mb-5"
      key={post.id}
    >
      <div className="flex items-center space-x-2 mb-1">
        <img
          src={post.user.profilePicture.image}
          className="object-cover rounded-full w-[3em] h-[3em]"
        />
        <h2>{post.user.username}</h2>
        <span className="text-gray-500 text-sm">
          {calculateTimeSince(post.createdAt)}
        </span>
      </div>
      {post.file.image && (
        <img
          src={post.file.image}
          alt={post.description}
          onClick={() => openModal()}
        />
      )}
      <div className="flex items-center space-x-8 mt-2">
        <FontAwesomeIcon
          icon={faHeart}
          className={`text-${isLiked ? 'red' : 'gray'}-500 h-[1.5em] cursor-pointer hover:text-red-500`}
          onClick={() => {
            // if (likeActionLoading) {
            //   return;
            // }
            // if (isLiked) {
            //   removeLike(post.id, undefined, () => {
            //     fetchLikes(post.id);
            //   });
            // } else {
            //   addLike(post.id, undefined, () => {
            //     fetchLikes(post.id);
            //   });
            // }
          }}
        />
        <FontAwesomeIcon
          icon={faComment}
          className="text-gray-500 h-[1.5em] cursor-pointer hover:text-gray-300"
          onClick={() => openModal()}
        />
      </div>
      <div>
        <p className="text-gray-700 mt-2">
          <b>{post.likes.length ?? 0}</b> likes
        </p>
        <p className="text-gray-700 mt-2">
          <b>{post.user.username}</b> {post.description}
        </p>
      </div>
    </div>
  );
};
