import ArtistComponent from "@/components/ArtistComponent";
import UserComponent from "@/components/UserComponent";
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
      <main className="flex-1 flex h-[100%] overflow-y-auto  text-2xl font-bold">
        {activeTab === "user" ? <UserComponent /> : <ArtistComponent />}
      </main>
    </div>
  );
};



export default index;
