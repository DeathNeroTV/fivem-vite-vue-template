<script setup lang="ts">
	import { computed } from "vue";

	type InputType = "text" | "number" | "password";

	const props = defineProps<{
		modelValue: string | number | undefined;
		type?: InputType;
		label?: string;
		disabled?: true;
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
		<span v-if="label" class="text-md text-white pl-2">
			{{ label }}
		</span>
		<!-- Input -->
		<input
			:type="inputType"
			:value="modelValue"
			:disabled="disabled"
			@input="onInput"
			class="w-full bg-neutral-800/60 border border-neutral-700/60 rounded-xl px-3 py-2 text-md outline-none transition focus:border-green-500/60 focus:ring-1 focus:ring-green-500/60 disabled:cursor-not-allowed" />
	</div>
</template>
