<template>
  <!-- Modal para eliminar productos -->
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">{{ $t('products.delete') }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
          <p>{{ $t('products.messagesDelete') }}</p>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-secondary btn-custom" data-bs-dismiss="modal">
            {{ $t('buttons.cancel') }}
          </button>
          <button type="button" class="btn btn-danger btn-custom2" @click="deleteProduct" data-bs-dismiss="modal">
            {{ $t('buttons.confirmDelete') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importar e inicializar store
import { useProductsStore } from '../../stores/productsStores'
const producStore = useProductsStore()

// Definir las propiedades que recibirá el componente para eliminar el producto correspondiente
const props = defineProps({
  produc_id: Number
})

// Mandar los datos a la función deleteProduct para eliminar el producto
const deleteProduct = async () => {
  const success = await producStore.deleteProduct(props.produc_id)
  if (success) {
    console.log('')
  } else {
    console.log('')
  }
}
</script>

<style lang="scss" scoped>
/** Estilos del modal */
.modal-dialog-centered {
  display: flex;
  align-items: center;
  height: 100%;
}

.modal-body {
  font-size: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: center;
}

.btn-custom {
  background-color: #b6a8b9;
  color: #ffffff;
  padding: 0.8rem 3rem;
  font-size: 1.25rem;
  border-radius: 0.375rem;
}

.btn-custom:hover {
  background-color: var(--color-background);
  color: #b6a8b9;
  border: 2px solid #b6a8b9;
}

.btn-custom2 {
  background-color: rgb(210, 48, 69);
  color: #ffffff;
  padding: 0.8rem 3rem;
  font-size: 1.25rem;
  border-radius: 0.375rem;
}

.btn-custom2:hover {
  background-color: var(--color-background);
  color: rgb(210, 48, 69);
  border: 2px solid rgb(210, 48, 69);
}
</style>