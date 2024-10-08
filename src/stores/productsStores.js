import axios from 'axios'
import CryptoJS from 'crypto-js';
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore'
import { showSwalAlert, handleResponse } from '../validation'
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router'
export const useProductsStore = defineStore('products', () => {
  const router = useRouter()
  const authStore = useAuthStore()
  const secretKey = 'TuClaveSecreta';
  const user = CryptoJS.AES.decrypt(localStorage.getItem('id'), secretKey).toString(CryptoJS.enc.Utf8);
  const URL_PRODUCTS = `/products`
  const produc = ref([])

  // Funcion para registrar 
  const registerProduct = async (produc_code, produc_name, produc_description, produc_size, cate_id) => {
    try {
      const res = await axios({
        url: URL_PRODUCTS,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        },
        data: {
          produc_code: produc_code,
          produc_name: produc_name,
          produc_description: produc_description,
          produc_size: produc_size,
          cate_id: cate_id,
          use_id: user
        }
      });
      handleResponse(res, produc_name);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Producto creado correctamente',
        confirmButtonText: 'Aceptar'
      });
      await readProduct();
      return true;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al crear el producto',
        confirmButtonText: 'Aceptar'
      });

    }
  };

  const getProductById = async (produc_id) => {
    try {
      const res = await axios.get(`${URL_PRODUCTS}/${produc_id}`);
      return res.data.data;  // Asegúrate de que esto devuelve los datos correctos
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };


  // Funcion para editar
  const updateProduct = async (produc_id, new_produc_code, new_produc_name, new_produc_description, new_produc_size, new_cate_id) => {
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
          use_id: user
        }
      });
      handleResponse(res, new_produc_name);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Producto actualizado correctamente',
        confirmButtonText: 'Aceptar'
      });
      await readProduct();
      return true;
    } catch (error) {
      handleError(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrio un error al actualizar el producto',
        confirmButtonText: 'Aceptar'
      });
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

      produc.value = res.data.data;
      return produc.value;

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
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Persona eliminada correctamente',
        confirmButtonText: 'Aceptar'
      });
      await readProduct();
      return true;
    } catch (error) {
      handleError(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al eliminar la categoria',
        confirmButtonText: 'Aceptar'
      });
      return false;
    }
  };
  //Funcion para errores
  const handleError = (error) => {
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
  //retorna las funciones utilizadas para que se puedan exportar
  return {
    registerProduct,
    getProductById,
    readProduct,
    updateProduct,
    deleteProduct,
    useProductsStore,
    produc
  }
})