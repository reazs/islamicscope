import ThreadModel from "@/lib/models/schema/threadModel";
import UserModel from "@/lib/models/schema/userModel";
import connectDB from "@/lib/utils/database";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  await connectDB();
  try {
    const body = await req.json();
    const threadId = body.threadId;
    const text = body.text;
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await clerkClient.users.getUser(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!text) {
      return NextResponse.json(
        { message: "Text is required" },
        { status: 400 }
      );
    }

    const userEmail = user.primaryEmailAddress?.emailAddress;
    const userProfile = await UserModel.findOne({ email: userEmail });
    if (!userProfile) {
      return NextResponse.json(
        { message: "User profile not found!" },
        { status: 404 }
      );
    }

    const newComment: any = {
      user: userProfile._id, // store user ID instead of the entire user object
      text: text,
      createdAt: new Date(),
      replies: [],
      edited: null,
    };

    const thread = await ThreadModel.findById(threadId);
    if (!thread) {
      return NextResponse.json(
        { message: "Thread not found!" },
        { status: 404 }
      );
    }

    thread.comments.push(newComment);
    await thread.save();
    return NextResponse.json(
      { message: "Comment added successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error adding comment:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const addThreadComment = async ({
  comment,
  threadId,
}: {
  comment: string;
  threadId: string;
}) => {
  try {
    const response = await fetch(`/api/threads/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: comment, threadId: threadId }),
    });

    if (!response.ok) {
      console.log("Failed to post comment");
      return;
    }
  } catch (error) {
    console.log("Failed to post comment:", error);
  }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  await connectDB();

  try {
    const body = await req.json();
    const { threadId, commentId } = body;

    const thread = await ThreadModel.findById(threadId);
    if (!thread) {
      return NextResponse.json(
        { message: "Thread not found!" },
        { status: 404 }
      );
    }

    // Use String comparison for ObjectId
    const newThreadComs = thread.comments.filter(
      (comment) => comment._id != commentId
    );
    thread.comments = newThreadComs;
    await thread.save(); // Use await to ensure save completes

    return NextResponse.json(
      { message: "Comment successfully deleted" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Failed to delete comment", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
export const deleteThreadComment = async ({
  threadId,
  commentId,
}: {
  threadId: string;
  commentId: string;
}) => {
  try {
    const response = await fetch("/api/threads/comment", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ threadId, commentId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error deleting comment:", errorData);
      throw new Error(errorData.message || "Failed to delete thread comment");
    }

    const result = await response.json();
    console.log("Comment deleted successfully:", result);
  } catch (error) {
    console.log("Failed to delete thread comment:", error);
  }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  await connectDB();
  try {
    const body = await req.json();
    const { threadId, commentId, newComment } = body;
    const thread = await ThreadModel.findById(threadId);
    if (!thread) {
      return NextResponse.json(
        { message: "Thread not found." },
        { status: 404 }
      );
    }
    const updatedComments = thread.comments.map((comment: any) => {
      if (comment._id.toString() === commentId) {
        return {
          ...comment,
          text: newComment,
          edited: new Date(),
        };
      } else {
        return comment;
      }
    });
    thread.comments = updatedComments;
    await thread.save(); // Ensure save completes

    return NextResponse.json({ message: "Comment updated" }, { status: 200 });
  } catch (error) {
    console.log("Failed to edit comment:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const updateThreadComment = async ({
  threadId,
  commentId,
  newComment,
}: {
  threadId: string;
  commentId: string;
  newComment: string;
}) => {
  try {
    const response = await fetch("/api/threads/comment", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        threadId: threadId,
        commentId: commentId,
        newComment: newComment,
      }),
    });
    if (!response) {
      throw new Error("Failed to edit comment");
    }
  } catch (error) {
    console.log(error);
  }
};
