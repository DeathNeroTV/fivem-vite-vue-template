import { ref } from 'vue';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

const toasts = ref<Toast[]>([]);
let id = 0;

export function useToast() {
    function show(message: string, type: ToastType = 'info') {
        const toast = { id: id++, message, type };
        toasts.value.push(toast);
        setTimeout(() => {
            toasts.value = toasts.value.filter((t) => t.id !== toast.id);
        }, 5000);
    }

    return {
        toasts,
        show,
    };
}
