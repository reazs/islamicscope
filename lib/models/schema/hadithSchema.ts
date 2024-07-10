import mongoose, { Schema, model, models, Document } from "mongoose";
import { CommentDocument, commentSchema } from "./commentModel";

// Define the Hadith schema
const hadithSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  hadithId: { type: String, required: true },
  comments: [commentSchema],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of users who liked the Hadith
  createdAt: { type: Date, default: Date.now },
});

// Define the TypeScript interface for the Hadith model
export interface HadithDocument extends Document {
  user: { type: Schema.Types.ObjectId; ref: "User" };
  hadithId: string;
  comments: CommentDocument[];
  likes: mongoose.Types.ObjectId[];
  createdAt: Date;
}

// Function to get or create the Hadith model
const getHadithModel = (): mongoose.Model<HadithDocument> => {
  try {
    return models.Hadith || model<HadithDocument>("Hadith", hadithSchema);
  } catch (error) {
    console.error("Error creating Hadith model:", error);
    return model<HadithDocument>("Hadith", hadithSchema);
  }
};

// Create the Hadith model
const HadithModel: mongoose.Model<HadithDocument> = getHadithModel();

export default HadithModel;
