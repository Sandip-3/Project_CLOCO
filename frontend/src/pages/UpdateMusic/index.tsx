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
import { updateMusic, getMusicById } from "@/api/music.api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const formSchema = z.object({
  artist_id: z.number().min(1, "Artist ID is required"),
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

const index = () => {
  const { artistId, musicId } = useParams<{
    artistId: string;
    musicId: string;
  }>();

  if (!artistId || !musicId) {
    toast.error("Invalid request. Missing artist or music ID.");
    return null; 
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artist_id: Number(artistId) || 0,
      title: "",
      album_name: "",
      genre: "classic",
    },
  });

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        if (!musicId) return;
        const response = await getMusicById(Number(musicId));
        const data = response.data.data;

        form.reset({
          artist_id: Number(artistId),
          title: data.title,
          album_name: data.album_name ,
          genre: data.genre,
        });
      } catch (error) {
        toast.error("Failed to fetch music album details.");
      }
    };
    fetchMusicData();
  }, [musicId, artistId, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(musicId)
      console.log(values)
      await updateMusic(Number(musicId), values);
      toast.success("Music album updated successfully!");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to update album.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-auto h-auto mt-[10%] flex justify-center items-center">
      <div className="w-full max-w-md border bg-white border-gray-300 shadow-lg rounded-lg p-4">
        <Form {...form}>
          <p className="text-3xl font-serif text-center">Update Music Album</p>
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
                    value={field.value}
                    className="flex gap-2"
                    onValueChange={field.onChange}
                  >
                    <div className="flex items-center">
                      <RadioGroupItem value="classic" id="classic" />
                      <label htmlFor="classic" className="ml-1 text-sm">
                        Classic
                      </label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem value="rock" id="rock" />
                      <label htmlFor="rock" className="ml-1 text-sm">
                        Rock
                      </label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem value="jazz" id="jazz" />
                      <label htmlFor="jazz" className="ml-1 text-sm">
                        Jazz
                      </label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem value="country" id="country" />
                      <label htmlFor="country" className="ml-1 text-sm">
                        Country
                      </label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem value="rnb" id="rnb" />
                      <label htmlFor="rnb" className="ml-1 text-sm">
                        R&B
                      </label>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Update Album
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default index;
