import { Link } from "react-router-dom";
import { useUser } from "@/context/User";
import { toast } from "sonner";

const index = () => {
  const { user, setUser } = useUser();
  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    localStorage.removeItem("userData");
    localStorage.removeItem("accessToken");
    setUser(null);
    toast.success("Logged out successfully");
  };
  return (
    <div className="top-0 sticky z-10 bg-slate-100 p-2 w-screen flex justify-between items-center">
      <div className="appName p-2">
        <p>Cloco Nepal</p>
      </div>
      <div>
        <ul className="flex space-x-12 p-2">
          <div>
            {user ? <li>{user.name}</li> : <Link to="/user/login">Login</Link>}
          </div>
          <div>
            {user ? (
              <Link to="/logout" onClick={(event) => handleLogout(event)}>
                Logout
              </Link>
            ) : (
              <Link to="/user/register">Signup</Link>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default index;
