// dotenv
import { config } from "dotenv";
config({ path: ".env" });
// gpt config
import { Configuration } from "openai";

const organization = process.env.ORGANIZATION || "";
const apikey = process.env.APIKEY || "";

const configuration = new Configuration({
  organization: organization,
  apiKey: apikey,
});

export { configuration };
