<template>
    <HeaderProtected></HeaderProtected>
   <section class="container-fluid">
     <div class="row">
       
       <div class="col-12 col-lg-10 ">
         <main>
           <RouterView></RouterView>
         </main>
       </div>
     </div>
   </section>
   <FooterComponent></FooterComponent>
  </template>
  <script setup>
  import  FooterComponent from '../../components/FooterComponent.vue'
import HeaderProtected from '../header/HeaderProtected.vue';
  </script>
  <style>
  
  </style>