import fs from "fs";
import User from "../../models/user.creadentials.models";
import CustomErrorHandler from "../CustomError.Handler";
import {getUserData} from "../helper";
import moment from "moment";

/**
 * @function loadPromptData - Reads the contents of a markdown file from the "prompts" directory
 * @param {string} filename - The name of the markdown file to read (without the ".md" extension)
 * @returns {Promise<string>} - A Promise that resolves with the contents of the markdown file as a string, or rejects with an error if the file cannot be read
*/
const loadPromptData = (filename: string) => {
  return new Promise((res, rej) => {
    fs.readFile(`./prompts/${filename}.md`, "utf-8", (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });
};

// Write the documentation using js docs
/**
 * @async
 * @function generatePrompt - Generate the complete prompt using user's message, previous messages and responses, current time, and user data.
 * @param {string} prompt - The user's message.
 * @param {string[]} previousMessage - An array of the previous three messages sent by the user.
 * @param {string[]} previousResponse - An array of the previous three responses sent by the chatbot.
 * @param {string} userPhoneNumber - The phone number of the user.
 * @returns {string} - The complete prompt string.
*/
export const generatePrompt = async function (
  prompt: string,
  previousMessage: string[],
  previousResponse: string[],
  userPhoneNumber: string
) {
  try {
    // prompts
    const PromptAssistantData = await loadPromptData("generalPrompt");
    const ReminderPromptData = await loadPromptData("reminderPrompt");
    const greetingPrompt = `Greet user in a conversational manner with politeness.
    User: Hey
    Assitant: Hello, how are you?

    User: Hello
    Assitant: Hey, how can i help you?

    User: kese ho
    Assistant: mein theek ap kese ho?

    User: hey how are you
    Assitant:`;

    // previous message and response
    const previousMessages = previousMessage.slice(-3).join("\n");
    const previousResponses = previousResponse.slice(-3).join("\n");

    // Time
    const year = moment().format("YYYY");
    const month = moment().format("MM");
    const day = moment().format("DD");
    const hour = moment().format("HH");
    const minute = moment().format("mm");
    const second = moment().format("ss");

    const userData = await getUserData(userPhoneNumber);
    const { username } = userData;

    const CompletePrompt = `${PromptAssistantData} \nCurrentTime=${year}-${month}-${day} ${hour}:${minute}:${second} \n${greetingPrompt} \n\n${ReminderPromptData} checkUserName=${username} \npreviousUserMessage: ${previousMessages} \nPreviousAssistantResponse: ${previousResponses} \nUser: ${prompt} \nAssitant:`;
    // console.log(CompletePrompt);
    return CompletePrompt;
  } catch (error) {
    console.error("Error while getting user data:", error);
  }
};
