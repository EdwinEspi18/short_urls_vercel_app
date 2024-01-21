import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {NextResponse, type NextRequest} from "next/server";

export async function GET(request: NextRequest, {params}: {params: {slug: string}}) {
  const url = new URL(request.url);
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});

  if (params.slug === "") {
    return NextResponse.redirect(url.origin);
  }

  const {data} = await supabase.from("short_urls").select("*").eq("slug_url", params.slug);

  if (data?.length === 0) {
    return NextResponse.redirect(url.origin);
  }

  return NextResponse.redirect(data[0].original_url);
}
