import type {NextRequest} from "next/server";

import {NextResponse} from "next/server";
import {createMiddlewareClient} from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({req, res});
  const user = await supabase.auth.getSession();

  if (req.nextUrl.pathname.includes("/dashboard") && !user.data.session) {
    return NextResponse.redirect(url.origin);
  }

  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
