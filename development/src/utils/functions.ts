import { Config } from "@Composables/config";

export function useUtils() {
	function isValidAction(action: string) {
		return action === Config.openUIEvent || action === Config.closeUIEvent;
	}
	return { isValidAction };
}
