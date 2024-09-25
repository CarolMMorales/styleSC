import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore'
import { handleError } from '../validation'
export const useRolStore = defineStore('rol', () => {
  const authStore = useAuthStore()
  const URL_ROL = `/roles`
  const rol = ref([])
  //funcion para leer y utilizar datos
  const readRol = async () => {
    try {
      const res = await axios({
        url: URL_ROL,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        }
      })
      rol.value = res.data.map((item) => {
        return {
          rol_id: item.rol_id,
          rol_name: item.rol_name,

        };

      });
      return rol.value;

    } catch (error) {
      handleError(error)
    }
  };

  readRol()
  return {
    readRol,
    useRolStore,
    rol
  }
})