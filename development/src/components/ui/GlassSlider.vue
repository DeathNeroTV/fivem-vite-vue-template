<script lang="ts" setup>
	import { ref, watch } from "vue";

	const props = defineProps<{
		title?: string;
		modelValue: boolean;
		leftLabel?: string;
		rightLabel?: string;
		colored?: true;
		disabled?: boolean;
	}>();

	const emits = defineEmits<{
		(e: "update:modelValue", toggled: boolean): void;
	}>();

	const toggled = ref<boolean>(props.modelValue);
	watch(toggled, (val) => emits("update:modelValue", val));
</script>

<template>
	<div class="flex flex-col gap-2">
		<span v-if="title" class="text-md">{{ title }}</span>
		<div
			class="w-fit gap-3 bg-neutral-800/60 p-2 rounded-xl outline outline-neutral-700/60"
			:class="{
				'flex flex-row items-center': (leftLabel && rightLabel) || (!leftLabel && !rightLabel),
				'flex flex-row items-start': !leftLabel && rightLabel,
				'flex flex-row items-end': leftLabel && !rightLabel,
			}">
			<span v-if="leftLabel" class="text-end text-md text-neutral-300">{{ leftLabel }}</span>
			<button
				type="button"
				@click="toggled = !toggled"
				:disabled="disabled"
				:class="{
					'bg-green-500/60': toggled && colored,
					'bg-red-500/60': !toggled && colored,
					'bg-neutral-700/60': !colored,
				}"
				class="relative inline-flex h-6 max-w-11 min-w-11 items-center cursor-pointer rounded-full transition">
				<span
					class="inline-block h-4 w-4 transform rounded-full transition"
					:class="toggled ? 'translate-x-6' : 'translate-x-1'" />
			</button>
			<span v-if="rightLabel" class="text-start text-md text-neutral-300">{{ rightLabel }}</span>
		</div>
	</div>
</template>
