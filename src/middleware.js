import { NextResponse } from "next/server";

// middleware is a method to intercept the request and response
// middleware need to have exit criteria
// middleware will be requested everytime your web is being call
// middleware will be called for every request
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

import {
  PUBLIC_ROUTES,
  LOGIN,
  REGISTER,
  PROTECTED_SUB_ROUTES,
  ROOT,
} from "./lib/routes";

const { auth } = NextAuth(authConfig);

export async function middleware(request) {
  /**
   * auth() will return session object
   * Output : session will have true or false
   * to access property inside it session.name, session.id
   */
  // descturing the fragment of url from localhost: 3000
  const { nextUrl } = request;

  //ERROR: session return null
  const session = await auth();
  console.log(session);
  // URL constructor to create a new URL object
  // URL take parameter of URL fragment and base URL
  // URL constructor takes two parameters
  console.log("middleware");

  // Create conditional for protected routes
  /**
   *  ?.(optional chaining) : if the session has user property then it
   * have truthy value, but if there is null or undefined return falsy.
   * !!(double bang) : convert the truthy or falsy value to boolean
   */
  const isAuthenticated = !!session?.user;
  console.log(isAuthenticated, nextUrl.pathname);

  const isPublicRoute =
    PUBLIC_ROUTES.find(
      (route) => nextUrl.pathname.startsWith(route) || nextUrl.pathname === ROOT
    ) &&
    !PROTECTED_SUB_ROUTES.find((route) => nextUrl.pathname.includes(route));
  console.log(isPublicRoute);

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
  }
}

// matcher will be check the url that match and desired being access
// after matcher check it will run the fragment of other url relative to the url
// matcher will be check the url that match and desired being access
export const config = {
  // :path* : make anything after /products accepted
  // but will produce infine loop if not conditional apply
  // matcher: "/products/:path*",
  // matcher: "/api/:path*",
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
