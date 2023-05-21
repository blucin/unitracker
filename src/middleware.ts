export {default} from "next-auth/middleware";

console.log("middleware runs");

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};