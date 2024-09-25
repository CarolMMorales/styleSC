import axios from 'axios';
import { useI18n } from 'vue-i18n';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { showSwalAlert, handleResponse } from '../validation.js';
export const useAuthStore = defineStore('user', () => {
  const { t } = useI18n();
  const router = useRouter();
  const URL_LOGIN = '/auth/login';
  const URL_LOGOUT = '/auth/logout';

  // Recuperar token y ID del usuario desde localStorage al cargar la aplicación
  const token = ref(localStorage.getItem('Accept') || null);
  const use_id = ref(localStorage.getItem('id') || null);
  const rol_id = ref(localStorage.getItem('rol_id') || null);
  const authUser = ref(null);
  const persons = ref([])
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
      rol_id.value = res.data.rol_id;
      // Guardar el token y el ID del usuario en localStorage
      localStorage.setItem('Accept', token.value);
      localStorage.setItem('id', use_id.value);
      localStorage.setItem('rol_id', rol_id.value);
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
  //función para registrar un nuevo usuario
  const registerUser = async (per_id, use_email, use_password, rol_id) => {
    try {
      const res = await axios({
        url: `auth/register`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Accept')}`
        },
        data: {
          per_id: per_id,
          use_email: use_email,
          use_password: use_password,
          rol_id: rol_id
        }
      });
      handleResponse(res);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Usuario creado correctamente',
        confirmButtonText: 'Aceptar'
      });
      return true;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al crear el usuario',
        confirmButtonText: 'Aceptar'
      });
    }
  };
  //Función para editar usuario 
  const updateUser = async (use_id, use_email, use_password, rol_id) => {
    try {
      const res = await axios({
        url: `auth/update/${use_id}`,
        method: 'PUT',
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
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Usuario actualizado correctamente',
        confirmButtonText: 'Aceptar'
      });
      return true;
    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al actualizar el usuario',
        confirmButtonText: 'Aceptar'
      });
    }
  };
  //funcion para leer todas las personas 
  const readPersons = async () => {
    try {
      const res = await axios({
        url: `personsUser`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Accept')}`
        }
      })
      persons.value = res.data;
      return persons.value;

    } catch (error) {
      console.log('')
    }
  };
  //funció para eliminar el usuario
  const deleteUser = async (use_id) => {
    try {
      const res = await axios({
        url: `auth/delete/${use_id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Accept')}`
        },

      });
      handleResponse(res, "usuario eliminado");
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Usuario eliminado correctamente',
        confirmButtonText: 'Aceptar'
      });
      return true;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al eliminar el usuario',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  // Función para restablecer el estado del store
  const resetStore = () => {
    token.value = null;
    authUser.value = null;
    use_id.value = null;
    rol_id.value = null;
    localStorage.removeItem('Accept');
    localStorage.removeItem('id');
    localStorage.removeItem('rol_id');

    isAuthenticated.value = false;
    router.push('/login');
  };

  readPersons()
  //retornan las funciones y los arreglos utilizados para que se puedan expotar y utilizar en otra tiendas
  return {
    token,
    use_id,
    rol_id,
    authUser,
    isAuthenticated,
    persons,
    access,
    readPersons,
    deleteUser,
    registerUser,
    updateUser,
    logout,
  };
});