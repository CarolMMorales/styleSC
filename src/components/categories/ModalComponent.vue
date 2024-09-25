<template>
  <div class="container p-5">
    <!-- Modal para crear y editar categorias-->
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
              {{ editing ? $t('categories.edit') : $t('categories.add') }}
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
                  <label for="exampleInputName1" class="form-label">{{ $t('categories.cate_name') }}</label>
                  <input
                    type="text"
                    v-model="cate_name"
                    class="form-control"
                    id="exampleInputName1"
                    aria-describedby="NameHelp"
                  />
                </div>
                <div class="mb-3 col-12">
                  <label for="exampleInputName1" class="form-label">{{
                    $t('categories.cate_description')
                  }}</label>
                  <input
                    type="text"
                    v-model="cate_description"
                    class="form-control"
                    id="exampleInputName1"
                    aria-describedby="NameHelp"
                  />
                </div>
                
                <div class="mb-3 col-12">
                  <label for="exampleInputName1" class="form-label">{{
                    $t('categories.cate_medida')
                  }}</label>
                  <input
                    type="text"
                    v-model="cate_medida"
                    class="form-control"
                    id="exampleInputName1"
                    aria-describedby="NameHelp"
                  />
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
import { useCategoryStore } from '../../stores/categoriesStores'
const loading = ref(false)
const cate = useCategoryStore()
//los props traen los datos de la tabla para editar la categoria correspondiente
const props = defineProps({
  cate_id: Number,
  cate_name: String,
  cate_description: String,
  cate_medida: String,
  edit: Boolean
})
//se llaman asi para que muestren los valores que ya tienen en el modal cuando se editan 
const cate_name = ref(props.cate_name)
const cate_description = ref(props.cate_description)
const cate_medida = ref(props.cate_medida)
const editing = ref(props.edit)
const submitting = ref(false)
const modalId = ref(editing.value ? 'editModal' : 'createModal')
const closeModal = ref(false)
// Computed para verificar si todos los campos tienen valor 
const isFormValid = computed(() => {
  return cate_name.value && cate_description.value && cate_medida.value
})
//se utiliza para mostrar los campos en el modal cuando se esta editando
watchEffect(() => {
  cate_name.value = props.cate_name
  cate_description.value = props.cate_description
  cate_medida.value = props.cate_medida
  editing.value = props.edit
  modalId.value = editing.value ? 'editModal' : 'createModal'
})
//funcion para enviar los datos a la funcion creada en el store donde posteriormente la mandara al backent
const handleSubmit = async () => {
  if (submitting.value) return;
  submitting.value = true;
  loading.value = true;
  try {
    if (editing.value) {
      const success = await cate.updateCategory(
        props.cate_id,
        cate_name.value.toUpperCase(),
        cate_description.value.toUpperCase(),
        cate_medida.value.toUpperCase()
      );
      if (success) {
        closeModal.value = true;
      }
      editing.value = false;
    } else {
      const send = await cate.registerCategory(
        cate_name.value.toUpperCase(),
        cate_description.value.toUpperCase(),
        cate_medida.value.toUpperCase()
      );
      if (send) {
        closeModal.value = true;
      }
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

//cancelar los cambios y limpiar los campos de ser necesario
const cancelChanges = () => {
  if (!editing.value) {
    clearForm()
    closeModal.value = true;

  }
}

const clearForm = () => {
  cate_name.value = ''
  cate_description.value = ''
  cate_medida.value = ''
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