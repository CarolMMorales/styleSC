
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore.js'
import { useRouter } from 'vue-router'
import { showSwalAlert, handleResponse } from '../validation.js'
import Swal from 'sweetalert2';

export const useProfileStore = defineStore('profile', () => {
  const router = useRouter();
  const authStore = useAuthStore();
  const profile = ref([]);
  const personId = ref(null);
  const readPersonDetailsById = async () => {
    const userId = localStorage.getItem('id');//readUserLocal();

    if (!userId) {
      console.error('ID del usuario no disponible. No se puede obtener los detalles de la persona.');
      return;
    }
    //funcion para mostrar el perfil
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
  // Funcion para editar los datos desde el peril

  const updatePerson = async (per_id, per_name, per_lastname, typ_doc_id, per_document, per_address) => {
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
        }
      });
      handleResponse(res, per_name);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Perfil actualizado correctamente',
        confirmButtonText: 'Aceptar'
      });
      await readPersonDetailsById();
      return true;
    } catch (error) {
      handleError(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al actualizar los datos del perfil',
        confirmButtonText: 'Aceptar'
      });
      return false;
    }
  };

  //Función para editar/cambiar de contraseña
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
      handleResponse(res)
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Contraseña actualizada correctamente',
        confirmButtonText: 'Aceptar'
      });
      // Manejo de respuesta
    } catch (error) {
      // Manejo de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrio un error con el canbio de contraseña, revise si la contraseña actual es correcta o es la misma por la que la esta cambiando ',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  //Funcion para errores
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
  readPersonDetailsById()
  //retorna las funciones utilizadas para que se puedan exportar
  return {
    readPersonDetailsById,
    updatePerson,
    updatePassword,
    profile,
    personId
  };
});
