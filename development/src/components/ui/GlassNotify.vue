<script setup lang="ts">
	import { useToast, type ToastType } from "@Composables/useToast";

	const { toasts, remove, pause, resume } = useToast();

	function getIcon(type: ToastType) {
		switch (type) {
			case "success":
				return "circle-check";
			case "error":
				return "circle-xmark";
			case "warning":
				return "circle-exclamation";
			default:
				return "circle-info";
		}
	}

	function getColor(type: ToastType) {
		switch (type) {
			case "success":
				return "rgba(34,197,94,0.6)"; // green-500
			case "error":
				return "rgba(239,68,68,0.6)"; // red-500
			case "warning":
				return "rgba(234,179,8,0.6)"; // yellow-500
			default:
				return "rgba(59,130,246,0.6)"; // blue-500
		}
	}
</script>

<template>
	<div class="absolute top-4 right-4 flex flex-col gap-2 z-999 pointer-events-none">
		<transition-group name="toast" tag="div" class="flex flex-col gap-2">
			<div
				v-for="toast in toasts"
				:key="toast.id"
				@mouseenter="pause(toast)"
				@mouseleave="resume(toast)"
				class="group relative w-fit max-w-64 text-white px-2 py-1 rounded-xl backdrop-blur-xl border text-xs bg-neutral-950/60 flex flex-col gap-2 pointer-events-auto transition-all duration-300 shadow-[0_0_25px_rgba(0,0,0,0.5)]"
				:class="{
					'border-green-500/60': toast.type === 'success',
					'border-yellow-500/60': toast.type === 'warning',
					'border-red-500/60': toast.type === 'error',
					'border-blue-500/60': toast.type === 'info',
				}">
				<!-- Content -->
				<div class="flex items-center gap-2">
					<div class="relative w-12 h-12 shrink-0 flex items-center justify-center">
						<svg class="absolute inset-0 w-full h-full -rotate-90">
							<circle
								cx="50%"
								cy="50%"
								r="12"
								stroke="rgba(128,128,128,0.6)"
								stroke-width="2"
								fill="none" />

							<circle
								cx="50%"
								cy="50%"
								r="12"
								:stroke="getColor(toast.type)"
								stroke-width="2"
								fill="none"
								stroke-linecap="round"
								:stroke-dasharray="75.4"
								:stroke-dashoffset="75.4 * (1 - (toast.progress ?? 0) / 100)"
								class="transition-[stroke-dashoffset] duration-100 ease-linear" />
						</svg>

						<!-- 🔥 Icon perfekt zentriert -->
						<font-awesome-icon :icon="getIcon(toast.type)" class="text-lg leading-none" />
					</div>

					<div class="leading-snug wrap-break-word text-md">
						{{ toast.message }}
					</div>

					<!-- Close -->
					<button
						@click="remove(toast.id!)"
						class="text-white/60 hover:text-white text-md transition cursor-pointer">
						<font-awesome-icon icon="xmark" />
					</button>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<style>
	.toast-enter-from {
		opacity: 0;
		transform: translateX(40px) translateY(10px) scale(0.98);
	}
	.toast-enter-active {
		transition: all 0.25s ease;
	}
	.toast-move {
		transition: transform 0.25s ease;
	}
	.toast-leave-to {
		opacity: 0;
		transform: translateX(40px) scale(0.98);
	}
	.toast-leave-active {
		transition: all 0.2s ease;
	}
</style>
