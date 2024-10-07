import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Bookmark } from "@/components/Bookmark";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const JobDetailsBriefCard = () => {
  return (
    <Card className="grow border-none">
      <CardHeader className="flex-row items-center gap-x-3">
        <div className="aspect-square w-12 rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="/svgs/demo-logo.svg"
            alt="demo logo"
            width={150}
            height={150}
          />
        </div>
        <div>
          <CardTitle className="text-placeholder text-lg">WorkOS</CardTitle>
          <CardDescription className="text-xl text-white">
            Product Designer
          </CardDescription>
        </div>
      </CardHeader>
      <Dialog>
        <CardContent>
          We're looking for experienced product designers who have experience
          designing complex...
        </CardContent>
        <CardFooter className="flex justify-between gap-x-1.5">
          <DialogTrigger className="grow">
            <Button variant="outline" className="bg-transparent w-full">
              View
            </Button>
          </DialogTrigger>
          <Bookmark isBookmarked={true} />
        </CardFooter>
        <DialogContent
          className="p-0 border-divider-dark max-w-3xl"
          hasCloseIcon={false}
        >
          <DialogHeader className="p-4 space-y-[1.125rem] border-b border-b-divider-dark">
            <div className="flex justify-between items-center gap-x-4 w-full">
              <div className="flex items-center gap-x-3">
                <div className="aspect-square w-16 rounded-2xl overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="/svgs/demo-logo.svg"
                    alt="demo logo"
                    width={250}
                    height={250}
                  />
                </div>
                <DialogTitle>
                  <span className="block text-placeholder text-sm">WorkOS</span>
                  <span className="block text-base text-white">
                    Product Designer
                  </span>
                </DialogTitle>
              </div>
              <div className="pr-3">
                <Button className="rounded-[10px]">Easy Apply</Button>
              </div>
            </div>
            <div className="flex flex-wrap max-w-xl gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <Badge key={i} className="min-w-fit">
                  Badge {i + 1}
                </Badge>
              ))}
            </div>
            <div className="flex gap-x-[1.125rem] items-center">
              <div className="flex items-center gap-x-3 w-full max-w-[15rem]">
                <div className="aspect-square w-12 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="/svgs/demo-logo.svg"
                    alt="demo logo"
                    width={250}
                    height={250}
                  />
                </div>
                <div className="text-sm space-y-1.5">
                  <p className="text-placeholder">Manager</p>
                  <p className="text-white">Jefferson</p>
                </div>
              </div>
              <div className="grow flex items-center gap-x-3">
                <div className="rounded-lg bg-block-medium p-3">
                  <MapPin size={24} />
                </div>
                <div className="text-sm space-y-1.5">
                  <p className="text-placeholder">Location</p>
                  <p className="text-white">Atlanta, Alpharetta, or remote</p>
                </div>
              </div>
            </div>
          </DialogHeader>
          <DialogDescription className="p-4 space-y-4">
            <h3 className="font-semibold text-[1.3125rem]">Description</h3>
            <div className="space-y-3 text-[1.0625rem]">
              <p>Senior UI/UX Designer</p>
              <p> Design delightful experiences for our online platforms. </p>
              <p>
                At Procreate we're dedicated to making exceptional creative
                tools by combining beautiful user experiences with high
                performance engineering. Used by millions around the globe,
                Procreate is committed to placing more power in the hands of
                creatives.{" "}
              </p>
              <p>
                We're looking for a Senior UI/UX Designer to help design the
                look and feel of Procreate's online platforms. In this role,
                you&apos;ll work across a wide range of digital experiences with
                the view to refine and extend our established on-line presence.
              </p>
            </div>
          </DialogDescription>
          <DialogFooter className="p-0 px-4 pb-4">
            <Button
              size={"lg"}
              className="w-full"
              variant={"secondary"}
              asChild
            >
              <Link to="/jobs/12dddeax">Open this position</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
