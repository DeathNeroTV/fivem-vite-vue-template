import { onMounted, onUnmounted } from "vue";
import { Config } from "@Utils/config";

type NuiCallback<T = any> = (data: T) => void;

const listeners = new Map<string, Set<NuiCallback>>();

declare function GetParentResourceName(): string;import { ref } from "vue";

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


function registerListener<T>(event: string, cb: NuiCallback<T>) {
	if (!listeners.has(event)) {
		listeners.set(event, new Set());
	}
	listeners.get(event)!.add(cb);
}

function unregisterListener<T>(event: string, cb: NuiCallback<T>) {
	listeners.get(event)?.delete(cb);
}

function handleMessage(event: MessageEvent) {
	const { action, data } = event.data;

	if (!action) return;

	if (Config.debugUI) {
		console.log("[NUI RECEIVE]", action, data);
	}

	const cbs = listeners.get(action);
	if (!cbs) return;

	for (const cb of cbs) {
		cb(data);
	}
}

export function useNui() {
	onMounted(() => {
		window.addEventListener("message", handleMessage);
	});

	onUnmounted(() => {
		window.removeEventListener("message", handleMessage);
	});

	function send<T = any>(event: string, data?: any): Promise<T> {
		if (Config.debugUI) {
			console.log("[NUI SEND]", event, data);
		}

		return new Promise((resolve, reject) => {
			fetch(`https://${GetParentResourceName()}/${event}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data || {}),
			})
				.then((res) => res.json())
				.then(resolve)
				.catch(reject);
		});
	}

	function on<T = any>(event: string, cb: NuiCallback<T>) {
		registerListener(event, cb);
	}

	function off<T = any>(event: string, cb: NuiCallback<T>) {
		unregisterListener(event, cb);
	}

	return {
		send,
		on,
		off,
	};
}
