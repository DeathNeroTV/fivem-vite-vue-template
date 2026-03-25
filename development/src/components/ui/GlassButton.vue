<template>
    <div class="group relative inline-block">
        <!-- 🔹 Tooltip -->
        <div
            v-if="tooltip && !!disabled"
            class="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-2xl bg-black/80 px-3 py-1 whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100"
        >
            {{ tooltip }}
        </div>

        <!-- 🔹 Button -->
        <div
            :class="['relative inline-flex cursor-pointer items-center justify-center gap-2 transition-all duration-300 select-none', text, size, spacing, rounded, variantClass, disabled && 'opacity-50 pointer-events-none']"
            @click="(e) => emits('click', e)"
        >
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import type { VariantType } from '../../utils/types';

    const props = defineProps<{
        tooltip?: string;
        text: string;
        size: string;
        spacing: string;
        rounded: string;
        variant: VariantType;
        disabled?: true;
    }>();

    const emits = defineEmits(['click']);

    const variantClass = computed(() => {
        switch (props.variant) {
            case 'neutral':
                return 'bg-neutral-800/90 hover:bg-neutral-700/90';
            case 'neutral-green':
                return 'bg-neutral-800/90 hover:bg-green-500/90';
            case 'neutral-blue':
                return 'bg-neutral-800/90 hover:bg-blue-500/90';
            case 'neutral-orange':
                return 'bg-neutral-800/90 hover:bg-orange-500/90';
            case 'neutral-yellow':
                return 'bg-neutral-800/90 hover:bg-yellow-500/90';
            case 'neutral-red':
                return 'bg-neutral-800/90 hover:bg-red-500/90';
            case 'blue':
                return 'bg-blue-600/90 hover:bg-blue-500/90';
            case 'green':
                return 'bg-blue-600/90 hover:bg-green-500/90';
            case 'orange':
                return 'bg-blue-600/90 hover:bg-orange-500/90';
            case 'red':
                return 'bg-blue-600/90 hover:bg-red-500/90';
            case 'yellow':
                return 'bg-blue-600/90 hover:bg-yellow-500/90';
        }
    });
</script>
