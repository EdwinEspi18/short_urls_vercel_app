import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

import {Separator} from "@/components/ui/separator";
import {SheetCreateLink} from "@/components/sheet-create-link";
import {CardSlug} from "@/components/card-slug";
import {ScrollArea} from "@/components/ui/scroll-area";

export default async function DashboardPage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});

  const {data} = await supabase
    .from("short_urls")
    .select("*")
    .eq("id_user", "b11af66b-a5c3-4723-8ecb-5d7478c68192");

  return (
    <section className="z-50 rounded-md bg-secondary/70 px-6 py-4 backdrop-blur-md">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <SheetCreateLink />
      </div>
      <Separator className="my-4 bg-white/30" />
      {/* className="grid grid-cols-3 gap-10" */}
      <ScrollArea className="h-96 w-full rounded-md border">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {data?.map(({id, original_url, slug_url, description}) => (
            <CardSlug
              key={id}
              description={description}
              id={id}
              original_url={original_url}
              slug_url={slug_url}
            />
          ))}
        </div>
      </ScrollArea>
    </section>
  );
}
