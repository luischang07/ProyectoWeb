<template>
  <nav class="navbar navbar-expand-lg navbar-dar bg-color-nav">
    <div class="container-fluid">
      <a href="/Bienvenida" class="navbar-brand text-white fw-bold brand-size brand-style"><i class="bi bi-shop-window"></i> Tienda</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav w-100">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item margin" v-if="usuarioAuthenticado">
              <RouterLink :class="['nav-link', 'item', 'text-white', 'fw-bolder', 'font-size', getLinkClass('/clientes')]" to="/clientes">Clientes</RouterLink>
            </li>
            <li class="nav-item margin" v-if="usuarioAuthenticado">
              <RouterLink :class="['nav-link', 'item', 'text-white', 'fw-bolder', 'font-size', getLinkClass('/personal')]" to="/personal">Personal</RouterLink>
            </li>
            <li class="nav-item margin" v-if="usuarioAuthenticado">
              <RouterLink :class="['nav-link', 'item', 'text-white', 'fw-bolder', 'font-size', getLinkClass('/articulos')]" to="/articulos">Articulos</RouterLink>
            </li>
            <li class="nav-item margin" v-if="usuarioAuthenticado">
              <RouterLink :class="['nav-link', 'item', 'text-white', 'fw-bolder', 'font-size', getLinkClass('/ventas')]" to="/ventas">Ventas</RouterLink>
            </li>
            <li class="nav-item margin" v-if="usuarioAuthenticado">
              <RouterLink :class="['nav-link', 'item', 'text-white', 'fw-bolder', 'font-size', getLinkClass('/compras')]" to="/compras">Compras</RouterLink>
            </li>
            <li class="nav-item margin" v-if="usuarioAuthenticado">
              <RouterLink :class="['nav-link', 'item', 'text-white', 'fw-bolder', 'font-size', getLinkClass('/registro')]" to="/clientes/registro">Registro</RouterLink>
            </li>  
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item margin" v-if="usuarioAuthenticado">
                <button class="nav-link bg-red rounded-pill text-white fw-bolder" @click.prevent="cerrarSesion">Cerrar Sesión</button>
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
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const usuarioAuthenticado = ref(false);
const auth = getAuth()
const router = useRouter();
const route = useRoute();

const cerrarSesion = async () => {
  try {
    await signOut(auth);
    router.push('/Bienvenida');
  } catch (err) {
    console.error("Error al cerrar sesión");
  }
}

const getLinkClass = (ruta: string) => {
  return route.path === ruta ? 'bg-link-active' : '';
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    usuarioAuthenticado.value = !!user 
  });
});


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');
.bg-color-nav{
  background-color: #4e0d28;
}

.bg-link-active{
  background-color: #965067;
  border-radius: 35px;
}

.brand-size{
  font-size: 1.7rem;
}
.brand-style-{
  font-family: "Caveat", cursive;
  font-style: normal;
  font-optical-sizing: auto;
  font-weight: bold;
}

.bg-red{
  background-color: red;
}

.font-size{
  font-size: 1.2rem;
}
</style>
