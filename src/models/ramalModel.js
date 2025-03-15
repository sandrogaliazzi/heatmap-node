import mongoose, { Schema } from "mongoose";

const ramalSchema = new mongoose.Schema({
  id: { type: String },
  date_time: { type: String, require: true },
  gpon_data: { type: Array, require: true },
  avgSignal: { type: Object, require: true },
});

const ramalLogs = mongoose.model("ramalLogs", ramalSchema);

export default ramalLogs;
