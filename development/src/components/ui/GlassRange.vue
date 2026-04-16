<script lang="ts" setup>
    import { computed, ref } from 'vue';

    const props = defineProps<{
        modelValue: number;
        min?: number;
        max?: number;
        step?: number;
    }>();

    const emits = defineEmits<{
        (e: 'update:modelValue', value: number): void;
    }>();

    const min = ref<number>(props.min ?? 0);
    const max = ref<number>(props.max ?? 100);
    const step = ref<number>(props.step ?? 1);

    const rangeRef = ref<HTMLElement | null>(null);
    const isUsingDrag = ref<boolean>(false);

    const percentage = computed(() => ((props.modelValue - min.value) / (max.value - min.value)) * 100);

    function calculateValue(clientX: number) {
        if (!rangeRef.value) return;

        const rect = rangeRef.value.getBoundingClientRect();
        let percent = (clientX - rect.left) / rect.width;
        percent = Math.min(1, Math.max(0, percent));

        let value = min.value + percent * (max.value - min.value);
        value = Math.round(value / step.value) * step.value;

        emits('update:modelValue', Number(value.toFixed(2)));
    }

    function onPointerDown(e: PointerEvent) {
        isUsingDrag.value = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        calculateValue(e.clientX);
    }

    function onPointerMove(e: PointerEvent) {
        if (!isUsingDrag.value) return;
        calculateValue(e.clientX);
    }

    function onPointerUp() {
        isUsingDrag.value = false;
    }
</script>

<template>
    <div class="h-full w-full flex-1 items-center p-5">
        <div
            ref="rangeRef"
            class="relative top-1/2 h-3 w-full -translate-y-1/2 transition-all duration-75"
            :class="isUsingDrag ? 'cursor-grabbing' : 'cursor-pointer'"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointerleave="onPointerUp"
        >
            <!-- 🔹 Track -->
            <div class="absolute inset-0 rounded-full bg-neutral-700/60"></div>

            <!-- 🔹 Progress -->
            <div class="absolute inset-y-0 left-0 rounded-full bg-green-500/60" :style="{ width: percentage + '%' }"></div>

            <!-- 🔹 Thumb -->
            <div
                class="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full ring-2 ring-neutral-200/60 bg-green-500/60 shadow"
                :style="{ left: `calc(${percentage}% - 10px)` }"
            ></div>
        </div>
    </div>
</template>
