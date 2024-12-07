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
    <div class="contenedor">
        <RouterView />
    </div>
    <FooterVue />


</template>

<style scoped>

.contenedor{
    margin-bottom: 100px;
}

</style>