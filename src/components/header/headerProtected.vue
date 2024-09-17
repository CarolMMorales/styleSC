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
          <button
            @click="toggleAnimation"
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div class="animated-icon3" :class="{ open: isAnimated }">
              <span></span><span></span><span></span>
            </div>
          </button>
          <div
            class="collapse navbar-collapse justify-content-center m-0 p-0"
            :class="{ show: isMenuOpen }"
            id="navbarNavAltMarkup"
          >
            <div class="menu-items d-flex">
              <div class="menu-item">
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
                <RouterLink to="/proveedores" @click="closeMenu" active-class="active" class="side-btn">
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
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ProfileComponent from '../../components/ProfileComponent.vue';

const isAnimated = ref(false)
const isMenuOpen = ref(false)

const toggleAnimation = () => {
  isAnimated.value = !isAnimated.value
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
  isAnimated.value = !isAnimated.value
}
</script>

<style scoped>
.fondo {
  background-color: var(--purple-color);
  color: #ffffff;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 2vh;
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

/* Estilo para los elementos del menú */
.menu-items {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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

/* Cambia el tamaño de letra y el color cuando está activo o al pasar el mouse */
.side-btn:hover,
.side-btn.active {
  color: #f7f7f8;
  font-size: 1.2rem;
}

.navbar-toggler {
  border-color: #73238e;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba%28255, 255, 255, 0.5%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

.animated-icon1,
.animated-icon2,
.animated-icon3 {
  width: 30px;
  height: 20px;
  position: relative;
  margin: 0px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  cursor: pointer;
}

.animated-icon1 span,
.animated-icon2 span,
.animated-icon3 span {
  background: #ffffff; /* Asegúrate de que el color sea visible en tu fondo */
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
  top: 0px; /* Posición para la primera línea */
}

.animated-icon3 span:nth-child(2) {
  top: 8px; /* Posición para la segunda línea */
}

.animated-icon3 span:nth-child(3) {
  top: 16px; /* Posición para la tercera línea */
}

/* Animación cuando el menú está abierto */
.animated-icon3.open span:nth-child(1) {
  top: 8px; /* Mueve la primera línea al centro */
  transform: rotate(45deg); /* Gira la primera línea */
}

.animated-icon3.open span:nth-child(2) {
  opacity: 0; /* Oculta la segunda línea cuando el menú está abierto */
}

.animated-icon3.open span:nth-child(3) {
  top: 8px; /* Mueve la tercera línea al centro */
  transform: rotate(-45deg); /* Gira la tercera línea */
}


.animated-icon1 span {
  background: #6b4885;
}

.animated-icon2 span {
  background: #e3f2fd;
}

.animated-icon3 span {
  background: #f3e5f5;
}
</style>
