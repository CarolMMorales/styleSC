<!-- estructura que se muestra antes de iniciar sesion -->
<template>
    <div class="app-container">
      <headerMain></headerMain>
 

      <main class="main-content">
        <RouterView></RouterView>
      </main>
      <FooterComponent></FooterComponent>
    </div>
  </template>
  
  <script setup>
  import headerMain from '../header/headerMainComponent.vue';
  import FooterComponent from '../FooterComponent.vue';

  </script>
 
  
  <style scoped>
  /* estilo */
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .main-content {
    flex: 1; /* Este estilo hace que el contenido principal ocupe todo el espacio disponible */
  }
  </style>
  
 