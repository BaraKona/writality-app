import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import pluginPurgeCss from "@mojojoejo/vite-plugin-purgecss";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), pluginRewriteAll(), pluginPurgeCss()],

	build: {
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			output: {
				manualChunks: {
					react: [
						"react",
						"react-dom",
						"react-router-dom",
						"react-query",
						"react-icons",
						"react-hot-toast",
						"react-markdown",
					],
					ui: [
						"@mantine/core",
						"@mantine/hooks",
						"@mantine/carousel",
						"embla-carousel-react",
						"@emotion/react",
						"@emotion/server",
						"@formkit/auto-animate",
						"@tabler/icons-react",
						"sass",
					],
					utilities: [
						"axios",
						"lodash.debounce",
						"dayjs",
						"uuid",
						"dotenv",
						"diff",
					],
					dnd: ["@dnd-kit/core", "@dnd-kit/modifiers", "@dnd-kit/sortable"],
					editor: ["remark-gfm"],
					socket: ["pusher", "pusher-js"],
					analytics: ["@vercel/analytics", "react-ga4"],
					charts: ["chart.js", "react-chartjs-2"],
					blocknote: ["@blocknote/core", "@blocknote/react"],
					parsing: ["cheerio"],
				},
			},
		},
	},
	base: "/",
	server: {
		host: true,
	},
});
