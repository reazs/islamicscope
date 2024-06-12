"use client";
import createPostFormSchema from "@/lib/models/schema/createPostFormSchema";
import { IThread } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { title } from "process";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useCreateThread } from "@/hooks/useThreads";
import { useUser } from "@clerk/nextjs";
import Loading from "../shared/Loading";
import { useRouter } from "next/navigation";

const CreatePostForm = ({ thread }: { thread?: IThread }) => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const { mutateAsync: createThread, isPending: isLoadingCreate } =
    useCreateThread();
  // 1. Define your form.
  const form = useForm<z.infer<typeof createPostFormSchema>>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  if (!isSignedIn || !user) {
    return <Loading />;
  }
  const email = user.primaryEmailAddress?.emailAddress;
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof createPostFormSchema>) {
    try {
      const newThread = await createThread({
        email: email as string,
        title: values.title,
        content: values.content,
      });
      if (newThread?.status === 200) {
        router.push("/explore");
      }
      //   const body = await newThread?.json();
    } catch (err) {
      console.error(err);
    }
    console.log(values);
  }
  //   if (isLoadingCreate) {
  //     return <Loading />;
  //   }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoadingCreate}
                  placeholder="Enter your post title"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoadingCreate}
                  className=" min-h-[150px]"
                  placeholder="Write your message here..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end ">
          <button type="submit" className="btn btn-outline">
            Sumbit
          </button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePostForm;
