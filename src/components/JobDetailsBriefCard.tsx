import { Bookmark } from "../components/Bookmark";
import { Button } from "../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

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
					<CardTitle className="text-placeholder text-base">WorkOS</CardTitle>
					<CardDescription className="text-base text-white">
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
				<DialogContent className="p-0">
					<DialogHeader className="p-4 space-y-4 border-b border-b-divider-md">
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
                  <span className="block text-base text-white">Product Designer</span>
                </DialogTitle>
              </div>
                          <div>
                            <Button>Easy Apply</Button>
                          </div>
            </div>
					</DialogHeader>
					<DialogDescription className="p-4">
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
					<DialogFooter />
				</DialogContent>
			</Dialog>
		</Card>
	);
};
