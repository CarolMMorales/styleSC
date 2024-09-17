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
        </div>0
        <div v-if="!loading">
          <table class="table table-striped table-bordered" v-if="!loading">
            <thead>
              <tr>
                <th class="lila-color-bg text-light text-center">
                  {{ $t('products.produc_code') }}
                </th>
                <th class="lila-color-bg text-light text-center">
                  {{ $t('products.produc_name') }}
                </th>
                <th class="lila-color-bg text-light text-center">
                  {{ $t('products.produc_description') }}
                </th>
                <th class="lila-color-bg text-light text-center">
                  {{ $t('products.produc_size') }}
                </th>
                <th class="lila-color-bg text-light text-center">
                  {{ $t('categories.cate_name') }}
                </th>
                <th class="lila-color-bg text-light text-center">
                  {{ $t('buttons.edit') }}
                </th>
                <th class="lila-color-bg text-light text-center">
                  {{ $t('buttons.delete') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(Item, index) in paginated" :key="index">
                <td>{{ Item.produc_code }}</td>
                <td>{{ Item.produc_name }}</td>
                <td>{{ Item.produc_description }}</td>
                <td>{{ Item.produc_size}}</td>
                <td>{{ Item.cate_name}}</td>
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
    
    <ModalProducts
      :produc_id="parseInt(produc_id)"
      :produc_code="produc_code"
      :produc_name="produc_name"
      :produc_description="produc_description"
      :produc_size="parseInt(produc_size)"
      :cate_id="parseInt(cate_id)"
      :cate_name="cate_name"
      :edit="true"
    ></ModalProducts>
    <ModalDelete :produc_id="parseInt(produc_id)"></ModalDelete>
   
  </template>
  
  <script setup>
  import { useProductsStore } from '../../stores/productsStores'
  import PaginationComponent from '../PaginationComponent.vue'
  import LoadingComponent from '../LoadingComponent.vue'
  import ModalProducts from './ModalComponent.vue'
  import { ref, computed, onMounted, watch } from 'vue'
  import ModalDelete from './DeleteComponent.vue'
  const producStore = useProductsStore()
  const produc_id = ref('')
  const produc_code = ref('')
  const produc_name = ref('')
  const produc_description = ref('')
  const produc_size = ref('')
  const cate_id = ref('')
  const cate_name = ref('')

  const editing = ref(false)

  let loading = ref(false)
  const searchTerm = ref('')
  const currentPage = ref(1)
  const itemsPerPage = 10
  
  onMounted(async () => {
    loading.value = true
    await producStore.readProduct()
    loading.value = false
  })
  

const prepareEditForm =  (proItem) => {
  produc_id.value = proItem.produc_id
  produc_code.value = proItem.produc_code
  produc_name.value = proItem.produc_name
  produc_description.value = proItem.produc_description
  produc_size.value = proItem.produc_size
  cate_id.value = proItem.cate_id
  cate_name.value = proItem.cate_name
  editing.value = true

}
const prepareDeleteForm = (proItem)=>{
  produc_id.value = proItem.produc_id
}
  
  const filter = computed(() => {
    const lowerSearchTerm = searchTerm.value.toLowerCase()
  
    return producStore.produc.filter((Item) => {
      const matchesCode = Item.produc_code
      const matchesName = Item.produc_name.toLowerCase().includes(lowerSearchTerm)
      const matchesDescription = Item.produc_description.toLowerCase().includes(lowerSearchTerm)
      const matchesSize = Item.produc_size
      const matchesCategory = Item.cate_name
      return (
        matchesCode ||
        matchesName ||
        matchesDescription ||
        matchesSize ||
        matchesCategory
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