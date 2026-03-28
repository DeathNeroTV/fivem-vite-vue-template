<script setup lang="ts">
	import type { VariantType } from "@Utils/types";
	import GlassButton from "@Components/ui/GlassButton.vue";
	import { computed } from "vue";

	const props = defineProps<{
		modelValue: string | number | string[] | number[] | null;
		title?: string;
		label?: string;
		disabled?: boolean;
		variant?: VariantType;
	}>();

	const emits = defineEmits<{
		(e: "clicked"): void;
	}>();

	const getVariant = computed(() => {
		return props.variant ?? "neutral-green";
	});
</script>

<template>
	<div class="flex flex-col gap-1 w-full">
		<!-- Label -->
		<span v-if="label" class="text-md text-white pl-2">
			{{ label }}
		</span>
		<div class="flex gap-5 w-full items-center">
			<div
				class="w-full text-lg bg-neutral-800/90 border border-neutral-700/80 rounded-xl px-3 py-2 text-md outline-none transition focus:border-green-500/90 focus:ring-1 focus:ring-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed">
				{{ Array.isArray(modelValue) ? modelValue?.join(", ") : (modelValue ?? "--") }}
			</div>
			<template v-if="disabled">
				<GlassButton
					v-if="title"
					:variant="getVariant"
					spacing="p-3"
					size="w-50"
					rounded="rounded-xl"
					disabled
					text="uppercase text-md font-semibold"
					@click="emits('clicked')"
					>{{ title }}
				</GlassButton>
			</template>
			<template v-else>
				<GlassButton
					v-if="title"
					:variant="getVariant"
					spacing="p-3"
					size="w-50"
					rounded="rounded-xl"
					text="uppercase text-md font-semibold"
					@click="emits('clicked')"
					>{{ title }}
				</GlassButton>
			</template>
		</div>
	</div>
</template>
