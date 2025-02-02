import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getUserById, updateUser } from "@/api/user.api"; // API functions

const formSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, { message: "First name must be at least 2 characters." }),
  last_name: z
    .string()
    .trim()
    .min(2, { message: "Last name must be at least 2 characters." }),
  phone: z
    .string()
    .trim()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters." }),
  gender: z.enum(["m", "f", "o"], { message: "Select a valid gender" }),
  address: z
    .string()
    .trim()
    .min(4, { message: "Address must be at least 4 characters." }),
  dob: z.date({ required_error: "Date of Birth is required." }),
});

const UpdateUser = () => {
  const { id } = useParams<{ id: string }>(); // Get user ID from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      password: "",
      gender: "m",
      dob: undefined,
      address: "",
    },
  });

  // Fetch user details when editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      getUserById(Number(id))
        .then((response: any) => {
          const user = response.data.data;
          form.reset({
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.phone,
            password: "", // Password is not prefilled for security reasons
            gender: user.gender,
            dob: new Date(user.dob),
            address: user.address,
          });
        })
        .catch(() => {
          toast.error("Failed to fetch user data.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const formData = {
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        password: values.password,
        gender: values.gender,
        address: values.address,
        dob: values.dob.toISOString(),
      };

      await updateUser(Number(id), formData);
      toast.success("User updated successfully!");
      navigate("/admin/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-auto flex justify-center items-center mt-12">
      <div className="w-full max-w-md border border-gray-300 shadow-lg rounded-lg p-4">
        <Form {...form}>
          <p className="text-3xl font-serif text-center">
            {id ? "Update User" : "Register User"}
          </p>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone Number" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    defaultValue="m"
                    className="flex gap-4"
                    onValueChange={field.onChange}
                  >
                    <RadioGroupItem value="m" id="m" />
                    <label htmlFor="m" className="ml-2 text-sm">
                      Male
                    </label>
                    <RadioGroupItem value="f" id="f" />
                    <label htmlFor="f" className="ml-2 text-sm">
                      Female
                    </label>
                    <RadioGroupItem value="o" id="o" />
                    <label htmlFor="o" className="ml-2 text-sm">
                      Other
                    </label>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <CalendarIcon className="mr-2" />
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Processing..." : id ? "Update User" : "Register User"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateUser;
