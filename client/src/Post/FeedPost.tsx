import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMarkPostSeen } from '../hooks/useMarkPostSeen';
import { useOnScreen } from '../hooks/useOnScreen';
import { calculateTimeSince } from '../utils/timeDifference';
import { getImageUrl } from '../utils/getImage';

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
      className="w-full md:w-[80%] lg:w-[60%] xl:w-[45%] mx-auto border-b border-gray-300 p-2 mb-5"
      key={post.id}
    >
      <div className="flex items-center space-x-2 mb-1">
        <img
          src={post.user.profilePicture.image}
          className="object-cover rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          alt="Profile"
        />
        <h2 className="text-sm sm:text-base">{post.user.username}</h2>
        <span className="text-gray-500 text-xs sm:text-sm ml-auto">
          {calculateTimeSince(post.createdAt)}
        </span>
      </div>
      {post.file.url && (
        <div className="aspect-[4/3] max-h-[500px] overflow-hidden">
          <img
            src={getImageUrl(post.file.url)}
            alt={post.description}
            onClick={() => openModal()}
            className="w-full h-full object-contain cursor-pointer"
          />
        </div>
      )}
      <div className="flex items-center space-x-4 sm:space-x-8 mt-2">
        <FontAwesomeIcon
          icon={faHeart}
          className={`text-${isLiked ? 'red' : 'gray'}-500 h-[1.2em] sm:h-[1.5em] cursor-pointer hover:text-red-500`}
          onClick={() => {
            // Like functionality
          }}
        />
        <FontAwesomeIcon
          icon={faComment}
          className="text-gray-500 h-[1.2em] sm:h-[1.5em] cursor-pointer hover:text-gray-300"
          onClick={() => openModal()}
        />
      </div>
      <div>
        <p className="text-gray-700 mt-2 text-sm sm:text-base">
          <b>{post.likes.length ?? 0}</b> likes
        </p>
        <p className="text-gray-700 mt-2 text-sm sm:text-base">
          <b>{post.user.username}</b> {post.description}
        </p>
      </div>
    </div>
  );
};
