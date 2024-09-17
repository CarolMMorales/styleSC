import axios from 'axios'
import CryptoJS from 'crypto-js';
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore'
import { showSwalAlert, handleResponse} from '../validation'
//import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router'
export const useStockStore = defineStore('stocks', () => {
//   const { t } = useI18n();
  const router = useRouter()
  const authStore = useAuthStore()
  const secretKey = 'TuClaveSecreta';
  const user = CryptoJS.AES.decrypt(localStorage.getItem('id'), secretKey).toString(CryptoJS.enc.Utf8);
  const URL_STOCKS = `/stocks`
  const stock = ref([])


  // Funcion para registrar 
  const registerStock = async (produc_name, stock_costo, stock_precioVenta, stock_cantidad) => {
    try {
      const res = await axios({
        url: URL_STOCKS,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        },
        data: {
          produc_name: produc_name,
          stock_costo: stock_costo,
          stock_precioVenta: stock_precioVenta,
          stock_cantidad: stock_cantidad,
          use_id: user
        }
      });
      handleResponse(res, produc_name);
      await readStock();  // Asegúrate de que esta llamada esté presente
      return true;
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  


// Funcion para editar
const updateStock = async (stock_id, new_produc_name, new_stock_costo, new_stock_precioVenta, new_stock_cantidad) => {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token;
    const res = await axios({
      url: `${URL_STOCKS}/${stock_id}`,
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + authStore.token
      },
      data: {
        produc_name: new_produc_name,
        stock_costo: new_stock_costo,
        stock_precioVenta: new_stock_precioVenta,
        stock_cantidad: new_stock_cantidad,
        use_id: user
      }
    });
    handleResponse(res, new_produc_name);
    await readStock(); 
    return true;  
  } catch (error) {
    handleError(error);
    return false;  
  }
};


//funcion para leer y utilizar datos
const readStock = async () => {
  try {
    const res = await axios({
      url:URL_STOCKS,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + authStore.token
      }
    })
    stock.value = res.data.map((item) => {
      return {
          stock_id: item.stock_id,
          produc_name: item.produc_name,
          stock_costo: item.stock_costo,
          stock_precioVenta: item.stock_precioVenta,
          stock_cantidad: item.stock_cantidad
      };

  });
  console.log(stock.value);
    return stock.value;
    
  } catch (error) {
    handleError(error)
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
    
   
    await readStock();
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
readStock()
return {
  registerStock,
  readStock,
  updateStock,
  deleteStock,
  useStockStore,
  stock
}
})