
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
  
  // const readUserLocal = () => {
  //   const encryptedId = localStorage.getItem('id');
  //   if (!encryptedId) {
  //     console.error('No se encontró el ID en localStorage.');
  //     return null;
  //   }
    
  //   try {
  //     console.log('id: ' + encryptedId+ ' secret: '+secretKey);
  //     const decryptedBytes = CryptoJS.AES.decrypt(encryptedId, secretKey);
  //     console.log('decryptedBytes: '+decryptedBytes);
      
  //     // const decryptedId = decryptedBytes.toString(CryptoJS.enc.Utf8);
      
  //     console.log('decryptedId: '+decryptedId);
  //     const decryptedId = encryptedId;//decryptedBytes.toString(CryptoJS.enc.Utf8);

  //     if (!decryptedId) {
  //       console.error('No se pudo desencriptar el ID.');
  //       return null;
  //     }

  //     return decryptedId;
  //   } catch (error) {
  //     console.error('Error al desencriptar el ID:', error);
  //     return null;
  //   }
  // };

  const URL_PASSWORD = `/profile/change-password`;
  const profile = ref([]);


  

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
      
      console.log('ID del usuario:', userId);
      console.log('Detalles del perfil:', profile.value);
    } catch (error) {
      handleError(error);
    }
  };
  

  const updatePassword = async (currentPassword, newPassword, confirmPassword) => {
    try {
      const res = await axios({
        url: `${URL_PASSWORD}/${localStorage.getItem('id')}`,
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        },
        data: {
          use_password: currentPassword,
          new_password: newPassword,
          password_confirmation: confirmPassword
        }
      });

      handleResponsePassword(
        res,
        null,
        t('errors.sameNewAsOld'),
        t('errors.passwordSuccess'),
        t('errors.passwordWrong')
      );

      return res.data.status;
    } catch (error) {
      handleResponsePassword(
        { data: { status: false, message: [error.message] } },
        error,
        null,
        t('errors.sameNewAsOld'),
        t('errors.passwordSuccess'),
        t('errors.passwordWrong')
      );
    }
  };

  const updatePhoto = async (newPhoto) => {
    try {
      const res = await axios.post(`/update/photo/${localStorage.getItem('id')}`, newPhoto, {
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
    //readUserLocal,
    updatePassword,
    updatePhoto,
    profile
  };
});
