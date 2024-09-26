<template>
  <div>
    <!-- Modal para registrar persona -->
    <div
      class="modal fade border-primary"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      id="createModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-primary shadow-lg">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ $t("persons.datosPerson") }}
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
              <!-- Formulario para crear persona -->
              <div class="row p-2">
                <div class="mb-3 col-12">
                  <label for="name" class="form-label">{{ $t("profile.name") }}</label>
                  <input
                    type="text"
                    v-model="per_name"
                    class="form-control"
                    id="name"
                    required
                  />
                </div>
                <div class="mb-3 col-12">
                  <label for="lastname" class="form-label">{{
                    $t("profile.lastname")
                  }}</label>
                  <input
                    type="text"
                    v-model="per_lastname"
                    class="form-control"
                    id="lastname"
                    required
                  />
                </div>
                <div class="mb-3 col-12">
                  <label for="doctyp" class="form-label">{{
                    $t("profile.doctype")
                  }}</label>
                  <select v-model="typ_doc_id" class="form-select" id="doctyp" required>
                    <option
                      v-for="(Item, index) in filteredTypDoc"
                      :key="index"
                      :value="Item.typ_doc_id"
                    >
                      {{ Item.typ_doc_name }}
                    </option>
                  </select>
                </div>
                <div class="mb-3 col-12">
                  <label for="document" class="form-label">{{
                    $t("profile.document")
                  }}</label>
                  <input
                    type="text"
                    v-model="per_document"
                    class="form-control"
                    id="document"
                    required
                  />
                </div>
                <div class="mb-3 col-12">
                  <label for="address" class="form-label">{{
                    $t("persons.address")
                  }}</label>
                  <input
                    type="text"
                    v-model="per_address"
                    class="form-control"
                    id="address"
                    required
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 d-flex justify-content-center">
                  <button
                    type="submit"
                    class="btn btn-custom fw-semibold"
                    data-bs-dismiss="modal"
                    :disabled="!isFormValid"
                  >
                    <span v-if="!loading">{{ $t("buttons.save") }}</span>
                    <span v-else>
                      <span
                        class="spinner-border spinner-border-sm"
                        aria-hidden="true"
                      ></span>
                      <span role="status">{{ $t("errors.loading") }}</span>
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
import { ref, computed } from "vue";
import { usePersonStore } from "../../stores/personsStore";
import { useTypDocStore } from "../../stores/typDocumentStore";
const personStore = usePersonStore();
const typDocStore = useTypDocStore();

// Definir las variables reactivas
const per_name = ref("");
const per_lastname = ref("");
const typ_doc_id = ref(null);
const per_document = ref("");
const per_address = ref("");
const loading = ref(false);
const closeModal = ref(false);

// Función para filtrar los datos del store
const filteredTypDoc = computed(() => {
  return typDocStore.typDoc.filter((item) => item.typ_doc_name !== 0);
});

// Función para verificar si todos los campos tienen valor
const isFormValid = computed(() => {
  return (
    per_name.value &&
    per_lastname.value &&
    typ_doc_id.value &&
    per_document.value &&
    per_address.value
  );
});

// Enviar los datos a la función creada en el store
const handleSubmit = async () => {
  loading.value = true;
  try {
    const success = await personStore.registerPerson(
      per_name.value.toUpperCase(),
      per_lastname.value.toUpperCase(),
      typ_doc_id.value,
      per_document.value,
      per_address.value
    );
    if (success) {
      closeModal.value = true;
    }
    clearForm();
  } catch (error) {
    console.error("Registration Error:", error.response?.data);
    if (error.response?.data.errors) {
      error.response.data.errors.forEach((err) => {
        console.error(err);
      });
    }
  } finally {
    loading.value = false;
    closeModal.value = true;
  }
};

// Función para cancelar los cambios
const cancelChanges = () => {
  clearForm();
  closeModal.value = true;
};

// Función para limpiar campos
const clearForm = () => {
  per_name.value = "";
  per_lastname.value = "";
  typ_doc_id.value = "";
  per_document.value = "";
  per_address.value = "";
};
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
