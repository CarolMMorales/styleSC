import axios from 'axios'
//import CryptoJS from 'crypto-js';
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore'
import {  handleError} from '../validation'
//import { useI18n } from "vue-i18n";

export const useRolStore = defineStore('rol', () => {
//   const { t } = useI18n();
  
  const authStore = useAuthStore()
  //const secretKey = 'TuClaveSecreta';
  //const user = CryptoJS.AES.decrypt(localStorage.getItem('id'), secretKey).toString(CryptoJS.enc.Utf8);
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
  console.log(rol.value);
    return rol.value;
    
  } catch (error) {
    handleError(error)
    console.log('roles', rol.value);
  }
};  




  
readRol()
return {
  
  readRol,
 
  useRolStore,
  rol
}
})