import { app } from "@/lib/api/config";
import { Id, JobApplicationData, JobData } from "@/types";
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	where,
} from "firebase/firestore";
import { DB_COLLECTIONS } from "./constants";

const db = getFirestore(app);
const jobsCollection = collection(db, DB_COLLECTIONS.JOBS);
const jobApplicationCollection = collection(db, DB_COLLECTIONS.JOB_APPLICATION);

export function addJob(job: JobData, creatorUserId: string) {
	return addDoc(jobsCollection, { ...job, creatorUserId });
}

export async function getJob(jobId: string) {
	const job = await getDoc(doc(db, DB_COLLECTIONS.JOBS, jobId));
	return { id: job.id, ...(job.data() as JobData) };
}

export function applyToJob(jobData: JobApplicationData) {
	return addDoc(jobApplicationCollection, jobData);
}

export async function getAllJobs() {
	const jobsCol = await getDocs(jobsCollection);
	const jobs: Id<JobData>[] = [];
	jobsCol.forEach((job) =>
		jobs.push({ id: job.id, ...(job.data() as JobData) })
	);
	return jobs;
}

export async function getUserJobApplication(jobId: string, userId: string) {
	const q = query(
		jobApplicationCollection,
		where("jobId", "==", jobId),
		where("applicantId", "==", userId)
	);
	const jobApplicationDocs = await getDocs(q);

	const jobApplications: JobApplicationData[] = [];

	jobApplicationDocs.forEach((jobApp) =>
		jobApplications.push({ ...(jobApp.data() as JobApplicationData) })
	);

	return jobApplications;
}

export async function getUserAllJobApplications(userId: string) {
	const q = query(jobApplicationCollection, where("applicantId", "==", userId));
	const jobApplicationDocs = await getDocs(q);

	const jobApplications: JobApplicationData[] = [];

	jobApplicationDocs.forEach((jobApp) =>
		jobApplications.push({ ...(jobApp.data() as JobApplicationData) })
	);

	return jobApplications;
}
