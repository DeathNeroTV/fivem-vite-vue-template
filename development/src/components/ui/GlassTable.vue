<template>
    <div class="flex h-full min-h-0 w-full flex-col gap-2">
        <div class="flex w-full items-center justify-between gap-2">
            <!-- Eintragslimit -->
            <div class="flex w-48 items-center gap-2 px-4 py-2">
                <span class="text-sm text-neutral-400">Einträge:</span>
                <GlassSelect :options="pageOptions" v-model="perPage" class="rounded-2xl bg-neutral-800/95 hover:bg-green-600/30" />
            </div>
            <div class="flex items-center justify-end gap-2">
                <!-- 🔍 Suche -->
                <font-awesome-icon v-if="props.searchable !== false" icon="magnifying-glass" class="h-10 w-10 p-2 text-2xl" />
                <input
                    v-if="props.searchable !== false"
                    v-model="search"
                    type="text"
                    placeholder="Suchen..."
                    class="w-92 rounded-2xl bg-neutral-800/50 px-4 py-2 text-white outline-none placeholder:text-neutral-400"
                />

                <!-- 🔹 Rechte Seite -->
                <div class="flex items-end gap-2">
                    <slot name="actions" />
                </div>
            </div>
        </div>

        <!-- 🔹 Tabelle -->
        <div class="flex-1 overflow-auto rounded-2xl bg-neutral-900/95">
            <table class="w-full text-left text-white">
                <thead class="bg-neutral-950/50 text-sm text-neutral-300 uppercase">
                    <tr>
                        <th v-for="col in columns" :key="col.key" class="cursor-pointer px-4 py-3 select-none" @click="col.sortable !== false && toggleSort(col.key)">
                            <div class="flex items-center gap-2">
                                {{ col.label }}
                                <!-- Sort Icon -->
                                <span v-if="sortKey === col.key">
                                    <font-awesome-icon v-if="sortDirection === 'asc'" icon="arrow-down-a-z" />
                                    <font-awesome-icon v-else-if="sortDirection === 'desc'" icon="arrow-down-z-a" />
                                </span>
                            </div>
                        </th>

                        <th v-if="$slots.rowActions" class="px-4 py-3">Aktionen</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="row in paginatedData"
                        :key="row[idKey]"
                        class="cursor-pointer border-t-2 border-neutral-950/50 transition hover:bg-green-500/20"
                        @dblclick="emits('rowDblclick', row)"
                    >
                        <td v-for="col in columns" :key="col.key" class="px-4 py-2">
                            {{ col.format ? col.format(row) : row[col.key] }}
                        </td>

                        <!-- 🔹 Actions Slot -->
                        <td v-if="$slots.rowActions" class="px-4 py-2">
                            <slot name="rowActions" :row="row" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 🔹 Pagination -->
        <div v-if="paginated" class="flex items-center justify-center gap-5">
            <span class="text-md pl-2 text-neutral-400"> Seite {{ page }} / {{ totalPages }} </span>

            <div class="flex gap-2">
                <GlassButton variant="neutral-green" size="w-10 h-10" spacing="p-2" text="text-lg" rounded="rounded-2xl" tooltip="Vorherige Seite" @click="prevPage">
                    <font-awesome-icon icon="chevron-left" />
                </GlassButton>
                <GlassButton variant="neutral-green" size="w-10 h-10" spacing="p-2" text="text-lg" rounded="rounded-2xl" tooltip="Nächste Seite" @click="nextPage">
                    <font-awesome-icon icon="chevron-right" />
                </GlassButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue';
    import GlassButton from './GlassButton.vue';
    import type { Column } from '@Utils/types';
    import GlassSelect from './GlassSelect.vue';

    const props = defineProps<{
        data: any[];
        columns: Column[];
        idKey?: string;
        searchable?: boolean;
        paginated?: boolean;
    }>();

    const emits = defineEmits(['rowDblclick']);

    const idKey = props.idKey ?? 'id';
    const searchable = props.searchable ?? true;
    const paginated = props.paginated ?? true;
    const perPage = ref<number>(10);
    const sortKey = ref<string | null>(null);
    const sortDirection = ref<'asc' | 'desc' | null>(null);
    const pageOptions = Array.from([5, 10, 25, 50, 100]).map((value, _) => ({ label: value.toFixed(0), value }));

    // 🔹 Suche
    const search = ref('');
    const safeData = computed(() => (Array.isArray(props.data) ? props.data : []));
    const filteredData = computed(() => {
        if (!searchable || !search.value) return safeData.value;

        return safeData.value.filter((row) => Object.values(row).some((val) => String(val).toLowerCase().includes(search.value.toLowerCase())));
    });

    const sortedData = computed(() => {
        if (!sortKey.value || !sortDirection.value) return filteredData.value;

        return [...filteredData.value].sort((a, b) => {
            const valA = a[sortKey.value!];
            const valB = b[sortKey.value!];

            if (valA == null) return 1;
            if (valB == null) return -1;

            if (typeof valA === 'number' && typeof valB === 'number') {
                return sortDirection.value === 'asc' ? valA - valB : valB - valA;
            }

            return sortDirection.value === 'asc' ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
        });
    });

    // 🔹 Pagination
    const page = ref(1);
    const totalPages = computed(() => Math.max(1, Math.ceil(sortedData.value.length / perPage.value)));

    const paginatedData = computed(() => {
        if (!paginated) return sortedData.value;
        if (!Array.isArray(sortedData.value)) return [];
        const start = (page.value - 1) * perPage.value;
        return sortedData.value.slice(start, start + perPage.value);
    });

    function nextPage() {
        if (page.value < totalPages.value) page.value++;
    }

    function prevPage() {
        if (page.value > 1) page.value--;
    }

    function toggleSort(key: string) {
        if (sortKey.value !== key) {
            sortKey.value = key;
            sortDirection.value = 'asc';
            return;
        }

        if (sortDirection.value === 'asc') {
            sortDirection.value = 'desc';
        } else if (sortDirection.value === 'desc') {
            sortKey.value = null;
            sortDirection.value = null;
        } else {
            sortDirection.value = 'asc';
        }
    }
</script>
