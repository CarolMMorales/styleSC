import axios from 'axios'
import CryptoJS from 'crypto-js';
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore'
import { showSwalAlert, handleResponse} from '../validation'
//import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router'
export const useCategoryStore = defineStore('categories', () => {
//   const { t } = useI18n();
  const router = useRouter()
  const authStore = useAuthStore()
  const secretKey = 'TuClaveSecreta';
  const user = CryptoJS.AES.decrypt(localStorage.getItem('id'), secretKey).toString(CryptoJS.enc.Utf8);
  const URL_CATEGORIES = `/categories`
  const cate = ref([]) // CONSTANTE CATE QUE CONTIENE EL ARREGLO PRINCIPAL


  // Funcion para registrar 
  const registerCategory = async (cate_name, cate_description, cate_medida) => {
    try {
      const res = await axios({
        url: URL_CATEGORIES,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        },
        data: {
          cate_name: cate_name,
          cate_description: cate_description,
          cate_medida: cate_medida,
          use_id: user
        }
      });
      handleResponse(res, cate_name);
      await readCategory();  // Asegúrate de que esta llamada esté presente
      return true;
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  


// Funcion para editar
const updateCategory = async (cate_id, new_cate_name, new_cate_description, new_cate_medida) => {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token;
    const res = await axios({
      url: `${URL_CATEGORIES}/${cate_id}`,
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + authStore.token
      },
      data: {
        cate_name: new_cate_name,
        cate_description: new_cate_description,
        cate_medida: new_cate_medida,
        use_id: user
      }
    });
    handleResponse(res, new_cate_name);
    await readCategory(); 
    return true;  
  } catch (error) {
    handleError(error);
    return false;  
  }
};


//funcion para leer y utilizar datos
const readCategory = async () => {
  try {
    const res = await axios({
      url:URL_CATEGORIES,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + authStore.token
      }
    })
    cate.value = res.data.map((item) => {
      return {
          cate_id: item.cate_id,
          cate_name: item.cate_name,
          cate_description: item.cate_description,
          cate_medida: item.cate_medida
      };

  });
  console.log(cate.value);
    return cate.value;
    
  } catch (error) {
    handleError(error)
  }
};  
// Función para eliminar 
const deleteCategory = async (cate_id) => {
  try {
    const res = await axios({
      url: `${URL_CATEGORIES}/${cate_id}`,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + authStore.token
      }
    });
    handleResponse(res, "Categoría eliminada");
    
   
    await readCategory();
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
readCategory()
return {
  registerCategory,
  readCategory,
  updateCategory,
  deleteCategory,
  useCategoryStore,
  cate
}
})