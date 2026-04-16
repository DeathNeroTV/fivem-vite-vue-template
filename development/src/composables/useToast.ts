import { ref } from "vue";

export type ToastType = "success" | "warning" | "error" | "info";

export interface Toast {
	id?: number;
	message: string;
	type: ToastType;

	duration?: number;
	progress?: number;

	// 🔥 neu
	createdAt?: number;
	paused?: boolean;
	remaining?: number;
}

const toasts = ref<Toast[]>([]);
let id = 0;

export function useToast() {
	function show(toast: Toast | string, type: ToastType = "info", duration = 5000) {
		const normalized: Toast = typeof toast === "string" ? { message: toast, type, duration } : toast;

		const full: Toast = {
			...normalized,
			id: id++,
			duration: normalized.duration ?? 5000,
			progress: 100,
		};

		// Duplicate verhindern
		const exists = toasts.value.some((t) => t.message === full.message);
		if (exists) return;

		toasts.value.push(full);

		runTimer(full);
	}

	function runTimer(toast: Toast) {
		const start = Date.now();

		const interval = setInterval(() => {
			if (toast.paused) return;

			const elapsed = Date.now() - start;
			const progress = 100 - (elapsed / toast.duration!) * 100;

			toast.progress = Math.max(progress, 0);

			if (elapsed >= toast.duration!) {
				remove(toast.id!);
				clearInterval(interval);
			}
		}, 50);
	}

	function pause(toast: Toast) {
		toast.paused = true;
	}

	function resume(toast: Toast) {
		toast.paused = false;
	}

	function remove(id: number) {
		toasts.value = toasts.value.filter((t) => t.id !== id);
	}

	return {
		toasts,
		show,
		remove,
		pause,
		resume,
	};
}
