import axios from 'axios';
import { useI18n } from 'vue-i18n';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { handleErrorLog, showSwalAlert, handleResponseauth, handleResponse } from '../validation.js';

export const useAuthStore = defineStore('user', () => {
  const { t } = useI18n();
  const router = useRouter();
  const URL_LOGIN = '/auth/login';
  const URL_LOGOUT = '/auth/logout';

  // Recuperar token y ID del usuario desde localStorage al cargar la aplicación
  const token = ref(localStorage.getItem('Accept') || null);
  const use_id = ref(localStorage.getItem('id') || null);
  
  const authUser = ref(null);

  // Variable que verifica si el usuario está autenticado
  const isAuthenticated = ref(!!token.value);

  // Función para iniciar sesión
  const access = async (use_email, use_password) => {
    try {
      if (!use_email || !use_password) {
        showSwalAlert(null, 'Email y contraseña son obligatorios', 'error');
        return;
      }

      const res = await axios.post(URL_LOGIN, {
        use_email,
        use_password,
      });

      token.value = res.data.token;
      use_id.value = res.data.use_id;

      // Guardar el token y el ID del usuario en localStorage
      localStorage.setItem('Accept', token.value);
      localStorage.setItem('id', use_id.value);
      
      // Marcar al usuario como autenticado
      isAuthenticated.value = true;

      // Redirigir al perfil del usuario
      router.push('/userProfile');
    } catch (error) {
      if (error.response) {
        let messageToShow = error.response.data.message || '';
        if (messageToShow.includes('Invalid email or password')) {
          messageToShow = t('login.ForgetPassword');
          showSwalAlert(null, messageToShow, 'error');
        } else if (messageToShow.includes('no access')) {
          messageToShow = t('login.AccessDenied');
          showSwalAlert(null, messageToShow, 'warning');
        } else {
          showSwalAlert(null, messageToShow || 'Error desconocido', 'error');
        }
      } else if (error.request) {
        console.error('Error de solicitud:', error.request);
        showSwalAlert(null, 'Request error', 'error');
      } else {
        console.error('Error inesperado:', error.message);
        showSwalAlert(null, 'Unexpected error', 'error');
      }
    }
  };

  // Función para cerrar la sesión del usuario
  const logout = async () => {
    try {
      await axios.post(URL_LOGOUT, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Accept')}`,
        },
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      resetStore();
    }
  };

  const registerUser = async (use_email, use_password, rol_id) => {
    try {
      const res = await axios({
        url: `auth/register`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Accept')}`
        },
        data: {
          use_email: use_email,
          use_password: use_password,
          rol_id: rol_id
        }
      });
      handleResponse(res);
      return true;
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  // Función para restablecer el estado del store
  const resetStore = () => {
    token.value = null;
    authUser.value = null;
    use_id.value = null;
    localStorage.removeItem('Accept');
    localStorage.removeItem('id');
    

    isAuthenticated.value = false;
    router.push('/login');
  };

  // Función para restablecer la contraseña
  const reset = async (newPassword, confirmPassword, code) => {
    try {
      const res = await axios.post(`/reset/password`, {
        new_password: newPassword,
        password_confirmation: confirmPassword,
        res_pas_code: code,
      });

      if (res.data.status === false) {
        showSwalAlert(res.data.message, 'error');
      } else if (res.data.status === true) {
        showSwalAlert(res.data.message, 'success');
      }
    } catch (error) {
      handleErrorLog(error);
    }
  };

  // Función para enviar correo de recuperación de contraseña
  const mail = async (email) => {
    try {
      const res = await axios.post(`/send/email`, {
        use_mail: email,
      });

      handleResponseauth(
        res,
        email,
        'Se envió a tu correo un código de verificación y el enlace de recuperación de contraseña',
        'errors.duplicateAlert',
        'Error al enviar el correo, intenta de nuevo'
      );
    } catch (error) {
      if (error.response) {
        let messageToShow = error.response.data.message;
        if (messageToShow.includes('Attempt to read property "use_id"')) {
          showSwalAlert(null, 'Usuario no encontrado, verifica tu correo', 'error');
        }
        console.error('Error de solicitud:', error.response.data);
      } else {
        showSwalAlert({
          icon: 'error',
          title: 'Error',
          text: 'Error: Se produjo un error inesperado',
        });
        console.error('Error inesperado:', error.message);
      }
    }
  };

  return {
    token,
    use_id,
    authUser,
    isAuthenticated,
    access,
    registerUser,
    logout,
    reset,
    mail,
  };
});