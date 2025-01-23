export type JobData = {
	position: string;
	employment: string;
	workModel: string;
	location: string;
	salaryMax: string;
	salaryMin: string;
	currency: string;
	tags: string;
	skills: string;
	jobDescription: string;
};

export type Id<TData> = TData & { id: string };

export type ApiStatus = "loading" | "idle" | "success" | "error";

export type JobApplicationData = {
	age: string;
	applicantId: string;
	coverLetter?: string;
	cv: string;
	email: string;
	jobId: string;
	location: string;
	name: string;
	phoneNumber: string;
	skills: string;
	description?: string;
	linkedin?: string;
	facebook?: string;
	github?: string;
	x?: string;
	blog?: string;
	portfolio?: string;
};
