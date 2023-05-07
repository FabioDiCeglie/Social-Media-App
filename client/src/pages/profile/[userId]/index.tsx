import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Profile = () => {
  const isAuth = useSelector((state: { token: string }) => state.token);
  const router = useRouter();

  if (!isAuth) {
    router.push("/login");
  }
  return (
    <>
      <h1>Ciao Profile</h1>
    </>
  );
};

export default Profile;
