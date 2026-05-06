import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
	base: "./",
	build: {
		outDir: path.resolve(__dirname, "../dist"),
		emptyOutDir: true,
		minify: "esbuild",
		reportCompressedSize: false,
	},
	resolve: {
		alias: {
			"@Composables": path.resolve(__dirname, "src/composables"),
			"@Components": path.resolve(__dirname, "src/components"),
			"@Plugins": path.resolve(__dirname, "src/plugins"),
			"@Utils": path.resolve(__dirname, "src/utils"),
			"@Types": path.resolve(__dirname, "src/types"),
			"@Stores": path.resolve(__dirname, "src/stores"),
			"@Views": path.resolve(__dirname, "src/views"),
			"@Mocks": path.resolve(__dirname, "src/mocks"),
			"@Assets": path.resolve(__dirname, "src/assets"),
		},
	},
	plugins: [vue(), tailwindcss()],
});
