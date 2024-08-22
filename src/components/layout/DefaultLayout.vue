<template>
    <div class="app-container">
      <headerMain></headerMain>
 

      <main class="main-content">
        <RouterView></RouterView>
      </main>
      <!-- <FooterComponent></FooterComponent> -->
    </div>
  </template>
  
  <script setup>
  import headerMain from '../header/headerMainComponent.vue';

  </script>
 
  
  <style scoped>
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .main-content {
    flex: 1; /* Este estilo hace que el contenido principal ocupe todo el espacio disponible */
  }
  </style>
  
 