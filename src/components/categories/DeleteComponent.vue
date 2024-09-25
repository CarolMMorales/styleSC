<template> 
<!-- funcion para eliminar categoria -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">{{ $t('categories.delete') }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <p>{{ $t('categories.messagesDelete') }}</p>
          </div>
          <div class="modal-footer justify-content-center">
            <button
              type="button"
              class="btn btn-secondary btn-custom"
              data-bs-dismiss="modal"
            >
              {{ $t('buttons.cancel') }}
            </button>
            <button
              type="button"
              class="btn btn-danger btn-custom2"
              @click="deleteCategory"
              data-bs-dismiss="modal"
            >
              {{ $t('buttons.confirmDelete') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCategoryStore } from '../../stores/categoriesStores'
  
  const cateStore = useCategoryStore()
  const props = defineProps({
    cate_id: Number
  })
  //manda los datos a la funcion deleteCategory para eliminar la categoria
  const deleteCategory = async () => {
    const success = await cateStore.deleteCategory(props.cate_id)
    if (success) {
      console.log('Categoría eliminada correctamente')
    } else {
      console.log('Error al eliminar la categoría')
    }
  }
  </script>
  
  <style lang="scss" scoped>
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
    background-color:#b6a8b9;
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
    background-color:rgb(210, 48, 69);
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
