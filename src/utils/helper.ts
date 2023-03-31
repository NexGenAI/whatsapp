import User from "../models/user.creadentials.models";
import CustomErrorHandler from "./CustomError.Handler";
import crypto from "crypto";

interface UserData {
  username: string;
  userPhone: string;
  id: string;
}

/**
 * @async
 * @function getUserData - Retrieve user data by phone number from the database.
 * @param {string} phoneNumber - The phone number associated with the user.
 * @returns {Promise<UserData>} - A promise that resolves with an object containing user data (username, userPhone, id).
 * @throws {CustomErrorHandler.notFound} - Throws a CustomErrorHandler.notFound error if user data cannot be found.
 * @throws {Error} - Throws an error if there is an issue retrieving user data from the database.
*/
const getUserData = (phoneNumber: string): Promise<UserData> => {
  return new Promise(async (resolve, reject) => {
    try {
      const UserData = await User.findOne({ userPhone: phoneNumber });

      // if user not found
      if (!UserData)
        return reject(CustomErrorHandler.notFound("User not found"));

      const { username, userPhone, id } = UserData;
      resolve({ username, userPhone, id });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * @function generateUserId - Generates a random 12-character user ID.
 * @returns {string} - A 12-character hexadecimal string representing the user ID.
*/
function generateUserId() {
  // Generate a 16-byte (128-bit) random buffer
  const buffer = crypto.randomBytes(16);

  // Convert the buffer to a hexadecimal string
  const hexString = buffer.toString("hex");

  // Return the first 12 characters of the hexadecimal string as the user id
  return hexString.substring(0, 12);
}


export { getUserData, generateUserId };
