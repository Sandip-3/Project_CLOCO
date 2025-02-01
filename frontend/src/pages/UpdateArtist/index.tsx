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
import { getArtistById, updateArtist } from "@/api/artist.api"; // API functions

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Artist Name must be at least 2 characters." }),
  gender: z.enum(["m", "f", "o"], { message: "Select a valid gender" }),
  address: z
    .string()
    .trim()
    .min(4, { message: "Address must be at least 4 characters." }),
  dob: z.date({ required_error: "Date of Birth is required." }),
  first_release_year: z
    .string()
    .trim()
    .min(4, { message: "First release year must be a valid year." }),
  no_of_albums_released: z
    .string()
    .trim()
    .min(1, { message: "Number of albums released must be at least 1." }),
});

const index = () => {
  const { id } = useParams<{ id: string }>(); // Get artist ID from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  // Fetch artist details when editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      getArtistById(Number(id))
        .then((response: any) => {
          console.log(response.data.data)
          const artist = response.data.data;
          form.reset({
            name: artist.name,
            gender: artist.gender,
            dob: new Date(artist.dob),
            address: artist.address,
            first_release_year: artist.first_release_year.toString(),
            no_of_albums_released: artist.no_of_albums_released.toString(),
          });
        })
        .catch((error: any) => {
          toast.error("Failed to fetch artist data." ,error);
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
        name: values.name,
        gender: values.gender,
        address: values.address,
        dob: values.dob.toISOString(),
        first_release_year: values.first_release_year,
        no_of_albums_released: values.no_of_albums_released,
      };

      await updateArtist(Number(id), formData);
      toast.success("Artist updated successfully!");
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
            {id ? "Update Artist" : "Register Artist"}
          </p>
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
                    <Input placeholder="Year" type="number" {...field} />
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
                  <FormLabel>Albums Released</FormLabel>
                  <FormControl>
                    <Input placeholder="Number" type="number" {...field} />
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
              {loading
                ? "Processing..."
                : id
                ? "Update Artist"
                : "Register Artist"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default index;
