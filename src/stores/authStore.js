import axios from 'axios';
import { useI18n } from 'vue-i18n';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Importar useRouter

import { handleErrorLog, showSwalAlert, handleResponseauth } from '../validation.js';

export const useAuthStore = defineStore('user', () => {
  const { t } = useI18n();
  const router = useRouter(); // Inicializar useRouter
  const URL_LOGIN = '/auth/login'; // Actualiza la URL si es necesario
  const URL_LOGOUT = '/auth/logout'; // Asegúrate de que la URL esté correcta

  const token = ref(null);
  const use_id = ref(null);
  const authUser = ref(null);

  // Función para iniciar sesión
  const access = async (use_email, use_password) => {
    try {
        if (!use_email || !use_password) {
            showSwalAlert(null, 'Email y contraseña son obligatorios', 'error');
            return;
        }

        const res = await axios.post(URL_LOGIN, {
            use_email,
            use_password, // No encriptes la contraseña aquí
        });

        token.value = res.data.token;
        use_id.value = res.data.use_id;

        localStorage.setItem('Accept', token.value);
        localStorage.setItem('id', use_id.value);

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

  // Función para restablecer el estado del almacén
  const resetStore = () => {
    token.value = null;
    authUser.value = null;
    use_id.value = null;
    localStorage.removeItem('Accept');
    localStorage.removeItem('id');
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
        // Otros tipos de errores
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
    access,
    logout,
    reset,
    mail,
  };
});