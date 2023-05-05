export type Friend = {
  id: string;
  firstName: string;
  lastName: string;
  occupation: string;
  location: string;
  picturePath: string;
};

export type IUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  occupation: string;
  location: string;
  picturePath: string;
  impressions: number;
  viewedProfile: number;
  token?: string;
  friends: Friend[];
};

export type MyContext = {
  token: string;
};

export type IPost = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  location: string;
  description: string;
  picturePath: string;
  userPicturePath: string;
  likes: [Like];
  comments: [string];
};

export type Like = {
  id: string;
  status: boolean;
};
