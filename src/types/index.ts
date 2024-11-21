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

export type ApiStatus = 'loading' | 'idle' | 'success' | 'error' 