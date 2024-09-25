import axios from 'axios'
import CryptoJS from 'crypto-js';
import { defineStore } from 'pinia'
import { ref } from 'vue'
import Swal from 'sweetalert2';
import { useAuthStore } from './authStore'
import { showSwalAlert, handleResponse } from '../validation'
import { useRouter } from 'vue-router'
export const useStockStore = defineStore('stocks', () => {
  const router = useRouter()
  const authStore = useAuthStore()
  const secretKey = 'TuClaveSecreta';
  const user = CryptoJS.AES.decrypt(localStorage.getItem('id'), secretKey).toString(CryptoJS.enc.Utf8);
  const URL_STOCKS = `/stocks`
  const stock = ref([])

  // Funcion para registrar 
  const registerStock = async (stock_costo, stock_precioVenta, stock_cantidad, produc_id, prove_id) => {
    try {
      const res = await axios({
        url: URL_STOCKS,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        },
        data: {
          stock_costo: stock_costo,
          stock_precioVenta: stock_precioVenta,
          stock_cantidad: stock_cantidad,
          produc_id: produc_id,
          prove_id: prove_id,
          use_id: user
        }
      });
      handleResponse(res, stock_costo);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Stock creado correctamente',
        confirmButtonText: 'Aceptar'
      });
      await readStock();  // Asegúrate de que esta llamada esté presente
      return true;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrio un error al crear el Stock',
        confirmButtonText: 'Aceptar'
      });
    }
  };
  //Funcion para traer los datos de un stock con el id
  const getStockById = async (stock_id) => {
    try {
      const res = await axios.get(`${URL_STOCKS}/${stock_id}`);
      return res.data.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrio un error al encontrar el Stock',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  // Funcion para editar
  const updateStock = async (stock_id, new_stock_costo, new_stock_precioVenta, new_stock_cantidad, new_produc_id, new_prove_id) => {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token;
      const res = await axios({
        url: `${URL_STOCKS}/${stock_id}`,
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        },
        data: {
          stock_costo: new_stock_costo,
          stock_precioVenta: new_stock_precioVenta,
          stock_cantidad: new_stock_cantidad,
          produc_id: new_produc_id,
          prove_id: new_prove_id,
          use_id: user
        }
      });
      handleResponse(res, new_stock_costo);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Stock actualizado correctamente',
        confirmButtonText: 'Aceptar'
      });
      await readStock();
      return true;
    } catch (error) {
      handleError(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrio un error al actualizar el stock',
        confirmButtonText: 'Aceptar'
      });
      return false;
    }
  };


  //funcion para leer y utilizar datos
  const readStock = async () => {
    try {
      const res = await axios({
        url: URL_STOCKS,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        }
      });

      // Asignar los datos extraídos a produc.value
      stock.value = res.data.data;
      return stock.value;
    } catch (error) {
      handleError(error);
    }
  };
  // Función para eliminar 
  const deleteStock = async (stock_id) => {
    try {
      const res = await axios({
        url: `${URL_STOCKS}/${stock_id}`,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        }
      });
      handleResponse(res, "Stock eliminado");
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Stock eliminado correctamente',
        confirmButtonText: 'Aceptar'
      });
      await readStock();
      return true;
    } catch (error) {
      handleError(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrio un error al eliminar el stock',
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
  readStock()
  //retorna las funciones utilizadas para que se puedan exportar
  return {
    registerStock,
    getStockById,
    readStock,
    updateStock,
    deleteStock,
    useStockStore,
    stock
  }
})