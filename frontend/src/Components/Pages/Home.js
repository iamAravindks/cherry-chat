
import { Link } from "react-router-dom";


export const Home = () =>
{

  return (
    <p>
      Nothing here ,{" "}
      <Link to="/chat" className="btn">
        Go to chat
      </Link>
    </p>
  );
}
