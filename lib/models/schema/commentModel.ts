import mongoose, { Schema, Document, model, models } from "mongoose";

// Define the Comment schema
export const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  replies: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  edited: { type: Date, default: null }, // Add edited field
});

// Define the TypeScript interface for the Comment model
export interface CommentDocument extends Document {
  user: mongoose.Types.ObjectId;
  text: string;
  replies: {
    user: mongoose.Types.ObjectId;
    text: string;
    createdAt: Date;
  }[];
  createdAt: Date;
  edited: Date | null; // Include edited field in the interface
}

// Function to get or create the Comment model
const getCommentModel = (): mongoose.Model<CommentDocument> => {
  try {
    return models.Comment || model<CommentDocument>("Comment", commentSchema);
  } catch (error) {
    console.error("Error creating Comment model:", error);
    return model<CommentDocument>("Comment", commentSchema);
  }
};

// Create the Comment model
const CommentModel: mongoose.Model<CommentDocument> = getCommentModel();

export default CommentModel;
