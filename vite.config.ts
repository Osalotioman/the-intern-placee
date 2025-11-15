import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react-swc";
import reactBabel from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

const isVitest = process.env.VITEST === "true";
const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
	plugins: [isVitest ? reactBabel() : react(), tsconfigPaths()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/test/setup.ts",
		css: true,
		alias: {
			"firebase/app": path.resolve(rootDir, "src/test/mocks/firebase-app.ts"),
			"firebase/analytics": path.resolve(
				rootDir,
				"src/test/mocks/firebase-analytics.ts"
			),
			"firebase/auth": path.resolve(
				rootDir,
				"src/test/mocks/firebase-auth.ts"
			),
			"firebase/firestore": path.resolve(
				rootDir,
				"src/test/mocks/firebase-firestore.ts"
			),
			"firebase/storage": path.resolve(
				rootDir,
				"src/test/mocks/firebase-storage.ts"
			),
		},
		coverage: {
			reportsDirectory: "./coverage",
			reporter: ["text", "json-summary", "lcov"],
			provider: "v8",
		},
	},
});
