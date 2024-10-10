import { X } from "lucide-react";

export function FormError({
	error,
	clearErrorCallback,
}: {
	error: string;
	clearErrorCallback: () => void;
}) {
	return (
		<div className="bg-destructive px-4 py-3 rounded-lg flex items-center justify-between gap-4">
			<p className="text-destructive-foreground text-sm">{error}</p>
			<button
				className="shrink-0 hover:bg-destructive-foreground/20 p-1 rounded"
				onClick={clearErrorCallback}>
				<X size={16} className="stroke-destructive-foreground" />
			</button>
		</div>
	);
}
