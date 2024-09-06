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
          <table class="table table-striped table-bordered" v-if="!loading">
            <thead>
              <tr>
                <th class="lila-color-bg text-light text-center">
                  {{ $t('proveedores.prove_name') }}
                </th>
                <th class="lila-color-bg text-light text-center">
                  {{ $t('proveedores.prove_address') }}
                </th>
                <th class="lila-color-bg text-light text-center">
                  {{ $t('proveedores.prove_email') }}
                </th>
                <th class="lila-color-bg text-light text-center">
                  {{ $t('proveedores.prove_phone') }}
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
                <td>{{ Item.prove_name }} {{ Item.prove_lastname }}</td>
                <td>{{ Item.prove_address }}</td>
                <td>{{ Item.prove_email}}</td>
                <td>{{ Item.prove_phone}}</td>
                <td>
                  <div class="text-light text-center align-items-center justify-content-center">
                    <button
                      @click="prepareEditForm(Item)"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#editModalMail"
                      class="btn btn-outline-success"
                    >
                      <i class="ri-pencil-fill"></i> {{ $t('buttons.edit') }}
                    </button>
                  </div>
                </td>
                <td>
                  <div class="text-light text-center align-items-center justify-content-center">
                    <button
                      @click="prepareEditForm(Item)"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#editModalMail"
                      class="btn btn-outline-success"
                    >
                      <i class="ri-pencil-fill"></i> {{ $t('buttons.edit') }}
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
    
    <ModalProveedores
      :prove_id="parseInt(prove_id)"
      :prove_name="prove_name"
      :prove_lastname="prove_lastname"
      :prove_address="prove_address"
      :prove_phone="prove_phone"
      :edit="true"
    ></ModalProveedores>
    <pre>{{ prove }}</pre>
  </template>
  
  <script setup>
  import { useProveedorStore } from '../../stores/proveedoresStores'
  import PaginationComponent from '../PaginationComponent.vue'
  import LoadingComponent from '../LoadingComponent.vue'
  import ModalProveedores from './ModalComponent.vue'
  import { ref, computed, onMounted, watch } from 'vue'

  const proveStore = useProveedorStore()
  const prove_name = ref('')
  const prove_lastname = ref('')
  const prove_id = ref('')
  const prove_address = ref('')
  const prove_email = ref('')
  const prove_phone = ref('')

  const editing = ref(false)

  let loading = ref(false)
  const searchTerm = ref('')
  const currentPage = ref(1)
  const itemsPerPage = 10
  
  onMounted(async () => {
    loading.value = true
    await proveStore.readProveedor()
    loading.value = false
  })
  

const prepareEditForm = async (proItem) => {
  prove_name.value = proItem.prove_name
  prove_lastname.value = proItem.prove_lastname
  prove_address.value = proItem.prove_address
  prove_email.value = proItem.prove_email
  prove_phone.value = proItem.prove_phone
  editing.value = true

}
  
  const filter = computed(() => {
    const lowerSearchTerm = searchTerm.value.toLowerCase()
  
    return proveStore.prove.filter((Item) => {
      const matchesName = Item.prove_name.toLowerCase().includes(lowerSearchTerm)
      const matchesLastname = Item.prove_lastname.toLowerCase().includes(lowerSearchTerm)
      const matchesAddress = Item.prove_address.toLowerCase().includes(lowerSearchTerm)
      const matchesEmail = Item.prove_email.toLowerCase().includes(lowerSearchTerm)
      const matchesPhone = Item.prove_phone.toString().includes(lowerSearchTerm)
      const fullName = `${Item.per_name} ${Item.per_lastname}`.toLowerCase()
      const matchesFullName = fullName.includes(lowerSearchTerm)
      return (
        matchesLastname ||
        matchesName ||
        matchesAddress ||
        matchesPhone ||
        matchesEmail ||
        matchesFullName
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
  