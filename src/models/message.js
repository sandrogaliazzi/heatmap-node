import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
  text: { type: String, require: true },
  fontSize: { type: Number, require: true },
  color: { type: String, require: true },
  colSpan: { type: Boolean, require: true },
});

const message = mongoose.model("message", messageSchema);

export default message;