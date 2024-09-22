
import axios from 'axios'
//import CryptoJS from 'crypto-js'
import { defineStore } from 'pinia'
import { ref  } from 'vue'
import { useI18n } from "vue-i18n";
import { useAuthStore } from './authStore.js'
import { useRouter } from 'vue-router'
import { showSwalAlert, handleResponsePassword, handleResponse } from '../validation.js'



export const useProfileStore = defineStore('profile', () => {
  const router = useRouter();
  const { t } = useI18n();
  //const secretKey = 'TuClaveSecreta';
  const authStore = useAuthStore();
  
 

  //const URL_PASSWORD = `/profile/changePassword`;
  const profile = ref([]);
  const personId = ref(null);

  

  const readPersonDetailsById = async () => {
    const userId = localStorage.getItem('id');//readUserLocal();
  
    if (!userId) {
      console.error('ID del usuario no disponible. No se puede obtener los detalles de la persona.');
      return;
    }
  
    try {
      const res = await axios({
        url: `/profile/${userId}`,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + authStore.token,
        },
      });
  
      profile.value = res.data;
      personId.value = res.data.per_id;
      
    } catch (error) {
      handleError(error);
    }
  };
  

  const updatePerson = async (per_id, per_name, per_lastname, typ_doc_id, per_document, per_address ) => {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token;
      const res = await axios({
        url: `persons/${per_id}`,
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
          //use_id: user
        }
      });
      handleResponse(res, per_name);
      await readPersonDetailsById(); 
      return true;  
    } catch (error) {
      handleError(error);
      return false;  
    }
  };



  const updatePassword = async (currentPassword, newPassword, confirmPassword) => {
    const userId = localStorage.getItem('id'); // Obtiene el ID del usuario
  
    try {
      const res = await axios({
        url: `auth/profile/changePassword/${userId}`, // Envía el userId en la ruta
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + authStore.token, // Asegúrate de que este token sea correcto
        },
        data: {
          use_password: currentPassword,
          new_password: newPassword,
          password_confirmation: confirmPassword,
        }
      });
      handleResponsePassword(res);
      // Manejo de respuesta
    } catch (error) {
      // Manejo de error
      console.error('Error al actualizar la contraseña:', error.response.data);
      
    }
  };
  
  const updatePhoto = async (newPhoto) => {
    try {
      const res = await axios.post(`auth/profile/updatePhoto/${localStorage.getItem('id')}`, newPhoto, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + authStore.token
        }
      });
      readPersonDetailsById();
      handleResponse(
        res,
        null,
        t('coreSubject.messageSuccess'),
        t('errors.duplicateAlert'),
        t('errors.passActual')
      );
    } catch (error) {
      console.log(error.response.data.message);

      if (error.request) {
        let messageToShow = error.response.data.message;

        if (messageToShow.includes('Password does not match')) {
          showSwalAlert(null, 'la contraseña no coincide', 'error');
        }
        console.error('Error de solicitud:', error.response.data);
      } else {
        showSwalAlert({
          icon: 'error',
          title: 'Error',
          text: 'Error: Se produjo un error inesperado'
        });
        console.error('Error inesperado:', error.message);
      }
    }
  };

  const handleError = (error) => {
    if (error.response && error.response.status === 401) {
      router.push({ name: 'login', query: { redirect: router.currentRoute.fullPath } });
      authStore.logout();
    } else if (error.response) {
      showSwalAlert(null, error.response.data.message, 'error');
    } else if (error.request) {
      showSwalAlert('Error de solicitud:', error.request, 'error');
    } else {
      showSwalAlert('Error inesperado:', error.message, 'error');
    }
  };

  return {
    readPersonDetailsById,
    updatePerson,
    //readUserLocal,
    updatePassword,
    updatePhoto,
    profile,
    personId
  };
});
