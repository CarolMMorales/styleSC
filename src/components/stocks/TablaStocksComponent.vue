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
                {{ $t('categories.cate_name') }}
              </th>
              <th class="lila-color-bg text-light text-center">
                {{ $t('products.produc_name') }}
              </th>
              <th class="lila-color-bg text-light text-center">
                {{ $t('products.produc_size') }}
              </th>
              <th class="lila-color-bg text-light text-center">
                {{ $t('stocks.stock_cantidad') }}
              </th>
              <th class="lila-color-bg text-light text-center">
                {{ $t('proveedores.prove_name') }}
              </th>
              <th class="lila-color-bg text-light text-center">
                {{ $t('buttons.details') }}
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
            <!-- cuerpo de la tabla donde se mostraran los datos y botones para que cumplan sus respectivas funciones -->
            <tr v-for="(Item, index) in paginated" :key="index">
              <td>{{ Item.cate_name }} </td>
              <td>{{ Item.produc_name }}</td>
              <td>{{ Item.produc_size }}</td>
              <td>{{ Item.stock_cantidad }}</td>
              <td>{{ Item.prove_name }}</td>
              <td>
                <!-- boton pára ver los detalles del stock -->
                <div class="text-light text-center align-items-center justify-content-center">
                  <button @click="prepareDetailsForm(Item)" type="button" data-bs-toggle="modal"
                    data-bs-target="#detailsModal" class="btn btn-outline-success">
                    <i class="bi bi-info-square-fill"></i> {{ $t('buttons.details') }}
                  </button>
                </div>
              </td>
              <td>
                <!-- boton para editar stocks -->
                <div class="text-light text-center align-items-center justify-content-center">
                  <button @click="prepareEditForm(Item)" type="button" data-bs-toggle="modal"
                    data-bs-target="#editModal" class="btn btn-outline-success">
                    <i class="ri-pencil-fill"></i> {{ $t('buttons.edit') }}
                  </button>
                </div>
              </td>
              <td>
                <!-- boton para eliminar stocks -->
                <div class="text-light text-center align-items-center justify-content-center">
                  <button @click="prepareDeleteForm(Item)" type="button" data-bs-toggle="modal"
                    data-bs-target="#deleteModal" class="btn btn-outline-danger">
                    <i class="bi bi-trash-fill"></i> {{ $t('buttons.delete') }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- componente de paginación -->
        <PaginationComponent :currentPage="currentPage" :totalPages="totalPages" @changePage="handlePageChanged" />
      </div>
    </div>
  </div>
  <!-- llama al modal de editar stocks y le pasa los datos necesarios para cumplir esa funcion -->
  <ModalStocks :stock_id="parseInt(stock_id)" :stock_costo="parseFloat(stock_costo)"
    :stock_precioVenta="parseFloat(stock_precioVenta)" :stock_cantidad="parseInt(stock_cantidad)"
    :produc_id="parseInt(produc_id)" :prove_id="parseInt(prove_id)" :edit="true"></ModalStocks>
  <!-- llama al modal de detalles del stock donde se mostraran todos los detallles de este y solo es vista -->
  <ModalDetails :stock_id="parseInt(stock_id)" :stock_costo="parseFloat(stock_costo)"
    :stock_precioVenta="parseFloat(stock_precioVenta)" :stock_cantidad="parseInt(stock_cantidad)"
    :produc_id="parseInt(produc_id)" :produc_code="produc_code" :produc_description="produc_description"
    :produc_size="produc_size" :prove_id="parseInt(prove_id)"></ModalDetails>
  <!-- llama al modal de eliminar stock -->
  <ModalDelete :stock_id="parseInt(stock_id)"></ModalDelete>

</template>

<script setup>
// llama funciones y componente necesarios 
import { useStockStore } from '../../stores/stocksStores'
import PaginationComponent from '../PaginationComponent.vue'
import LoadingComponent from '../LoadingComponent.vue'
import ModalStocks from './ModalComponent.vue'
import ModalDetails from './ModalDetails.vue'
import { ref, computed, onMounted, watch } from 'vue'
import ModalDelete from './DeleteComponent.vue'

const stockStore = useStockStore()
//declaración de variables 
const produc_id = ref('')
const produc_code = ref('')
const produc_description = ref('')
const produc_size = ref('')
const prove_id = ref('')
const stock_id = ref('')
const stock_costo = ref('')
const stock_precioVenta = ref('')
const stock_cantidad = ref('')

const editing = ref(false)

let loading = ref(false)
const searchTerm = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
//carga de datos
onMounted(async () => {
  loading.value = true
  await stockStore.readStock()
  loading.value = false
})
//funcion para mandar datos al modal de detalles
const prepareDetailsForm = (proItem) => {
  stock_id.value = proItem.stock_id
  stock_costo.value = proItem.stock_costo
  stock_precioVenta.value = proItem.stock_precioVenta
  stock_cantidad.value = proItem.stock_cantidad
  produc_id.value = proItem.produc_id
  prove_id.value = proItem.prove_id
  produc_code.value = proItem.produc_code
  produc_description.value = proItem.produc_description
  produc_size.value = proItem.produc_size
}
//funcion para mandar los datos al modal de editar
const prepareEditForm = (proItem) => {
  stock_id.value = proItem.stock_id
  stock_costo.value = proItem.stock_costo
  stock_precioVenta.value = proItem.stock_precioVenta
  stock_cantidad.value = proItem.stock_cantidad
  produc_id.value = proItem.produc_id
  prove_id.value = proItem.prove_id
  editing.value = true
}
//funcion para mandar los datos al modal de eliminar 
const prepareDeleteForm = (proItem) => {
  stock_id.value = proItem.stock_id
}
//filtro de busqueda en tabla 
const filter = computed(() => {
  const lowerSearchTerm = searchTerm.value.toLowerCase();

  return Array.isArray(stockStore.stock) ? stockStore.stock.filter((item) => {
    const cateName = item.cate_name ? item.cate_name.toLowerCase() : '';
    const producName = item.produc_name ? item.produc_name.toLowerCase() : '';
    const proveName = item.prove_name ? item.prove_name.toLowerCase() : '';
    const stockCosto = item.stock_costo ? item.stock_costo.toString() : '';
    const stockPrecioVenta = item.stock_precioVenta ? item.stock_precioVenta.toString() : '';
    const stockCantidad = item.stock_cantidad ? item.stock_cantidad.toString() : '';

    const matchesCateName = cateName.includes(lowerSearchTerm);
    const matchesProducName = producName.includes(lowerSearchTerm);
    const matchesProveName = proveName.includes(lowerSearchTerm);
    const matchesCosto = stockCosto.includes(lowerSearchTerm);
    const matchesPrecioVenta = stockPrecioVenta.includes(lowerSearchTerm);
    const matchesCantidad = stockCantidad.includes(lowerSearchTerm);

    return matchesCateName || matchesProducName || matchesProveName || matchesCosto || matchesPrecioVenta || matchesCantidad;
  }) : [];
});
//funcion de paginacion
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
// estilos
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

</style>