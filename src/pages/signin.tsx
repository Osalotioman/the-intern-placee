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
import { signInWithEmailAndPassword } from "@/lib/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signInFormSchema = z.object({
	email: z
		.string({ required_error: "Your email is required" })
		.email("Please enter a valid email address"),
	password: z
		.string()
		.min(8, "Your password must be at least 8 characters long"),
});

type SignInForm = z.infer<typeof signInFormSchema>;

export default function Signin() {
	const form = useForm<SignInForm>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const signIn = async (data: SignInForm) => {
		try {
			await signInWithEmailAndPassword(data.email, data.password);
		} catch (e) {
			console.log(JSON.stringify(e));
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
						Welcome Back
					</h1>
					<Button className="w-full bg-white text-background-main hover:bg-white/80">
						<img
							src="/images/google.png"
							alt="Google Icon"
							className="size-5 mr-4"
							width={40}
							height={40}
						/>{" "}
						Continue with Google
					</Button>
					<div className="flex gap-x-4 items-center">
						<div className="h-px w-full bg-white/60"></div>
						<p className="text-white">or</p>
						<div className="h-px w-full bg-white/60"></div>
					</div>
				</div>
				<div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(signIn)}>
							<div className="space-y-6">
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
									name="email"
									render={({ field }) => (
										<FormItem className="space-y-3">
											<FormLabel>Password</FormLabel>
											<FormDescription>
												Your Password should be at least 8 characters in length.
											</FormDescription>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="pt-3">
									<Button className="w-full bg-accent hover:bg-accent">
										Sign in
									</Button>
								</div>
							</div>
						</form>
					</Form>
					<div className="pt-4">
						<p className="text-center text-sm">
							New user? <MyLink to="/signup">Create an account</MyLink>
						</p>
					</div>
				</div>
			</Card>
		</div>
	);
}
