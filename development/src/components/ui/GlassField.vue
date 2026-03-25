<script setup lang="ts">
    import { ref, watch } from 'vue';
    import GlassSlider from './GlassSlider.vue';

    const props = defineProps<{
        modelValue?: boolean;
        label?: string;
        subLabel?: string;
        center?: boolean;
        hasSlider?: boolean;
    }>();

    const emits = defineEmits<{
        (e: 'update:modelValue', toggled: boolean): void;
    }>();

    const toggled = ref<boolean>(props.modelValue ?? false);

    watch(toggled, (val) => emits('update:modelValue', val));
</script>

<template>
    <div
        class="flex h-full flex-col items-center rounded-2xl border border-neutral-700/40 bg-neutral-800/80 transition focus-within:border-green-500/80"
        :class="center && 'items-center'"
    >
        <!-- 🔹 Label & Slider -->
        <div class="flex items-center justify-between gap-2 py-2">
            <span v-if="label" class="text-md px-3 text-neutral-400"> {{ label }} </span>
            <GlassSlider v-if="hasSlider" v-model="toggled" :rightLabel="subLabel" colored />
        </div>

        <!-- 🔹 Divider -->
        <div v-if="label" class="mt-1 w-full border-t border-green-500/50"></div>

        <!-- 🔹 Content -->
        <div class="h-full w-full items-center justify-center px-3 py-2">
            <slot />
        </div>
    </div>
</template>
