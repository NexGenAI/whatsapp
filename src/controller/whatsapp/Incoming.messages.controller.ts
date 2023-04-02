import { Conversation } from "../../models/chat.model";
import User from "../../models/user.creadentials.models";
import RouteParamsHandler from "../../types/RouteParams.type";
import ChatGptHandler from "../../utils/gpt/chatgpt.handler";

// Write the documentation using js docs
/**
 * @async
 * @function incomingMessage - Controller to handle incoming messages from users
 * @asyncController to handle incoming messages from user
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @param {function} next - The next function to call in the middleware chain
 * @returns {Promise} - Promise object representing the response
 * @throws {Error} - Error object representing any errors that occurred
 */
const IncomingMessagesController: RouteParamsHandler = async function (
  req,
  res,
  next
) {
  try {
    const { name, phone, message } = (<any>req).body;

    // check if user already exists
    const CheckUserExists = await User.exists({
      userPhone: phone,
    });

    if (!CheckUserExists) {
      await new User({
        username: name,
        userPhone: phone,
      }).save();
    }

    const ChatGPTResponse = await ChatGptHandler(message, phone);

    // save database
    const UserMessage = {
      text: message,
      from: "user",
      timestamps: new Date(),
    };

    const BotResponse = {
      text: ChatGPTResponse,
      timestamps: new Date(),
    };

    await Conversation.findOneAndUpdate(
      { "user.phone": phone, },
      { $push: { chats: UserMessage, responses: BotResponse } },
      { upsert: true, new: true }
    );

    res.status(200).send(ChatGPTResponse);
  } catch (error) {
    return next(error);
  }
};

export default IncomingMessagesController;
