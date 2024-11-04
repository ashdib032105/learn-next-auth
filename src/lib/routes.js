export const LOGIN = "/login";
export const REGISTER = "/register";
export const ROOT = "/";


export const PUBLIC_ROUTES = [
    "/login",
    "/register",
    "/products", 
    "/api",
    /**
     * To allow the oAuth Provider to Login to Account
     * Make the callback route to be public
     */
    "/api/auth/callback/google",
    "/api/auth/callback/github",
]

export const PROTECTED_SUB_ROUTES = [
    "/checkout",
]