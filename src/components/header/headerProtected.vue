<template>
  <header class="fondo">
    <!-- Div para el título y el ProfileComponent -->
    <div class="header-top">
      <div class="container-fluid d-flex justify-content-between align-items-center p-2">
        <h1 class="navbar-brand mb-0 fs-2">{{ $t('titles.stylecs') }}</h1>
        <div class="d-none d-lg-block">
          <ProfileComponent></ProfileComponent>
        </div>
      </div>
    </div>
    <!-- Div para el menú de navegación -->
    <div class="header-bottom">
      <nav class="navbar navbar-expand-lg navbar-dark text-center">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul class="navbar-nav ms-auto justify-content-center">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active" 
                  to="/categories"
                >
                {{ $t ('titles.categories') }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active" 
                  to="/proveedores"
                >
                {{ $t ('titles.proveedores') }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active" 
                  to="/product"
                >
                {{ $t ('titles.products') }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active" 
                  to="/stocks"
                >
                {{ $t ('titles.stock') }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active" 
                  to="/stocks"
                >
                {{ $t ('titles.ventas') }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active" 
                  to="/asesores"
                >
                {{ $t ('titles.asesores') }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
//import { useRouter } from 'vue-router';
import ProfileComponent from '../../components/ProfileComponent.vue';


</script>

<style>
.fondo {
  background-color: var(--purple-color);
  color: #ffffff;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 2vh;
}

/* Estilos para el div del título y el ProfileComponent */
.header-top {
  
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Estilos para el div del menú */
.header-bottom {
  background-color:#6b4885;
  text-align: center;
  

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
</style>
