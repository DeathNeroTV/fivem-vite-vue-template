declare function GetParentResourceName(): string;

export function useNui() {
	function send(action: string, data: any = {}) {
		fetch(`https://${GetParentResourceName()}/${action}`, {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	function listen(action: string, cb: (data: any) => void) {
		window.addEventListener("message", (event) => {
			if (event.data.action === action) {
				cb(event.data);
			}
		});
	}

	return { send, listen };
}
