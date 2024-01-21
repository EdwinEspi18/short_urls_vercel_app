"use client";
import type {User} from "@supabase/auth-helpers-nextjs";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {GithubIcon, Hash, LogOut} from "lucide-react";
import Link from "next/link";

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

import {Button} from "./button";

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: {user},
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
      }
    }
    getUser();
  }, [supabase.auth]);

  async function handleSignin() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "https://short-urls-vercel-app.vercel.app/auth/callback",
      },
    });

    router.refresh();
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
  };

  return (
    <header className="flex w-full items-center justify-between px-40 py-2">
      <h1 className="text-4xl font-bold leading-[4rem]">ShortTiny</h1>
      <div className=" relative flex items-center justify-center gap-5">
        {user ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium "
                type="button"
                variant="secondary"
              >
                {user.user_metadata.avatar_url ? (
                  <img
                    alt={user.user_metadata.name}
                    className="me-2 h-6 w-6 rounded-full"
                    src={user.user_metadata.avatar_url}
                  />
                ) : (
                  <Hash className="me-2 h-6 w-6" />
                )}
                {user.user_metadata.name || user.user_metadata.user_name}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-2">
              <button
                className="flex h-8 w-full items-center rounded-sm px-3 hover:bg-secondary"
                type="button"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </button>
            </PopoverContent>
          </Popover>
        ) : (
          <Button
            className="inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium "
            type="button"
            variant="secondary"
            onClick={handleSignin}
          >
            <svg
              aria-hidden="true"
              className="me-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                fillRule="evenodd"
              />
            </svg>
            Sign in with Github
          </Button>
        )}

        <Button asChild className="grid place-content-center rounded-full" variant="secondary">
          <Link
            aria-label="Github Repository"
            href="https://github.com/EdwinEspi18/short_urls_vercel_app.git"
            target="_blank"
          >
            <GithubIcon />
          </Link>
        </Button>
      </div>
    </header>
  );
}
