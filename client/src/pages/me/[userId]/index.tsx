import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Profile from "@/src/pages/profile/[userId]";

const Me = () => {
  const isAuth = useSelector((state: { token: string }) => state.token);
  const router = useRouter();

  if (isAuth === null) {
    router.push("/login");
  }
  return <Profile />;
};

export default Me;
