import { Link } from "react-router-dom";

const index = () => {
  return (
    <div className="top-0 sticky z-10 bg-slate-100 p-2 w-screen flex justify-between items-center">
      <div className="appName p-2">
        <p>Cloco Nepal</p>
      </div>
      <div>
        <ul className="flex space-x-12 p-2">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </ul>
      </div>
    </div>
  );
};

export default index;
