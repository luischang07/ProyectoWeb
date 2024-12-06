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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BienvenidaVue,
    },
    {
      path: '/Bienvenida',
      name: 'Bienvenida',
      component: BienvenidaVue,
    },
    {
      path: '/registrar',
      name: 'registrar',
      component: SignUPVue,
    },
    {
      path: '/validacion',
      name: 'validacion',
      component: SignINVue,
    },
    {
      path: '/personal',
      name: 'personal',
      component: PersonalVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/personal/:id/editar',
      name: 'personaleditar',
      component: PersonalEditarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/personal/agregar',
      name: 'personalagregar',
      component: PersonalAgregarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/personal/:id/borrar',
      name: 'personalborrar',
      component: PersonalBorrar,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: ClienteVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/clientes/:id/editar',
      name: 'clienteseditar',
      component: ClienteEditarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/clientes/agregar',
      name: 'clientesagregar',
      component: ClienteAgregarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/clientes/:id/borrar',
      name: 'clientesborrar',
      component: ClienteBorrarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/articulos',
      name: 'articulos',
      component: ArticulosVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/articulos/:id/editar',
      name: 'articuloseditar',
      component: ArticulosEditarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/articulos/:id/borrar',
      name: 'articulosborrar',
      component: ArticulosBorrarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/articulos/agregar',
      name: 'articulosagregar',
      component: ArticulosAgregarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/compras',
      name: 'compras',
      component: ComprasVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
    {
      path: '/compras/agregar',
      name: 'comprasagregar',
      component: ComprasAgregarVue,
      beforeEnter: (to, from, next) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
          next()
        } else {
          next('/validacion')
        }
      }
    },
  ],
})

export default router
