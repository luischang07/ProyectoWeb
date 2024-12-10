<template>
  <nav class="navbar navbar-expand-lg navbar-dar bg-color-nav nav">
    <div class="container-fluid">
      <a href="/Bienvenida" class="navbar-brand fw-bold brand-size"><i class="bi bi-shop-window"></i>
        Tienda</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="material-symbols-outlined">menu</span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav w-100">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item margin" v-if="usuarioAuthenticado">
              <RouterLink
                :class="['nav-link', 'item', 'text-dark', 'fw-bolder', 'font-size', getLinkClass('/clientes')]"
                to="/clientes">Clientes</RouterLink>
            </li>
            <li class="nav-item margin" v-if="usuarioAuthenticado">
              <RouterLink
                :class="['nav-link', 'item', 'text-dark', 'fw-bolder', 'font-size', getLinkClass('/personal')]"
                to="/personal">Personal</RouterLink>
            </li>
            <li class="nav-item margin" v-if="usuarioAuthenticado">
              <RouterLink
                :class="['nav-link', 'item', 'text-dark', 'fw-bolder', 'font-size', getLinkClass('/articulos')]"
                to="/articulos">Articulos</RouterLink>
            </li>
            <li class="nav-item margin" v-if="usuarioAuthenticado">
              <RouterLink :class="['nav-link', 'item', 'text-dark', 'fw-bolder', 'font-size', getLinkClass('/ventas')]"
                to="/ventas">Ventas</RouterLink>
            </li>
            <li class="nav-item margin" v-if="usuarioAuthenticado">
              <RouterLink :class="['nav-link', 'item', 'text-dark', 'fw-bolder', 'font-size', getLinkClass('/compras')]"
                to="/compras">Compras</RouterLink>
            </li>
            <li class="nav-item margin" v-if="usuarioAuthenticado">
              <RouterLink
                :class="['nav-link', 'item', 'text-dark', 'fw-bolder', 'font-size', getLinkClass('/registro')]"
                to="/clientes/registro">Registro</RouterLink>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item margin" v-if="usuarioAuthenticado">
              <button class="nav-link btn-registro text-white fw-bolder d-flex align-items-center"
                @click.prevent="cerrarSesion">
                <span class="material-symbols-outlined">logout</span>
                Cerrar Sesión
              </button>
            </li>
            <li class="li-nav nav-item margin" v-if="!usuarioAuthenticado">
              <RouterLink class="btn-nav text-dark fw-bolder" to="/validacion">
                Iniciar Sesión</RouterLink>
            </li>
            <li class="li-nav nav-item margin" v-if="!usuarioAuthenticado">
              <RouterLink class="btn-nav btn-registro" to="/registrar">Registrarse</RouterLink>
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

.li-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.2rem;
}

.btn-nav {
  width: 100%;
  border: none;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: background-color 0.3s;
}

.btn-registro {
  background-color: #000;
  color: #fff;
}

.btn-nav:hover {
  background-color: #444;
}

.nav {
  margin-right: 1rem;
  margin-left: 1rem;
  border-bottom: 1px solid #ddd;
}

.bg-color-nav {
  background-color: #fff;
}

.bg-link-active {
  background-color: #965067;
  border-radius: 35px;
}

.brand-size {
  font-size: 1.7rem;
  color: var(--text-color);
}

.brand-style- {
  font-family: "Caveat", cursive;
  font-style: normal;
  font-optical-sizing: auto;
  font-weight: bold;
}

.bg-red {
  background-color: red;
}

.font-size {
  font-size: 1.2rem;
}

/*  */

.btn-ghost:hover {
  background-color: #eee;
}

.btn {
  background-color: var(--primary-color);
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: var(--primary-hover-color);
}
</style>
