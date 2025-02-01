import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-800">
      <h1 className="text-6xl font-bold">401</h1>
      <p className="text-2xl mt-2">Unauthorized</p>
      <button
        className="mt-6 flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={24} />
        <span>Go Back</span>
      </button>
    </div>
  );
};

export default Unauthorized;
