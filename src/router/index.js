import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'
//import CryptoJS from 'crypto-js'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_URL),
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
          path: '/userProfile',
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


router.beforeEach(async (to, from, next) => {
  const requiredAuth = to.meta.auth;
  const UserStore = useAuthStore();

  // Verifica si el token está en localStorage y establece en el store si es necesario
  const localStorageToken = localStorage.getItem('Accept');
  if (localStorageToken) {
    UserStore.token = localStorageToken;
  }

  // Si la ruta requiere autenticación y no hay token, redirigir al login
  if (requiredAuth && !UserStore.token) {
    return next({ name: 'login' });
  }

  // Si el usuario está autenticado, permitir el acceso
  return next();
});

export default router;