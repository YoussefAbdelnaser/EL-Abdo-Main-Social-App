import mongoose, { mongo } from "mongoose";

const abdoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  community: { type: mongoose.Schema.Types.ObjectId, ref: "Community" },
  createdAt: { type: Date, default: Date.now },
  parentId: { type: String },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Abdo" }],
});

const Abdo = mongoose.models.Abdo || mongoose.model("Abdo", abdoSchema);

export default Abdo;
