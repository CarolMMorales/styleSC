<template>
    <div>
      <div class="row">
  
      <!-- buscador -->
      <div class="col-md-12 mb-3">
        <input type="text" v-model="searchTerm" :placeholder="$t('titles.search')" class="form-control" />
      </div>
    </div>
  
      <div class="table-responsive m-1">
        <!-- Agregar un indicador de carga -->
        <div v-if="loading" class="d-flex justify-content-center">
          <LoadingComponent></LoadingComponent>
        </div>
        <div v-if="!loading"> 
          <!-- tabla -->
          <table class="table table-striped table-bordered" v-if="!loading">
            <thead>
              <tr>
                <th class="lila-color-bg text-light text-center">
                  {{ $t('categories.cate_name') }}
                </th>
                <th class="lila-color-bg text-light text-center">
                  {{ $t('categories.cate_description') }}
                </th>
                <th class="lila-color-bg text-light text-center">
                  {{ $t('categories.cate_medida') }}
                </th>                
                <th class="lila-color-bg text-light text-center">
                  {{ $t('buttons.edit') }}
                </th>
                <th class="lila-color-bg text-light text-center">
                  {{ $t('buttons.delete') }}
                </th>
              </tr>
            </thead>
            <!-- cuerpo de la tabla donde se mostraran los datos -->
            <tbody>
              <tr v-for="(Item, index) in paginated" :key="index">
                <td>{{ Item.cate_name}}</td>
                <td>{{ Item.cate_description}}</td>
                <td>{{ Item.cate_medida}}</td>
                <td>
                  <div class="text-light text-center align-items-center justify-content-center">
                    <button
                      @click="prepareEditForm(Item)"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      class="btn btn-outline-success"
                    >
                      <i class="ri-pencil-fill"></i> {{ $t('buttons.edit') }}
                    </button>
                  </div>
                </td>
                <td>
                  <div class="text-light text-center align-items-center justify-content-center">
                    <button
                      @click="prepareDeleteForm(Item)"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      class="btn btn-outline-danger"
                    >
                      <i class="bi bi-trash-fill"></i> {{ $t('buttons.delete') }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <PaginationComponent
            :currentPage="currentPage"
            :totalPages="totalPages"
            @changePage="handlePageChanged"
          />
        </div>
      </div>
      
    </div>
    <!-- llamar a los modales correspondiente y mandar los datos necesarios -->
    <ModalCategories
      :cate_id="parseInt(cate_id)"
      :cate_name="cate_name"
      :cate_description="cate_description"
      :cate_medida="cate_medida"
      :edit="true"
    ></ModalCategories>
    <ModalDelete :cate_id="parseInt(cate_id)"></ModalDelete>
   
  </template>
  
  <script setup>
  import { useCategoryStore } from '../../stores/categoriesStores'
  import PaginationComponent from '../PaginationComponent.vue'
  import LoadingComponent from '../LoadingComponent.vue'
  import ModalCategories from './ModalComponent.vue'
  import { ref, computed, onMounted, watch } from 'vue'
  import ModalDelete from './DeleteComponent.vue'
  const cateStore = useCategoryStore()
  const cate_id = ref('')
  const cate_name = ref('')
  const cate_description = ref('')
  const cate_medida = ref('')

  const editing = ref(false)

  let loading = ref(false)
  const searchTerm = ref('')
  const currentPage = ref(1)
  const itemsPerPage = 10
  //carga los datos en la tabla para que se reflejen automaticamente despues de cualquier cambio
  onMounted(async () => {
    loading.value = true
    await cateStore.readCategory()
    loading.value = false
  })
  //con esta funcion se mandan los datos al modal de editar
const prepareEditForm =  (proItem) => {
  cate_id.value = proItem.cate_id
  cate_name.value = proItem.cate_name
  cate_description.value = proItem.cate_description
  cate_medida.value = proItem.cate_medida
  editing.value = true

}
//con esta funcion se manda el id al modal correspondiente para eliminar la categoria
const prepareDeleteForm = (proItem)=>{
  cate_id.value = proItem.cate_id
}
  //filtro de busqueta de datos en la tabla 
  const filter = computed(() => {
    const lowerSearchTerm = searchTerm.value.toLowerCase()
  
    return cateStore.cate.filter((Item) => {
      const matchesName = Item.cate_name.toLowerCase().includes(lowerSearchTerm)
      const matchesDescription = Item.cate_description.toLowerCase().includes(lowerSearchTerm)
      const matchesMedida = Item.cate_medida.toLowerCase().includes(lowerSearchTerm)
      return (
        matchesName ||
        matchesDescription ||
        matchesMedida
      )
    })
  })
  
  const paginated = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
  
    return filter.value.slice(startIndex, endIndex)
  })
  
  const totalItems = computed(() => filter.value.length)
  const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))
  
  const handlePageChanged = (pageNumber) => {
    currentPage.value = pageNumber
  }

  
  watch(searchTerm, () => {
    // Reinicia currentPage a 1 cuando cambia el término de búsqueda
    currentPage.value = 1
  })
  

  
  </script>
  
  <style lang="scss" scoped>
  @import 'datatables.net-bs5';
  .lila-color-bg {
    background-color: var(--lila-color);
  }
  
  .btn-custom {
    background-color: var(--purple-color);
    color: #ffffff;
    padding: 1rem 4rem;
    font-size: 1.25rem;
  }
  
  .btn-custom:hover {
    background-color: var(----color-background);
    color: var(--purple-color);
    border: 2px solid var(--purple-color);
  }
  .btn-custom2 {
    background-color: var(--purple-color);
    color: #ffffff;
  }
  
  // .btn-custom2:hover {
  //   background-color: var(----color-background);
  //   color: var(--purple-color);
  //   border: 2px solid var(--purple-color);
  // }
  </style>
