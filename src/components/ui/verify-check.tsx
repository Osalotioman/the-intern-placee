import { BadgeCheck, LucideProps } from "lucide-react";
import { cn } from "../../lib/utils";

export default function VerifyCheckIcon({
	className,
	size = 24,
	...props
}: LucideProps) {
	return (
		<BadgeCheck
			className={cn(
				"fill-blue-500 first:[&_path]:stroke-blue-500 stroke-white",
				className
			)}
			size={size}
			{...props}
		/>
	);
}
