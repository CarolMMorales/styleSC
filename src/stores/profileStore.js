import axios from 'axios'
import CryptoJS from 'crypto-js'
import { defineStore } from 'pinia'
import { ref  } from 'vue'
import { useI18n } from "vue-i18n";
import { useAuthStore } from './authStore.js'
import { useRouter } from 'vue-router'
import { showSwalAlert, handleResponsePassword, handleResponse } from '../validations.js'


export const useProfileStore = defineStore('profile', () => {
  const router = useRouter()
  const { t } = useI18n();
  const secretKey = 'TuClaveSecreta'
  const authStore = useAuthStore()
  const user = CryptoJS.AES.decrypt(localStorage.getItem('id'), secretKey).toString( CryptoJS.enc.Utf8 )
  const readUserLocal = ()=>{
    const user = CryptoJS.AES.decrypt(localStorage.getItem('id'), secretKey).toString( CryptoJS.enc.Utf8 )
    return user
  
   }

readUserLocal();
  const URL_PASSWORD = `/update/password/`
  const profile = ref([])

  const readPersonDetailsById = async () => {
    try {
      const res = await axios({
        url: `/profile/6/${readUserLocal()}`,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        }

      })  
      profile.value = res.data.data
      } catch (error) {
        handleError(error)
      }
    }
    
    const updatePassword = async (currentPassword, newPassword, confirmPassword) => {
      try {
        const res = await axios({
          url: `${URL_PASSWORD}6/${user}`,
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + authStore.token
          },
          data: {
            use_password: currentPassword,
            new_password: newPassword,
            password_confirmation: confirmPassword,
            
          }
        });
       
          handleResponsePassword(
            res,
            null,
            t("errors.sameNewAsOld"),
            t("errors.passwordSuccess"),
            t("errors.passwordWrong"),
          )

          const newStatus = res.data.status
      
          return newStatus;
      } catch (error) {
        // Manejar errores de red u otras excepciones
        handleResponsePassword(
          { data: { status: false, message: [error.message] } },
          error,
          null,
          t("errors.sameNewAsOld"),
            t("errors.passwordSuccess"),
            t("errors.passwordWrong"),

        );
      }
    }

    const updatePhoto= async (newPhoto) => {
      try {
        const res = await axios.post(`/update/photo/${readUserLocal()}`, newPhoto, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + authStore.token
          }
        });
        readPersonDetailsById()
        handleResponse(
          res,
          null,
          t('coreSubject.messageSuccess'),
          t('errors.duplicateAlert'),
          t('errors.passActual')
        )
        
      
      } catch (error) {
        console.log(error.response.data.message)
        
        if (error.request) {
          let messageToShow  = error.response.data.message
          
          if (messageToShow.includes('Password does not match')) {
            showSwalAlert(null, "la contraseña no coincide", 'error');
            
          } 
          console.error('Error de solicitud:', error.response.data);
        } else {
          // Otros tipos de errores
          showSwalAlert({
            icon: 'error',
            title: 'Error',
            text: 'Error: Se produjo un error inesperado'
          });
          console.error('Error inesperado:', error.message);
        }
      }
    }
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
  return {
    readPersonDetailsById,
    updatePassword,
    updatePhoto,
    profile
  }

})
