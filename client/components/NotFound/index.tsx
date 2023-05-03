import "./style.css";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="error-container">
      <h1>404 Error: Page Not Found</h1>
      <p>We're sorry, the page you requested could not be found.</p>
      <button onClick={() => router.push("/")}>Go to Home Page</button>
    </div>
  );
};

export default NotFound;
