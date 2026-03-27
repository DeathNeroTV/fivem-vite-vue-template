<script setup lang="ts">
	import { computed } from "vue";

	type InputType = "text" | "number" | "password";

	const props = defineProps<{
		modelValue: string | number;
		type?: InputType;
		label?: string;
		placeholder?: string;
		disabled?: true;
		min?: number;
		max?: number;
		step?: number;
	}>();

	const emits = defineEmits<{
		(e: "update:modelValue", value: string | number): void;
	}>();

	const inputType = computed(() => props.type ?? "text");

	function onInput(e: Event) {
		const target = e.target as HTMLInputElement;

		let value: string | number = target.value;

		if (inputType.value === "number") {
			value = target.value === "" ? "" : Number(target.value);
		}

		emits("update:modelValue", value);
	}
</script>

<template>
	<div class="flex flex-col gap-1 w-full">
		<!-- Label -->
		<span v-if="label" class="text-sm text-white">
			{{ label }}
		</span>
		<!-- Input -->
		<input
			:type="inputType"
			:value="modelValue"
			:placeholder="placeholder"
			:disabled="disabled"
			:min="min"
			:max="max"
			:step="step"
			@input="onInput"
			class="w-full bg-neutral-800/90 border border-neutral-700/80 rounded-xl px-3 py-2 text-sm outline-none transition focus:border-green-500/90 focus:ring-1 focus:ring-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed" />
	</div>
</template>
