import mongoose from "mongoose";

// Can you please make the timestamps dynamic
const conversationSchema = new mongoose.Schema({
  user: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
  },
  bot: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId
    }
  },
  chats: [
    {
      text: {
        type: String,
        required: true,
      },
      from: {
        type: String,
        enum: ["user", "bot"],
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      }      
    },
  ],
  responses: [
    {
      text: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      }      
    },
  ],
});

const Conversation = mongoose.model("conversation", conversationSchema);

export { Conversation };