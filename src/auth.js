// declare and configure all types of authentication
import NextAuth from "next-auth";
import GooglePovider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from "./models/user-model";
import { authConfig } from "./auth.config";
/**
  This cannot be access by the middleware because the 
  User Model of MongoDB 
  is coming after the middleware is running
   -- NextAuth is where authorization and authentication being run
 */

// Credentials Provider needs to have session management strategy

export const {
  // handlers for GET, POST for route
  handlers: { GET, POST },
  // method to call auth Object contain data like email, id, photo
  auth,
  //method to call signIn, signOut
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      //define function
      // "credentials" is argument that are objects contain email, password
      async authorize(credentials) {
        if (credentials === null) return null;
        try {
          // search the user by email by checking the credentials objects
          // get user object contain the password and email
          // from database
          const user = await User.findOne({ email: credentials?.email });
          if (user) {
            // check for password match
            // credentials from the user input
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            console.log(isMatch);
            if (isMatch) {
              return user;
            } else {
              throw new Error("Check your password");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {}
      },
    }),
    GooglePovider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompts: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          prompts: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      console.log(`In JWT callback - Token is ${JSON.stringify(token)}`);

      // Check the user and account information for the first time user
      if (account && user) {
        console.log(`In JWT callback - Token is ${JSON.stringify(account)}`);
        console.log(`In JWT callback - Token is ${JSON.stringify(user)}`);
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      console.log(`In JWT callback - Token is ${JSON.stringify(token)}`);

      if(token){
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
});
