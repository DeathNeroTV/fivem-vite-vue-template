<script lang="ts" setup>
	defineProps<{
		label: string;
		columns?: true;
	}>();
</script>
<template>
	<div class="flex flex-col text-white select-none">
		<h1 class="uppercase text-2xl text-center">{{ label }}</h1>
		<div class="items-center justify-center gap-5 p-5" :class="[columns ? 'grid grid-cols-1' : 'flex']">
			<slot />
		</div>
		<div class="w-full border-t-2 border-neutral-600/60 pb-5"></div>
	</div>
</template>
