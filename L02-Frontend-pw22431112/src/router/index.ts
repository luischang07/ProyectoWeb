import ClienteAgregarVue from '@/modulos/cliente/vistas/ClienteAgregarVue.vue'
import ClienteBorrarVue from '@/modulos/cliente/vistas/ClienteBorrarVue.vue'
import ClienteEditarVue from '@/modulos/cliente/vistas/ClienteEditarVue.vue'
import ClienteVue from '@/modulos/cliente/vistas/ClienteVue.vue'
import PersonalAgregarVue from '@/modulos/personal/vistas/PersonalAgregarVue.vue'
import PersonalBorrar from '@/modulos/personal/vistas/PersonalBorrar.vue'
import PersonalEditarVue from '@/modulos/personal/vistas/PersonalEditarVue.vue'
import PersonalVue from '@/modulos/personal/vistas/PersonalVue.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: na,
    // },
    {
      path: '/personal',
      name: 'personal',
      component: PersonalVue,
    },
    {
      path: '/personal/:id/editar',
      name: 'personaleditar',
      component: PersonalEditarVue,
    },
    {
      path: '/personal/agregar',
      name: 'personalagregar',
      component: PersonalAgregarVue,
    },
    {
      path: '/personal/:id/borrar',
      name: 'personalborrar',
      component: PersonalBorrar,
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: ClienteVue,
    },
    {
      path: '/clientes/:id/editar',
      name: 'clienteseditar',
      component: ClienteEditarVue,
    },
    {
      path: '/clientes/agregar',
      name: 'clientesagregar',
      component: ClienteAgregarVue,
    },
    {
      path: '/clientes/:id/borrar',
      name: 'clientesborrar',
      component: ClienteBorrarVue,
    },
  ],
})

export default router
