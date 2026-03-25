<script lang="ts" setup>
    import { ref, watch } from 'vue';

    const props = defineProps<{
        modelValue: boolean;
        leftLabel?: string;
        rightLabel?: string;
        colored?: true;
        disabled?: true;
    }>();

    const emits = defineEmits<{
        (e: 'update:modelValue', toggled: boolean): void;
    }>();

    const toggled = ref<boolean>(props.modelValue);
    watch(toggled, (val) => emits('update:modelValue', val));
</script>

<template>
    <div class="flex items-center justify-center gap-3">
        <span v-if="leftLabel" class="text-sm text-neutral-300">{{ leftLabel }}</span>
        <button
            type="button"
            @click="toggled = !toggled"
            :disabled="disabled"
            :class="{
                'bg-green-500/95': toggled && colored,
                'bg-red-500/95': !toggled && colored,
                'bg-neutral-700/95': !colored,
            }"
            class="relative inline-flex h-6 min-w-11 items-center rounded-full transition"
        >
            <span class="inline-block h-4 w-4 transform rounded-full bg-white/95 transition" :class="toggled ? 'translate-x-6' : 'translate-x-1'" />
        </button>
        <span v-if="rightLabel" class="text-sm text-neutral-300">{{ rightLabel }}</span>
    </div>
</template>
