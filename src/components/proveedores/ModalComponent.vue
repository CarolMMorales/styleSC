<template>
    <div class="container p-5">
      <!-- Modal -->
      <div class="modal fade border-primary" :id="modalId" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-primary shadow-lg">
            <div class="modal-header">
              <h5 class="modal-title blue-color-text " id="exampleModalLabel1"> {{ editing ? $t('modals.reasonEdit') : $t('modals.addReason')}}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="cancelChanges()"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="handleSubmit" >
                <div class="row p-2">
                  <div class="mb-3 col-12">
                    <label for="exampleInputName1" class="form-label">{{ $t('prove.name') }}</label>
                    <input type="text" v-model="prove_name" class="form-control" id="exampleInputName1" aria-describedby="NameHelp" />
                    <!-- <div v-if="nameError" class="text-danger">{{ nameError }}</div> -->
                  </div> 
                </div>
                

                <div class="row">
                  <div class="col-md-12 d-flex justify-content-center"> 
                    <button
                    :data-bs-dismiss="editing ? 'modal' : ''"
                   type="submit" 
                   class="btn btn-custom fw-semibold"
                   :disabled="nameError || rea_typ_name == ''" >
                   <span class="btn-content" v-if="!loading">
                   {{ $t('buttons.save') }}
                 </span>
                 <span class="btn-content" v-else>
                     <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                     <span role="status"> {{ $t('errors.loading') }}</span>
                   </span>
                 </button>
                  </div>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import {useProveedorStore} from '../../stores/proveedoresStores';
  import { ref, defineProps, watchEffect } from 'vue';

 // import { useI18n } from 'vue-i18n'
  //const { t } = useI18n()

  const loading = ref(false)
  const prove = useProveedorStore();

const props = defineProps({
  prove_id: Number,
  prove_name: String,
 
  edit: Boolean
})



const prove_name = ref(props.prove_name )

const editing = ref(props.edit)
const submitting = ref(false)
const modalId = ref(editing.value ? 'editModal' : 'createModal')
const closeModal = ref(false)
watchEffect(() => {
  prove_name.value = props.prove_name 

  editing.value = props.edit
  modalId.value = editing.value ? 'editModal' : 'createModal'
})  

const handleSubmit = async () => {
  if (submitting.value) return
  submitting.value = true
  loading.value = true      
  try {
    if (editing.value) {
      const editRea = await prove.updateProveedor(props.prove_id, prove_name.value.toUpperCase())
      prove_name.value = ''
      if (editRea == true) {
        closeModal.value = true
      }
      editing.value = false;
    }else{
        await prove.registerProveedor(prove_name.value.toUpperCase())
        prove_name.value = ''
    
    }       
      } catch (error) {
        console.log('');
      } finally{
      submitting.value = false
      loading.value = false
  }
    }
    const cancelChanges = () => {
    if (!editing.value) {
      clearForm()
    }
  }
const clearForm = () => {
  prove_name.value = ''

}
  </script>
  
  <style lang="scss" scoped>
  .btn-custom {
    background-color: var(--red-color);
    color: #ffffff;
    padding: 0.8rem 3rem;
    font-size: 1.25rem;
  }
  
  .btn-custom:hover {
    background-color: var(----color-background);
    color: var(--red-color);
    border: 2px solid var(--red-color);
  }
  </style>
  