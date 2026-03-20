import { Config } from "@/composables/config";

export function useUtils() {
	function isValidAction(action: string) {
		return action === Config.openUIEvent || action === Config.closeUIEvent;
	}
	return { isValidAction };
}
