// Place where functions that interact with the user collection
import { User } from "../models/user-model";

// create function to save to db

export async function createUser(user) {
  try {
    await User.create(user);
  } catch (error) {
    throw new Error(error);
  }
}

/*
 * PURPOSE : To find the user by email in database records
 * PARAMETER : Email
 */
export async function getEmailByEmail(email) {
  try {
    /*
     *const user = await User.findOne({email: email});
     *OUTPUT : Return all the user collection records such as email, id, password
     *const user = await User.findOne({email: email}).select("-password").lean();
     *OUTPUT : Return only the email of the user and .lean() ensure the data is in plain object
     */
    const user = await User.findOne({ email: email }).select("-password").lean();
    return user;
  } catch (error) {
    throw new Error(error);
  }
}
