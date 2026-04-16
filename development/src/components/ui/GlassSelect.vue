<script lang="ts" setup>
	import type { Primitive, OptionObject } from "@Utils/types";
	import { computed, ref } from "vue";

	const props = defineProps<{
		modelValue: any;
		options: Primitive[] | OptionObject[];
		label?: string;

		//🔥 optional global image function
		image?: (value: any) => string;
		preview?: (value: any) => string;
	}>();

	const emits = defineEmits<{
		(e: "update:modelValue", value: any): void;
	}>();

	const toggled = ref<boolean>(false);

	const normalizedOptions = computed<OptionObject[]>(() => {
		if (!props.options) return [];
		return props.options.map((opt: any) => {
			if (typeof opt === "string" || typeof opt === "number") {
				return {
					label: String(opt),
					value: opt,
					image: props.image?.(opt),
				};
			}

			return opt;
		});
	});

	const selected = computed(() => normalizedOptions.value.find((o) => o.value === props.modelValue));
	const previewSrc = computed(() => {
		if (!selected.value) return null;

		if (props.preview) {
			return props.preview(selected.value.value);
		}

		return selected.value.image;
	});

	function select(value: any) {
		emits("update:modelValue", value);
		toggled.value = false;
	}
</script>

<template>
	<div class="flex flex-col gap-1 w-full">
		<!-- Label -->
		<span v-if="label" class="text-md text-white pl-2">
			{{ label }}
		</span>

		<!-- 🔹 SELECT -->
		<div class="relative w-full">
			<!-- Selected -->
			<div
				@click="toggled = !toggled"
				class="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-neutral-800/60 px-4 py-2">
				<span class="flex items-center gap-2">
					<img v-if="selected?.image" :src="selected?.image" class="h-8 w-8 object-contain" />
					{{ selected?.label ?? "Auswahl..." }}
				</span>

				<font-awesome-icon icon="chevron-down" />
			</div>

			<!-- 🔽 Dropdown -->
			<div
				v-if="toggled"
				class="dropdown-scroll absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-2xl bg-neutral-800/60 shadow-lg">
				<div
					v-for="option in normalizedOptions"
					:key="option.value"
					@click="select(option.value)"
					class="flex w-full cursor-pointer items-center gap-3 px-4 py-2 transition hover:bg-green-600/60">
					<img v-if="option.image" :src="option.image" class="h-8 w-8 object-contain" />
					<span>{{ option.label }}</span>
				</div>
			</div>
		</div>

		<!-- 🔹 PREVIEW -->
		<div v-if="previewSrc" class="flex items-center justify-center">
			<img
				:src="previewSrc"
				alt="Marker Preview"
				class="h-24 w-24 rounded-2xl bg-neutral-900/60 object-contain p-2" />
		</div>
	</div>
</template>
