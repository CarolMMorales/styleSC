<template>
  <div class="container p-5">
    <!-- Modal para crear y editar productos -->
    <div class="modal fade border-primary" :id="modalId" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-primary shadow-lg">
          <div class="modal-header">
            <h5 class="modal-title blue-color-text" id="exampleModalLabel1">
              {{ editing ? $t('products.edit') : $t('products.add') }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
              @click="cancelChanges()"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="row p-2">
                <div class="mb-3 col-12">
                  <label for="exampleInputName1" class="form-label">{{
                    $t('products.produc_code')
                  }}</label>
                  <input type="text" v-model="produc_code" class="form-control" id="exampleInputName1"
                    aria-describedby="NameHelp" />
                </div>
                <div class="mb-3 col-12">
                  <label for="exampleInputName1" class="form-label">{{
                    $t('products.produc_name')
                  }}</label>
                  <input type="text" v-model="produc_name" class="form-control" id="exampleInputName1"
                    aria-describedby="NameHelp" />
                </div>
                <div class="mb-3 col-12">
                  <label for="exampleInputName1" class="form-label">{{
                    $t('products.produc_description')
                  }}</label>
                  <input type="text" v-model="produc_description" class="form-control" id="exampleInputName1"
                    aria-describedby="NameHelp" />
                </div>
                <div class="mb-3 col-12">
                  <label for="exampleInputName1" class="form-label">{{
                    $t('products.produc_size')
                  }}</label>
                  <input type="text" v-model="produc_size" class="form-control" id="exampleInputName1"
                    aria-describedby="NameHelp" />
                </div>
                <div class="mb-3 col-12">
                  <label for="exampleInputName1" class="form-label">{{
                    $t('categories.cate_name')
                  }}</label>
                  <select class="form-select" id="exampleInputDocumentType" aria-describedby="DocumentTypeHelp"
                    v-model="cate_id">
                    <option v-for="(Item, index) in filteredCate" :key="index" :value="Item.cate_id">
                      {{ Item.cate_name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 d-flex justify-content-center">
                  <button data-bs-dismiss="modal" type="submit" class="btn btn-custom fw-semibold"
                    :disabled="!isFormValid">
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
// Importar dependencias y stores necesarias
import { ref, computed, defineProps, watchEffect, onMounted } from 'vue'
import { useProductsStore } from '../../stores/productsStores'
import { useCategoryStore } from '../../stores/categoriesStores'

const loading = ref(false)
const produc = useProductsStore()
const cateStore = useCategoryStore()

// Definir las propiedades que recibirá el componente para editar el producto correspondiente
const props = defineProps({
  produc_id: Number,
  produc_code: String,
  produc_name: String,
  produc_description: String,
  cate_id: Number,
  produc_size: Number,
  edit: Boolean
})

// Función para filtrar los datos del store
const filteredCate = computed(() => {
  return cateStore.cate.filter((item) => item.cate_name != 0)
})

// Mostrar los valores que ya tienen en el modal cuando se editan 
const produc_code = ref(props.produc_code)
const produc_name = ref(props.produc_name)
const produc_description = ref(props.produc_description)
const produc_size = ref(props.produc_size)
const cate_id = ref(props.cate_id)

const editing = ref(props.edit)
const submitting = ref(false)
const modalId = ref(editing.value ? 'editModal' : 'createModal')
const closeModal = ref(false)

// Función para verificar si todos los campos tienen valor 
const isFormValid = computed(() => {
  return (
    produc_code.value &&
    produc_name.value &&
    produc_description.value &&
    produc_size.value &&
    cate_id.value
  )
})

// Función 'watchEffect' para mostrar los campos en el modal cuando se está editando
watchEffect(() => {
  produc_code.value = props.produc_code
  produc_name.value = props.produc_name
  produc_description.value = props.produc_description
  produc_size.value = props.produc_size
  cate_id.value = props.cate_id
  editing.value = props.edit
  modalId.value = editing.value ? 'editModal' : 'createModal'
})

// Enviar los datos a la función creada en el store
const handleSubmit = async () => {
  if (submitting.value) return
  submitting.value = true
  loading.value = true
  try {
    if (editing.value) {
      const success = await produc.updateProduct(
        props.produc_id,
        produc_code.value,
        produc_name.value.toUpperCase(),
        produc_description.value.toUpperCase(),
        produc_size.value,
        cate_id.value
      )
      if (success) {
        closeModal.value = true
      }
      editing.value = false
    } else {
      await produc.registerProduct(
        produc_code.value,
        produc_name.value.toUpperCase(),
        produc_description.value.toUpperCase(),
        produc_size.value,
        cate_id.value
      )
    }
    clearForm()
  } catch (error) {
    console.log('')
  } finally {
    submitting.value = false
    loading.value = false
    closeModal.value = true
  }
}

// Función para cargar los datos en el modal
onMounted(async () => {
  await cateStore.readCategory()
})

// Función para cancelar los cambios
const cancelChanges = () => {
  if (!editing.value) {
    clearForm()
    closeModal.value = true
  }
}

// Función para limpiar campos
const clearForm = () => {
  produc_code.value = ''
  produc_name.value = ''
  produc_description.value = ''
  produc_size.value = ''
  cate_id.value = ''
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