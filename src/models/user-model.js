// Collection : Table
// Document : Row
// Schema : Columns(define properties of the document)
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

// "User" is the name of the collection
export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
