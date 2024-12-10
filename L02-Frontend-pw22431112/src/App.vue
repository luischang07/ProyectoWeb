<script setup lang="ts">
import MenuVue from './modulos/principal/vistas/MenuVue.vue';
import FooterVue from './modulos/principal/vistas/FooterVue.vue';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { RouterView } from 'vue-router';
</script>

<template>

    <header>
        <MenuVue />
    </header>
    <main class="container-app">
        <RouterView />
    </main>
    <FooterVue />

</template>

<style scoped>
.container-app {
    max-width: 1200px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: white;
    margin: 0 auto;
    min-height: 80vh;
}
</style>