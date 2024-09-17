import axios from 'axios'
import CryptoJS from 'crypto-js';
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore'
import { showSwalAlert, handleResponse} from '../validation'
//import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router'
export const useProductsStore = defineStore('products', () => {
//   const { t } = useI18n();
  const router = useRouter()
  const authStore = useAuthStore()
  const secretKey = 'TuClaveSecreta';
  const user = CryptoJS.AES.decrypt(localStorage.getItem('id'), secretKey).toString(CryptoJS.enc.Utf8);
  const URL_PRODUCTS = `/products`
  const produc = ref([])


  // Funcion para registrar 
  const registerProduct = async (produc_id, produc_code, produc_name, produc_description, produc_size, cate_id, cate_name) => {
    try {
      const res = await axios({
        url: URL_PRODUCTS,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        },
        data: {
          produc_id: produc_id,
          produc_code: produc_code,
          produc_name: produc_name,
          produc_description: produc_description,
          produc_size: produc_size,
          cate_id: cate_id,
          cate_name: cate_name,
          use_id: user
        }
      });
      handleResponse(res, produc_name);
      await readProduct();  // Asegúrate de que esta llamada esté presente
      return true;
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  


// Funcion para editar
const updateProduct = async (produc_id, new_produc_code, new_produc_name, new_produc_description, new_produc_size, new_cate_id, new_cate_name ) => {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token;
    const res = await axios({
      url: `${URL_PRODUCTS}/${produc_id}`,
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + authStore.token
      },
      data: {
        produc_code: new_produc_code,
        produc_name: new_produc_name,
        produc_description: new_produc_description,
        produc_size: new_produc_size,
        cate_id: new_cate_id,
        cate_name: new_cate_name,
        use_id: user
      }
    });
    handleResponse(res, new_produc_name);
    await readProduct(); 
    return true;  
  } catch (error) {
    handleError(error);
    return false;  
  }
};


//funcion para leer y utilizar datos
const readProduct = async () => {
  try {
    const res = await axios({
      url: URL_PRODUCTS,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + authStore.token
      }
    });

    // Asignar los datos extraídos a produc.value
    produc.value = res.data.data;
    
    /* console.log(produc.value);
    return produc.value;  */

  } catch (error) {
    handleError(error);
  }
};

// Función para eliminar 
const deleteProduct = async (produc_id) => {
  try {
    const res = await axios({
      url: `${URL_PRODUCTS}/${produc_id}`,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + authStore.token
      }
    });
    handleResponse(res, "Producto eliminado");
    
   
    await readProduct();
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
readProduct()
return {
  registerProduct,
  readProduct,
  updateProduct,
  deleteProduct,
  useProductsStore,
  produc
}
})