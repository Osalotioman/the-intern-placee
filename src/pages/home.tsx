import { MapPin, X } from "lucide-react";
import { useState } from "react";
import { Bookmark } from "../components/Bookmark";
import { JobDetailsBriefCard } from "../components/JobDetailsBriefCard";
import { Button } from "../components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { InlinePaddingContainer } from "../components/ui/Container";
import RootLayout from "./layout";

export default function Home() {
	const [isHeaderOpen, setIsHeaderOpen] = useState(true);

	return (
		<RootLayout>
			<div>
				{isHeaderOpen && (
					<header className="min-h-[17.875rem] pb-6 text-white flex justify-end flex-col w-full relative isolate">
						{/* Dave me without conscience */}
						<img
							src="/images/23a5bbb18f810f4e62ba759d4fceaf79.png"
							alt="banner"
							className="absolute top-0 left-0 object-cover object-left w-full h-full -z-10"
						/>
						<InlinePaddingContainer>
							<div>
								{/* mykola is the users' name */}
								<h1 className="text-2xl mb-[1.125rem]">
									Mykola we’re here to <br /> help you land your next job!
								</h1>
								<div className="flex items-center space-x-[0.75rem]">
									<Button variant={"secondary"}>
										Learn about personal domains
									</Button>
									<Button variant={"secondary"}>Learn more</Button>
								</div>
							</div>
							<Button
								onClick={() => setIsHeaderOpen(false)}
								className="absolute right-5 top-5 px-2"
								size={"sm"}
								variant={"secondary"}>
								<X />
							</Button>
						</InlinePaddingContainer>
					</header>
				)}
				<InlinePaddingContainer className="border-b border-b-divider-md">
					<section className="py-6 space-y-4">
						<div className="flex items-center justify-between w-full">
							<h2 className="font-semibold text-xl">Recommended for you</h2>
							<div className="flex items-center space-x-2">
								<Button variant={"secondary"}>See all</Button>
								<Button variant={"secondary"}>Post a job</Button>
							</div>
						</div>
						<div className="flex gap-x-4">
							<JobDetailsBriefCard />
							<JobDetailsBriefCard />
							<JobDetailsBriefCard />
							<JobDetailsBriefCard />
						</div>
					</section>
				</InlinePaddingContainer>
				<InlinePaddingContainer>
					<section className="py-6 space-y-4">
						<div className="flex items-center justify-between w-full">
							<h2 className="font-semibold text-xl inline-flex items-center gap-x-2">
								<span className="size-6">
									<img
										src="/svgs/jobs-top-applicant.svg"
										alt=""
										width={150}
										height={150}
										className="w-full h-full object-cover"
									/>
								</span>
								Jobs where you are a top applicant
							</h2>
							<Button variant={"secondary"}>See all</Button>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<JobCard />
							<JobCard />
							<JobCard />
							<JobCard />
							<JobCard />
							<JobCard />
						</div>
					</section>
				</InlinePaddingContainer>
			</div>
		</RootLayout>
	);
}

// TODO: move to its own file
const JobCard = () => {
	return (
		<Card className="grow border-none">
			<CardHeader className="flex-row items-center gap-x-3 justify-between">
				<div className="flex gap-x-3">
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
						<CardTitle className="text-placeholder text-base">
							Product Designer
						</CardTitle>
						<CardDescription className="text-base text-white">
							WorkOS
						</CardDescription>
					</div>
				</div>
				<div className="flex items-center gap-x-2">
					<div className="bg-green-light/[0.07] rounded-lg px-3 py-1.5">
						<p className="text-green-light text-sm">1200 $</p>
					</div>
					<Bookmark isBookmarked={false} />
				</div>
			</CardHeader>
			<CardFooter className="flex gap-x-6 text-sm">
				<p>15 hours ago</p>
				<div className="inline-flex items-center gap-x-1.5">
					<MapPin size={20} />
					<p>London or remote</p>
				</div>
				<div className="flex items-center gap-x-1.5">
					<div className="flex items-center">
						<div className="size-6 rounded-full bg-red-500 border border-background-main"></div>
						<div className="size-6 rounded-full -ml-3 bg-blue-500 border border-background-main"></div>
						<div className="size-6 rounded-full -ml-3 bg-green-500 border border-background-main"></div>
					</div>
					<p>7 followers with the hiring team</p>
				</div>
			</CardFooter>
		</Card>
	);
};
