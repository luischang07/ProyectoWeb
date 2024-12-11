import ArticulosVue from '@/modulos/articulos/vistas/ArticulosVue.vue'
import { getAuth } from 'firebase/auth'
import ArticulosEditarVue from '@/modulos/articulos/vistas/ArticulosEditarVue.vue'
import ClienteAgregarVue from '@/modulos/cliente/vistas/ClienteAgregarVue.vue'
import ClienteBorrarVue from '@/modulos/cliente/vistas/ClienteBorrarVue.vue'
import ClienteEditarVue from '@/modulos/cliente/vistas/ClienteEditarVue.vue'
import ClienteVue from '@/modulos/cliente/vistas/ClienteVue.vue'
import PersonalAgregarVue from '@/modulos/personal/vistas/PersonalAgregarVue.vue'
import PersonalBorrar from '@/modulos/personal/vistas/PersonalBorrar.vue'
import PersonalEditarVue from '@/modulos/personal/vistas/PersonalEditarVue.vue'
import PersonalVue from '@/modulos/personal/vistas/PersonalVue.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ArticulosBorrarVue from '@/modulos/articulos/vistas/ArticulosBorrarVue.vue'
import ArticulosAgregarVue from '@/modulos/articulos/vistas/ArticulosAgregarVue.vue'
import BienvenidaVue from '@/modulos/principal/vistas/BienvenidaVue.vue'
import SignUPVue from '@/modulos/auth/vistas/SignUPVue.vue'
import SignINVue from '@/modulos/auth/vistas/SignINVue.vue'
import ComprasVue from '@/modulos/compras/vistas/ComprasVue.vue'
import ComprasAgregarVue from '@/modulos/compras/vistas/ComprasAgregarVue.vue'
import RegistrosVue from '../modulos/registros/vistas/RegistrosVue.vue'
import RegistrosAgregarVue from '@/modulos/registros/vistas/RegistrosAgregarVue.vue'
import VentasVue from '@/modulos/ventas/vistas/VentasVue.vue'
import VentasBorrar from '@/modulos/ventas/vistas/VentasBorrar.vue'

import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import VentasEditarVue from '@/modulos/ventas/vistas/ventasEditarVue.vue'
import VentasAgregarVue from '@/modulos/ventas/vistas/VentasAgregarVue.vue'

const requireAuth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const auth = getAuth()
  const user = auth.currentUser
  if (user) {
    next()
  } else {
    next('/validacion')
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: BienvenidaVue },
    { path: '/Bienvenida', name: 'Bienvenida', component: BienvenidaVue },
    { path: '/registrar', name: 'registrar', component: SignUPVue },
    { path: '/validacion', name: 'validacion', component: SignINVue },
    { path: '/personal', name: 'personal', component: PersonalVue, beforeEnter: requireAuth },
    { path: '/personal/:id/editar', name: 'personaleditar', component: PersonalEditarVue, beforeEnter: requireAuth },
    { path: '/personal/agregar', name: 'personalagregar', component: PersonalAgregarVue, beforeEnter: requireAuth },
    { path: '/personal/:id/borrar', name: 'personalborrar', component: PersonalBorrar, beforeEnter: requireAuth },
    { path: '/clientes', name: 'clientes', component: ClienteVue, beforeEnter: requireAuth },
    { path: '/clientes/:id/editar', name: 'clienteseditar', component: ClienteEditarVue, beforeEnter: requireAuth },
    { path: '/clientes/agregar', name: 'clientesagregar', component: ClienteAgregarVue, beforeEnter: requireAuth },
    { path: '/clientes/:id/borrar', name: 'clientesborrar', component: ClienteBorrarVue, beforeEnter: requireAuth },
    { path: '/articulos', name: 'articulos', component: ArticulosVue, beforeEnter: requireAuth },
    { path: '/articulos/:id/editar', name: 'articuloseditar', component: ArticulosEditarVue, beforeEnter: requireAuth },
    { path: '/articulos/:id/borrar', name: 'articulosborrar', component: ArticulosBorrarVue, beforeEnter: requireAuth },
    { path: '/articulos/agregar', name: 'articulosagregar', component: ArticulosAgregarVue, beforeEnter: requireAuth },
    { path: '/compras', name: 'compras', component: ComprasVue, beforeEnter: requireAuth },
    { path: '/compras/agregar', name: 'comprasagregar', component: ComprasAgregarVue, beforeEnter: requireAuth },
    { path: '/clientes/registro', name: 'registros', component: RegistrosVue, beforeEnter: requireAuth },
    { path: '/registro/agregar', name: 'agregarregistro', component: RegistrosAgregarVue, beforeEnter: requireAuth },
    { path: '/ventas', name: 'ventas', component: VentasVue, beforeEnter: requireAuth },
    { path: '/ventas/agregar', name: 'ventasagregar', component: VentasAgregarVue, beforeEnter: requireAuth },
    { path: '/ventas/:id/editar', name: 'ventaseditar', component: VentasEditarVue, beforeEnter: requireAuth },
    { path: '/ventas/:id/borrar', name: 'ventasborrar', component: VentasBorrar, beforeEnter: requireAuth }
  ],
})

export default router
