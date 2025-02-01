import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "@/api/user.api";
import { useUser } from "@/context/User";
import { useEffect } from "react";
import { AdminLoginData } from "@/Types";
import { toast } from "sonner";

const AdminLogin = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUser(userData);
      navigate("/admin/dashboard");
    }
  }, []);

  const onSubmit = async (values: AdminLoginData) => {
    await loginAdmin(values)
      .then((response) => {
        const data = response.data;
        localStorage.setItem("userData", JSON.stringify(data.data.user));
        localStorage.setItem(
          "accessToken",
          JSON.stringify(data.data.accessToken)
        );
        setUser(data.data.user);
        const message = response?.data.message;
        toast.success(message);
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        const data = error.response?.data;
        if (Array.isArray(data?.data) && data.data.length > 0) {
          toast.error(data.data[0].msg);
        } else {
          toast.error(data?.message || "An unknown error occurred");
        }
      });
  };

  return (
    <div className="w-screen h-[90vh] p-4  flex flex-col md:flex-row  md:items-center md:justify-center">
      <div className="signup_form width-full md:w-1/4">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 border border-gray-50 p-4 shadow-lg rounded-lg"
        >
          <p className="text-3xl font-serif text-center">Admin Login</p>
          <div className="space-y-6">
            <div>
              <label className="block mb-1">Email/Username</label>
              <Input placeholder="Email" {...form.register("email")} />
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <Input
                placeholder="Password"
                type="password"
                {...form.register("password")}
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
