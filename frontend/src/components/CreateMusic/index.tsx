import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createMusic } from "@/api/music.api";

const formSchema = z.object({
  title: z.string().trim().min(2, {
    message: "Album Title must be at least 2 characters.",
  }),
  album_name: z.string().trim().min(2, {
    message: "Album Name must be at least 2 characters.",
  }),
  genre: z.enum(["classic", "rock", "jazz", "country", "rnb"], {
    message: "Select a valid genre",
  }),
});

interface MusicAlbumRegisterProps {
  artistId: string;
}

const index: React.FC<MusicAlbumRegisterProps> = ({ artistId }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      album_name: "",
      genre: "classic",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("artist_id", artistId);
    formData.append("title", values.title);
    formData.append("album_name", values.album_name);
    formData.append("genre", values.genre);

    try {
      await createMusic(Object.fromEntries(formData));
      toast.success("Music album registration successful!");
      form.reset();
    } catch (error: any) {
      const data = error.response?.data.data[0].msg;
      toast.error(data);
    }
  };

  return (
    <div className="w-auto h-auto mt-[10%] flex justify-center items-center">
      <div className="w-full max-w-md border bg-white border-gray-300 shadow-lg rounded-lg p-4">
        <Form {...form}>
          <p className="text-3xl font-serif text-center">
            Register Music Album
          </p>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Album Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Album Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="album_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Album Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Album Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <RadioGroup
                    defaultValue="classic"
                    className="flex gap-2"
                    onValueChange={field.onChange}
                  >
                    <RadioGroupItem value="classic" id="classic" />
                    <label htmlFor="classic" className="ml-1 text-sm">
                      Classic
                    </label>
                    <RadioGroupItem value="rock" id="rock" />
                    <label htmlFor="rock" className="ml-1 text-sm">
                      Rock
                    </label>
                    <RadioGroupItem value="jazz" id="jazz" />
                    <label htmlFor="jazz" className="ml-1 text-sm">
                      Jazz
                    </label>
                    <RadioGroupItem value="country" id="country" />
                    <label htmlFor="country" className="ml-1 text-sm">
                      Country
                    </label>
                    <RadioGroupItem value="rnb" id="rnb" />
                    <label htmlFor="rnb" className="ml-1 text-sm">
                      R&B
                    </label>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Register Album
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default index;
