<template>
    <div class="main">
        <h1 class="text-4xl font-bold tracking-tight lg:text-5xl text-center">
            Bienvenido a la tienda
        </h1>
        <p class="text-xl text-center max-w-2xl">
            Descubre nuestra selección de productos de alta calidad a precios increíbles.
        </p>
        <div class="text-center mt-5">
            <RouterLink class="btn-lg mt-4" :to="explorarLink">
                Explorar Productos
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const explorarLink = ref('/validacion');
const auth = getAuth();

onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            explorarLink.value = '/personal';
        }
    });
});
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    height: 50vh;
}

.btn-lg {
    background-color: #000;
    border: none;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    border-radius: 0.5rem;
    padding: 0.75rem 1.5rem;
    transition: background-color 0.3s;
}

.btn-lg:hover {
    background-color: #333;
}
</style>
