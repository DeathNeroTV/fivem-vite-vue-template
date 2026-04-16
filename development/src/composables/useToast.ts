import { ref } from "vue";

export type ToastType = "success" | "warning" | "error" | "info";

export interface Toast {
	id: number;
	message: string;
	type: ToastType;
	duration: number;
	progress: number;
}

const toasts = ref<Toast[]>([]);
let id = 0;

export function useToast() {
	function show(message: string, type: ToastType = "info", duration = 5000) {
		const toast: Toast = {
			id: id++,
			message,
			type,
			duration,
			progress: 100,
		};

		// 🔥 Limit (kein Spam)
		if (toasts.value.length >= 3) {
			toasts.value.shift();
		}

		toasts.value.push(toast);

		const start = Date.now();

		const interval = setInterval(() => {
			const elapsed = Date.now() - start;

			toast.progress = 100 - (elapsed / duration) * 100;

			if (elapsed >= duration) {
				remove(toast.id);
				clearInterval(interval);
			}
		}, 50);
	}

	function remove(id: number) {
		toasts.value = toasts.value.filter((t) => t.id !== id);
	}

	return {
		toasts,
		show,
		remove,
	};
}
