<template>
  <div class="modal fade border-primary" tabindex="-1" aria-labelledby="exampleModalLabel" id="verModal"
    aria-hidden="true">
    <!-- Modal para mostrar los detalles de la persona -->
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-primary shadow-lg">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ $t('contacts.contacts') }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="cancelChanges()"></button>
        </div>
        <div class="modal-body">
          <form>
            
              
            <div class="row">
              <div class="d-flex justify-content-end m-2">
                <button @click="prepareCreateForm(Item)" type="button" class="btn btn-outline-primary"
                  data-bs-toggle="modal" data-bs-target="#Create">
                  <i class="bi bi-plus-square"></i> {{ $t('contacts.create') }}
                </button>
              </div>
              <div class="col-md-12">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>{{ $t('profile.phone') }}</th>
                      <th>{{ $t('profile.email') }}</th>
                      <th>{{ $t('buttons.edit') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="contact in contactStore.contact" :key="contact.con_id">
                      <td>{{ contact.con_phone }}</td>
                      <td>{{ contact.con_email }}</td>
                      <td>
                        <button @click="prepareEditContact(contact)" type="button" class="btn btn-outline-success"
                          data-bs-toggle="modal" data-bs-target="#Editar">
                          <i class="ri-pencil-fill"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal para editar contactos -->
  <contactsModal :con_id="parseInt(con_id)" :con_phone="con_phone" :con_email="con_email" :edit="true"></contactsModal>
  <!-- Modal para crear contactos-->
  <createContactsModal :per_id="parseInt(per_id)"></createContactsModal>
</template>

<script setup>
// Importar dependencias, stores y otros modales
import { ref, onMounted, watch } from 'vue'
import { useContactsStore } from '../../stores/contactStore'
import contactsModal from '../../../src/components/contact/ModalComponent.vue'
import { usePersonStore } from '../../stores/personsStore';
import createContactsModal from '../../../src/components/contact/CreateModalComponent.vue'

// Inicializar stores
const contactStore = useContactsStore()
const personStore = usePersonStore()
const closeModal = ref(false)


// Definir las propiedades que recibirá el componente para mostrar los detalles de la persona correspondiente
const props = defineProps({
  per_id: Number,
  per_name: String,
  per_lastname: String,
  typ_doc_id: Number,
  per_document: String,
  per_address: String,
  use_email: String,
  rol_id: Number
})

// Definir variables reactivas
const con_id = ref('')
const con_phone = ref('')
const con_email = ref('')
const editing = ref(false)


// Función para enviar los datos correspondientes al modal de creación
const prepareCreateForm = () => {
  props.per_id
}

// Función para enviar los datos correspondientes al modal de edición
const prepareEditContact = (contact) => {
  con_id.value = contact.con_id
  con_phone.value = contact.con_phone
  con_email.value = contact.con_email
  editing.value = true
}

// Función para cargar los datos de los stores en el componente
onMounted(() => {
  if (props.per_id) {
    contactStore.readContactsPersons(props.per_id);
  }
  personStore.readPersons()
});

// Función para cargar los contactos correspondientes al id de la persona
watch(() => props.per_id, (newPerId) => {
  if (newPerId) {
    contactStore.readContactsPersons(newPerId)
  }
}, { immediate: true })

// Función 'watchEffect' para mostrar los campos en el modal cuando se está editando

// Función para cancelar los cambios
const cancelChanges = () => {
  closeModal.value = true
}
</script>

<style scoped>
/** Estilos del modal */
.btn-custom {
  background-color: var(--purple-color);
  color: #ffffff;
  padding: 0.8rem 3rem;
  font-size: 1.25rem;
}

.btn-custom:hover {
  background-color: var(--color-background);
  color: var(--purple-color);
  border: 2px solid var(--purple-color);
}
</style>