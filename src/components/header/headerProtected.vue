<!-- header cuanto ya se inicio sesion  -->
<template> 
  <header class="fondo">
    <!-- Div para el título y el ProfileComponent -->
    <div class="header-top">
      <div class="container-fluid d-flex justify-content-between align-items-center p-2">
        <h1 class="navbar-brand mb-0 fs-2">{{ $t('titles.stylecs') }}</h1>
        <div class="">
          <ProfileComponent></ProfileComponent>
        </div>
      </div>
    </div>
    
    <!-- Div para el menú de navegación -->
    <div class="header-bottom p-3">
      <nav class="navbar navbar-expand-lg navbar-dark bg-purple">
        <div class="container-fluid">
          <!-- Ajustar el tamaño del botón del menú -->
          <button
            @click="toggleMenu"
            class="navbar-toggler p-2"
            type="button"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div class="animated-icon3" :class="{ open: isMenuOpen }">
              <span></span><span></span><span></span>
            </div>
          </button>

          <!-- Asegurarnos de que el menú se oculte correctamente cuando está colapsado -->
          <div class="collapse navbar-collapse justify-content-center" :class="{ show: isMenuOpen }" id="navbarNavAltMarkup">
            <div class="menu-items d-flex">
              <div  class="menu-item" v-if="isRoleAdmin">
                <RouterLink to="/asesores" @click="closeMenu" active-class="active" class="side-btn">
                  {{ $t('titles.asesores') }}
                </RouterLink>
              </div>
              <div class="menu-item">
                <RouterLink to="/categories" @click="closeMenu" active-class="active" class="side-btn">
                  {{ $t('titles.categories') }}
                </RouterLink>
              </div>
              <div class="menu-item">
                <RouterLink to="/products" @click="closeMenu" active-class="active" class="side-btn">
                  {{ $t('titles.products') }}
                </RouterLink>
              </div>
              <div class="menu-item">
                <RouterLink v-if="isRoleAdmin" to="/proveedores" @click="closeMenu" active-class="active" class="side-btn">
                  {{ $t('titles.proveedores') }}
                </RouterLink>
              </div>
              <div class="menu-item">
                <RouterLink to="/stocks" @click="closeMenu" active-class="active" class="side-btn">
                  {{ $t('titles.stock') }}
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
//importar componente y funciones necesarias
import { ref, computed } from 'vue'
import ProfileComponent from '../../components/ProfileComponent.vue'
import { useAuthStore } from '../../stores/authStore';
const authStore = useAuthStore(); 
const isMenuOpen = ref(false)

const isRoleAdmin = computed(() => authStore.rol_id === '1');

//funciones para ocultar y desocultar el menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style scoped>
/* Estilo general del fondo */
.fondo {
  background-color: var(--purple-color);
  color: #ffffff;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 2vh;
}

header {
  z-index: 1000; /* Asegúrate de que el header esté siempre sobre el contenido */
  position: relative; /* O position: fixed; si el menú debe permanecer visible */
  margin-bottom: 2%;
}
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-bottom {
  background-color: #6b4885;
  text-align: center;
}

.navbar {
  padding: 0;
}

.navbar-brand {
  font-size: 1.3rem;
  padding: 0 1rem;
  text-shadow: 2px solid rgba(56, 40, 65, 0);
}

/* Ajustes para el botón del menú (toggler) */
.navbar-toggler {
  border-color: #73238e;
  padding: 5px 10px; /* Ajustar tamaño del botón */
  width: auto; /* Asegurar que el botón no ocupe todo el ancho */
}

/* Icono animado para el menú */
.animated-icon3 {
  width: 30px;
  height: 20px;
  position: relative;
  margin: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  cursor: pointer;
}

.animated-icon3 span {
  background: #ffffff;
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  transition: all 0.3s ease-in-out;
}

.animated-icon3 span:nth-child(1) {
  top: 0px;
}

.animated-icon3 span:nth-child(2) {
  top: 8px;
}

.animated-icon3 span:nth-child(3) {
  top: 16px;
}

/* Animación cuando el menú está abierto */
.animated-icon3.open span:nth-child(1) {
  top: 8px;
  transform: rotate(45deg);
}

.animated-icon3.open span:nth-child(2) {
  opacity: 0;
}

.animated-icon3.open span:nth-child(3) {
  top: 8px;
  transform: rotate(-45deg);
}

/* Estilo para los elementos del menú */
.menu-items {
  display: flex;
  flex-wrap: wrap; /* Permitir que los elementos se ajusten en pantallas pequeñas */
  justify-content: center; /* Alinear en el centro */
}

.menu-item {
  margin: 0 10px;
}

.side-btn {
  color: #ffffff;
  font-weight: bold;
  padding: 0.5rem 1rem;
  text-align: center;
  text-transform: uppercase;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
}

.side-btn:hover,
.side-btn.active {
  color: #f7f7f8;
  font-size: 1.2rem;
}

/* Colapsar correctamente el menú en pantallas pequeñas */
.collapse.navbar-collapse.show {
  display: flex;
  justify-content: center; /* Centrar los elementos del menú */
}
</style>
