<template>
    <div
      class="modal fade border-primary"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      id="EditPerfil"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-primary shadow-lg">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ $t('profile.editPerfil') }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="cancelChanges()"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="row p-2">
                <div class="mb-3 col-12">
                  <label for="name" class="form-label">{{ $t('profile.name') }}</label>
                  <input type="text" v-model="per_name" class="form-control" id="name" />
                </div>
                <div class="mb-3 col-12">
                  <label for="lastname" class="form-label">{{ $t('profile.lastname') }}</label>
                  <input type="text" v-model="per_lastname" class="form-control" id="lastname" />
                </div>
                <div class="mb-3 col-12">
                  <label for="doctyp" class="form-label">{{ $t('profile.doctype') }}</label>
                  <input type="text" v-model="typ_doc_id" class="form-control" id="doctyp" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 d-flex justify-content-center">
                  <button  type="submit" data-bs-dismiss="modal" class="btn btn-custom fw-semibold">
                    <span v-if="!loading">{{ $t('buttons.save') }}</span>
                    <span v-else>
                      <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <span role="status">{{ $t('errors.loading') }}</span>
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue'
  import { useContactsStore } from '../../stores/contactStore'
  
  const closeModal = ref(false)
  const loading = ref(false)
  const contactStore = useContactsStore()
  const props = defineProps({
      con_id: Number,
      con_email: String,
      con_phone: String,
      edit:Boolean
    })
  //const con_id = ref(props.con_id)
  const con_phone = ref(props.con_phone)
  const con_email = ref(props.con_email)
  const editing = ref(props.edit)
  // const isFormValid = computed(() => con_phone.value || con_email.value)
  
  const handleSubmit = async () => {
    try {
      if (editing.value) {
        const success = await contactStore.updateContact(
          props.con_id,
          con_phone.value,
          con_email.value,
      )
        if (success) {
          closeModal.value = true;
        }
        editing.value = false;
      }
    } catch {
      console.log('error')
      //console.log(con_phone.value, con_email.value, props.per_id)
    }finally{
      closeModal.value = true;
    }
    
  }
  
  watchEffect(() => {
    con_phone.value = props.con_phone
    con_email.value = props.con_email
    editing.value = props.edit
    
  })
  
  const cancelChanges = () => {
    clearForm()
    closeModal.value = true
  }
  
  const clearForm = () => {
    con_phone.value = ''
    con_email.value = ''
  }
  </script>
  