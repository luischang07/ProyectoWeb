<template>
    <div class="pagination-container">
        <button
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
        class="btn btn-outline-primary"
        >
        Anterior
        </button>

        <span class="mx-2">Página {{ currentPage }} de {{ totalPages }}</span>

        <button
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
        class="btn btn-outline-primary"
        >
        Siguiente
        </button>
    </div>
</template>

<script setup lang="ts">
    defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    }
    });

    const emit = defineEmits(['update:currentPage']);

    const changePage = (newPage: number) => {
    emit('update:currentPage', newPage);
    };
</script>

<style scoped>
    .pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    }

    button {
    margin: 0 0.5rem;
    }
</style>
