type User = {
  id: string;
  username: string;
  name: string;
  bio?: string;
  email: string;
  posts: Post[];
  profilePicture: UserProfilePicture;
  following: User[];
  followers: User[];
};

type PostComment = {
  id: string;
  description: string;
  user: CommentUser;
  text: string;
  createdAt: string;
};

type Post = {
  id: string;
  description: string;
  file: {
    id: string;
    image: string;
  };
  text: string;
  user: PostUser;
  comments: PostComment[];
  disableComments: boolean;
  disableLikes: boolean;
  createdAt: string;
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
