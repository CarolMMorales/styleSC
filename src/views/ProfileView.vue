<template>
  <div class="card mt-5">
    <div v-if="loading" class="d-flex justify-content-center">
      <LoadingComponent></LoadingComponent>
    </div>
    <div class="back" v-if="!loading">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="row p-3">
            <div class="col-12 mt-4">
              <div class="position-relative text-center">
                <figure class="figure">
                  <img :src="photo" class="figure-img img-fluid object-fit-cover" :alt="$t('profile.photoAlt')" />
                </figure>
                <div class="overlayPefil" data-bs-toggle="modal" data-bs-target="#updatePhoto">
                  <i class="ri-pencil-line"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-8 d-flex align-items-center">
          <div class="w-100 text-center text-sm-center text-md-start">
            <h2 class="fw-bold">
              {{ $t('profile.title') }} {{ profileStore.profile.per_name }}
              {{ profileStore.profile.per_lastname }}
            </h2>
          </div>
        </div>
      </div>
    </div>

    <div class="card-body" v-if="!loading">
      <div>
        <div class="card shadow bg-body-tertiary rounded">
          <div class="bg-body-tertiary">
            <div class="row p-3">
              <div class="row">
                <div class="col-6 col-md-12 col-lg-12 text-end m-2">
                  <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#CambiarContrasena">
                    {{ $t('profile.button') }}
                  </button>
                </div>
                <div class="col-12 col-md-12 col-lg-5 overflow-auto">
                  <table class="table bg-body-tertiary">
                    <tbody>
                      <tr>
                        <td class="bg-body-tertiary">
                          <strong>{{ $t('profile.doctype') }}: </strong>
                        </td>
                        <td class="bg-body-tertiary">{{ profileStore.profile.typ_doc_name }}</td>
                      </tr>
                      <tr>
                        <td class="bg-body-tertiary">
                          <strong>{{ $t('profile.document') }}: </strong>
                        </td>
                        <td class="bg-body-tertiary">{{ profileStore.profile.per_document }}</td>
                      </tr>

                    </tbody>
                  </table>
                </div>
                <div class="col-12 col-md-12 col-lg-7 overflow-auto">
                  <table class="table text-truncate">
                    <tbody>
                      <tr>
                        <td class="bg-body-tertiary">
                          <strong>{{ $t('profile.adress') }}: </strong>
                        </td>
                        <td class="bg-body-tertiary">{{ profileStore.profile.per_address }}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>{{ $t('profile.rol') }}: </strong>
                        </td>
                        <td>{{ profileStore.profile.rol_name }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="row">
                <div class="d-flex justify-content-end m-2">
                  <button @click="openModal(false)" class="btn btn-danger me-2" data-bs-toggle="modal" data-bs-target="#EditarContactos">
                    {{ $t('contacts.create') }}
                  </button>
                  <button  @click="openModal(true, selectedContact)" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#CrearContactos">
                    {{ $t('contacts.edit') }}
                  </button>
                </div>
                <div class="col-12 col-md-12 col-lg-12 overflow-auto">
                  <table class="table bg-body-tertiary">
                    <thead>
                      <tr>
                        <th>{{ $t('profile.phone') }}</th>
                        <th>{{ $t('profile.email') }}</th>
                      </tr>
                    </thead>
                    <tbody class="bg-body-tertiary">
                      <tr v-for="contact in contactStore.contact" :key="contact.con_id">
                        <td class="bg-body-tertiary">{{ contact.con_phone }}</td>
                        <td class="bg-body-tertiary">{{ contact.con_email }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <changePassword></changePassword>
  <contactsModal
    :con_id="parseInt(con_id)"
    :con_phone="con_phone"
    :con_email="con_email"
    :edit="isEditing"
    @close="closeModal"
  ></contactsModal>

  <changePhoto></changePhoto>
</template>

<script setup>
import { ref, onMounted, watchEffect, watch } from 'vue'
import changePhoto from '../../src/components/changePhoto.vue'
import LoadingComponent from '../../src/components/LoadingComponent.vue'
import changePassword from '../../src/components/changePassword.vue'
import contactsModal from '../../src/components/contact/ModalComponent.vue'
import { useProfileStore } from '../stores/profileStore'
//import { formatDocument } from '../validations'
import { useContactsStore } from '../stores/contactStore.js'
const contactStore = useContactsStore()
const profileStore = useProfileStore()
const loading = ref(true)
const photo = ref(profileStore.profile.use_photo)
const isEditing = ref(false)
const con_id = ref(null)
const con_phone = ref('')
const con_email = ref('')
const updatephoto = (event) => {
  photo.value = event.detail.newImage
}

onMounted(() => {
  // Actualizar la imagen durante la montura inicial
  updatephoto({ detail: { newImage: profileStore.profile.use_photo } })
  // Escuchar evento para actualizar la imagen
  window.addEventListener('update-profile-image', updatephoto)
})

const openModal = (edit, contact = null) => {
  isEditing.value = edit
  if (edit && contact) {
    // Preparar datos del contacto para edición
    con_id.value = contact.con_id
    con_phone.value = contact.con_phone
    con_email.value = contact.con_email
  } else {
    // Limpiar datos para agregar nuevo contacto
    con_id.value = null
    con_phone.value = ''
    con_email.value = ''
  }
}
const closeModal = () => {
  // Opcional: Puedes resetear los valores aquí si es necesario
  isEditing.value = false
}

// Actualizar la imagen si cambia en el store
watchEffect(
  () => profileStore.profile.use_photo,
  (newValue) => {
    photo.value = newValue
  }
)
watch(
  () => profileStore.profile.use_photo,
  (newValue) => {
    photo.value = newValue
  }
)

onMounted(async () => {
  // Cargar detalles del perfil y contactos durante la montura inicial
  await profileStore.readPersonDetailsById()
  await contactStore.readContactsByPersonId() // Asegúrate de que esta función esté en contactStore
  photo.value = profileStore.profile.use_photo
  loading.value = false
})
</script>

<style>
.card-img-top {
  width: 50%;
  height: auto;
}

.back {
  background-color: hsla(229, 100%, 74%, 0.493);
  margin: 2%;
  border-radius: 15px;
  position: relative;
}

.top-0 {
  top: 0;
  /* La imagen estará en la parte superior del contenedor */
}

.start-100 {
  left: 100%;
  /* La imagen estará a la derecha del contenedor */
}

.translate-middle {
  transform: translate(50%);
  /* Centra la imagen vertical y horizontalmente */
}

.btn-custom {
  background-color: var(--blue-color);
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.btn-custom:hover {
  background-color: var(----color-background);
  color: var(--blue-color);
  border: 2px solid var(--blue-color);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  transition: 0.5s ease;
}

.btn-cancel {
  background-color: var(--button-red-color);
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.btn-cancel:hover {
  background-color: var(----color-background);
  color: var(--button-red-color);
  border: 2px solid var(--button-red-color);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  transition: 0.5s ease;
}

.figure {
  position: relative;
  width: 50%;
  height: 0;
  padding-top: 50%;
  overflow: hidden;
  border-radius: 2%;
}

.figure img {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  object-position: center top;
  /* La imagen se recortará desde la parte superior si es necesario, pero se centrará en la parte inferior */
}

.overlayPefil {
  position: absolute;
  margin-left: 25%;
  bottom: 22px;
  /* Coloca el elemento en la parte inferior del div */
  left: 0;
  width: 50%;
  height: 20%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.overlayPefil:hover {
  cursor: pointer;
}

.ri-pencil-line {
  color: #fff;
  font-size: 24px;
  /* Tamaño del icono */
}

.ri-pencil-line {
  color: #fff;
  font-size: 24px;
  /* Tamaño del icono */
}
</style>
