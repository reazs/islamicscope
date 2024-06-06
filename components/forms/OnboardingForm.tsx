"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import onboardingFormSchema from "@/lib/models/schema/onboardingFormSchema";
import { useUser } from "@clerk/nextjs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
const OnboardingForm = () => {
  const router = useRouter();
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  const email = user.primaryEmailAddress?.emailAddress;
  const imageUrl = user.imageUrl;
  const username = user.username || `${user.firstName} ${user.lastName}`; // Fallback if username is not set
  // 1. Define your form.
  const form = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      username: username,
      email: email,
      imageUrl: imageUrl,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof onboardingFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        imageUrl: values.imageUrl,
        onboarding: true,
      }),
    })
      .then(() => {
        router.push("/profile");
      })
      .then(() => {
        window.location.reload();
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input readOnly placeholder="shadcn" {...field} />
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
                <Input readOnly placeholder="Your email address" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image Url</FormLabel>
              <FormControl>
                <Input readOnly placeholder="Profile Image Url" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default OnboardingForm;
