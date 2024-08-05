import { CheckCircle2, CircleX } from "lucide-react";
import { CardDescription, CardTitle } from "./ui/card";

type MatchListItem = {
	matched: boolean;
	category: string;
	message: string;
};

export function ProfileMatcher({ matchList }: { matchList: MatchListItem[] }) {
	return (
		<div className="space-y-2.5">
			{matchList.map(({ matched, category, message }) => (
				<div key={category} className="py-1 border-none">
					<div className="flex items-center gap-x-3">
						<div className="aspect-square w-12 rounded-lg grid place-items-center bg-card">
							{matched ? (
								<CheckCircle2 size={24} className="stroke-green-main" />
							) : (
								<CircleX size={24} className="stroke-red-500" />
							)}
						</div>
						<div>
							<CardTitle className="text-sm text-placeholder">
								{category}
							</CardTitle>
							<CardDescription className="text-base text-white">
								{message}
							</CardDescription>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
