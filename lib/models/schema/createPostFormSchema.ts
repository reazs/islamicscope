import { z } from "zod";
 const createPostFormSchema = z.object({
  title: z.string().min(6, {
    message: "Title must be at least 6 characters.",
  }),
  content: z
    .string()
    .min(20, { message: "Post messaage should be at least 20 characters." }),
});

export default createPostFormSchema;
