import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const defaultFileObject = {
	lastModified: 0,
	lastModifiedDate: new Date(),
	name: "",
	size: 0,
	type: "",
};

const jobSchema = z.object({
	name: z.string().min(1, "Your name is required"),
	location: z.string().min(1, "Your location is required"),
	email: z.string().email(),
	phoneNumber: z
		.string()
		.refine(
			(val) => val.length === 11,
			"Nigeria phone number must be 11 digits."
		)
		.refine((val) => /^\d+$/.test(val), "Phone number must be a number."),
	age: z.string().min(1, "Your age is required"),
	about: z.string().optional(),
	socials: z.object({
		facebook: z.string().optional(),
		x: z.string().optional(),
		linkedIn: z.string().optional(),
		github: z.string().optional(),
	}),
	// TODO: come back and fix validation once type from input is known
	cv: z.any(),
	coverLetter: z.any().optional(),
	skills: z.string().min(1, "You must add at least one skill"),
	otherLinks: z.object({
		portfolio: z.string().optional(),
		blog: z.string().optional(),
	}),
});

export function ApplyJob({ trigger }: { trigger: ReactNode }) {
	const form = useForm<z.infer<typeof jobSchema>>({
		resolver: zodResolver(jobSchema),
		defaultValues: {
			name: "",
			location: "",
			email: "",
			phoneNumber: "",
			age: "",
			about: "",
			socials: { facebook: "", x: "", linkedIn: "", github: "" },
			cv: defaultFileObject,
			coverLetter: defaultFileObject,
			skills: "",
			otherLinks: { portfolio: "", blog: "" },
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
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
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
									<FormItem>
										<FormLabel>Email</FormLabel>
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
										<FormLabel>Where are you located?</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="phoneNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Your Phone Number</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="age"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Age</FormLabel>
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
										<FormLabel>A short description about yourself</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="socials.facebook"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Your facebook link</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="socials.linkedIn"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Your LinkedIn link</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="socials.x"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Your X/Twitter link</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="socials.github"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Your Github Link</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* TODO: fix file upload */}
							<FormField
								control={form.control}
								name="cv"
								render={({ field: { value, ...rest } }) => (
									<FormItem>
										<FormLabel>Your CV</FormLabel>
										<FormControl>
											<Input type="file" value={value.name} {...rest} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* <FormField
								control={form.control}
								name="cv"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Your Cover Letter (optional)</FormLabel>
										<FormControl>
											<Input type="file" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/> */}
							<FormField
								control={form.control}
								name="skills"
								render={({ field }) => (
									<FormItem>
										<FormLabel>What skills do you have?</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="otherLinks.portfolio"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Your Portfolio Link (if any)</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="otherLinks.blog"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Your Blog Link (if any)</FormLabel>
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
