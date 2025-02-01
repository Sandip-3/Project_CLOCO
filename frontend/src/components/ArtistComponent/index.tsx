import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArtistList from "../ArtistList";
import RegisterArtist from "../RegisterArtist";
import { useState } from "react";

const index = () => {
  const [activeTab, setActiveTab] = useState("artists");
  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <Tabs defaultValue="artists" className="w-[300px] rounded-full">
        <TabsList className=" grid w-full grid-cols-2 rounded-full bg-slate-300 overflow-hidden">
          <TabsTrigger
            value="artists"
            className="rounded-full"
            onClick={() => setActiveTab("artists")}
          >
            Artists List
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className="rounded-full"
            onClick={() => setActiveTab("register")}
          >
            Register Artist
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {activeTab === "artists" ? <ArtistList /> : <RegisterArtist />}
    </div>
  );
};

export default index;
