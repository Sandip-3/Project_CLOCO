import ArtistComponent from "@/components/ArtistComponent";
import { useState } from "react";
const index = () => {
  const [activeTab, setActiveTab] = useState<"user" | "artist">("user");

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 p-4 flex flex-col space-y-4 border border-gray-200 shadow-md">
        <button
          className={`p-2 rounded ${
            activeTab === "user" ? "bg-gray-300 text-black" : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("user")}
        >
          User
        </button>
        <button
          className={`p-2 rounded ${
            activeTab === "artist" ? "bg-gray-300 text-black" : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("artist")}
        >
          Artist
        </button>
      </aside>
      <main className="flex-1 flex  text-2xl font-bold">
        {activeTab === "user" ? <UserComponent /> : <ArtistComponent />}
      </main>
    </div>
  );
};

const UserComponent = () => {
  return <div className="text-gray-800">User Dashboard</div>;
};


export default index;
