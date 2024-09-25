<!-- Estuctura que se mostrara y se adaptara despues de iniciar sesio, es decir los componente iran dentro de esta estructura -->
<template>
    <HeaderProtected></HeaderProtected>
   <section class="container-fluid">
     <div class="row">
       
       <div class="col-12 col-lg-12 ">
         <main>
           <RouterView></RouterView>
         </main>
       </div>
     </div>
   </section>
   <FooterComponent></FooterComponent>
  </template>
  <script setup>
  import FooterComponent from '../../components/FooterComponent.vue'
  import HeaderProtected from '../header/headerProtected.vue';
  </script>
  <style>
  
  </style>