<script setup lang="ts">
	import { onMounted, onUnmounted, ref } from "vue";
	import { Config } from "@Utils/config";
	import { useNui } from "@Composables/useNui";
	import GlassNotify from "@Components/ui/GlassNotify.vue";
	
	const nui = useNui();
	const isVisible = ref<boolean>(Config.debugUI);
	
	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key !== 'Escape') return;
		nui.send(Config.Events.Client.Close)
	};
	
	onMounted(() => {
		nui.on(Config.Events.NUI.Open, () => isVisible.value = true);
		nui.on(Config.Events.NUI.Close, () => isVisible.value = false);
		window.addEventListener('keydown', handleKeyPress);
	});

	onUnmounted(() => {
		nui.off(Config.Events.NUI.Open, () => isVisible.value = true);
		nui.off(Config.Events.NUI.Close, () => isVisible.value = false);
		window.removeEventListener('keydown', handleKeyPress);
	});
</script>

<template>
	<div v-if="isVisible" class="w-screen h-screen flex items-center justify-center text-white">
		<GlassNotify />
	</div>
</template>
