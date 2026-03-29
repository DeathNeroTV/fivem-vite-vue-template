<script setup lang="ts">
	import type { VariantType } from "@Utils/types";
	import GlassButton from "@Components/ui/GlassButton.vue";
	import { computed } from "vue";

	const props = defineProps<{
		modelValue?: string | number | string[] | number[] | Record<string, any>;
		title?: string;
		label?: string;
		disabled?: boolean;
		variant?: VariantType;
		rounded?: string;
	}>();

	const emits = defineEmits<{
		(e: "clicked"): void;
	}>();

	const getVariant = computed(() => props.variant ?? "neutral-green");

	// 🔹 Anzeige-Logik (WICHTIG)
	const displayValue = computed(() => {
		if (props.modelValue == null) return "--";

		// Array
		if (Array.isArray(props.modelValue)) {
			return props.modelValue.length ? props.modelValue.join(", ") : "--";
		}

		// Object (z.B. allowed_jobs)
		if (typeof props.modelValue === "object") {
			const keys = Object.keys(props.modelValue);
			return keys.length ? `${keys.length} Einträge` : "--";
		}

		// string / number
		return props.modelValue;
	});
</script>

<template>
	<div class="flex flex-col gap-1 w-full">
		<!-- Label -->
		<span v-if="label" class="text-md text-white pl-2">
			{{ label }}
		</span>

		<div class="flex gap-5 w-full items-center">
			<!-- Value -->
			<div
				class="w-full text-lg bg-neutral-800/90 border border-neutral-700/80 rounded-xl px-3 py-2 outline-none transition">
				{{ displayValue }}
			</div>

			<!-- Button -->
			<template v-if="!disabled">
				<GlassButton
					v-if="title"
					:variant="getVariant"
					spacing="p-3"
					size="w-50"
					:rounded="rounded ?? 'rounded-xl'"
					text="uppercase text-md font-semibold"
					@click="emits('clicked')">
					{{ title }}
				</GlassButton>
			</template>
			<template v-else>
				<GlassButton
					v-if="title"
					:variant="getVariant"
					spacing="p-3"
					size="w-50"
					:rounded="rounded ?? 'rounded-xl'"
					text="uppercase text-md font-semibold"
					disabled
					@click="emits('clicked')">
					{{ title }}
				</GlassButton>
			</template>
		</div>
	</div>
</template>
