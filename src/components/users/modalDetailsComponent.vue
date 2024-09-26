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

          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
// Importar dependencias, stores y otros modales
import { ref, watchEffect, computed, onMounted } from 'vue'
import { useTypDocStore } from '../../stores/typDocumentStore'
import { useRolStore } from "../../stores/rolStore";
import { useAuthStore } from '../../stores/authStore';

// Inicializar stores

const authStore = useAuthStore()
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

const per_name = ref(props.per_name)
const per_lastname = ref(props.per_lastname)
const typ_doc_id = ref(props.typ_doc_id)
const per_document = ref(props.per_document)
const per_address = ref(props.per_address)
const use_email = ref(props.use_email)
const rol_id = ref(props.rol_id)


// Función para filtrar los datos del store
const filteredRol = computed(() => {
  return rolStore.rol.filter((item) => item.rol_name != 0);
});

const filteredTypDoc = computed(() => {
  return typDocStore.typDoc.filter((item) => item.typ_doc_name != 0)
})



// Función para cargar los datos de los stores en el componente
onMounted(() => {

  authStore.readPerson()
});


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