import axios from 'axios'
import CryptoJS from 'crypto-js';
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore'
import { showSwalAlert} from '../validation'
//import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router'
export const useProveedorStore = defineStore('proveedores', () => {
//   const { t } = useI18n();
  const router = useRouter()
  const authStore = useAuthStore()
  const secretKey = 'TuClaveSecreta';
  const user = CryptoJS.AES.decrypt(localStorage.getItem('id'), secretKey).toString(CryptoJS.enc.Utf8);
  const URL_PROVEEDORES = `/proveedores`
  const prove = ref([])


  // Esta función se utiliza para registrar los contactos 
  const registerProveedor = async (prove_name, prove_lastname, prove_address, prove_phone, prove_email) => {
    try {
      const res = await axios({
        url: URL_PROVEEDORES,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        },
        data: {
          prove_name: prove_name,
          prove_lastname: prove_lastname,
          prove_address: prove_address,
          prove_phone: prove_phone,
          prove_email: prove_email,
          use_id:user

        }
      })
    //   handleResponsePersons(
    //     res,
    //     prove_name,
    //     t('contacts.messageSuccess'),
    //     t('errors.invalidFormat'),
    //     t('telephones.numberCharacters'),
    //     t('telephones.number15Characters'),
    //     t('validation.mails.invalidFormat'),
    //   )
      
      const newProveedorId = res.data;
        return newProveedorId;
    } catch (error) {
      
      console.log(error.response?.data || error)
    }
  }


// Esta función se utiliza para editar los contactos
const updateProveedor = async (prove_id, new_prove_name, new_prove_lastname, new_prove_address, new_prove_phone,new_prove_email) => {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token;
    const res = await axios({
      url: `${URL_PROVEEDORES}/${prove_id}`, 
      method: 'PUT', 
      headers: {
        Authorization: 'Bearer ' + authStore.token
      },
      data: {
        prove_name: new_prove_name,
        prove_lastname: new_prove_lastname,
        prove_address: new_prove_address,
        prove_phone: new_prove_phone,
        prove_email: new_prove_email,
        use_id:user
      }
    });
    //   handleResponsePersons(
    //     res,
    //     new_prove_name,
    //     t('contacts.edited'),
    //     t('errors.invalidFormat'),
    //     t('telephones.numberCharacters'),
    //     t('telephones.number15Characters'),
    //     t('validation.mails.invalidFormat'),
    //   )
      


      const newProveedorId = res.data;
      return newProveedorId ;
    
  } catch (error) {
    console.error(error.response?.data || error);
    handleError(error);
  }
};

// Esta función se utiliza para leer los contactos
const readProveedor = async () => {
  try {
    const res = await axios({
      url:URL_PROVEEDORES,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + authStore.token
      }
    })
    prove.value = res.data.data.map((item) => {
      return {
          prove_name: item.prove_name,
          prove_lastname: item.prove_lastname,
          prove_address: item.prove_address,
          prove_phone: item.prove_phone,
          prove_email: item.prove_email
      };
  });
    return prove.value;
  } catch (error) {
    handleError(error)
  }
};  

// Esta función se utiliza para obtener los detalles de los teléfonos asociados a una persona por su ID

// const getContactByPersonId = (docType, document) => {
//   return prove.value.filter(contactItem => 
//     contactItem.doc_typ_id === docType && contactItem.per_document === document);
//   };

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
readProveedor()
return {
  registerProveedor,
  readProveedor,
  updateProveedor,
  useProveedorStore,
  prove
}
})