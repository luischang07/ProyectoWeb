<script setup lang="ts">
    import MenuVue from './modulos/principal/vistas/MenuVue.vue';
    import { RouterView } from 'vue-router';
</script>

<template>
    <header>
        <MenuVue />
    </header>

    <RouterView />
    
</template>
