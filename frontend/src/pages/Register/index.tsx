import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
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
import { registerUser } from "@/api/user.api";

const formSchema = z.object({
  first_name: z.string().trim().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  last_name: z.string().trim().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  gender: z.enum(["m", "f", "o"], {
    message: "Select a valid gender",
  }),
  phone: z.string().trim().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  dob: z.date({
    required_error: "Date of Birth is required.",
  }),
  email: z.string().trim().email({
    message: "Invalid email address.",
  }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters." })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
      "Password must include at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."
    ),
  address: z.string().trim().min(4, {
    message: "Address must be at least 4 characters.",
  }),
});

const SignUp = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      gender: "m",
      email: "",
      password: "",
      address: "",
      dob: undefined,
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("address", values.address);
    formData.append("dob", values.dob.toISOString());
    formData.append("phone", values.phone);
    formData.append("gender", values.gender);

    try {
      await registerUser(Object.fromEntries(formData));
      toast.success("Signup successful!");
      form.reset();
      navigate("/user/login");
    } catch (error: any) {
      const data = error.response?.data.data[0].msg;
      toast.error(data);
    }
  };

  return (
    <div className="w-screen h-screen mt-2 flex items-center justify-center">
      <div className="w-full max-w-md border border-gray-300 shadow-lg rounded-lg p-4">
        <Form {...form}>
          <p className="text-3xl font-serif text-center">Sign up</p>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender Radio Buttons */}
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
                    <label htmlFor="f" className="ml-2">
                      Male
                    </label>
                    <RadioGroupItem value="f" id="f" />
                    <label htmlFor="f" className="ml-2">
                      Female
                    </label>
                    <RadioGroupItem value="o" id="o" />
                    <label htmlFor="f" className="ml-2">
                      Female
                    </label>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Picker */}
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

            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
