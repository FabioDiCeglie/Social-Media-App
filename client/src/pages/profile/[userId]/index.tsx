import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Navbar from "../../../../components/NavBar";
import { useQuery } from "@apollo/client";
import { Box, useMediaQuery } from "@mui/material";
import FriendsListWidget from "../../../../components/FriendsListWidget";
import Loading from "../../../../components/Loading";
import MyPostWidget from "../../../../components/MyPostWidget";
import PostsWidget from "../../../../components/PostsWidget";
import UserWidget from "../../../../components/UserWidget";
import { GET_USER } from "../../../../lib/query";
import { IUser } from "../../../../lib/types";

const Profile = () => {
  const router = useRouter();
  const userId = router.query.userId as string;
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId },
  });
  const isUser = useSelector(
    (state: { user: { id: string } }) => state.user.id
  );
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  if (loading) return <Loading />;
  if (error) return <></>;

  const user: IUser = data?.user;

  return (
    <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="2rem"
      justifyContent="center"
    >
      <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        <UserWidget userId={userId} user={user} />
        <Box m="2rem 0" />
        <FriendsListWidget userFriends={user.friends} />
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        {isUser === userId && <MyPostWidget picturePath={user.picturePath} />}
        <Box m="2rem 0" />
        <PostsWidget userId={userId} isProfile={true} />
      </Box>
    </Box>
  );
};

export default Profile;
