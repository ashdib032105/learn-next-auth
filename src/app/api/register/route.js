import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/mongo";
import bcrypt from "bcrypt";
import { createUser } from "../../../queries/users";
/*
 * Endpoint : /api/register
 * Purpose : Create new user by send it to MongoDB(External system)
 * Method : POST
 * Payload : {name, email, password}
 * Response : {message: "User has been created"}
 * Error : {message: "User has not been created"}
 */
export const POST = async (request) => {
  // Get the data from the request of api/register
  const { name, email, password } = await request.json();
  console.log(name, email, password);
  // Create a DB Connection
  await dbConnect();
  // Encrypt Password
  const hashedPassword = await bcrypt.hash(password, 20);
  // Form a DB Payload
  const newUser = {
    name,
    password: hashedPassword,
    email,
  };
  // Update the DB
  try {
    await createUser(newUser);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
  return new NextResponse("User has been created", { status: 201 });
};
