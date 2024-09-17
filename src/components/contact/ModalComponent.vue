<template>
  <div class="container p-5">
    <!-- Modal -->
    <div
      class="modal fade border-primary"
      :id="modalId"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-primary shadow-lg">
          <div class="modal-header">
            <h5 class="modal-title blue-color-text" id="exampleModalLabel1">
              {{ editing ? $t('proveedores.edit') : $t('proveedores.add') }}
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
                  <label for="exampleInputName1" class="form-label">{{ $t('proveedores.prove_name') }}</label>
                  <input
                    type="text"
                    v-model="con_phone"
                    class="form-control"
                    id="exampleInputName1"
                    aria-describedby="NameHelp"
                  />
                </div>
                <div class="mb-3 col-12">
                  <label for="exampleInputName1" class="form-label">{{
                    $t('proveedores.prove_lastname')
                  }}</label>
                  <input
                    type="text"
                    v-model="con_email"
                    class="form-control"
                    id="exampleInputName1"
                    aria-describedby="NameHelp"
                  />
                </div>
                
                </div>
              <div class="row">
                <div class="col-md-12 d-flex justify-content-center">
                  <button
                    :data-bs-dismiss="editing ? 'modal' : ''"
                    type="submit"
                    class="btn btn-custom fw-semibold"
                    :disabled="!isFormValid"
                  >
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
import { ref, computed, defineProps, watchEffect } from 'vue'
import { useContactsStore } from '../../stores/contactStore'

const loading = ref(false)
const contact = useContactsStore()

const props = defineProps({
  con_id: Number,
  con_phone: String,
  con_email: String,
  edit: Boolean
})


const con_phone = ref(props.con_phone)
const con_email = ref(props.con_email)

const editing = ref(props.edit)
const submitting = ref(false)
const modalId = ref(editing.value ? 'EditarContactos' : 'CrearContactos')
const closeModal = ref(false)

// Computed para verificar si todos los campos tienen valor
const isFormValid = computed(() => {
  return con_phone.value && con_email.value 
})

watchEffect(() => {
  con_phone.value = props.con_phone
  con_email.value = props.con_email
  editing.value = props.edit
  modalId.value = editing.value ? 'EditarContactos' : 'CrearContactos'
})

const handleSubmit = async () => {
  if (submitting.value) return;
  submitting.value = true;
  loading.value = true;
  try {
    if (editing.value) {
      const success = await contact.updateContact(
        props.con_id,
        con_phone.value,
        con_email.value
      );
      if (success) {
        closeModal.value = true;
      }
      editing.value = false;
    } else {
      await contact.registerContact(
        
        con_phone.value,
        con_email.value
      );

    }
    clearForm();
  } catch (error) {
    console.log(error);
  } finally {
    submitting.value = false;
    loading.value = false;
    closeModal.value = true;
  }
};


const cancelChanges = () => {
  if (!editing.value) {
    clearForm()
    closeModal.value = true;

  }
}

const clearForm = () => {
  con_phone.value = ''
  con_email.value = ''
}
</script>




<style lang="scss" scoped>
.btn-custom {
  background-color: var(--purple-color);
  color: #ffffff;
  padding: 0.8rem 3rem;
  font-size: 1.25rem;
}

.btn-custom:hover {
  background-color: var(----color-background);
  color: var(--purple-color);
  border: 2px solid var(--purple-color);
}
</style>
