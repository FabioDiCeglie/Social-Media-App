import React from "react";
import { ITheme, IUser } from "../../lib/types";
import WidgetWrapper from "../WidgetWrapper";
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../Friend";

const FriendsListWidget = ({
  userFriends,
}: {
  userFriends: IUser["friends"];
}) => {
  const { palette }: ITheme = useTheme();
  return (
    // @ts-ignore
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {userFriends.map((friend) => (
          <Friend
            key={friend.id}
            friendId={friend.id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendsListWidget;
