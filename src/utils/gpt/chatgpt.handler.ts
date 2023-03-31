import { config } from "dotenv";
config({ path: ".env" });
import { OpenAIApi } from "openai";
import { configuration } from "../../config/config.GPT";
import ChatContext from "../../models/chat.context.model";
import CustomErrorHandler from "../CustomError.Handler";
import CronExpressioHandler from "../reminder.handler";
import { generatePrompt } from "./generate.prompt";

const openai = new OpenAIApi(configuration);

const context = {
  user: {
    name: null,
    previousMessages: [] as string[],
  },
  bot: {
    previousResponses: [] as string[],
  },
};

/**
  @async
  @function ChatGptHandler -  Handles chat prompts using OpenAI API
  @param {string} prompt - The user's prompt message
  @returns {Promise<string>} - The response message from OpenAI's API
  @throws {CustomErrorHandler.serverError()} - If there's an error in the OpenAI API
  @summary - The code implements a chatbot using OpenAI's GPT-3.5 architecture and integrates it with a cron job scheduler to allow users to schedule tasks. The chatbot responds to user input by generating a response using the GPT-3 model, and the response is then checked for any instructions to set a task using a cron job. If a task is detected, the cron job scheduler is invoked to schedule the task according to the user's specified parameters. The code also handles errors and provides appropriate responses to the user.
*/
const ChatGptHandler = async (prompt: string, phone: string) => {
  try {
    // user previous message
    context.user.previousMessages.push(prompt);

    // chatgpt
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: await generatePrompt(
        prompt,
        context.user.previousMessages,
        context.bot.previousResponses,
        phone
      ),
      temperature: 0.7,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
      stop: ["\n"],
    });

    // bot previous response
    const botResponse = response.data.choices[0].text?.trim();
    if (botResponse !== undefined) {
      context.bot.previousResponses.push(botResponse);
    }

    if (botResponse?.startsWith("SETRE")) {
      CronExpressioHandler(botResponse, phone);
    } else if (botResponse?.startsWith("SETNRE")) {
      CronExpressioHandler(botResponse, phone);
    }

    return botResponse;
  } catch (error) {
    console.error(`Error in ChatGPT: ${error.message}`);
    return CustomErrorHandler.serverError();
  }
};

export default ChatGptHandler;
