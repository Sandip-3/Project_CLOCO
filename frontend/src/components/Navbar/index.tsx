import { Link } from "react-router-dom";
import { useUser } from "@/context/User";

const index = () => {
  const { user, setUser } = useUser();
  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <div className="top-0 sticky z-10 bg-slate-100 p-2 w-screen flex justify-between items-center">
      <div className="appName p-2">
        <p>Cloco Nepal</p>
      </div>
      <div>
        <ul className="flex space-x-12 p-2">
          <li>
            {user ? (
              <Link to="/login">{user.name}</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
          <li>
            {user ? (
              <Link to="/logout" onClick={(event) => handleLogout(event)}>
                Logout
              </Link>
            ) : (
              <Link to="/signup">Signup</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default index;
