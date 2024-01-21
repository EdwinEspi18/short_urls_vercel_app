"use client";

import {Copy, Edit, Sliders, Trash} from "lucide-react";
import {toast} from "sonner";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import {useState} from "react";
import Link from "next/link";

import {getBaseUrl} from "@/lib/getBaseUrl";

import {Button} from "./ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {DialogEdit} from "./edit-moda";

export interface CardSlugProps {
  id: string;
  original_url: string;
  slug_url: string;
  description?: string;
}

export function CardSlug(props: CardSlugProps) {
  const {id, original_url, slug_url, description} = props;

  const [toogleModal, setToogleModal] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient();

  async function copyToClipboard(txt: string) {
    try {
      const clipboardItem = new ClipboardItem({
        "text/plain": new Blob([txt], {type: "text/plain"}),
      });

      await navigator.clipboard.write([clipboardItem]);
    } catch (error) {
      await navigator.clipboard.writeText(txt);
    }

    toast.success("Copied to clipboard");
  }

  async function deleteSlug(id_slug: string) {
    const data = await supabase.from("short_urls").delete().eq("id", id_slug);

    if (data.status === 204) {
      router.refresh();

      toast.success("Deleted Sucessfully!!!");
    }
  }

  return (
    <>
      <Card className="relative">
        <CardHeader>
          <CardTitle>
            <Link
              className="cursor-pointer font-medium transition-all hover:font-bold"
              href={`${getBaseUrl()}/q/${slug_url}`}
              target="_blank"
            >
              /{slug_url}
            </Link>
          </CardTitle>
          <CardDescription className="truncate font-medium">{original_url}</CardDescription>
        </CardHeader>
        {description ? (
          <CardContent>
            <p>{description}</p>
          </CardContent>
        ) : null}
        <CardFooter className="absolute right-0 top-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="ghost">
                <Sliders className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel className="text-center">Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => copyToClipboard(`short-urls-vercel-app.vercel.app/q/${slug_url}`)}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  <span>Copy</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setToogleModal(!toogleModal)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => deleteSlug(id)}>
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
      <DialogEdit editSlug={props} open={toogleModal} setOpen={setToogleModal} />
    </>
  );
}
