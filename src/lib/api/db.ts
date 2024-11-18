import { app } from "@/lib/api/config";
import { JobData } from "@/types";
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getFirestore,
} from "firebase/firestore";
import { DB_COLLECTIONS } from "./constants";

const db = getFirestore(app);

export function addJob(job: JobData, creatorUserId: string) {
	return addDoc(collection(db, DB_COLLECTIONS.JOBS), { ...job, creatorUserId });
}

export async function getJob(jobId: string) {
  const job = await getDoc(doc(db, DB_COLLECTIONS.JOBS, jobId));
	return job.data();
}
