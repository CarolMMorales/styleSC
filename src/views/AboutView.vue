// las vistas en donde se pondra la estructura principal y se llamaran los componentes que vayan en esta misma vista o pantalla como tal, ademas explicando lo de los componentes son la forma de organizar cada cosa y organizarlos en la pantalla, para evitar una saturación de codigo y hacer más facilla ubicación y corrección de errores  (uff re buena mi explicación)

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
