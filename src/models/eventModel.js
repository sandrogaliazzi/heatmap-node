import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventCode: { type: Number, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  eventClass: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: false },
  timeToLive: { type: String, required: false },
  openDescription: { type: String, required: true },
  closeDescription: { type: String, required: false },
  eventLocale: { type: Object, required: true },
  message_id: { type: Number, required: true },
});

const event = mongoose.model("events", eventSchema);

export default event;