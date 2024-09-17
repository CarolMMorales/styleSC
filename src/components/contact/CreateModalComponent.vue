<template>
    <div class="container p-5">
      <!-- Modal -->
      <div
        class="modal fade border-primary"
        id="CrearContactos"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-primary shadow-lg">
            <div class="modal-header">
              <h5 class="modal-title blue-color-text" id="exampleModalLabel1">
                {{ $t('contact.add') }}
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
                    <label for="exampleInputName1" class="form-label">
                      {{ $t('contact.phone') }}
                    </label>
                    <input
                      type="text"
                      v-model="con_phone"
                      class="form-control"
                      id="exampleInputName1"
                      aria-describedby="NameHelp"
                    />
                  </div>
                  <div class="mb-3 col-12">
                    <label for="exampleInputEmail1" class="form-label">
                      {{ $t('contact.emailPer') }}
                    </label>
                    <input
                      type="email"
                      v-model="con_email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="EmailHelp"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 d-flex justify-content-center">
                    <button
                      :data-bs-dismiss="loading ? '' : 'modal'"
                      type="submit"
                      class="btn btn-custom fw-semibold"
                      :disabled="!isFormValid || loading"
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
  import { ref, computed } from 'vue'
  import { useContactsStore } from '../../stores/contactStore'
  
  const loading = ref(false)
  const contact = useContactsStore()
  
//   const props = defineProps({
//     // No se necesita 'edit' ni 'con_id' ya que solo vamos a crear contactos
//   })
  
  const con_phone = ref('')
  const con_email = ref('')
  
  const isFormValid = computed(() => {
    return con_phone.value && con_email.value
  })
  
  const handleSubmit = async () => {
    if (loading.value) return;
    loading.value = true;
    try {
      await contact.registerContact(
        con_phone.value,
        con_email.value
      );
      clearForm();
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }
  
  const cancelChanges = () => {
    clearForm();
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
  