import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore'
import { showSwalAlert, handleResponse } from '../validation'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2';
export const usePersonStore = defineStore('persons', () => {
  const router = useRouter()
  const authStore = useAuthStore()
  const URL_PERSONS = `/persons`
  const person = ref([]) // CONSTANTE CATE QUE CONTIENE EL ARREGLO PRINCIPAL


  // Funcion para registrar 
  const registerPerson = async (per_name, per_lastname, typ_doc_id, per_document, per_address) => {
    try {
      const res = await axios({
        url: URL_PERSONS,
        method: 'POST',
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
      await readPerson();
      return res.data.per_id;

    } catch (error) {
      if (error.response && error.response.data.errors) {
        if ("Validation Errors:", error.response.data.errors) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrio un error con las validaciones, verifique los caracteres',
            confirmButtonText: 'Aceptar'
          });
        }

      } else {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al crear la persona',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  };



  // Funcion para editar
  const updatePerson = async (per_id, per_name, per_lastname, typ_doc_id, per_document, per_address) => {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token;
      const res = await axios({
        url: `${URL_PERSONS}/${per_id}`,
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
        text: 'Persona actualizada correctamente',
        confirmButtonText: 'Aceptar'
      });
      await readPerson();
      return true;
    } catch (error) {
      handleError(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al actualizar la persona',
        confirmButtonText: 'Aceptar'
      });
      return false;
    }
  };


  //funcion para leer y utilizar datos
  const readPerson = async () => {
    try {
      const res = await axios({
        url: URL_PERSONS,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        }
      })
      person.value = res.data;
      return person.value;

    } catch (error) {
      handleError(error)
    }
  };
  // Función para eliminar 
  const deletePerson = async (per_id) => {
    try {
      const res = await axios({
        url: `${URL_PERSONS}/${per_id}`,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        }
      });
      handleResponse(res, "Persona eliminada");
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Persona eliminada correctamente',
        confirmButtonText: 'Aceptar'
      });
      await readPerson();
      return true;
    } catch (error) {
      handleError(error);
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
  readPerson()
  //retorna las funciones utilizadas para que se puedan exportar
  return {
    registerPerson,
    readPerson,
    updatePerson,
    deletePerson,

    usePersonStore,
    person
  }
})