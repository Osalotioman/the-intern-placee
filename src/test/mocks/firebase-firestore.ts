type MockDocument = {
	id: string;
	data: () => Record<string, unknown>;
};

export const getFirestore = () => ({});
export const collection = () => ({});
export const doc = () => ({});
export const addDoc = () => Promise.resolve({});
export const getDoc = async (): Promise<MockDocument> => ({
	id: "doc-id",
	data: () => ({}),
});
export const getDocs = async () => ({
	forEach: (cb: (doc: MockDocument) => void) =>
		cb({ id: "doc-id", data: () => ({}) }),
});
export const query = () => ({});
export const where = () => ({});
