"use server";
import { signIn, signOut } from "../../auth";
export async function doSocialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, {
    redirectTo: "/home",
  });
  console.log(action);
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialsLogin(formData) {
  try {
    // called the provider configuration 
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      // redirect is false to check first if there is mismatch of password or any other error
      redirect: false,
    });
    console.log(response, "hello");
    return response;
  } catch (error) {
    throw error;
  }
}
