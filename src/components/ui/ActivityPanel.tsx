import { ChevronsUpDown, Ellipsis, ListCollapse } from "lucide-react";
import { Card, CardDescription, CardTitle } from "./card";

export function ActivityPanel() {
	return (
		<div className="border-l border-l-divider-md h-svh sticky top-0 right-0">
			<div className="h-full overflow-hidden overflow-y-auto pb-14">
				<div className="px-4 pt-4 pb-6 space-y-6">
					<div className="space-y-4">
						<div className="flex items-center gap-x-4 justify-between">
							<h2>Open Roles</h2>
							<button>
								<Ellipsis size={20} />
							</button>
						</div>
						<Card className="border p-3 space-y-5">
							<RolesList />
							<RolesList />
						</Card>
					</div>
					<div className="space-y-4">
						<div className="flex items-center gap-x-4 justify-between">
							<h2>Following</h2>
							<button>
								<Ellipsis size={20} />
							</button>
						</div>
						{/* TODO: change activties here */}
						<FollowingCard />
						<FollowingCard />
						<FollowingCard />
					</div>
				</div>
			</div>
			<div className="border-t border-t-divider-md flex absolute bottom-0 w-full bg-background-main">
				<div className="size-14 border-r border-r-divider-md grid place-content-center">
					<ListCollapse size={20} />
				</div>
				<div className="grow flex gap-x-2.5 items-center justify-center">
					<p className="text-white">All Activity</p>
					<ChevronsUpDown size={16} />
				</div>
			</div>
		</div>
	);
}

const RolesList = () => {
	return (
		<div className="flex gap-x-3">
			<div className="aspect-square w-12 rounded-full overflow-hidden">
				<img
					className="w-full h-full object-cover"
					src="/svgs/demo-logo.svg"
					alt="demo logo"
					width={150}
					height={150}
				/>
			</div>
			<div>
				<CardTitle className="text-placeholder text-sm flex gap-x-2 items-center">
					<span>Product Designer</span>
					<span
						aria-hidden="true"
						className="size-1 bg-blue-light rounded-full"></span>
					<span className="text-blue-light">12 min</span>
				</CardTitle>
				<CardDescription className="text-base text-white">
					WorkOS
				</CardDescription>
			</div>
		</div>
	);
};

function FollowingCard() {
	return (
		<Card className="border p-3 space-y-5">
			<div className="flex gap-x-3">
				<div className="aspect-square size-8 rounded-full overflow-hidden">
					<img
						className="w-full h-full object-cover"
						src="/svgs/demo-logo.svg"
						alt="demo logo"
						width={150}
						height={150}
					/>
				</div>
				<CardTitle className="text-sm flex gap-x-1.5 items-center">
					<span className="text-white">John Doe</span>
					<span className="text-placeholder">added a project</span>
					<span
						aria-hidden="true"
						className="size-1 bg-blue-light rounded-full"></span>
					<span className="text-blue-light">7h</span>
				</CardTitle>
			</div>
			<div className="space-y-3 pl-3 mb-3">
				<div className="text-sm mb-2.5 border-l border-l-divider-md pl-[1.125rem]">
					<p className="text-placeholder mb-3">2018</p>
					<div className="mb-2">
						<h3 className="text-sm text-white mb-1.5">
							Kids Pod at Nike House of Innovation Paris
						</h3>
						<p>
							A long term interactive installation for the Nike House of
							Innovation Paris encouraging kids to use their bodies as a
							controller
						</p>
					</div>
					<div className="grid grid-cols-[repeat(2,_5.625rem)] gap-x-2.5">
						<img
							src="/images/following-demo.png"
							className="rounded-lg w-full object-cover"
							alt=""
							width={120}
							height={80}
						/>
						<img
							src="/images/following-demo.png"
							className="rounded-lg w-full object-cover"
							alt=""
							width={120}
							height={80}
						/>
					</div>
				</div>
			</div>
		</Card>
	);
}
