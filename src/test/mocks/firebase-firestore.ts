export const getFirestore = () => ({});
export const collection = () => ({});
export const doc = () => ({});
export const addDoc = () => Promise.resolve({});
export const getDoc = async () => ({
	id: "doc-id",
	data: () => ({}),
});
export const getDocs = async () => ({
	forEach: (cb: (doc: any) => void) => cb({ id: "doc-id", data: () => ({}) }),
});
export const query = () => ({});
export const where = () => ({});
