import mongoose from "mongoose";

const SalesSchema = new mongoose.Schema({
  id: { type: String },
  date: { type: String, required: true },
  weekNumber: { type: Number, required: true },
  seller: { type: String, required: true },
  sellerClass: { type: Number, required: true },
  client: { type: String, required: false },
  city: { type: String, required: false },
  ticket: { type: String, required: false },
  metricId: { type: String, required: true },
});

const Sales = mongoose.model("Sales", SalesSchema);

export default Sales;
