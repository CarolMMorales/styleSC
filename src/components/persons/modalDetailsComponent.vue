<template>
  <div class="modal fade border-primary" tabindex="-1" aria-labelledby="exampleModalLabel" id="verModal"
    aria-hidden="true">
    <!-- Modal para mostrar los detalles de la persona -->
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-primary shadow-lg">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ $t('profile.personalData') }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="cancelChanges()"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="name" class="form-label">{{ $t('profile.name') }}</label>
                <input type="text" v-model="per_name" class="form-control" id="name" readonly />
              </div>
              <div class="col-md-6 mb-3">
                <label for="lastname" class="form-label">{{ $t('profile.lastname') }}</label>
                <input type="text" v-model="per_lastname" class="form-control" id="lastname" readonly />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="email" class="form-label">{{ $t('profile.email') }}</label>
                <input type="text" v-model="use_email" class="form-control" id="email" readonly />
              </div>
              <div class="col-md-6 mb-3">
                <label for="rol" class="form-label">{{ $t('profile.rol') }}</label>
                <select v-model="rol_id" class="form-select" id="rol" disabled>
                  <option v-for="(Item, index) in filteredRol" :key="index" :value="Item.rol_id">
                    {{ Item.rol_name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="doctyp" class="form-label">{{ $t('profile.doctype') }}</label>
                <select v-model="typ_doc_id" class="form-select" id="doctyp" disabled>
                  <option v-for="(Item, index) in filteredTypDoc" :key="index" :value="Item.typ_doc_id">
                    {{ Item.typ_doc_name }}
                  </option>
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label for="document" class="form-label">{{ $t('profile.document') }}</label>
                <input type="text" v-model="per_document" class="form-control" id="document" readonly />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 mb-3">
                <label for="address" class="form-label">{{ $t('profile.adress') }}</label>
                <input type="text" v-model="per_address" class="form-control" id="address" readonly />
              </div>
            </div>
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
import { ref, watchEffect, computed, onMounted, watch } from 'vue'
import { useTypDocStore } from '../../stores/typDocumentStore'
import { useRolStore } from "../../stores/rolStore";
import { useContactsStore } from '../../stores/contactStore'
import contactsModal from '../../../src/components/contact/ModalComponent.vue'
import { usePersonStore } from '../../stores/personsStore';
import createContactsModal from '../../../src/components/contact/CreateModalComponent.vue'

// Inicializar stores
const contactStore = useContactsStore()
const personStore = usePersonStore()
const closeModal = ref(false)
const rolStore = useRolStore();
const typDocStore = useTypDocStore()

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
const per_name = ref(props.per_name)
const per_lastname = ref(props.per_lastname)
const typ_doc_id = ref(props.typ_doc_id)
const per_document = ref(props.per_document)
const per_address = ref(props.per_address)
const use_email = ref(props.use_email)
const rol_id = ref(props.rol_id)
const editing = ref(false)

// Función para filtrar los datos del store
const filteredRol = computed(() => {
  return rolStore.rol.filter((item) => item.rol_name != 0);
});

const filteredTypDoc = computed(() => {
  return typDocStore.typDoc.filter((item) => item.typ_doc_name != 0)
})

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
  personStore.readPerson()
});

// Función para cargar los contactos correspondientes al id de la persona
watch(() => props.per_id, (newPerId) => {
  if (newPerId) {
    contactStore.readContactsPersons(newPerId)
  }
}, { immediate: true })

// Función 'watchEffect' para mostrar los campos en el modal cuando se está editando
watchEffect(() => {
  per_name.value = props.per_name
  per_lastname.value = props.per_lastname
  typ_doc_id.value = props.typ_doc_id
  per_document.value = props.per_document
  per_address.value = props.per_address
  use_email.value = props.use_email
  rol_id.value = props.rol_id
})

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