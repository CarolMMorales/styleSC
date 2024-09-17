<template>
  <div class="container p-5">
    <!-- Modal -->
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
              {{ editing ? $t('stocks.edit') : $t('stocks.add') }}
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
                  <label for="exampleInputName1" class="form-label">{{ $t('products.produc_name') }}</label>
                  <select class="form-select" id="exampleInputDocumentType" aria-describedby="DocumentTypeHelp" v-model="produc_id" >
                      <option v-for="(Item, index) in filteredProduc" :key="index" :value="Item.produc_id" >
                          {{ Item.produc_name }}
                      </option>
                  </select>
                </div>
                <div class="mb-3 col-12">
                  <label for="exampleInputName1" class="form-label">{{
                    $t('stocks.stock_costo')
                  }}</label>
                  <input
                    type="text"
                    v-model="stock_costo"
                    class="form-control"
                    id="exampleInputName1"
                    aria-describedby="NameHelp"
                  />
                </div>
                
                <div class="mb-3 col-12">
                  <label for="exampleInputName1" class="form-label">{{
                    $t('stocks.stock_precioVenta')
                  }}</label>
                  <input
                    type="text"
                    v-model="stock_precioVenta"
                    class="form-control"
                    id="exampleInputName1"
                    aria-describedby="NameHelp"
                  />
                </div>
                <div class="mb-3 col-12">
                  <label for="exampleInputName1" class="form-label">{{ $t('stocks.stock_cantidad') }}</label>
                  <input
                    type="text"
                    v-model="stock_cantidad"
                    class="form-control"
                    id="exampleInputName1"
                    aria-describedby="NameHelp"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 d-flex justify-content-center">
                  <button
                    :data-bs-dismiss="editing ? 'modal' : ''"
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
import { ref, computed, defineProps, watchEffect, onMounted } from 'vue'
import { useStockStore } from '../../stores/stocksStores'
import { useProductsStore } from '../../stores/productsStores'

const loading = ref(false)
const stock = useStockStore()
const productStore = useProductsStore()

const props = defineProps({
  produc_id: Number,
  //produc_name: String,
  stock_id: Number,
  stock_costo: Number,
  stock_precioVenta: Number,
  stock_cantidad: Number,
  edit: Boolean
})

const filteredProduc = computed(() => {
  return productStore.produc.filter((item) => item.produc_name != 0)
})

const produc_id = ref(props.produc_id)
//const produc_name = ref(props.produc_name)
const stock_costo = ref(props.stock_costo)
const stock_precioVenta = ref(props.stock_precioVenta)
const stock_cantidad = ref(props.stock_cantidad)

const editing = ref(props.edit)
const submitting = ref(false)
const modalId = ref(editing.value ? 'editModal' : 'createModal')
const closeModal = ref(false)

// Computed para verificar si todos los campos tienen valor
const isFormValid = computed(() => {
  return (
    produc_id.value &&
    stock_costo.value &&
    stock_precioVenta.value &&
    stock_cantidad.value
  )
})

watchEffect(() => {
  produc_id.value = props.produc_id
  stock_costo.value = props.stock_costo
  stock_precioVenta.value = props.stock_precioVenta
  stock_cantidad.value = props.stock_cantidad
  editing.value = props.edit
  modalId.value = editing.value ? 'editModal' : 'createModal'
})

const handleSubmit = async () => {
  if (submitting.value) return;
  submitting.value = true;
  loading.value = true;
  try {
    if (editing.value) {
      const success = await stock.updateStock(
        props.stock_id,
        produc_id.value,
        stock_costo.value,
        stock_precioVenta.value,
        stock_cantidad.value
      );
      if (success) {
        closeModal.value = true;
      }
      editing.value = false;
    } else {
      await stock.registerStock(
        produc_id.value,
        stock_costo.value,
        stock_precioVenta.value,
        stock_cantidad.value
      );

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

onMounted (async () => {
  await productStore.readProduct()
})

const cancelChanges = () => {
  if (!editing.value) {
    clearForm()
    closeModal.value = true;

  }
}

const clearForm = () => {
  produc_id.value = ''
  //produc_name.value = ''
  stock_costo.value = ''
  stock_precioVenta.value = ''
  stock_cantidad.value = ''
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