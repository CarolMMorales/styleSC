import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore'
import { handleError } from '../validation'
export const useTypDocStore = defineStore('typDoc', () => {
  const authStore = useAuthStore()
  const URL_TYPDOC = `/typDocument`
  const typDoc = ref([])

  //funcion para leer y utilizar datos
  const readTypDoc = async () => {
    try {
      const res = await axios({
        url: URL_TYPDOC,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + authStore.token
        }
      })
      typDoc.value = res.data.map((item) => {
        return {
          typ_doc_id: item.typ_doc_id,
          typ_doc_name: item.typ_doc_name,

        };

      });
      return typDoc.value;

    } catch (error) {
      handleError(error)
    }
  };

  readTypDoc()
  return {
    readTypDoc,
    useTypDocStore,
    typDoc
  }
})