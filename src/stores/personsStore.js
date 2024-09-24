import axios from 'axios'
//import CryptoJS from 'crypto-js';
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore'
import { showSwalAlert, handleResponse} from '../validation'
//import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router'
export const usePersonStore = defineStore('persons', () => {
//   const { t } = useI18n();
  const router = useRouter()
  const authStore = useAuthStore()
 
  const user = localStorage.getItem('id');
  console.log('use_id: ', user);
  const URL_PERSONS = `/persons`
  const person = ref([]) // CONSTANTE CATE QUE CONTIENE EL ARREGLO PRINCIPAL

  
  // Funcion para registrar 
  const registerPerson = async (per_name, per_lastname, typ_doc_id, per_document, per_address) => {
    try {
      const res = await axios({
        url: URL_PERSONS,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        },
        data: {
          per_name: per_name,
          per_lastname: per_lastname,
          typ_doc_id: typ_doc_id,
          per_document: per_document,
          per_address: per_address,
          
        }
      });
      handleResponse(res, per_name);
      console.log({
        per_name, per_lastname, typ_doc_id, per_document, per_address, user // Para registerPerson
      });
      
      await readPerson();
      return res.data.per_id;   
      
    }  catch (error) {
      if (error.response && error.response.data.errors) {
        console.error("Validation Errors:", error.response.data.errors);
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  };
  


// Funcion para editar
const updatePerson = async (per_id, per_name, per_lastname, typ_doc_id, per_document, per_address ) => {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token;
    const res = await axios({
      url: `${URL_PERSONS}/${per_id}`,
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + authStore.token
      },
      data: {
        per_name: per_name,
        per_lastname: per_lastname,
        typ_doc_id: typ_doc_id,
        per_document: per_document,
        per_address: per_address,
        
      }
    });
    handleResponse(res, per_name);
    await readPerson(); 
    return true;  
  } catch (error) {
    handleError(error);
    return false;  
  }
};


//funcion para leer y utilizar datos
const readPerson = async () => {
  try {
    const res = await axios({
      url:URL_PERSONS,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + authStore.token
      }
    })
    person.value = res.data;
  console.log(person.value);
    return person.value;
    
  } catch (error) {
    handleError(error)
  }
};  
// Función para eliminar 
const deletePerson = async (per_id) => {
  try {
    const res = await axios({
      url: `${URL_PERSONS}/${per_id}`,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + authStore.token
      }
    });
    handleResponse(res, "Persona eliminada");
    
   
    await readPerson();
    return true;
  } catch (error) {
    handleError(error);
    return false;
  }
};



  const handleError =(error)=>{
    if (error.response && error.response.status === 401) {
      router.push({ name: 'login', query: { redirect: router.currentRoute.fullPath } });
      authStore.logout()
    } else if (error.response) {
      showSwalAlert(null, error.response.data.message, 'error');
    } else if (error.request) {
      showSwalAlert('Error de solicitud:', error.request, 'error');
    } else {
      showSwalAlert('Error inesperado:', error.message, 'error');
    }
  }
readPerson()
return {
  registerPerson,
  readPerson,
  updatePerson,
  deletePerson,

  usePersonStore,
  person
}
})