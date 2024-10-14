import { ApplyJob } from "@/components/ApplyJob";
import { PostJob } from "@/components/PostJob";
import { ProfileMatcher } from "@/components/ProfileMatcher";
import { SimilarJobCard } from "@/components/SimilarJobCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InlinePaddingContainer } from "@/components/ui/Container";
import VerifyCheckIcon from "@/components/ui/verify-check";
import { matchListData } from "@/data/profile";
import RootLayout from "@/pages/layout";
import { Briefcase, MapPin } from "lucide-react";

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
								<span className="text-placeholder text-sm inline-flex gap-x-2 items-center">
									WorkOS <VerifyCheckIcon size={18} />
								</span>
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
								<Button variant={"secondary"} className="rounded-10">
									Save
								</Button>
								<ApplyJob
									trigger={<Button className="rounded-10">Easy Apply</Button>}
								/>
							</div>
						</div>
					</div>
				</InlinePaddingContainer>
				<InlinePaddingContainer>
					<div className="grid grid-cols-[1fr,_23rem] gap-x-8">
						<div className="py-5 pr-6 border-r border-r-divider-md pb-12">
							<div className="flex justify-between items-center gap-x-4 w-full mb-4">
								<h2 className="text-white font-semibold text-xl">
									Description
								</h2>
								<div className="flex gap-x-3">
									<Button variant={"secondary"} className="rounded-10">
										See all
									</Button>
									<PostJob
										trigger={
											<Button variant={"secondary"} className="rounded-10">
												Post a job
											</Button>
										}
									/>
								</div>
							</div>
							<article className="prose prose-headings:text-white">
								<p>
									At Doss we're building tools for teams that work in the Real
									World. Our Adaptive Resource Platform (ARP) is a
									re-imagination of the system-of-record tools that power
									today's physical economy.
								</p>
								<p>
									Our vision is to build software that Gives Operators
									Superpower - we just need your help executing the Doss ARP
									into existence.
								</p>
								<h3>What you'll do</h3>
								<ul>
									<li>
										Own UI/UX and product design lifecycle of our core product
										(many screens!)
									</li>
									<li>
										Architect a simple design system that helps Product +
										Engineering + spin-up new features and experiences rapidly
									</li>
									<li>
										Ship collateral for us to use in demo environments and
										go-to-market functions
									</li>
									<li>
										Collaborate across Product, Engineering, Sales, to reconcile
										business and product objectives into designs
									</li>
								</ul>
								<h3>What you're good at</h3>
								<ul>
									<li>
										Extensive experience designing for large-scale web apps
									</li>
									<li>Moving really fast in Figma</li>
									<li>Using the fundamentals of HTML, CSS, JavaScript</li>
									<li>
										Working with Frontend Engineers to make sure what&apos;s in
										the design is exactly what ends up in the browser
									</li>
									<li>Starting from zero</li>
								</ul>
								<h3>About you</h3>
								<ul>
									<li>
										Team player: you bring positivity, openness, and curiosity
										to the team every day
									</li>
									<li>
										Growth mindset: everything is an opportunity to learn and
										improve yourself, the team, and the company
									</li>
									<li>
										Craftsmanship: if something is off by 1px you know and you
										will fix it
									</li>
									<li>
										Scrappy: taking the fastest path to the best answer is
										habitual
									</li>
								</ul>
							</article>
						</div>
						<div className="py-5 space-y-6">
							<div className="space-y-2">
								<h3 className="inline-flex text-lg gap-x-2.5 items-center">
									<VerifyCheckIcon size={28} />
									<span className="text-white">Matched your profile</span>
								</h3>
								<ProfileMatcher matchList={matchListData} />
							</div>
							<div className="space-y-2">
								<h3 className="inline-flex text-lg gap-x-2.5 items-center">
									<Briefcase size={20} />
									<span className="text-white">Similar Jobs</span>
								</h3>
								<div className="space-y-2.5">
									<SimilarJobCard />
									<SimilarJobCard />
									<SimilarJobCard />
								</div>
							</div>
						</div>
					</div>
				</InlinePaddingContainer>
			</section>
		</RootLayout>
	);
}
