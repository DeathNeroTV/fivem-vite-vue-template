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
		let start = Date.now();

		const interval = setInterval(() => {
			if (toast.paused) {
				start = Date.now() - (toast.duration! - toast.remaining!);
				return;
			}

			const elapsed = Date.now() - start;

			toast.remaining = Math.max(toast.duration! - elapsed, 0);
			toast.progress = (toast.remaining / toast.duration!) * 100;

			// 🔥 Vue reactivity fix (wichtig!)
			toasts.value = [...toasts.value];

			if (toast.remaining <= 0) {
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
