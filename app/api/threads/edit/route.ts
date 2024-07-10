import ThreadModel from "@/lib/models/schema/threadModel";
import connectDB from "@/lib/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectDB();
  try {
    const body = await req.json();
    const { title, threadId, content } = body;

    const thread = await ThreadModel.findById(threadId);
    if (!thread) {
      return NextResponse.json(
        { message: "Thread not found!" },
        { status: 404 }
      );
    }

    thread.title = title;
    thread.content = content;
    const updatedThread = await thread.save();

    return NextResponse.json(
      { message: "Thread updated successfully", thread: updatedThread },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update thread!", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
export type IEditThreadById = {
  title: string;
  content: string;
  threadId: string;
};

export const editThreadById = async ({
  title,
  content,
  threadId,
}: IEditThreadById) => {
  try {
    const response = await fetch("/api/threads/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
        threadId: threadId,
      }),
    });
    if (!response.ok) {
      console.log("Failed to get valid response");
      return null;
    }
    return await response.json();
  } catch (error) {
    console.log("Failed to post edited thread", error);
    throw new Error("Failed to update edited thread");
  }
};
