import { MapPin } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { InlinePaddingContainer } from "../components/ui/Container";
import RootLayout from "./layout";

export default function JobPage() {
	return (
		<RootLayout>
			<section>
				<InlinePaddingContainer className="border-b border-b-divider-md py-6">
					<div className="flex items-center gap-x-2.5 pb-[3.75rem]">
						<MapPin size={32} className="stroke-blue-light" />
						<p className="inline-flex flex-col">
							<span className="text-blue-light">Location</span>
							<span className="text-white">Atlanta, Alpharetta, or remote</span>
						</p>
					</div>
					<div className="space-y-5">
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
							<p>
								<span className="block text-placeholder text-sm">WorkOS</span>
								<span className="block text-base text-white">
									Product Designer
								</span>
							</p>
						</div>
						<div className="flex justify-between items-center gap-x-4 w-full">
							<div className="flex flex-wrap gap-2">
								{Array.from({ length: 12 }).map((_, i) => (
									<Badge key={i} className="min-w-fit">
										Badge {i + 1}
									</Badge>
								))}
							</div>
							<div className="flex gap-x-3">
								<Button variant={"secondary"} className="rounded-[10px]">
									Save
								</Button>
								<Button className="rounded-[10px]">Easy Apply</Button>
							</div>
						</div>
					</div>
				</InlinePaddingContainer>
			</section>
		</RootLayout>
	);
}
