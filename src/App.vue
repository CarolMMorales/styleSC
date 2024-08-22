//aqui se va inicializar las vistas, oseaaa lo que se va a mostrar primero apenas se abra el aplicativo (ejemplo login) y posteriormente lo que se vera despues de autentificarse (pasar del login) 

<script setup>
import {  RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

</script>

<template>

  <RouterView />
</template>


