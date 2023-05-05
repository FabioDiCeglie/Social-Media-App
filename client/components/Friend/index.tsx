import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import FlexBetween from "../FlexBetween";
import UserImage from "../UserImage";
import { ITheme, IUser } from "../../lib/types";
import { ADD_REMOVE_FRIEND } from "../../lib/mutation";
import { useMutation } from "@apollo/client";
import { GET_POSTS, GET_USER } from "../../lib/query";
import { setFriends } from "../../state";

type FriendProps = {
  friendId: string;
  name: string;
  subtitle: string;
  userPicturePath: string;
};

const Friend = ({ friendId, name, subtitle, userPicturePath }: FriendProps) => {
  const { id, friends } = useSelector((state: { user: IUser }) => state.user);
  const [addRemoveFriend, { loading, error, data }] = useMutation(
    ADD_REMOVE_FRIEND,
    {
      variables: { friendId: friendId, userId: id },
      refetchQueries: [GET_USER, "User"],
    }
  );
  const router = useRouter();

  const { palette }: ITheme = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend.id === friendId);
  const isMyPost = friendId === id;
  console.log(!loading && { friends: data?.addRemoveFriend });
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            router.push(`/profile/${friendId}`);
            // router.push(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {!isMyPost && (
        <IconButton
          onClick={() => {
            addRemoveFriend();
          }}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
