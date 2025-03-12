import { onAuthStateChanged } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./firebase/config";

const protectedRoutes = ["/"];
const publicRoutes = ["signin"];

const onAuthStateChangedPromise = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const currentUser = await onAuthStateChangedPromise();

  // If not authenticated and trying to access a protected route, redirect to login
  if (!currentUser && isProtectedRoute) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // If authenticated and trying to access a public route, redirect to home
  if (
    currentUser &&
    isPublicRoute &&
    !request.nextUrl.pathname.startsWith("/")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/signin", "/signup"],
};
