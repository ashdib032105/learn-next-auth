const users = [
  {
    email: "johndoe@gmail.com",
    password: "password",
  },
  {
    email: "janedoe@gmail.com",
    password: "password",
  },
  {
    email: "jonah@gmail.com",
    password: "password",
  },
];
/**
 * Finds a user by their email address.
 * @param {string} email - The email address to search for.
 * @returns {Object|undefined} The user object if found, otherwise undefined.
 */

export const getUserbyEmail = email => {
  // users array use the find method to search every email inside the object to match with the parameter
  const found = users.find((user) => user.email === email);
  return found;
};
