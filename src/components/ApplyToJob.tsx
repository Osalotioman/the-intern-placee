import { Button } from "@/components/ui/button";
import { applyToJob } from "@/lib/api/db";
import { uploadFile } from "@/lib/api/storage";
import { cn, isErrorInstance } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ComponentProps, ReactNode } from "react";
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

const MB_BYTES = 1000000; // Number of bytes in a megabyte.

const ACCEPTED_MIME_TYPES = [
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"application/pdf",
];

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
	cv: z.any().superRefine((f: File, ctx) => {
		if (f.name.length === 0) {
			return ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Your CV is required.",
			});
		}

		if (!ACCEPTED_MIME_TYPES.includes(f.type)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `File must be one of [pdf, doc, or docx] but was ${f.type}`,
			});
			return;
		}

		if (f.size > 3 * MB_BYTES) {
			ctx.addIssue({
				code: z.ZodIssueCode.too_big,
				type: "array",
				message: `The file must not be larger than 3mb: ${f.size}`,
				maximum: 3 * MB_BYTES,
				inclusive: true,
			});
		}
	}),
	coverLetter: z
		.any()
		.superRefine((f: File, ctx) => {
			// Check if a file has been selected by the user. Validation should only run if a file is selected, as this field is optional.
			if (f.name.length > 0) {
				if (!ACCEPTED_MIME_TYPES.includes(f.type)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `File must be one of [pdf, doc, or docx] but was ${f.type}`,
					});
				}

				if (f.size > 3 * MB_BYTES) {
					ctx.addIssue({
						code: z.ZodIssueCode.too_big,
						type: "array",
						message: `The file must not be larger than 3mb: ${f.size}`,
						maximum: 3 * MB_BYTES,
						inclusive: true,
					});
				}
			}
		})
		.optional(),
	skills: z.string().min(1, "You must add at least one skill"),
	otherLinks: z.object({
		portfolio: z.string().optional(),
		blog: z.string().optional(),
	}),
});

function ApplyToJobTrigger({ children }: { children: ReactNode }) {
	return (
		<DialogTrigger className="grow" asChild>
			{children}
		</DialogTrigger>
	);
}

function ApplyToJobProvider({
	open,
	onOpenChange,
	children,
}: {
	open?: boolean;
	onOpenChange?: ComponentProps<typeof Dialog>["onOpenChange"];
	children: ReactNode;
}) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			{children}
		</Dialog>
	);
}

function ApplyToJobContent({ jobId }: { jobId: string }) {
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
	const isSubmitting = form.formState.isSubmitting;

	async function onSubmit(values: z.infer<typeof jobSchema>) {
		try {
			// upload the cv and cover letter to our storage, get the id's from the result and save that in db
			const { socials, otherLinks, coverLetter, cv, ...rest } = values;
			// const { cv, coverLetter } = values;
			const files: { filePath: string; file: File }[] = [];

			if (cv) {
				files.push({ filePath: `cv/${cv.name}`, file: cv });
			}

			if (coverLetter) {
				files.push({
					filePath: `cover_letter/${coverLetter.name}`,
					file: coverLetter,
				});
			}

			const filePromise = await Promise.all(
				files.map((file) => uploadFile(file.filePath, file.file))
			);
			console.log(filePromise);
			// await uploadCv(cv);

			const jobApplication = await applyToJob({
				...rest,
				...socials,
				...otherLinks,
				jobId,
				applicantId: "x",
				cv: cv.name,
				coverLetter: coverLetter.name,
			});
			console.log(jobApplication);
		} catch (e) {
			if (isErrorInstance(e)) {
				console.error(e);
			}
		}
	}

	return (
		<DialogContent
			className="p-8 border-divider-dark max-w-xl py-12"
			hasCloseIcon={false}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<DialogHeader className="text-2xl mb-6">
						<DialogTitle>Apply to Job</DialogTitle>
					</DialogHeader>
					<DialogDescription className="space-y-6">
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
									<FormLabel>
										A short description about yourself (optional)
									</FormLabel>
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
									<FormLabel>Your facebook link (optional)</FormLabel>
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
									<FormLabel>Your LinkedIn link (optional)</FormLabel>
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
									<FormLabel>Your X/Twitter link (optional)</FormLabel>
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
									<FormLabel>Your Github Link (optional)</FormLabel>
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
							render={({ field: { onBlur, disabled, name, ref } }) => (
								<FormItem>
									<FormLabel>Your CV</FormLabel>
									<FormControl>
										<Input
											type="file"
											onChange={(e) => {
												form.setValue(
													"cv",
													e.target.files && e.target.files[0]
												);
												form.clearErrors("cv");
											}}
											onBlur={onBlur}
											disabled={disabled}
											name={name}
											ref={ref}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="coverLetter"
							render={({ field: { onBlur, disabled, name, ref } }) => (
								<FormItem>
									<FormLabel>Your Cover Letter (optional)</FormLabel>
									<FormControl>
										<Input
											type="file"
											onChange={(e) => {
												form.setValue(
													"coverLetter",
													e.target.files && e.target.files[0]
												);
												form.clearErrors("coverLetter");
											}}
											onBlur={onBlur}
											disabled={disabled}
											name={name}
											ref={ref}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
										{/* TODO: change to the tags input once implemented */}
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
					<DialogFooter className="p-0 pt-8">
						<Button className="w-full">
							<span
								className={cn(
									"text-background-main",
									isSubmitting && "opacity-0"
								)}>
								Apply
							</span>
							{isSubmitting && (
								<p className="text-background-main absolute inset-0 top-1/2 -translate-y-1/2">
									Applying...
								</p>
							)}
						</Button>
						<Button className="w-full" variant={"secondary"} type="button">
							Save to draft
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</DialogContent>
	);
}

export function ApplyToJob({
	trigger,
	open,
	onOpenChange,
	jobId,
}: {
	trigger: ReactNode;
	open?: boolean;
	onOpenChange?: ComponentProps<typeof Dialog>["onOpenChange"];
} & ComponentProps<typeof ApplyToJobContent>) {
	return (
		<ApplyToJobProvider open={open} onOpenChange={onOpenChange}>
			<ApplyToJobTrigger>{trigger}</ApplyToJobTrigger>
			<ApplyToJobContent jobId={jobId} />
		</ApplyToJobProvider>
	);
}

ApplyToJob.Provider = ApplyToJobProvider;
ApplyToJob.Trigger = ApplyToJobTrigger;
ApplyToJob.Content = ApplyToJobContent;
