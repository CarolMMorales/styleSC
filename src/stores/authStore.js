import axios from 'axios'
import CryptoJS from 'crypto-js'
import { useI18n } from 'vue-i18n'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { handleErrorLog, showSwalAlert, handleResponseauth } from '../validation.js'

export const useAuthStore = defineStore('user', () => {
  const { t } = useI18n()
  const router = useRouter()
  const URL_LOGIN = '/api/auth/login' // Actualiza la URL
  const URL_LOGOUT = '/api/auth/logout' // Actualiza la URL

  const token = ref()
  const use_id = ref(null)
  const per_document = ref(null)
  const acc_administrator = ref(null)

  const authUser = ref(null)

  // Función para iniciar sesión
  const access = async (use_mail, use_password) => {
    try {
      const hashedPassword = CryptoJS.SHA256(use_password).toString()
      const res = await axios.post(URL_LOGIN, {
        use_mail,
        use_password: hashedPassword
      })

      const secretKey = 'TuClaveSecreta'

      token.value = res.data.token
      use_id.value = res.data.use_id
      per_document.value = res.data.per_document
      acc_administrator.value = res.data.acc_administrator

      const encryptedId = CryptoJS.AES.encrypt(String(use_id.value), secretKey).toString()
      const encryptedType = CryptoJS.AES.encrypt(String(acc_administrator.value), secretKey).toString()
      const hashedDoct = CryptoJS.SHA256(per_document.value).toString()

      localStorage.setItem('Accept', token.value)
      localStorage.setItem('id', encryptedId)
      localStorage.setItem('type', encryptedType)
      localStorage.setItem('pass', hashedPassword)
      localStorage.setItem('doct', hashedDoct)

      const localStoragePassword = localStorage.getItem('pass')
      const localStorageDocument = localStorage.getItem('doct')
      if (localStoragePassword === localStorageDocument) {
        router.push('/updatePassword')
      } else {
        router.push('/userProfile')
      }
    } catch (error) {
      // Manejo de errores
      if (error.response) {
        let messageToShow = error.response.data.message
        if (messageToShow.includes('Invalid email or password')) {
          messageToShow = t('login.ForgetPassword')
          showSwalAlert(null, messageToShow, 'error')
        } else if (messageToShow.includes('no access')) {
          messageToShow = t('login.AccessDenied')
          showSwalAlert(null, messageToShow, 'warning')
        } else if (messageToShow.includes('login does not exist')) {
          messageToShow = t('login.ForgetPassword')
          showSwalAlert(null, messageToShow, 'warning')
        } else {
          if (messageToShow.includes('This user already has an active session')) {
            showSwalAlert(null, t('login.session'), 'error')
          } else {
            showSwalAlert(null, messageToShow, 'error')
          }
        }
      } else if (error.request) {
        console.error('Error de solicitud:', error.request)
      } else {
        console.error('Error inesperado:', error.message)
      }
    }
  }

  // Función para cerrar la sesión del usuario
  const logout = async () => {
    try {
      await axios({
        url: URL_LOGOUT,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Accept')}`,
        },
        data: {
          use_id: use_id.value
        }
      })
    } catch (error) {
      console.log(error)
    } finally {
      resetStore()
    }
  }

  // Función para restablecer el estado del almacén
  const resetStore = () => {
    token.value = null
    authUser.value = null
    localStorage.removeItem('Accept')
    localStorage.removeItem('id')
    localStorage.removeItem('type')
    localStorage.removeItem('pass')
    localStorage.removeItem('doct')
  }
  const reset = async (newPassword, confirmPassword, code) => {
    try {
      const res = await axios({
        url: `/reset/password`,
        method: 'POST',
        data: {
          new_password: newPassword,
          password_confirmation: confirmPassword,
          res_pas_code: code
        }
      })
      if (res.data.status === false) {
        showSwalAlert(res.data.message, 'error')
      } else if (res.data.status === true) {
        showSwalAlert(res.data.message, 'success')
      }
    } catch (error) {
      handleErrorLog(error)
    }
  }
  const mail = async (email) => {
    try {
      const res = await axios({
        url: `/send/email`,
        method: 'POST',
        data: {
          use_mail: email
        }
      })
  
      handleResponseauth(
        res,
        email,
        'Se envio a tu correo un código de verificción y el link de recuapeación de contraseña ',
        'errors.duplicateAlert',
        'error al enviar el correo intenta de nuevo'
      )
    } catch (error) {
      if (error.request) {
        let messageToShow = error.response.data.message

        if (messageToShow.includes('Attempt to read property "use_id"')) {
          showSwalAlert(null, 'Usuario no encontrado, verifique su correo', 'error')
        }
        console.error('Error de solicitud:', error.response.data)
      } else {
        // Otros tipos de errores
        showSwalAlert({
          icon: 'error',
          title: 'Error',
          text: 'Error: Se produjo un error inesperado'
        })
        console.error('Error inesperado:', error.message)
      }
    }
  }

  return {
    token,
    access,
    logout,
    reset,
    mail
  }
})
