<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a href="/Bienvenida" class="navbar-brand">Tienda</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav w-100">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item margin" v-if="usuarioAuthenticado">
              <RouterLink class="nav-link item" to="/clientes">Clientes</RouterLink>
            </li>
            <li class="nav-item margin" v-if="usuarioAuthenticado">
              <RouterLink class="nav-link item" to="/personal">Personal</RouterLink>
            </li>
            <li class="nav-item margin" v-if="usuarioAuthenticado">
              <RouterLink class="nav-link item" to="/articulos">Articulos</RouterLink>
            </li>
            <li class="nav-item margin" v-if="usuarioAuthenticado">
              <RouterLink class="nav-link item" to="/ventas">Ventas</RouterLink>
            </li>
            <li class="nav-item margin" v-if="usuarioAuthenticado">
              <RouterLink class="nav-link item" to="/clientes/registro">Registro</RouterLink>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item margin" v-if="usuarioAuthenticado">
                <button class="nav-link bg-danger rounded-pill text-white fw-bolder" @click.prevent="cerrarSesion">Cerrar Sesión</button>
            </li>
            <li class="nav-item margin me-2" v-if="!usuarioAuthenticado">
              <RouterLink class="nav-link bg-success bg-opacity-25 rounded-pill text-white fw-bolder" to="/validacion">Iniciar Sesión</RouterLink>
            </li>
            <li class="nav-item margin" v-if="!usuarioAuthenticado">
              <RouterLink class="nav-link bg-warning text-dark fw-bolder" to="/registrar">Registrarse</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const usuarioAuthenticado = ref(false);
const auth = getAuth()
const router = useRouter();

const cerrarSesion = async () => {
  try {
    await signOut(auth);
    router.push('/Bienvenida');
  } catch (err) {
    console.error("Error al cerrar sesión");
  }
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    usuarioAuthenticado.value = !!user 
  });
});


</script>

<style scoped>
</style>
