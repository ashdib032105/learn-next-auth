import React from "react";
// doSocialLogin is the action from server action
import { doSocialLogin } from "../app/actions";

const SocialLogin = () => {
  return (
    <form action={doSocialLogin}>
      {/* 'name' will be the same because the 'value' will be identify the type of Login */}
      <button
        className="bg-pink-400 text-white p-1 rounded-md m-1 text-lg"
        type="submit"
        name="action"
        value="google"
      >
        Sign in With Google
      </button>
      {/* When I click the Google when I click it, the url will be http://localhost:3000/?action=google*/}
      <button
        className="bg-black text-white p-1 rounded-md m-1 text-lg"
        type="submit"
        name="action"
        value="github"
      >
        Sign in With Github
      </button>
    </form>
  );
};

export default SocialLogin;
