<template>
  <div class="modal fade border-primary" tabindex="-1" aria-labelledby="exampleModalLabel" id="EditPerfil"
    aria-hidden="true">
    <!-- Componente para editar perfil -->
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-primary shadow-lg">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ $t('profile.editPerfil') }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="cancelChanges()"></button>
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
                <select v-model="typ_doc_id" class="form-select" id="doctyp" aria-describedby="NameHelp">
                  <option v-for="(Item, index) in filteredTypDoc" :key="index" :value="Item.typ_doc_id">
                    {{ Item.typ_doc_name }}
                  </option>
                </select>
              </div>
              <div class="mb-3 col-12">
                <label for="document" class="form-label">{{ $t('profile.document') }}</label>
                <input type="text" v-model="per_document" class="form-control" id="document" />
              </div>
              <div class="mb-3 col-12">
                <label for="address" class="form-label">{{ $t('profile.adress') }}</label>
                <input type="text" v-model="per_address" class="form-control" id="address" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 d-flex justify-content-center">
                <button type="submit" data-bs-dismiss="modal" class="btn btn-custom fw-semibold">
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
import { ref, watchEffect, computed } from 'vue' // Importar las dependencias necesarias de 'vue'
// Importar stores
import { useProfileStore } from '../../stores/profileStore'
import { useTypDocStore } from '../../stores/typDocumentStore'

const closeModal = ref(false)
const loading = ref(false)

// Inicializar stores
const typDocStore = useTypDocStore()
const profileStore = useProfileStore()

// Definir las propiedades que recibirá el componente para editar perfil
const props = defineProps({
  per_id: Number,
  per_name: String,
  per_lastname: String,
  typ_doc_id: Number,
  per_document: String,
  per_address: String,
  edit: Boolean
})

// Definir variables reactivas
const per_name = ref(props.per_name)
const per_lastname = ref(props.per_lastname)
const typ_doc_id = ref(props.typ_doc_id)
const per_document = ref(props.per_document)
const per_address = ref(props.per_address)
const editing = ref(props.edit)

// Función para filtrar los datos
const filteredTypDoc = computed(() => {
  return typDocStore.typDoc.filter((item) => item.typ_doc_name != 0)
})

// Enviar los datos a la función creada en el store
const handleSubmit = async () => {
  try {
    if (editing.value) {
      const success = await profileStore.updatePerson(
        props.per_id,
        per_name.value.toUpperCase(),
        per_lastname.value.toUpperCase(),
        typ_doc_id.value,
        per_document.value,
        per_address.value.toUpperCase()
      )
      if (success) {
        closeModal.value = true;
      }
      editing.value = false;
    }
  } catch {
    console.log('')
  } finally {
    closeModal.value = true;
  }
}

// Función 'watchEffect' para mostrar los campos en el modal cuando se está editando
watchEffect(() => {
  per_name.value = props.per_name
  per_lastname.value = props.per_lastname
  typ_doc_id.value = props.typ_doc_id
  per_document.value = props.per_document
  per_address.value = props.per_address
  editing.value = props.edit
})

// Función para cancelar los cambios
const cancelChanges = () => {
  closeModal.value = true
}
</script>