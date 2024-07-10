import ThreadModel from "@/lib/models/schema/threadModel";
import UserModel from "@/lib/models/schema/userModel";
import connectDB from "@/lib/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectDB();
  try {
    const body = await req.json();
    const { threadId, userEmail } = body;

    const currentUser = await UserModel.findOne({ email: userEmail });
    if (!currentUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const thread = await ThreadModel.findById(threadId)
      .populate({
        path: "likes", // Populate the 'likes' field
        model: "User", // Populate with User model
      })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "User",
        },
      });

    if (!thread) {
      return NextResponse.json(
        { message: "Thread not found" },
        { status: 404 }
      );
    }

    // Check if the user has already liked the thread
    const existingLikeIndex = thread.likes.findIndex((like: any) =>
      like._id.equals(currentUser._id)
    );

    if (existingLikeIndex > -1) {
      // User has liked the thread, remove the like (unlike)
      thread.likes.splice(existingLikeIndex, 1);
    } else {
      // User has not liked the thread, add the like
      thread.likes.push(currentUser as any);
    }

    // Save the updated thread
    await thread.save();

    return NextResponse.json({ message: "Like status updated", thread });
  } catch (error) {
    console.log("Internal server error for liking thread:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const updateThreadsLikes = async ({
  threadId,
  userEmail,
}: {
  threadId: string;
  userEmail: string;
}) => {
  try {
    const response = await fetch("/api/threads/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        threadId: threadId,
        userEmail: userEmail,
      }),
    });
      if (!response.ok) { 
          return null
      }
      
  } catch (error) {
    console.log("Failed to update threads likes");
    return null;
  }
};
