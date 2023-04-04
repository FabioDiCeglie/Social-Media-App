export type Friend = {
  _id: string;
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
  friends: Friend[];
};
