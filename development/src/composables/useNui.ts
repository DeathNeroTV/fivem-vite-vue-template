type NuiRequest<T = any> = {
	action: string;
	data?: any;
	resolve?: (value: T) => void;
	reject?: (reason?: any) => void;
};

type NuiListener<T = any> = (data: T) => void;

const listeners = new Map<string, Set<NuiListener>>();

declare function GetParentResourceName(): string;

export function useNui() {
	// 🔌 SEND (mit Response Support)
	async function send<T = any>(action: string, data: any = {}): Promise<T> {
		try {
			const res = await fetch(`https://${GetParentResourceName()}/${action}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data ?? {}),
			});

			if (!res.ok) {
				throw new Error(`NUI Error: ${res.status}`);
			}

			return await res.json();
		} catch (err) {
			console.error(`[NUI SEND ERROR] ${action}`, err);
			throw err;
		}
	}

	// 👂 LISTEN (ohne Memory Leak)
	function listen<T = any>(action: string, cb: NuiListener<T>) {
		if (!listeners.has(action)) {
			listeners.set(action, new Set());
		}

		listeners.get(action)!.add(cb);

		// unsubscribe support
		return () => {
			listeners.get(action)?.delete(cb);
		};
	}

	// 🌐 GLOBAL HANDLER (einmal registrieren!)
	if (!(window as any).__nui_listener__) {
		window.addEventListener("message", (event) => {
			const { action, data } = event.data;

			if (!action) return;

			const cbs = listeners.get(action);
			if (!cbs) return;

			cbs.forEach((cb) => cb(data));
		});

		(window as any).__nui_listener__ = true;
	}

	return { send, listen };
}