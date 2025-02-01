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
import { registerArtist } from "@/api/artist.api";

const formSchema = z.object({
  name: z.string().trim().min(2, {
    message: "Artist Name must be at least 2 characters.",
  }),
  gender: z.enum(["m", "f", "o"], {
    message: "Select a valid gender",
  }),
  address: z.string().trim().min(4, {
    message: "Address must be at least 4 characters.",
  }),
  dob: z.date({
    required_error: "Date of Birth is required.",
  }),
  first_release_year: z.string().trim().min(4, {
    message: "First release year must be a valid year.",
  }),
  no_of_albums_released: z.string().trim().min(1, {
    message: "Number of albums released must be at least 1.",
  }),
});

const index = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      gender: "m",
      dob: undefined,
      address: "",
      first_release_year: "",
      no_of_albums_released: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("gender", values.gender);
    formData.append("address", values.address);
    formData.append("dob", values.dob.toISOString());
    formData.append("first_release_year", String(values.first_release_year));
    formData.append(
      "no_of_albums_released",
      String(Number(values.no_of_albums_released))
    );

    try {
      await registerArtist(Object.fromEntries(formData));
      toast.success("Artist registration successful!");
      form.reset();
    } catch (error: any) {
      const data = error.response?.data.data[0].msg;
      toast.error(data);
    }
  };

  return (
    <div className="w-screen h-auto mt-[5%] ml-[20%]">
      <div className="w-full max-w-md border border-gray-300 shadow-lg rounded-lg p-4">
        <Form {...form}>
          <p className="text-3xl font-serif text-center">Register Artist</p>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artist Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Artist Name" {...field} />
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
              name="first_release_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Release Year</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First Release Year"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="no_of_albums_released"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Albums Released</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Number of Albums Released"
                      type="number"
                      {...field}
                    />
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

            <Button className="w-full" type="submit">
              Register Artist
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default index;
