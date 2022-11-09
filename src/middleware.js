import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
export async function middleware(request) {
  const jwt = request.cookies.get("usr");

  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  try {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode(process.env.SECRET)
    );
    console.log(payload);
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/home", request.url));
    } else {
      return NextResponse.next();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/home"],
};
