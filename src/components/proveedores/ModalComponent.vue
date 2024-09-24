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
                    v-model="prove_name"
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
                    v-model="prove_lastname"
                    class="form-control"
                    id="exampleInputName1"
                    aria-describedby="NameHelp"
                  />
                </div>
                
                <div class="mb-3 col-12">
                  <label for="exampleInputName1" class="form-label">{{
                    $t('proveedores.prove_address')
                  }}</label>
                  <input
                    type="text"
                    v-model="prove_address"
                    class="form-control"
                    id="exampleInputName1"
                    aria-describedby="NameHelp"
                  />
                </div>
                <div class="mb-3 col-12">
                  <label for="exampleInputName1" class="form-label">{{ $t('proveedores.prove_email') }}</label>
                  <input
                    type="text"
                    v-model="prove_email"
                    class="form-control"
                    id="exampleInputName1"
                    aria-describedby="NameHelp"
                  />
                </div>
                <div class="mb-3 col-12">
                    <label for="exampleInputName1" class="form-label">{{ $t('proveedores.prove_phone') }}</label>
                    <input type="number" v-model="prove_phone" class="form-control" id="exampleInputName1" aria-describedby="NameHelp" />
                   
                  </div> 
              </div>

              <div class="row">
                <div class="col-md-12 d-flex justify-content-center">
                  <button
                    data-bs-dismiss="modal"
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
import { useProveedorStore } from '../../stores/proveedoresStores'

const loading = ref(false)
const prove = useProveedorStore()

const props = defineProps({
  prove_id: Number,
  prove_name: String,
  prove_lastname: String,
  prove_address: String,
  prove_phone: String,
  prove_email: String,
  edit: Boolean
})

const prove_name = ref(props.prove_name)
const prove_lastname = ref(props.prove_lastname)
const prove_address = ref(props.prove_address)
const prove_phone = ref(props.prove_phone)
const prove_email = ref(props.prove_email)

const editing = ref(props.edit)
const submitting = ref(false)
const modalId = ref(editing.value ? 'editModal' : 'createModal')
const closeModal = ref(false)

// Computed para verificar si todos los campos tienen valor
const isFormValid = computed(() => {
  return prove_name.value && prove_lastname.value && prove_address.value && prove_phone.value && prove_email.value
})

watchEffect(() => {
  prove_name.value = props.prove_name
  prove_lastname.value = props.prove_lastname
  prove_address.value = props.prove_address
  prove_phone.value = props.prove_phone
  prove_email.value = props.prove_email
  editing.value = props.edit
  modalId.value = editing.value ? 'editModal' : 'createModal'
})

const handleSubmit = async () => {
  if (submitting.value) return;
  submitting.value = true;
  loading.value = true;
  try {
    if (editing.value) {
      const success = await prove.updateProveedor(
        props.prove_id,
        prove_name.value.toUpperCase(),
        prove_lastname.value.toUpperCase(),
        prove_address.value.toUpperCase(),
        prove_phone.value,
        prove_email.value
      );
      if (success) {
        closeModal.value = true;
      }
      editing.value = false;
    } else {
      await prove.registerProveedor(
        prove_name.value.toUpperCase(),
        prove_lastname.value.toUpperCase(),
        prove_address.value.toUpperCase(),
        prove_phone.value,
        prove_email.value
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
  prove_name.value = ''
  prove_lastname.value = ''
  prove_address.value = ''
  prove_phone.value = ''
  prove_email.value = ''
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
