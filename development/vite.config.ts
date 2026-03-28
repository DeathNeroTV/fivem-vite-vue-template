import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
	base: "./",
	build: {
		outDir: path.resolve(__dirname, "../dist"),
		emptyOutDir: true,
		minify: "esbuild",
		target: "esnext",
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						if (id.includes("vue")) return "vue";
						return "vendor";
					}
				},
			},
		},
	},
	resolve: {
		alias: {
			"@Composables": path.resolve(__dirname, "src/composables"),
			"@Components": path.resolve(__dirname, "src/components"),
			"@Utils": path.resolve(__dirname, "src/utils"),
			"@Assets": path.resolve(__dirname, "./src/assets"),
		},
	},
	plugins: [vue()],
});
