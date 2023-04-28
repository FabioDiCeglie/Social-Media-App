import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Home = () => {
  const isAuth = useSelector((state: { token: string }) => state.token);
  const router = useRouter();

  if (!isAuth) {
    router.push("/login");
  }
  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;
