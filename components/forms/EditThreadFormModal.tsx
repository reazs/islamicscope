"use client";
import createPostFormSchema from "@/lib/models/schema/createPostFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { Pen } from "lucide-react";
import { useEditThreadById } from "@/hooks/useThreads";
import { headers } from "next/headers";

const EditThreadFormModal = ({
  title,
  content,
  threadId,
}: {
  title: string;
  content: string;
  threadId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof createPostFormSchema>>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      title: title,
      content: content,
    },
  });
  const { mutateAsync: editThreadById, isPending: EditingThreadById } =
    useEditThreadById();

  async function onSubmit(values: z.infer<typeof createPostFormSchema>) {
    try {
      console.log(values.title);
      await editThreadById({
        threadId: threadId,
        title: values.title,
        content: values.content,
      });

      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setIsOpen(true)}>
          <Pen />
        </button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={EditingThreadById}
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
                      disabled={EditingThreadById}
                      className=" min-h-[150px]"
                      placeholder="Write your message here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <button
                type="button"
                className="btn btn-outline btn-error"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                disabled={EditingThreadById}
                type="submit"
                className="btn btn-outline"
              >
                Update
              </button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditThreadFormModal;
