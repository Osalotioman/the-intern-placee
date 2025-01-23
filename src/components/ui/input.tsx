import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		const [isPaswordShown, setIsPaswordShown] = React.useState(false);
		const inputType = type === "password" && isPaswordShown ? "text" : type;
		const togglePasswordVisiblity = () => {
			setIsPaswordShown((prev) => !prev);
		};

		return (
			<div className="relative">
				<input
					type={inputType}
					className={cn(
						"block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-block-medium focus:ring-accent focus:border-accent sm:text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						className
					)}
					ref={ref}
					{...props}
				/>
				<button
					type="button"
					className="absolute top-1/2 -translate-y-1/2 right-3"
					onClick={togglePasswordVisiblity}>
					{type === "password" ? (
						isPaswordShown ? (
							<Eye size={20} className="stroke-gray-300" />
						) : (
							<EyeOff size={20} className="stroke-gray-300" />
						)
					) : null}
				</button>
			</div>
		);
	}
);
Input.displayName = "Input";

export { Input };
