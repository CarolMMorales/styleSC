import axios from 'axios'
//import CryptoJS from 'crypto-js';
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore'
import {  handleError} from '../validation'
//import { useI18n } from "vue-i18n";

export const useTypDocStore = defineStore('typDoc', () => {
//   const { t } = useI18n();
  
  const authStore = useAuthStore()
  //const secretKey = 'TuClaveSecreta';
  //const user = CryptoJS.AES.decrypt(localStorage.getItem('id'), secretKey).toString(CryptoJS.enc.Utf8);
  const URL_TYPDOC = `/typDocument`
  const typDoc = ref([])


//funcion para leer y utilizar datos
const readTypDoc = async () => {
  try {
    const res = await axios({
      url:URL_TYPDOC,
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
  console.log(typDoc.value);
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