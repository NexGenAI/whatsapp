import mongoose, { Model, Schema } from "mongoose";

// Error: user.id_1 dup key: { user.id: null }
const userSchema = new Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
      auto:true
    },
    name: {
      type: String,
    },
    previousMessage: {
      type: [String],
      default: [],
    },
  },
);

const botSchema = new Schema(
  {
    previousResponse: {
      type: [String],
      default: [],
    },
  },
  { id: true }
);

const contextSchema = new Schema({
  user: {
    type: userSchema,
    required: true,
  },
  bot: {
    type: botSchema,
    required: true,
  },
});

const ChatContext = mongoose.model("chatcontext", contextSchema);

export default ChatContext;
