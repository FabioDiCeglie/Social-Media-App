import { PaletteColor } from "@mui/material/styles/createPalette";

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

export type IPalette = {
  mode: string;
  primary: PaletteColor;
  neutral: {
    dark: string;
    main: string;
    mediumMain: string;
    medium: string;
    light: string;
  };
  background: {
    default: string;
    alt: string;
  };
};

export type IRegister = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  occupation: string;
  picture: {
    name: string;
  };
};

export type ILogin = {
  email: string;
  password: string;
};

export type ITheme = {
  palette: IPalette;
};
