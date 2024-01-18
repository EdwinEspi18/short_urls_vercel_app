"use client";

import {LinkIcon, RocketIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {toast} from "sonner";

import {Button} from "@/components/ui/button";
import {Toaster} from "@/components/ui/sonner";

export const dynamic = "force-dynamic";

export default function Home() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  async function handleClick() {
    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      return toast.error("Must be Autheticated");
    }

    router.push("/dashboard");
  }

  return (
    <section className="mt-32 flex flex-col items-center justify-between text-center ">
      <div className="flex animate-fade-down items-center justify-center gap-3 animate-normal animate-fill-both animate-once animate-ease-out">
        <LinkIcon size={80} />
        <h2 className="text-7xl font-bold tracking-wide">Link Shortener</h2>
      </div>

      <p className="animate-fade-down text-3xl tracking-wide text-gray-400 underline animate-delay-150 animate-normal animate-fill-both animate-once animate-ease-out">
        Shorten your URLs easily and quickly
      </p>
      <Button
        asChild
        className="mt-5 flex h-14 w-52 animate-fade-down items-center justify-center gap-2 rounded-full bg-blue-800 text-white animate-delay-150 animate-normal animate-fill-both animate-once animate-ease-out hover:bg-blue-900"
      >
        <Button onClick={handleClick}>
          <RocketIcon size={30} />
          <span className="text-xl font-medium">Get Started!</span>
        </Button>
      </Button>
      <Toaster richColors position="top-center" />
    </section>
  );
}
