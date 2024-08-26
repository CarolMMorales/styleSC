<template>
    <header class="fondo">
      <nav class="navbar navbar-expand-lg navbar-dark pt-2">
        <div class="container-fluid">
          <h1 class="navbar-brand mb-0 h1">{{ $t('titles.stylecs') }}</h1>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" :class="{ active: isActive('categorias') }" href="#" @click="selectMenu('categorias')">Categorías</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" :class="{ active: isActive('proveedores') }" href="#" @click="selectMenu('proveedores')">Proveedores</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" :class="{ active: isActive('productos') }" href="#" @click="selectMenu('productos')">Productos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" :class="{ active: isActive('inventario') }" href="#" @click="selectMenu('inventario')">Inventario</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" :class="{ active: isActive('ventas') }" href="#" @click="selectMenu('ventas')">Ventas</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" :class="{ active: isActive('asesores') }" href="#" @click="selectMenu('asesores')">Asesores</a>
              </li>
            </ul>
            <div class="d-none d-lg-block ms-auto">
              <ProfileComponent></ProfileComponent>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import ProfileComponent from '../../components/ProfileComponent.vue';
  
  const activeMenu = ref('');
  
  const selectMenu = (menu) => {
    activeMenu.value = menu;
  };
  
  const isActive = (menu) => {
    return activeMenu.value === menu;
  };
  </script>
  
  <style>
  .fondo {
    background-color: var(--lila-color);
    color: #ffffff;
    height: 15vh;
    align-items: center;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .navbar {
    padding: 0;
  }
  
  .navbar-brand {
    font-size: 1.3rem;
    padding: ps-2;
    text-shadow: 2px solid rgba(56, 40, 65, 0);
  }
  
  .navbar-nav .nav-item .nav-link {
    color: #ffffff;
    font-weight: bold;
    padding-left: 1rem;
    padding-right: 1rem;
    text-align: center;
  }
  
  .navbar-nav .nav-item .nav-link:hover,
  .navbar-nav .nav-item .nav-link.active {
    color: #f7f7f8; /* Color para hover y selección activa */
    
  }
  
  .navbar-toggler {
    border-color: #73238e;
  }
  
  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba%28255, 255, 255, 0.5%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
  }
  
  .ms-auto {
    margin-left: auto; /* Alinea el componente al extremo derecho */
  }
  </style>
  
    