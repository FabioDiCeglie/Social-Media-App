import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Box, useMediaQuery } from "@mui/material";
import { IUser } from "../../lib/types";
import UserWidget from "../../components/UserWidget";
import MyPostWidget from "../../components/MyPostWidget";
import PostsWidget from "../../components/PostsWidget";

const Home = () => {
  const isAuth = useSelector((state: { token: string }) => state.token);
  const router = useRouter();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { id, picturePath } = useSelector(
    (state: { user: IUser }) => state.user
  );

  if (!isAuth) {
    router.push("/login");
  }
  return (
    <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
    >
      <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        <UserWidget userId={id} picturePath={picturePath} />
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        <MyPostWidget picturePath={picturePath} />
        <PostsWidget userId={id} isProfile={false} />
      </Box>
      {isNonMobileScreens && <Box flexBasis="26%"></Box>}
    </Box>
  );
};

export default Home;
