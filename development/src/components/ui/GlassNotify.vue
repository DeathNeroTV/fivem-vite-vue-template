<script setup lang="ts">
    import { useToast, type ToastType } from '../../composables/useToast';

    const { toasts } = useToast();

    function getColor(type: string) {
        switch (type) {
            case 'success':
                return 'border-green-500/50 bg-green-500/10';
            case 'error':
                return 'border-red-500/50 bg-red-500/10';
            case 'warning':
                return 'border-yellow-500/50 bg-yellow-500/10';
            default:
                return 'border-blue-500/50 bg-blue-500/10';
        }
    }

    function getIcon(type: ToastType) {
        switch (type) {
            case 'success':
                return 'circle-check';
            case 'error':
                return 'circle-xmark';
            case 'warning':
                return 'circle-exclamation';
            case 'info':
                return 'circle-info';
        }
    }
</script>

<template>
    <div class="pointer-events-none fixed top-6 right-6 z-999 flex max-w-64 min-w-64 flex-col gap-2 select-none">
        <transition-group name="toast" tag="div">
            <div
                v-for="toast in toasts"
                :key="toast.id"
                class="pointer-events-auto mb-2 flex items-center gap-3 rounded-2xl border bg-neutral-950/80 px-4 py-3 text-white shadow-lg transition-all duration-300"
                :class="getColor(toast.type)"
            >
                <!-- Icon -->
                <font-awesome-icon :icon="getIcon(toast.type)" class="text-lg opacity-80" />

                <!-- Text -->
                <span class="text-sm">
                    {{ toast.message }}
                </span>
            </div>
        </transition-group>
    </div>
</template>

<style>
    .toast-enter-from {
        opacity: 0;
        transform: translateX(50px);
    }
    .toast-enter-active {
        transition: all 0.3s ease;
    }
    .toast-leave-to {
        opacity: 0;
        transform: translateX(50px);
    }
    .toast-leave-active {
        transition: all 0.2s ease;
    }
</style>
