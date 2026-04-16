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
</script>

<template>
	<div class="absolute top-4 right-4 flex flex-col gap-2 z-999 pointer-events-none">
		<transition-group name="toast" tag="div" class="flex flex-col gap-2">
			<div
				v-for="toast in toasts"
				:key="toast.id"
				@mouseenter="pause(toast)"
				@mouseleave="resume(toast)"
				class="group relative w-65 px-3 py-2 rounded-xl backdrop-blur-xl border text-xs flex flex-col gap-2 pointer-events-auto transition-all duration-300 shadow-[0_0_25px_rgba(0,0,0,0.5)]"
				:class="{
					'bg-green-500/50 border-green-500/60 text-green-400': toast.type === 'success',
					'bg-yellow-500/50 border-yellow-500/60 text-yellow-400': toast.type === 'warning',
					'bg-red-500/50 border-red-500/60 text-red-400': toast.type === 'error',
					'bg-blue-500/50 border-blue-500/60 text-blue-400': toast.type === 'info',
				}">
				<!-- Close -->
				<button
					@click="remove(toast.id!)"
					class="absolute top-1 right-2 text-white/30 hover:text-white text-xs transition">
					✕
				</button>

				<!-- Content -->
				<div class="flex items-start gap-2 pr-5">
					<font-awesome-icon :icon="getIcon(toast.type)" class="text-sm opacity-80 mt-px shrink-0" />

					<div class="leading-snug wrap-break-word">
						{{ toast.message }}
					</div>
				</div>

				<!-- Timer -->
				<div class="w-full h-0.5 bg-neutral-900/50 rounded overflow-hidden">
					<div
						class="h-full bg-white/50 transition-[width] duration-100 ease-linear"
						:style="{ width: toast.progress + '%' }" />
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
