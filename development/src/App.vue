<script setup lang="ts">
	import { onMounted, onUnmounted, ref } from "vue";
	import { Config } from "@Composables/config";
	import { useUtils } from "@Utils/functions";

	const isVisible = ref<boolean>(Config.debugUI);
	const { isValidAction } = useUtils();

	function handleMessage(event: MessageEvent) {
		const data = event.data;
		if (!isValidAction(data.action)) return;
		isVisible.value = data.action === Config.openUIEvent;
	}

	onMounted(() => window.addEventListener("message", handleMessage));
	onUnmounted(() => window.removeEventListener("message", handleMessage));
</script>

<template>
	<div class="w-screen h-screen flex items-center justify-center text-white"></div>
</template>
