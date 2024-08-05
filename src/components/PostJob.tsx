import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "./ui/dialog";

export function PostJob({ trigger }: { trigger: ReactNode }) {
	return (
		<Dialog>
			<DialogTrigger className="grow" asChild>
				{trigger}
			</DialogTrigger>
			<DialogContent
				className="p-0 border-divider-dark max-w-3xl"
				hasCloseIcon={false}>
				<DialogHeader className="p-4 space-y-[1.125rem] border-b border-b-divider-dark">
					<div className="flex items-center gap-x-3">
						<div className="aspect-square overflow-clip w-32">
							<img
								width={150}
								height={150}
								src="/images/following-demo.png"
								alt="testing stuff"
								className="w-full object-cover"
							/>
						</div>
						<div className="space-y-2">
							<h2 className="text-xl font-medium text-white">Name of user</h2>
							<p>@username</p>
						</div>
					</div>
				</DialogHeader>
				<DialogDescription className="p-4 space-y-4">
					<h3 className="font-semibold text-[1.3125rem]">Description</h3>
					<div className="space-y-3 text-[1.0625rem]">
						<p>Senior UI/UX Designer</p>
						<p> Design delightful experiences for our online platforms. </p>
						<p>
							At Procreate we're dedicated to making exceptional creative tools
							by combining beautiful user experiences with high performance
							engineering. Used by millions around the globe, Procreate is
							committed to placing more power in the hands of creatives.{" "}
						</p>
						<p>
							We're looking for a Senior UI/UX Designer to help design the look
							and feel of Procreate's online platforms. In this role,
							you&apos;ll work across a wide range of digital experiences with
							the view to refine and extend our established on-line presence.
						</p>
					</div>
				</DialogDescription>
				<DialogFooter className="p-0 px-4 pb-4">
					<Button size={"lg"} className="w-full" variant={"secondary"} asChild>
						<Link to="/jobs/12dddeax">Open this position</Link>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
