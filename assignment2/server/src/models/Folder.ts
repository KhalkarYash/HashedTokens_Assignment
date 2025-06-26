import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["folder", "file"],
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: "null",
  },
  path: {
    type: String,
    required: true,
  },
});

const Folder = mongoose.model("Folder", folderSchema);
export default Folder;
