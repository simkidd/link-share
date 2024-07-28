import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TOKEN_NAME } from "./utils/constants";
import { auth } from "@/utils/firebaseConfig";

const authRoutes = ["/login", "/sign-up"];
const privateRoutes = ["/links", "/profile"];
const publicRoutes = ["/preview"];

export default async function middleware(req: NextRequest) {
  // Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => path.startsWith(route));

  const token = cookies().get(TOKEN_NAME)?.value;

  // Redirect to homepage if the user is authenticated and trying to access auth routes
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/editor", req.nextUrl));
  }

  // Redirect to /login if the user is not authenticated
  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
