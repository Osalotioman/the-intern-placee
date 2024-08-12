import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "./ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const jobSchema = z.object({
	username: z.string().min(2).max(50),
	displayName: z.string().min(2).max(100),
	whatYouDo: z.string(),
	location: z.string(),
	pronouns: z.string(),
	website: z.string().url({message: 'Please enter a valid website url'}),
	about: z.string(),
});

export function PostJob({ trigger }: { trigger: ReactNode }) {
	const form = useForm<z.infer<typeof jobSchema>>({
		resolver: zodResolver(jobSchema),
		defaultValues: {
			username: "",
			displayName: '',
			whatYouDo: '',
			location: '',
			pronouns: '',
			website: '',
			about: '',
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof jobSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<Dialog>
			<DialogTrigger className="grow" asChild>
				{trigger}
			</DialogTrigger>
			<DialogContent
				className="p-0 border-divider-dark max-w-3xl pb-8"
				hasCloseIcon={false}>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4">
						<DialogHeader className="p-4 space-y-[1.125rem]">
							<div className="flex items-center gap-x-3">
								<div className="relative">
									<div className="aspect-square overflow-clip w-20 rounded-full">
										<img
											width={150}
											height={150}
											src="/images/following-demo.png"
											alt="testing stuff"
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="absolute -bottom-2 right-0 p-2 rounded-full bg-block-light">
										<input type="file" className="absolute inset-0 opacity-0" />
										<Pencil size={18} className="stroke-white" />
									</div>
								</div>
								<div>
									<h2 className="text-xl leading-none font-medium text-white">
										Name of user
									</h2>
									<p className="text-lg">@username</p>
								</div>
							</div>
						</DialogHeader>
						<DialogDescription className="p-4 space-y-6">
							<div className="grid grid-cols-2 gap-4 items-center">
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormDescription>
												This is your unique name.
											</FormDescription>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="displayName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Display name</FormLabel>
											<FormDescription>
												This is the name displayed on your profile.
											</FormDescription>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="whatYouDo"
								render={({ field }) => (
									<FormItem>
										<FormLabel>What do you do?</FormLabel>
										<FormDescription>Your occupation.</FormDescription>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="location"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Location</FormLabel>
										<FormDescription>
											This is where you are based.
										</FormDescription>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="pronouns"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Pronouns</FormLabel>
										<FormDescription>
											This is what you want others to know you as. E.g she/her,
											he/him etc
										</FormDescription>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="website"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Website</FormLabel>
										<FormDescription>
											A link to your portfolio, blog or personal website.
										</FormDescription>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="about"
								render={({ field }) => (
									<FormItem>
										<FormLabel>About</FormLabel>
										<FormDescription>
											A short bio about yourself
										</FormDescription>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</DialogDescription>
						<DialogFooter className="p-0 px-4 pb-4 pt-6">
							<Button className="w-full">Done</Button>
							<Button className="w-full" variant={"secondary"} type="button">
								Save to draft
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
