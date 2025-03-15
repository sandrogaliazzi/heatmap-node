import mongoose from "mongoose";

const MetricSchema = new mongoose.Schema({
  id: { type: String },
  date: { type: String, require: true },
  monthSales: { type: Number, require: true },
  weekSales: { type: Number, require: true },
  dailySales: { type: Number, require: true },
  description: { type: String, required: true },
  phrase: { type: String, required: false },
});

const metrics = mongoose.model("Metrics", MetricSchema);

export default metrics;
