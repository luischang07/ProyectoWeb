<template>
    <div class="pagination-container">
        <button
            title="Ir a la pagina 1"
            :disabled="currentPage === 1"
            @click="goToPage(1)"
            class="btn btn-outline-primary"
        >
            ir al inicio
        </button>
        
        <button
            title="Ir a la página anterior"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
            class="btn btn-outline-primary"
        >
            Anterior
        </button>

        <span class="mx-2">Página {{ currentPage }} de {{ totalPages }}</span>

        <button
            title="Ir a la página siguiente"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
            class="btn btn-outline-primary"
        >
            Siguiente
        </button>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
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
        if (newPage >= 1 && newPage <= props.totalPages) {
            emit('update:currentPage', newPage);
        }
    };

    const goToPage = (page: number) => {
        if (page >= 1 && page <= props.totalPages) {
            emit('update:currentPage', page);
        }
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
