import ThreadModel from "@/lib/models/schema/threadModel";
import connectDB from "@/lib/utils/database";
import { IThread } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    if (!id) {
      return NextResponse.json(
        {
          message: "ID is required",
        },
        { status: 400 }
      );
    }

    const thread = await ThreadModel.findById(id)
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "User",
        },
      })
      .populate("user");
    if (!thread) {
      return NextResponse.json(
        {
          message: "Thread not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(thread);
  } catch (error) {
    console.log("Failed to get thread:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export const getThreadById = async (threadId: string): Promise<IThread> => {
  try {
    const response = await fetch("/api/threads/" + threadId, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response) {
      console.log("Failed to fetch the thread bad response");
      throw new Error("Bad response for thread by id");
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.log("Failed to fetch thread by id", error);
    throw new Error("Failed to fetch thread by id");
  }
};
