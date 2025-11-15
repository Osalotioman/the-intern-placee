export const getStorage = () => ({});
export const ref = (_storage: unknown, path: string) => ({ fullPath: path });
export const uploadBytes = async (_ref: { fullPath: string }, file: File) => ({
	metadata: { fullPath: _ref.fullPath },
	file,
});
