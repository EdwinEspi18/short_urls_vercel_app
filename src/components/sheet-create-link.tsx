"use client";

import {Plus} from "lucide-react";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

import {Separator} from "./ui/separator";

export function SheetCreateLink() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const formSchema = z.object({
    original_url: z.string().url({message: "Invalid url"}),
    slug: z.string().min(3),
    description: z.optional(z.string()),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      original_url: "",
      slug: "",
      description: "",
    },
    reValidateMode: "onSubmit",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {data} = await supabase.auth.getUser();
    const userId = data.user?.id;

    try {
      const description = values.description?.length === 0 ? "" : values.description;
      const res = await supabase.from("short_urls").insert({
        original_url: values.original_url,
        slug_url: values.slug,
        id_user: userId,
        description: description,
      });

      if (res.status === 201) {
        form.reset();
        router.refresh();

        return toast.success("Created!!!");
      }
    } catch (error) {
      console.log(error);

      return toast.error("Error!!!");
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" color="#fff" />
          <span className="font-bold">Create new link</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Short Link</SheetTitle>
        </SheetHeader>
        <Separator className="my-3" />
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="original_url"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Enter the URL here:</FormLabel>
                  <FormControl>
                    <Input placeholder="http://localhost:3000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Custom slug:</FormLabel>
                  <FormControl>
                    <Input placeholder="local-dev" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Description (Optional):</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save short link</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
