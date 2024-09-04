import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'
import CryptoJS from 'crypto-js'

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

  // Si el token ya está presente en el almacenamiento local, establecerlo en el almacén de estado
  const localStorageToken = localStorage.getItem("Accept");
  const localStorageId = localStorage.getItem('id');
  const secretKey = 'TuClaveSecreta';

  let use_id = null;
  if (localStorageId) {
    try {
      use_id = CryptoJS.AES.decrypt(localStorageId, secretKey).toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Error al desencriptar localStorageId:', error);
      return next('/'); // Redirigir al inicio si hay un error en la desencriptación
    }
  }

  if (localStorageToken) {
    UserStore.token = localStorageToken;
  }

  // Si la ruta requiere autenticación
  if (requiredAuth) {
    if (!UserStore.token) {
      // Si no hay token, redirigir al inicio de sesión
      return next('/');
    } else {
      // Si hay token, verifica la validez del token o haz la lógica adicional que requieras aquí
      try {
        const isLoggedOut = await UserStore.logout(use_id);
        if (isLoggedOut) {
          return next('/'); // Redirigir al inicio si el usuario ha cerrado sesión
        }
      } catch (error) {
        console.error('Error al intentar cerrar sesión:', error);
        return next('/'); // Redirigir al inicio en caso de error
      }
    }
  }

  // Permitir el acceso a rutas públicas
  return next();
});


export default router
