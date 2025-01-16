import { app } from "@/lib/api/config";
import { Id, JobApplicationData, JobData } from "@/types";
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
} from "firebase/firestore";
import { DB_COLLECTIONS } from "./constants";

const db = getFirestore(app);

export function addJob(job: JobData, creatorUserId: string) {
	return addDoc(collection(db, DB_COLLECTIONS.JOBS), { ...job, creatorUserId });
}

export async function getJob(jobId: string) {
	const job = await getDoc(doc(db, DB_COLLECTIONS.JOBS, jobId));
	return { id: job.id, ...(job.data() as JobData) };
}

export function applyToJob(jobData: JobApplicationData) {
	return addDoc(collection(db, DB_COLLECTIONS.JOB_APPLICATION), jobData);
}

export async function getAllJobs() {
	const jobsCol = await getDocs(collection(db, DB_COLLECTIONS.JOBS));
	const jobs: Id<JobData>[] = [];
	jobsCol.forEach((job) =>
		jobs.push({ id: job.id, ...(job.data() as JobData) })
	);
	return jobs;
}
