import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/home",
    "/explore",
    "/al-quran(.*)",
    "/hadiths(.*)",
    "/hadiths/chapters/(.*)",
    "/hadiths/chapters/(.*)/details/(.*)",
    "/dashboard",
    "/api/posts",
    "/api/hello",
  ],
  // ignoredRoutes: ["/((?!api|trpc))(_next.*|.+.[w]+$)", "/posts"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
