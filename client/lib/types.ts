import {Color, PaletteMode} from "@mui/material";
import {
    CommonColors, PaletteAugmentColorOptions,
    PaletteColor,
    PaletteTonalOffset, TypeAction, TypeBackground,
    TypeDivider,
    TypeText
} from "@mui/material/styles/createPalette";

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
    id: string
    userId: string
    firstName: string
    lastName: string
    location: string
    description: string
    picturePath: string
    userPicturePath: string
    likes: [Like]
    comments: [string]
}

export type Like = {
    userId: boolean
}

export type IPalette = {
    mode: PaletteMode;
    primary: PaletteColor;
    neutral: {
        dark: Color;
        main: Color;
        mediumMain: Color;
        medium: Color;
        light: Color;
    }
    background: {
        default: string;
        alt: string;
    }
};