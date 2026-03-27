<template>
	<div class="group relative inline-block">
		<!-- 🔹 Tooltip -->
		<div
			v-if="tooltip && !disabled"
			class="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-2xl bg-neutral-950/60 px-3 py-1 whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100">
			{{ tooltip }}
		</div>

		<!-- 🔹 Button -->
		<div
			:class="[
				'relative inline-flex cursor-pointer items-center justify-center gap-2 transition-all duration-300 select-none',
				text,
				size,
				spacing,
				rounded,
				variantClass,
				disabled && 'opacity-50 pointer-events-none',
			]"
			@click="(e) => emits('click', e)">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from "vue";
	import type { VariantType } from "../../utils/types";

	const props = defineProps<{
		tooltip?: string;
		text: string;
		size: string;
		spacing: string;
		rounded: string;
		variant: VariantType;
		disabled?: true;
		selected?: boolean;
	}>();

	const emits = defineEmits(["click"]);

	const variantClass = computed(() => {
		switch (props.variant) {
			case "neutral":
				return props.selected
					? "inset-ring-2 inset-ring-neutral-500 bg-neutral-600/95"
					: "bg-neutral-700/95 hover:bg-neutral-600/95";
			case "neutral-green":
				return props.selected
					? "inset-ring-2 inset-ring-neutral-500 bg-green-600/95"
					: "bg-neutral-700/95 hover:bg-green-600/95";
			case "neutral-blue":
				return props.selected
					? "inset-ring-2 inset-ring-neutral-500 bg-blue-600/95"
					: "bg-neutral-700/95 hover:bg-blue-600/95";
			case "neutral-orange":
				return props.selected
					? "inset-ring-2 inset-ring-neutral-500 bg-orange-600/95"
					: "bg-neutral-700/95 hover:bg-orange-600/95";
			case "neutral-yellow":
				return props.selected
					? "inset-ring-2 inset-ring-neutral-500 bg-yellow-600/95"
					: "bg-neutral-700/95 hover:bg-yellow-600/95";
			case "neutral-red":
				return props.selected
					? "inset-ring-2 inset-ring-neutral-500 bg-red-600/95"
					: "bg-neutral-700/95 hover:bg-red-600/95";
			case "blue":
				return props.selected
					? "inset-ring-2 inset-ring-neutral-500 bg-blue-600/95"
					: "bg-blue-700/95 hover:bg-blue-600/95";
			case "green":
				return props.selected
					? "inset-ring-2 inset-ring-neutral-500 bg-green-600/95"
					: "bg-green-700/95 hover:bg-green-600/95";
			case "orange":
				return props.selected
					? "inset-ring-2 inset-ring-neutral-500 bg-orange-600/95"
					: "bg-blue-700/95 hover:bg-orange-600/95";
			case "red":
				return props.selected
					? "inset-ring-2 inset-ring-neutral-500 bg-red-600/95"
					: "bg-blue-700/95 hover:bg-red-600/95";
			case "yellow":
				return props.selected
					? "inset-ring-2 inset-ring-neutral-500 bg-yellow-600/95"
					: "bg-blue-700/95 hover:bg-yellow-600/95";
		}
	});
</script>
