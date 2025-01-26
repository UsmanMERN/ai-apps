// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  // Example middleware logic
  console.log("Middleware running for:", request.nextUrl.pathname);
  return NextResponse.next();
}
