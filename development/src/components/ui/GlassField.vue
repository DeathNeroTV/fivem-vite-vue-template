<script setup lang="ts">
	import { ref, watch } from "vue";
	import GlassSlider from "./GlassSlider.vue";

	const props = defineProps<{
		modelValue?: boolean;
		label?: string;
		subLabel?: string;
		center?: true;
		hasSlider?: true;
		disabled?: true;
	}>();

	const emits = defineEmits<{
		(e: "update:modelValue", toggled: boolean): void;
	}>();

	const toggled = ref<boolean>(props.modelValue ?? false);

	watch(toggled, (val) => emits("update:modelValue", val));
</script>

<template>
	<div
		class="flex w-full h-full flex-col items-center rounded-xl outline-2 outline-neutral-700/40 bg-neutral-800/80 transition focus-within:outline-green-500/80"
		:class="center && 'items-center'">
		<!-- 🔹 Label & Slider -->
		<div class="flex items-center justify-between gap-2 py-2">
			<span v-if="label" class="text-md px-3 text-neutral-400"> {{ label }} </span>
			<GlassSlider v-if="hasSlider" v-model="toggled" :rightLabel="subLabel" colored :disabled="disabled" />
		</div>

		<!-- 🔹 Divider -->
		<div v-if="label" class="w-full border-t border-green-500/50"></div>

		<!-- 🔹 Content -->
		<div class="h-full w-full items-center justify-center p-5">
			<slot />
		</div>
	</div>
</template>
