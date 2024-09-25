import axios from 'axios'
import CryptoJS from 'crypto-js';
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore'
import { showSwalAlert, handleResponse } from '../validation'
import { useProfileStore } from './profileStore';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router'
export const useContactsStore = defineStore('contacts', () => {
  const router = useRouter()
  const authStore = useAuthStore()
  const profileStore = useProfileStore();
  const secretKey = 'TuClaveSecreta';
  const user = CryptoJS.AES.decrypt(localStorage.getItem('id'), secretKey).toString(CryptoJS.enc.Utf8);
  const URL_CONTACTS = `/contacts`
  const contact = ref([])
  const personId = ref(null);

  // Funcion para registrar 
  const registerContact = async (con_phone, con_email, per_id) => {
    try {
      const res = await axios({
        url: URL_CONTACTS,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        },
        data: {
          con_phone: con_phone,
          con_email: con_email,
          per_id: per_id,
          use_id: user
        }
      });
      handleResponse(res, per_id);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Contacto creado correctamente',
        confirmButtonText: 'Aceptar'
      });
      await readContactsByPersonId();  // Asegúrate de que esta llamada esté presente
      return true;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al crear el contacto',
        confirmButtonText: 'Aceptar'
      });
    }
  };



  // Funcion para editar
  const updateContact = async (con_id, new_con_phone, new_con_email, new_per_id) => {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token;
      const res = await axios({
        url: `${URL_CONTACTS}/${con_id}`,
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        },
        data: {
          con_phone: new_con_phone,
          con_email: new_con_email,
          per_id: new_per_id,
          use_id: user
        }
      });
      handleResponse(res, new_con_phone, new_con_email);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Contacto actualizado correctamente',
        confirmButtonText: 'Aceptar'
      });
      await readContactsByPersonId();
      await readContactsPersons();
      return true;
    } catch (error) {
      console.log('')
      return false;
    }
  };



  const readContactsByPersonId = async () => {
    personId.value = profileStore.personId;  // Usa el ID de la persona del ProfileStore

    if (!personId.value) {
      console.log('');
      return;
    }

    try {
      const res = await axios({
        url: `contacts/person/${personId.value}`,  // Usa el ID de la persona
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        }
      });
      contact.value = res.data.map((item) => {
        return {
          con_id: item.con_id,
          per_id: item.per_id,
          con_phone: item.con_phone,
          con_email: item.con_email
        };
      });
    } catch (error) {
      handleError(error);
    }
  };

  const readContactsPersons = async (per_id) => {

    try {
      const res = await axios({
        url: `contacts/person/${per_id}`,  // Usa el ID de la persona
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        }
      });
      contact.value = res.data.map((item) => {
        return {
          con_id: item.con_id,
          per_id: item.per_id,
          con_phone: item.con_phone,
          con_email: item.con_email
        };
      });
    } catch (error) {
      console.log('')
    }
  };

  // Función para eliminar 
  const deleteContact = async (con_id) => {
    try {
      const res = await axios({
        url: `${URL_CONTACTS}/${con_id}`,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        }
      });
      handleResponse(res, "contacto eliminado");

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Contacto eliminado correctamente',
        confirmButtonText: 'Aceptar'
      });
      await readContactsByPersonId();
      await readContactsPersons();
      return true;
    } catch (error) {
      handleError(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al eliminar el contacto',
        confirmButtonText: 'Aceptar'
      });
      return false;
    }
  };


//Funcion para errores
  const handleError = (error) => {
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
  readContactsPersons();
  readContactsByPersonId()
   //retorna las funciones utilizadas para que se puedan exportar
  return {
    registerContact,
    readContactsByPersonId,
    updateContact,
    deleteContact,
    readContactsPersons,
    useContactsStore,
    contact
  }
})