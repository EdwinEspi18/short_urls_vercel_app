import type {ChangeEvent, Dispatch} from "react";
import type {CardSlugProps} from "./card-slug";

import {useState, type SetStateAction} from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

import {Button} from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {Input} from "./ui/input";
import {Label} from "./ui/label";
import {Textarea} from "./ui/textarea";

interface DialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  editSlug: CardSlugProps;
}

export function DialogEdit({open, setOpen, editSlug}: DialogProps) {
  const router = useRouter();
  const [edit, setEdit] = useState({
    slug: editSlug.slug_url,
    original_url: editSlug.original_url,
    description: editSlug.description,
  });
  const supabase = createClientComponentClient();

  async function handleUpdate() {
    if (
      edit.original_url === editSlug.original_url &&
      edit.description === editSlug.description &&
      edit.slug === editSlug.slug_url
    ) {
      return toast.warning("No make changes");
    }

    const response = await supabase
      .from("short_urls")
      .update({
        description: edit.description,
        original_url: edit.original_url,
        slug_url: edit.slug,
      })
      .eq("id", editSlug.id);

    if (response.status === 204) {
      setOpen(!open);
      router.refresh();

      return toast.success("Updated!!!");
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setEdit((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit short link</DialogTitle>
          <DialogDescription>
            Make changes to your short link here. Click save when you`re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="url">
              Original URL:
            </Label>
            <Input
              className="col-span-3"
              id="url"
              name="original_url"
              value={edit.original_url}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="slug">
              Slug:
            </Label>
            <Input
              className="col-span-3"
              id="slug"
              name="slug"
              value={edit.slug}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Description:
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              name="description"
              value={edit.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={() => setOpen(!open)}>
              Close
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleUpdate}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
