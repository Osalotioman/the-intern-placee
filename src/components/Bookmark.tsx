import { Bookmark as BookmarkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Bookmark({ isBookmarked }: { isBookmarked: boolean }) {
  return (
    <Button
      variant={"outline"}
      // TODO: change hover effect for when it's bookmarked
      className={cn("bg-transparent px-2", {
        "[&_>_svg]:fill-white [&_>_svg]:stroke-white": isBookmarked,
      })}
    >
      <BookmarkIcon className="stroke-[#AAA] duration-100" />
    </Button>
  );
}
