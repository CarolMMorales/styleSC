<template>
  <div>
    <div class="row">
      <!-- Barra de búsqueda -->
      <div class="col-md-12 mb-3">
        <input type="text" v-model="searchTerm" :placeholder="$t('titles.search')" class="form-control" />
      </div>
    </div>
    <div class="table-responsive m-1">
      <!-- Indicador de carga -->
      <div v-if="loading" class="d-flex justify-content-center">
        <LoadingComponent></LoadingComponent>
      </div>
      <div v-if="!loading">
        <!-- Tabla de Asesores -->
        <table class="table table-striped table-bordered" v-if="!loading">
          <thead>
            <tr>
              <th class="lila-color-bg text-light text-center">
                {{ $t("persons.name") }}
              </th>
              <th class="lila-color-bg text-light text-center">
                {{ $t("persons.rol") }}
              </th>
              <th class="lila-color-bg text-light text-center">
                {{ $t("persons.user") }}
              </th>
              <th class="lila-color-bg text-light text-center">
                {{ $t("buttons.detalle") }}
              </th>
              <th class="lila-color-bg text-light text-center">
                {{ $t("buttons.editUser") }}
              </th>
              <th class="lila-color-bg text-light text-center">
                {{ $t("buttons.deleteUser") }}
              </th>
            </tr>
          </thead>
          <!-- Cuerpo de la tabla -->
          <tbody>
            <tr v-for="(Item, index) in paginated" :key="index">
              <td>{{ Item.per_name }} {{ Item.per_lastname }}</td>
              <td>{{ Item.rol_name }}</td>
              <td>{{ Item.use_email }}</td>
              <td>
                <div class="text-light text-center align-items-center justify-content-center">
                  <button @click="prepareDetail(Item)" type="button" data-bs-toggle="modal" data-bs-target="#verModal"
                    class="btn btn-outline-primary">
                    <i class="bi bi-file-earmark-person-fill"></i>
                  </button>
                </div>
              </td>

              <td>
                <div class="text-light text-center align-items-center justify-content-center">
                  <button @click="prepareEditUserForm(Item)" type="button" data-bs-toggle="modal"
                    data-bs-target="#editUser" class="btn btn-outline-success">
                    <i class="bi bi-person-dash-fill"></i>
                  </button>
                </div>
              </td>
              <td>
                <div class="text-light text-center align-items-center justify-content-center">
                  <button @click="prepareDeleteForm(Item)" type="button" data-bs-toggle="modal"
                    data-bs-target="#deleteModal" class="btn btn-outline-danger">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <PaginationComponent :currentPage="currentPage" :totalPages="totalPages" @changePage="handlePageChanged" />
      </div>
    </div>
  </div>
  <!-- Llamar a los modales correspondiente y mandar los datos necesarios -->
  <!-- Modal para eliminar personas -->
  <ModalDelete :per_id="parseInt(per_id)" :use_id="parseInt(use_id)"></ModalDelete>
  <!-- Modal para ver detalles de la persona -->
  <ModalDetails :per_id="parseInt(per_id)" :per_name="per_name" :per_lastname="per_lastname"
    :typ_doc_id="parseInt(typ_doc_id)" :per_document="per_document" :per_address="per_address" :use_email="use_email"
    :rol_id="rol_id"></ModalDetails>
  <!-- Modal para editar usuarios -->
  <ModalEditUser :use_id="parseInt(use_id)" :use_email="use_email" :rol_id="parseInt(rol_id)" :edit="true">
  </ModalEditUser>
</template>

<script setup>
// Importar dependencias y stores necesarias
import { useAuthStore } from "../../stores/authStore";
import PaginationComponent from "../PaginationComponent.vue";
import LoadingComponent from "../LoadingComponent.vue";
import ModalDetails from "./modalDetailsComponent.vue";
import { ref, computed, onMounted, watch } from "vue";
import ModalDelete from "./DeleteComponent.vue";
import ModalEditUser from "./EditUserComponent.vue"

const authStore = useAuthStore(); // Inicializar store

// Definir variables reactivas
const per_id = ref("");
const per_name = ref("");
const per_lastname = ref("");
const typ_doc_id = ref("");
const per_document = ref("");
const per_address = ref("");
const use_email = ref("");
const rol_id = ref("");
const editing = ref(false);
const use_id = ref("");
let loading = ref(false);
const searchTerm = ref("");
const currentPage = ref(1);
const itemsPerPage = 10;

// Función para cargar las personas en la tabla
onMounted(async () => {
  loading.value = true;
  await authStore.readPerson();
  loading.value = false;
});


// Función para enviar los datos correspondientes al modal de editar usuario
const prepareEditUserForm = (Item) => {
  use_id.value = Item.use_id;
  use_email.value = Item.use_email;
  rol_id.value = Item.rol_id;
  editing.value = true;
};

// Función para enviar los detalles de la persona al modal correspondiente
const prepareDetail = (Item) => {
  per_id.value = Item.per_id;
  per_name.value = Item.per_name;
  per_lastname.value = Item.per_lastname;
  typ_doc_id.value = Item.typ_doc_id;
  per_document.value = Item.per_document;
  per_address.value = Item.per_address;
  use_email.value = Item.use_email;
  rol_id.value = Item.rol_id;
};

// Función para enviar el id de la persona al modal de eliminación
const prepareDeleteForm = (Item) => {
  use_id.value = Item.use_id;
};

// Filtro de búsqueda de datos en la tabla
const filter = computed(() => {
  const lowerSearchTerm = searchTerm.value.toLowerCase();
  return authStore.person.filter((Item) => {
    const matchesName = Item.per_name.toLowerCase().includes(lowerSearchTerm);
    const matchesLastname = Item.per_lastname.toLowerCase().includes(lowerSearchTerm);
    const matchesAddress = Item.per_address.toLowerCase().includes(lowerSearchTerm);
    const matchesDocument = Item.per_document.toString().includes(lowerSearchTerm);
    const fullName = `${Item.per_name} ${Item.per_lastname}`
    const matchesFullName = fullName.includes(lowerSearchTerm)
    return matchesName || matchesLastname || matchesAddress || matchesDocument || matchesFullName;
  });
});

// Función para calcular la paginación de los elementos filtrados
const paginated = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filter.value.slice(startIndex, endIndex);
});

// Total de elementos y páginas después de aplicar el filtro
const totalItems = computed(() => filter.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

// Manejar el cambio de página
const handlePageChanged = (pageNumber) => {
  currentPage.value = pageNumber;
};

// Función para reiniciar la página actual a 1 cuando cambia el término de búsqueda
watch(searchTerm, () => {
  currentPage.value = 1;
});
</script>

<style lang="scss" scoped>
@import "datatables.net-bs5";
/** Estilos de la tabla */
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
