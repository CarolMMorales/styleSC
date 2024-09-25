<template>
  <div class="modal fade border-primary" tabindex="-1" aria-labelledby="exampleModalLabel" id="Create"
    aria-hidden="true">
    <!-- Modal para crear contacto -->
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-primary shadow-lg">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ $t('contacts.create') }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="cancelChanges()"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="row p-2">
              <div class="mb-3 col-12">
                <label for="" class="form-label">{{ $t('contacts.phone') }}</label>
                <input type="text" v-model="con_phone" class="form-control" id="" />
              </div>
              <div class="mb-3 col-12">
                <label for="" class="form-label">{{ $t('contacts.emailPer') }}</label>
                <input type="email" v-model="con_email" class="form-control" id="" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 d-flex justify-content-center">
                <button data-bs-dismiss="modal" :disabled="!isFormValid" type="submit"
                  class="btn btn-custom fw-semibold">
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
// Importar las dependencias necesarias de 'vue'
import { ref, computed } from 'vue'
// Importar store de Contactos
import { useContactsStore } from '../../stores/contactStore'

const closeModal = ref(false)
const loading = ref(false)
const contactStore = useContactsStore() // Inicializar el store

// Definir las propiedades que recibirá el componente para crear el contacto correspondiente
const props = defineProps({
  per_id: Number
})

// Definir las variables reactivas
const con_phone = ref('')
const con_email = ref('')

// Función para verificar si todos los campos tienen valor 
const isFormValid = computed(() => con_phone.value || con_email.value)

// Enviar los datos a la función creada en el store
const handleSubmit = async () => {
  try {
    await contactStore.registerContact(con_phone.value, con_email.value, props.per_id)
    con_phone.value, con_email.value, props.per_id
    clearForm();
    closeModal.value = true;
  } catch {
    console.log('')
  }
  closeModal.value = true;
}

// Función para cancelar los cambios
const cancelChanges = () => {
  clearForm()
  closeModal.value = true
}

// Función para limpiar campos
const clearForm = () => {
  con_phone.value = ''
  con_email.value = ''
}
</script>

<style lang="scss" scoped>
/** Estilos del modal */
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