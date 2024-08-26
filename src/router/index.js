import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../components/layout/DefaultLayout.vue'),
      children: [
        {
          path: '/',
          name: 'login',
          component: () => import('../views/LoginView.vue')
        }
        // {
        //   path: 'profile',
        //   name: 'profile',
        //   component: () => import('../views/ProfileView.vue'),
        //   meta:{
        //     auth:true
        //   }
        // }
      ]
    },
    {
      path: '/protected',
      component: () => import('../components/layout/ProtectedDefaultLayout.vue'),
      meta:{
        auth:true
      },
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/ProfileView.vue'),
          meta:{
            auth:true
          }
        },
        {
          path: 'asesores',
          name: 'asesores',
          component: () => import('../views/AsesoresView.vue'),
          meta:{
            auth:true
          }
        },
        {
          path: 'categories',
          name: 'categories',
          component: () => import('../views/CategoriesView.vue'),
          meta:{
            auth:true
          }
        },
        {
          path: 'product',
          name: 'product',
          component: () => import('../views/ProductView.vue'),
          meta:{
            auth:true
          }
        },
        {
          path: 'proveedores',
          name: 'proveedores',
          component: () => import('../views/ProveedoresView.vue'),
          meta:{
            auth:true
          }
        },
        {
          path: 'stocks',
          name: 'stocks',
          component: () => import('../views/StocksView.vue'),
          meta:{
            auth:true
          }
        }
      ]
    }
  ]
})

export default router
