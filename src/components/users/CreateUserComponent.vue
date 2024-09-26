<template>
  <div class="modal fade border-primary" tabindex="-1" aria-labelledby="exampleModalLabel" id="createUser"
    aria-hidden="true">
    <!-- Modal para crear usuario -->
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-primary shadow-lg">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ $t("users.createUser") }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="cancelChanges()"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3 col-12">
              <label for="person" class="form-label">{{ $t("users.person") }}</label>
              <select v-model="per_id" class="form-select" id="person" filterable>
                <option v-for="(Item, index) in filteredPersons" :key="index" :value="Item.per_id">
                  {{ Item.per_name }} {{ Item.per_lastname }}
                </option>
              </select>
            </div>
            <div class="row p-2">
              <div class="mb-3">
                <label for="username" class="form-label">{{ $t("login.email") }}</label>
                <input type="text" id="username" v-model="use_email" class="form-control"
                  :placeholder="$t('login.email')" required />
              </div>
              <label for="use_password">{{ $t('profile.changePassword') }} </label>
              <div class="input-group flex-nowrap">
                <input type="password" class="form-control ps-3" aria-describedby="password" v-model="use_password"
                  id="txtNewPassword" required autocomplete="new-password" />
                <span v-on:click="showPassword('txtNewPassword')" id="show_newpassword" class="btn btn-outline-dark"
                  type="button">
                  <span class="icon fa fa-eye-slash"></span>
                </span>
              </div>
              <div class="mb-3 col-12">
                <label for="rol" class="form-label">{{ $t("profile.rol") }}</label>
                <select v-model="rol_id" class="form-select" id="rol">
                  <option v-for="(Item, index) in filteredRol" :key="index" :value="Item.rol_id">
                    {{ Item.rol_name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 d-flex justify-content-center">
                <button type="submit" class="btn btn-custom fw-semibold" data-bs-dismiss="modal"
                  :disabled="!isFormValid">
                  <span v-if="!loading">{{ $t("buttons.save") }}</span>
                  <span v-else>
                    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span role="status">{{ $t("errors.loading") }}</span>
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importar las dependencias y stores necesarias
import { ref, computed, onMounted} from "vue";
import { showPassword } from '../../validation';
import { useAuthStore } from "../../stores/authStore";
import { useRolStore } from "../../stores/rolStore";
import { usePersonStore } from "../../stores/personsStore";
const loading = ref(false);
const submitting = ref(false);
const rolStore = useRolStore();
const authStore = useAuthStore();
const personStore = usePersonStore();
// Definir las variables reactivas
const per_id = ref('');
const use_email = ref("");
const use_password = ref("");
const rol_id = ref("");

// Funciones para filtrar los datos de los stores
const filteredRol = computed(() => {
  return rolStore.rol.filter((item) => item.rol_name != 0);
});

const filteredPersons = computed(() => {
  return personStore.persons.filter((item) => item.use_id === null || item.use_id === undefined || item.use_id === '');
});

// Función para verificar si todos los campos tienen valor 
const isFormValid = computed(() => {
  return (
    per_id.value &&
    use_email.value &&
    use_password.value &&
    rol_id.value
  )
})

// Enviar los datos a la función creada en el store
const handleSubmit = async () => {
  submitting.value = true;
  loading.value = true;
  try {
    await authStore.registerUser(
      per_id.value,
      use_email.value,
      use_password.value,
      rol_id.value
    );
    clearForm();
  } catch {
    console.log('');
  } finally {
    submitting.value = false;
    loading.value = false;
  }
};

// Función para cancelar los cambios
const cancelChanges = () => {
  clearForm();
};

// Función para limpiar campos
const clearForm = () => {
  per_id.value = "";
  use_email.value = "";
  use_password.value = "";
  rol_id.value = "";
};

// Función para cargar los datos de los stores en el componente
onMounted(async () => {
  await Promise.all([rolStore.readRol(), personStore.readPersons()]);
});

</script>

<style scoped>
/* Estilos del modal*/
.btn-custom {
  background-color: var(--purple-color);
  color: #ffffff;
  padding: 0.8rem 3rem;
  font-size: 1.25rem;
}

.btn-custom:hover {
  background-color: var(--color-background);
  color: var(--purple-color);
  border: 2px solid var(--purple-color);
}
</style>