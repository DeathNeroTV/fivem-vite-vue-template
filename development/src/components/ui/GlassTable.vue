<script setup lang="ts">
	import { ref, computed } from "vue";
	import type { Column } from "@Utils/types";

	import GlassButton from "@Components/ui/GlassButton.vue";
	import GlassSelect from "@Components/ui/GlassSelect.vue";

	const props = defineProps<{
		data: any[];
		columns: Column[];
		idKey?: string;
		searchable?: boolean;
		paginated?: boolean;
		height?: string;
	}>();

	const emits = defineEmits(["rowDblclick"]);

	const idKey = props.idKey ?? "id";
	const searchable = props.searchable ?? false;
	const paginated = props.paginated ?? false;
	const perPage = ref<number>(10);
	const sortKey = ref<string | null>(null);
	const sortDirection = ref<"asc" | "desc" | null>(null);
	const pageOptions = [5, 10, 25, 50, 100].map((v) => ({ label: String(v), value: v }));

	// 🔹 Suche
	const search = ref("");
	const safeData = computed(() => (Array.isArray(props.data) ? props.data : []));
	const filteredData = computed(() => {
		if (!searchable || !search.value) return safeData.value;
		return safeData.value.filter((row) =>
			Object.values(row).some((val) => String(val).toLowerCase().includes(search.value.toLowerCase())),
		);
	});

	// 🔹 Sortierung
	const sortedData = computed(() => {
		if (!sortKey.value || !sortDirection.value) return filteredData.value;
		return [...filteredData.value].sort((a, b) => {
			const valA = a[sortKey.value!];
			const valB = b[sortKey.value!];
			if (valA == null) return 1;
			if (valB == null) return -1;
			if (typeof valA === "number" && typeof valB === "number")
				return sortDirection.value === "asc" ? valA - valB : valB - valA;
			return sortDirection.value === "asc"
				? String(valA).localeCompare(String(valB))
				: String(valB).localeCompare(String(valA));
		});
	});

	// 🔹 Pagination
	const page = ref(1);
	const totalPages = computed(() => Math.max(1, Math.ceil(sortedData.value.length / perPage.value)));
	const paginatedData = computed(() => {
		if (!paginated) return sortedData.value;
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
			sortDirection.value = "asc";
			return;
		}
		if (sortDirection.value === "asc") sortDirection.value = "desc";
		else if (sortDirection.value === "desc") {
			sortKey.value = null;
			sortDirection.value = null;
		} else sortDirection.value = "asc";
	}
</script>

<template>
	<div class="relative flex flex-col w-full h-full select-none gap-2">
		<!-- 🔹 Toolbar -->
		<div class="flex w-full items-center justify-between gap-2">
			<div v-if="paginated" class="flex min-w-48 w-48 items-center gap-2 px-4 py-2">
				<span class="text-sm text-neutral-400">Einträge:</span>
				<GlassSelect
					v-model="perPage"
					:options="pageOptions"
					class="rounded-xl bg-neutral-700/95 hover:bg-green-600/30" />
			</div>
			<div class="flex w-full items-center justify-end gap-2">
				<font-awesome-icon
					v-if="props.searchable !== false"
					icon="magnifying-glass"
					class="h-10 w-10 p-2 text-2xl" />
				<input
					v-if="props.searchable !== false"
					v-model="search"
					type="text"
					placeholder="Suchen..."
					class="w-64 rounded-xl bg-neutral-700/50 px-4 py-2 text-white outline-none placeholder:text-neutral-400" />
				<div class="flex items-end gap-2"><slot name="actions" /></div>
			</div>
		</div>

		<!-- 🔹 Custom Table Container -->
		<div class="flex w-full flex-col rounded-xl relative">
			<!-- Header -->
			<div
				class="flex w-full h-14 bg-neutral-800/50 text-sm text-neutral-300 items-center uppercase sticky top-0 z-10">
				<div
					v-for="col in columns"
					:key="col.key"
					class="w-full select-none"
					:class="{ 'cursor-pointer': col.sortable }"
					@click="col.sortable && toggleSort(col.key)">
					<div class="flex items-center justify-center gap-5">
						{{ col.label }}
						<span v-if="sortKey === col.key">
							<font-awesome-icon v-if="sortDirection === 'asc'" icon="arrow-down-a-z" />
							<font-awesome-icon v-else-if="sortDirection === 'desc'" icon="arrow-down-z-a" />
						</span>
					</div>
				</div>
				<div v-if="$slots.rowActions" class="px-4 py-3 text-center min-w-64">Aktionen</div>
			</div>

			<!-- Scrollbarer Body -->
			<div class="flex flex-col w-full h-150 overflow-hidden overflow-y-auto bg-neutral-800/95">
				<div
					v-for="row in paginatedData"
					:key="row[idKey]"
					class="flex w-full h-14 text-center items-center cursor-pointer odd:bg-neutral-700/95 even:bg-neutral-600/95 hover:bg-green-500/20"
					@dblclick="emits('rowDblclick', row)">
					<div v-for="col in columns" :key="col.key" class="flex-1 px-4 py-2 text-center">
						{{ col.format ? col.format(row) : row[col.key] }}
					</div>
					<div v-if="$slots.rowActions" class="relative z-50 px-4 py-2 text-center min-w-64">
						<slot name="rowActions" :row="row" />
					</div>
				</div>
			</div>
		</div>

		<!-- 🔹 Pagination immer unten -->
		<div v-if="paginated" class="w-full flex justify-center items-center gap-5">
			<span class="text-md text-neutral-400">Seite {{ page }} / {{ totalPages }}</span>
			<div class="flex gap-2">
				<GlassButton
					@click="prevPage"
					variant="neutral-green"
					size="w-10 h-10"
					spacing="p-2"
					text="text-lg"
					rounded="rounded-xl"
					tooltip="Vorherige Seite">
					<font-awesome-icon icon="chevron-left" />
				</GlassButton>
				<GlassButton
					@click="nextPage"
					variant="neutral-green"
					size="w-10 h-10"
					spacing="p-2"
					text="text-lg"
					rounded="rounded-xl"
					tooltip="Nächste Seite">
					<font-awesome-icon icon="chevron-right" />
				</GlassButton>
			</div>
		</div>
	</div>
</template>
