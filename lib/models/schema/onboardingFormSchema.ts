import { z } from "zod";
const onboardingFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  imageUrl: z.string().url({ message: "Invalid image url" }),
  onboarding: z.boolean().default(false),
});

export default onboardingFormSchema;
