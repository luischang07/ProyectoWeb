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
  ],
})

export default router
