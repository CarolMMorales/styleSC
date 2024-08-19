//estas son las tiendas, donde se separan por modulos (cada modulo es una tienda), aqui se hacen las funciones desde el front y se llaman los datos que se van a mostrar o utilizar en las vistas

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
