/*
Purpose : To be use for passing to middleware to get auth object
Output : Getting access to the auth information

*/

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [],
};
