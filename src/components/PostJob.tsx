import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { addJob } from "@/lib/api/db";
import { cn, isErrorInstance } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { ReactNode, useState } from "react";
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
import { RichTextEditor } from "./ui/RichTextEditor";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Link } from "react-router-dom";

const EMPLOYMENT = ["Full time", "Part time", "Contract"] as const;
const WORK_MODEL = ["Remote", "On site", "Hybrid"] as const;
const CURRENCY = ["NGN"] as const;

const step1JobSchema = z
	.object({
		position: z.string().min(1, "Position is required"),
		employment: z.enum(EMPLOYMENT),
		workModel: z.enum(WORK_MODEL),
		location: z.string().min(1, "Location is required"),
		salaryMin: z
			.string()
			.refine(
				(val) => /^\d+$/.test(val),
				"Minimum salary must be a valid number"
			),
		salaryMax: z
			.string()
			.refine(
				(val) => /^\d+$/.test(val),
				"Minimum salary must be a valid number"
			),
		currency: z.enum(CURRENCY),
		// TODO: use an array for the tags
		tags: z.string(),
		skills: z.string(),
	})
	.superRefine((args, ctx) => {
		if (Number(args.salaryMax) < Number(args.salaryMin)) {
			return ctx.addIssue({
				message: "Maximum salary must be greater than minimum salary",
				code: "custom",
				path: ["salaryMax"],
			});
		}
	});

const step2FormSchema = z.object({
	jobPost: z
		.string()
		.min(300, "Your job post must have a minimum of 300 characters."),
});

export function PostJob({ trigger }: { trigger: ReactNode }) {
	const [jobStep, setJobStep] = useState<"1" | "2" | "done">("1");
	const [createdJobId, setCreatedJobId] = useState('');
	const { user } = useUser();

	// TEST STATE
	// {
	// 	currentStep: ,
	// 	stepsDone: ['1', '2'],
	// }
	const form = useForm<z.infer<typeof step1JobSchema>>({
		resolver: zodResolver(step1JobSchema),
		defaultValues: {
			position: "",
			employment: "Full time",
			workModel: "On site",
			location: "",
			salaryMax: "",
			salaryMin: "",
			currency: "NGN",
			tags: "",
			skills: "",
		},
	});
	const step2Form = useForm<z.infer<typeof step2FormSchema>>({
		resolver: zodResolver(step2FormSchema),
		defaultValues: {
			jobPost: "",
		},
	});

	const isSubmitting = step2Form.formState.isSubmitting;

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof step1JobSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
		setJobStep("2");
	}

	async function step2OnSubmit(values: z.infer<typeof step2FormSchema>) {
		if (!user) {
			console.log("user not found");
			return;
		}

		try {
			const jobCreated = await addJob(
				{
					...form.getValues(),
					jobDescription: values.jobPost,
				},
				user.uid
			);
			setJobStep('done');
			setCreatedJobId(jobCreated.id);
			console.log(jobCreated.id);
		} catch (e) {
			if (isErrorInstance(e)) {
				console.log(e);
			}
		}
	}

	return (
		<Dialog>
			<DialogTrigger className="grow" asChild>
				{trigger}
			</DialogTrigger>
			<DialogContent
				className="p-4 border-divider-dark max-w-xl pb-8"
				hasCloseIcon={false}>
				<div className="grid grid-cols-2 items-center">
					<p className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
						<span
							className={cn("h-0.5 bg-white rounded-lg", {
								"bg-white/60": jobStep !== "1",
								// for when the step has been completed
								// "bg-green-400": true,
							})}></span>
						<span
							className={cn("rounded-full bg-white p-1.5 text-primary px-4", {
								"bg-white/60 text-white/60": jobStep !== "1",
								// "bg-green-400": true,
							})}>
							1
						</span>
						<span
							className={cn("h-0.5 bg-white rounded-lg", {
								"bg-white/60": jobStep !== "1",
								// "bg-green-400": true,
							})}></span>
					</p>
					<p className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
						<span
							className={cn("h-0.5 bg-white rounded-lg", {
								"bg-white/60": jobStep !== "2",
								// "bg-green-400": true,
							})}></span>
						<span
							className={cn("rounded-full bg-white p-1.5 text-primary px-4", {
								"bg-white/60 text-white/60": jobStep !== "2",
								// "bg-green-400": true,
							})}>
							2
						</span>
						<span
							className={cn("h-0.5 bg-white rounded-lg", {
								"bg-white/60": jobStep !== "2",
								// "bg-green-400": true,
							})}></span>
					</p>
				</div>
				<div>
					{jobStep === "1" && (
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6">
								<DialogHeader className="space-y-[1.125rem]">
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
												<input
													type="file"
													className="absolute inset-0 opacity-0"
												/>
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
								<DialogDescription className="space-y-6">
									<FormField
										control={form.control}
										name="position"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Job Position</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="employment"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Job Employment</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select the kind of job employment" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{EMPLOYMENT.map((employ) => (
															<SelectItem value={employ} key={employ}>
																{employ}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="workModel"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Work Model</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select the kind of work model for the job" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{WORK_MODEL.map((work) => (
															<SelectItem value={work} key={work}>
																{work}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="location"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Job Preferred Location</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="currency"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Salary Currency</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select the currency for the salary" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{CURRENCY.map((curr) => (
															<SelectItem value={curr} key={curr}>
																{curr}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className="grid grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="salaryMin"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Salary Minimum Amount</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="salaryMax"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Salary Maximum Amount</FormLabel>
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
										name="tags"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Select tags for this job</FormLabel>
												<FormControl>
													<Input {...field} />
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
												<FormLabel>
													What skills should the applicant have for this job?
												</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</DialogDescription>
								<DialogFooter className="p-0 px-4 pb-4">
									<Button className="w-full">Continue</Button>
									<Button
										className="w-full"
										variant={"secondary"}
										type="button">
										Save to draft
									</Button>
								</DialogFooter>
							</form>
						</Form>
					)}
					{jobStep === "2" && (
						<Form {...step2Form}>
							<form
								onSubmit={step2Form.handleSubmit(step2OnSubmit)}
								className="space-y-6">
								<DialogDescription className="space-y-6">
									<FormField
										control={step2Form.control}
										name="jobPost"
										render={() => (
											<FormItem>
												<FormControl>
													<RichTextEditor
														setValue={(content) => {
															console.log(content);
															step2Form.setValue("jobPost", content);
														}}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</DialogDescription>
								<DialogFooter className="p-0 px-4 pb-4">
									<Button className="w-full">
										{isSubmitting ? "Creating..." : "Create"}
									</Button>
								</DialogFooter>
							</form>
						</Form>
					)}
					{jobStep === "done" && (
						<div className="flex flex-col items-center justify-center gap-4">
							<div className="max-w-52 pb-3 mx-auto">
								<img
									src="/svgs/job-done.svg"
									alt="Job post succesfully created"
									width={300}
									height={300}
									className="w-full h-full object-cover"
								/>
							</div>
							<h2 className="text-xl font-semibold">
								You have successfuly posted a job on our platform.{" "}
							</h2>
							<Link to={`/jobs/${createdJobId}`} className="w-full max-w-xs">View Job Post</Link>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
