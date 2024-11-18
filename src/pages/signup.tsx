import { FormError } from "@/components/FormError";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MyLink } from "@/components/ui/link";
import { Logo } from "@/components/ui/logo";
import { signUpWithEmailAndPassword } from "@/lib/api/auth";
import { cn, getUserFriendlyError, isErrorInstance } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const signUpFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z
		.string({ required_error: "Your email is required" })
		.email("Please enter a valid email address"),
	password: z
		.string()
		.min(8, "Your password must be at least 8 characters long"),
});

type SignUpForm = z.infer<typeof signUpFormSchema>;

export default function Signup() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const form = useForm<SignUpForm>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});
	const navigate = useNavigate();

	const signUp = async (data: SignUpForm) => {
		try {
			setLoading(true);
			await signUpWithEmailAndPassword(data.email, data.password);
			navigate("/");
		} catch (e: unknown) {
			if (isErrorInstance(e)) {
				console.log(e.code);
				setError(getUserFriendlyError(e.code));
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-dvh flex items-center justify-center">
			<Card className="max-w-lg w-full p-6 space-y-6">
				<div className="w-fit">
					<Logo />
				</div>
				<div className="text-center space-y-4">
					<h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
						Create an account
					</h1>
					<Button className="w-full bg-white text-background-main hover:bg-white/80">
						<img
							src="/images/google.png"
							alt="Google Icon"
							className="size-5 mr-4"
							width={40}
							height={40}
						/>{" "}
						Using Google
					</Button>
					<div className="flex gap-x-4 items-center">
						<div className="h-px w-full bg-white/60"></div>
						<p className="text-white">or</p>
						<div className="h-px w-full bg-white/60"></div>
					</div>
				</div>
				<div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(signUp)}>
							<div className="space-y-6">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem className="space-y-3">
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="space-y-3">
											<FormLabel>Email address</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="space-y-3">
											<FormLabel>Password</FormLabel>
											<FormDescription>
												Your Password should be at least 8 characters in length.
											</FormDescription>
											<FormControl>
												<Input type="password" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{error && (
									<FormError
										error={error}
										clearErrorCallback={() => setError(null)}
									/>
								)}
								<div className="pt-3">
									<Button className="w-full bg-accent hover:bg-accent relative">
										<span className={cn(loading && "opacity-0")}>
											Create account
										</span>
										{loading && (
											<p className="absolute inset-0 top-1/2 -translate-y-1/2">
												Loading...
											</p>
										)}
									</Button>
								</div>
							</div>
						</form>
					</Form>

					<div className="pt-4">
						<p className="text-center text-sm">
							Already have an account? <MyLink to="/signin">Sign in</MyLink>
						</p>
					</div>
				</div>
			</Card>
		</div>
	);
}
