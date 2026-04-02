<script setup lang="ts">
	import { onMounted, onUnmounted, ref } from "vue";
	import { Config } from "@Composables/config";
	import { useNui } from "@Composables/useNui";
import GlassNotify from "./components/ui/GlassNotify.vue";
	
	const { send, listen } = useNui();
	const isVisible = ref<boolean>(Config.debugUI);

	const openListener = ref<() => void>(() => {});
	const closeListener = ref<() => void>(() => {});
	
	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key !== 'Escape') return;
		send(Config.Events.Client.Close)
	};
	
	onMounted(() => {
		openListener.value = listen(Config.Events.NUI.Open, () => isVisible.value = true);
		closeListener.value = listen(Config.Events.NUI.Close, () => isVisible.value = false);
		window.addEventListener('keydown', handleKeyPress);
	});

	onUnmounted(() => {
		openListener.value();
		closeListener.value();
		window.removeEventListener('keydown', handleKeyPress);
	});
</script>

<template>
	<div v-if="isVisible" class="w-screen h-screen flex items-center justify-center text-white bg-black/60">
		<GlassNotify />
	</div>
</template>
