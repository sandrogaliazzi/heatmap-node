import mongoose from "mongoose";

const newFetchSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: { type: String, require: true },
    coord: { type: Object, require: true },
    cto_id: { type: String, require: true },
    color: {type: String, require: true},
    category: { type: String, require: true },
    clients: { type: Object, require: false },
    city: { type: String, require: false },
    percentage_free: { type: String, require: false },
  },
  {
    versionKey: false,
  }
);

const newFetch = mongoose.model("newFetch", newFetchSchema);

export default newFetch;
