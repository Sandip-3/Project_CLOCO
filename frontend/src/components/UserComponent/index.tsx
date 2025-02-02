import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserList from "../UserList";
import RegisterUser from "../RegisterUser";
import { useState } from "react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-[300px] rounded-full"
      >
        <TabsList className="grid w-full grid-cols-2 rounded-full bg-slate-300 overflow-hidden">
          <TabsTrigger
            value="users"
            className={`rounded-full ${
              activeTab === "users" ? "bg-white" : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            Users List
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className={`rounded-full ${
              activeTab === "register" ? "bg-white" : ""
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register User
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {activeTab === "users" ? <UserList /> : <RegisterUser />}
    </div>
  );
};

export default Index;
