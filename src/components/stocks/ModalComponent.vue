<template>
  <div class="container p-5">
    <!-- Modal -->
    <div class="modal fade border-primary" :id="modalId" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-primary shadow-lg">
          <div class="modal-header">
            <h5 class="modal-title blue-color-text" id="exampleModalLabel1">
              {{ editing ? $t('stocks.edit') : $t('stocks.add') }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
              @click="cancelChanges()"></button>
          </div>
          <div class="modal-body">
            <!-- formulario para editar o agregar stock -->
            <form @submit.prevent="handleSubmit">
              <div class="row p-2">
                <div class="mb-3 col-12">
                  <label for="exampleInputName1" class="form-label">{{ $t('products.produc_name') }}</label>
                  <select class="form-select" @change="onProductSelect" id="productSelect" v-model="produc_id"
                    filterable>
                    <option v-for="(Item, index) in filteredProduc" :key="index" :value="Item.produc_id">
                      {{ Item.produc_name }}
                    </option>
                  </select>
                </div>
                <div class="mb-3 col-12">
                  <label for="produc_code" class="form-label">{{ $t('products.produc_code') }}</label>
                  <input type="text" v-model="produc_code" class="form-control" id="produc_code" readonly />
                </div>
                <div class="mb-3 col-12">
                  <label for="produc_description" class="form-label">{{ $t('products.produc_description') }}</label>
                  <input type="text" v-model="produc_description" class="form-control" id="produc_description"
                    readonly />
                </div>
                <div class="mb-3 col-12">
                  <label for="produc_size" class="form-label">{{ $t('products.produc_size') }}</label>
                  <input type="text" v-model="produc_size" class="form-control" id="produc_size" readonly />
                </div>
                <div class="mb-3 col-12">
                  <label for="exampleInputName1" class="form-label">{{ $t('proveedores.prove_name') }}</label>
                  <select class="form-select" id="exampleInputDocumentType" aria-describedby="DocumentTypeHelp"
                    v-model="prove_id" filterable>
                    <option v-for="(Item, index) in filteredProve" :key="index" :value="Item.prove_id">
                      {{ Item.prove_name }}
                    </option>
                  </select>
                </div>
                <div class="mb-3 col-12">
                  <label for="exampleInputName1" class="form-label">{{
                    $t('stocks.stock_costo')
                    }}</label>
                  <input type="text" v-model="stock_costo" class="form-control" id="exampleInputName1"
                    aria-describedby="NameHelp" />
                </div>
                <div class="mb-3 col-12">
                  <label for="exampleInputName1" class="form-label">{{
                    $t('stocks.stock_precioVenta')
                    }}</label>
                  <input type="text" v-model="stock_precioVenta" class="form-control" id="exampleInputName1"
                    aria-describedby="NameHelp" />
                </div>
                <div class="mb-3 col-12">
                  <label for="exampleInputName1" class="form-label">{{ $t('stocks.stock_cantidad') }}</label>
                  <input type="text" v-model="stock_cantidad" class="form-control" id="exampleInputName1"
                    aria-describedby="NameHelp" />
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
// importa funciones necesarias 
import { ref, computed, defineProps, watchEffect, onMounted } from 'vue'
import { useStockStore } from '../../stores/stocksStores'
import { useProductsStore } from '../../stores/productsStores'
import { useProveedorStore } from '../../stores/proveedoresStores'
//instacia variable
const loading = ref(false)
const stock = useStockStore()
const productStore = useProductsStore()
const proveStore = useProveedorStore()

const produc_code = ref('')
const produc_description = ref('')
const produc_size = ref('')
//trae los datos que fueron mandados de la tabla 
const props = defineProps({
  stock_id: Number,
  stock_costo: Number,
  stock_precioVenta: Number,
  stock_cantidad: Number,
  produc_id: Number,
  prove_id: Number,
  edit: Boolean
})
//filtros del modal 
const filteredProduc = computed(() => {
  return productStore.produc.filter((item) => item.produc_name != 0)
})

const filteredProve = computed(() => {
  return proveStore.prove.filter((item) => item.prove_name != 0)
})
//rellena campos al encontrar un producto automaticamente
const onProductSelect = async () => {
  const selectedProduct = await productStore.getProductById(produc_id.value)
  if (selectedProduct) {
    produc_code.value = selectedProduct.produc_code
    produc_description.value = selectedProduct.produc_description
    produc_size.value = selectedProduct.produc_size
  }
}
//igual valores a los de los props
const stock_costo = ref(props.stock_costo)
const stock_precioVenta = ref(props.stock_precioVenta)
const stock_cantidad = ref(props.stock_cantidad)
const produc_id = ref(props.produc_id)
const prove_id = ref(props.prove_id)

const editing = ref(props.edit)
const submitting = ref(false)
const modalId = ref(editing.value ? 'editModal' : 'createModal')
const closeModal = ref(false)
//funcion para desabilitar el boton de guardar hasta que todos los datos esten completos
const isFormValid = computed(() => {
  return (
    stock_costo.value &&
    stock_precioVenta.value &&
    stock_cantidad.value &&
    produc_id.value &&
    prove_id.value 
  )
})
//muestra los datos en el modal
watchEffect(() => {
  stock_costo.value = props.stock_costo
  stock_precioVenta.value = props.stock_precioVenta
  stock_cantidad.value = props.stock_cantidad
  produc_id.value = props.produc_id
  prove_id.value = props.prove_id
  editing.value = props.edit
  modalId.value = editing.value ? 'editModal' : 'createModal'
})
//funcion para editar o agregar un stock con un condicional depende el caso
const handleSubmit = async () => {
  if (submitting.value) return
  submitting.value = true
  loading.value = true
  try {
    if (editing.value) {
      const success = await stock.updateStock(
        props.stock_id,
        stock_costo.value,
        stock_precioVenta.value,
        stock_cantidad.value,
        produc_id.value,
        prove_id.value
      )
      if (success) {
        closeModal.value = true
      }
      editing.value = false
    } else {
      await stock.registerStock(
        stock_costo.value,
        stock_precioVenta.value,
        stock_cantidad.value,
        produc_id.value,
        prove_id.value
      )
    }
    clearForm()
  } catch (error) {
    console.log(error)
  } finally {
    submitting.value = false
    loading.value = false
    closeModal.value = true
  }
}
//carga los datos
onMounted(async () => {
  await productStore.readProduct()
})
//cancela los cambios y limpia los capos de ser necesario 
const cancelChanges = () => {
  if (!editing.value) {
    clearForm()
    closeModal.value = true
  }
}

const clearForm = () => {
  produc_id.value = ''
  produc_code.value = ''
  produc_description.value = ''
  produc_size.value = ''
  prove_id.value = ''
  stock_costo.value = ''
  stock_precioVenta.value = ''
  stock_cantidad.value = ''
}
</script>

<style lang="scss" scoped>
// estilos
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