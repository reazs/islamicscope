import ThreadModel from "@/lib/models/schema/threadModel";
import connectDB from "@/lib/utils/database";
import { ICreateThread, IThread } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();

  try {
    const threads = await ThreadModel.find()
      .populate({
        path: "comments",
        options: { sort: { creationDate:   -1 } }, // Sort comments by createdAt descending
        populate: {
          path: "user",
          model: "User",
        },
      })
      .populate("user")
      .sort({ createdAt: -1 })
      .exec();

    if (!threads)
      return NextResponse.json({ error: "threads not found" }, { status: 404 });
    return NextResponse.json(threads, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch threads" },
      { status: 500 }
    );
  }
};

export const getRecentThreads = async () => {
  const response = await fetch("/api/threads", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch threads");
  }
  return response.json();
};

export const POST = async (req: NextRequest) => {
  await connectDB();

  try {
    const body = await req.json();
    const thread = new ThreadModel(body);
    const savedThread = await thread.save();

    return NextResponse.json(savedThread, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed create thread" },
      { status: 500 }
    );
  }
};

export const createThread = async (thread: ICreateThread) => {
  try {
    const userRes = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: thread.email }),
    });
    if (!userRes.ok) {
      throw new Error("Failed to fetch user");
    }
    const user = await userRes.json();

    const postRes = await fetch("/api/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        title: thread.title,
        content: thread.content,
      }), // Include email or other data if needed
    });
    if (!postRes.ok) {
      throw new Error("Failed to create post");
    }
    console.log("Post created successfully");
    return postRes;
  } catch (error) {
    console.error("Failed to create post", error);
  }
};

export const DELETE = async (req: NextRequest) => {
  await connectDB();

  try {
    const body = await req.json();
    const threadId = body.id;

    if (!threadId) {
      return NextResponse.json(
        { message: "Thread ID is required" },
        { status: 400 }
      );
    }

    const deletedThread = await ThreadModel.findByIdAndDelete(threadId).exec();

    if (!deletedThread) {
      return NextResponse.json(
        { message: "Thread not found" },
        { status: 404 }
      );
    }

    return new NextResponse(null, { status: 204 }); // No content response
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to delete thread" },
      { status: 500 }
    );
  }
};

export const deleteThread = async (id: string) => {
  try {
    const response = await fetch("/api/threads", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to delete thread:", errorData.message);
    }

    console.log("Thread deleted successfully");
  } catch (error) {
    console.error("Error deleting thread:", error);
    throw error;
  }
};
