<script setup lang="ts">
	import { useToast, type ToastType } from "@Composables/useToast";

	const { toasts, remove } = useToast();

	function getColor(type: ToastType) {
		switch (type) {
			case "success":
				return "border-green-500/20 bg-green-500/10 text-green-400";
			case "error":
				return "border-red-500/20 bg-red-500/10 text-red-400";
			case "warning":
				return "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";
			default:
				return "border-blue-500/20 bg-blue-500/10 text-blue-400";
		}
	}

	function getIcon(type: ToastType) {
		switch (type) {
			case "success":
				return "circle-check";
			case "error":
				return "circle-xmark";
			case "warning":
				return "circle-exclamation";
			case "info":
				return "circle-info";
		}
	}
</script>

<template>
	<div class="pointer-events-none fixed top-6 right-6 z-999 flex w-65 flex-col gap-2">
		<transition-group name="toast" tag="div">
			<div
				v-for="toast in toasts"
				:key="toast.id"
				class="group relative pointer-events-auto flex flex-col gap-2 rounded-xl border backdrop-blur-xl px-4 py-3 text-white shadow-[0_0_25px_rgba(0,0,0,0.5)] transition-all duration-300"
				:class="getColor(toast.type)">
				<!-- Close -->
				<button
					@click="remove(toast.id)"
					class="absolute top-1.5 right-2 text-white/30 hover:text-white text-xs transition">
					✕
				</button>

				<!-- Content -->
				<div class="flex items-center gap-3 pr-4">
					<!-- Icon -->
					<font-awesome-icon :icon="getIcon(toast.type)" class="text-base opacity-80 shrink-0" />

					<!-- Text -->
					<span class="text-xs leading-snug wrap-break-word">
						{{ toast.message }}
					</span>
				</div>

				<!-- Timer Bar -->
				<div class="w-full h-0.5 bg-white/5 rounded overflow-hidden">
					<div
						class="h-full bg-white/60 transition-[width] duration-100 ease-linear"
						:style="{ width: toast.progress + '%' }" />
				</div>

				<!-- Hover Overlay -->
				<div
					class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-white/5 transition pointer-events-none" />
			</div>
		</transition-group>
	</div>
</template>

<style>
	.toast-enter-from {
		opacity: 0;
		transform: translateX(40px) scale(0.98);
	}
	.toast-enter-active {
		transition: all 0.25s ease;
	}
	.toast-leave-to {
		opacity: 0;
		transform: translateX(40px) scale(0.98);
	}
	.toast-leave-active {
		transition: all 0.2s ease;
	}
</style>
