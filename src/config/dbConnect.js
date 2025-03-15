import mongoose from "mongoose";

mongoose.connect("mongodb+srv://admin:prtc2010rs@heatmap.oy7rqgq.mongodb.net/users")

let db = mongoose.connection;

export default db;