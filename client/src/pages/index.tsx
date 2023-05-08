import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Box, useMediaQuery } from "@mui/material";
import { IUser } from "@/lib/types";
import UserWidget from "@/components/UserWidget";
import MyPostWidget from "@/components/MyPostWidget";
import PostsWidget from "@/components/PostsWidget";
import AdvertWidget from "@/components/AdvertWidget";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/lib/query";
import Loading from "@/components/Loading";
import FriendsListWidget from "@/components/FriendsListWidget";

const Home = () => {
  const { id } = useSelector((state: { user: IUser }) => state.user);
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId: id },
  });
  const isAuth = useSelector((state: { token: string }) => state.token);
  const router = useRouter();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  if (!isAuth) {
    router.push("/login");
  }

  if (loading) return <Loading />;
  if (error) return <></>;

  return (
    <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
    >
      <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        <UserWidget user={data?.user} userId={id} />
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        <MyPostWidget picturePath={data.user.picturePath} />
        <PostsWidget userId={id} isProfile={false} />
      </Box>
      {isNonMobileScreens && (
        <Box flexBasis="26%">
          <AdvertWidget />
          <Box m="2rem 0" />
          <FriendsListWidget userFriends={data.user.friends} />
        </Box>
      )}
    </Box>
  );
};

export default Home;
