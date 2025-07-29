type User = {
  id: string;
  username: string;
  name: string;
  bio?: string;
  email: string;
  posts: Post[];
  profilePicture: UserProfilePicture;
  following: number;
  followers: number;
  isFollowed?: boolean;
};

type Following = {
  id: string;
  username: string;
  name: string;
  profilePicture: UserProfilePicture;
};

type PostComment = {
  id: string;
  text: string;
  user: CommentUser;
  createdAt: string;
  replies: PostComment[];
  likes: { userId: string; commentId?: string }[];
  parentId: string;
};

type Post = {
  id: string;
  description: string;
  file: {
    id: string;
    url: string;
  };
  likes: { user: { id: string } }[];
  text: string;
  user: PostUser;
  comments: PostComment[];
  disableComments: boolean;
  disableLikes: boolean;
  createdAt: string;
  seen?: boolean;
};

type CommentUser = {
  id: string;
  username: string;
  profilePicture: {
    image: string;
  };
};

type PostUser = {
  id: string;
  username: string;
  profilePicture: UserProfilePicture;
};

type UserProfilePicture = {
  id: string;
  image?: string;
};

type Message = {
  id: string;
  content: string;
  conversation: Conversation;
  sender: User;
  createdAt: Date;
};

type Conversation = {
  id: string;
  participants: User[];
  messages: Message[];
  createdBy: string;
};
