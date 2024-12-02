import config from "@/config";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./config";
import { sanitizeFileName } from "../utils";

const storage = getStorage(app, config.STORAGE_BUCKET_URL);

export async function uploadFile(filePath: string, file: File) {
	const fileRef = ref(storage, filePath);
	return await uploadBytes(fileRef, file);
}

export async function uploadCoverLetter(file: File) {
	const fileRef = ref(storage, `cover_letter/${sanitizeFileName(file.name)}`);
	await uploadBytes(fileRef, file);
}
