<template>
  <div class="modal fade border-primary" tabindex="-1" aria-labelledby="exampleModalLabel" id="editUser"
    aria-hidden="true">
    <!-- Modal para editar usuario -->
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-primary shadow-lg">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ $t("users.editUser") }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="cancelChanges()"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
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
                <button type="submit" class="btn btn-custom fw-semibold" :disabled="submitting" data-bs-dismiss="modal">
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
import { ref, computed, onMounted, watchEffect } from "vue";
import { showPassword } from '../../validation';
import { useAuthStore } from "../../stores/authStore";
import { useRolStore } from "../../stores/rolStore";

const loading = ref(false);
const submitting = ref(false);
const rolStore = useRolStore();
const authStore = useAuthStore();

// Definir las propiedades que recibirá el componente para editar el usuario correspondiente
const props = defineProps({
  use_id: Number,
  use_email: String,
  rol_id: Number,
  edit: Boolean
});

// Definir las variables reactivas
const closeModal = ref(false)
const use_email = ref(props.use_email);
const rol_id = ref(props.rol_id);
const use_password = ref('')
const editing = ref(props.edit)

// Función para filtrar datos
const filteredRol = computed(() => {
  return rolStore.rol.filter((item) => item.rol_name != 0);
});

// Enviar los datos a la función creada en el store
const handleSubmit = async () => {
  submitting.value = true;
  loading.value = true;
  try {
    if (editing.value) {
      const success = await authStore.updateUser(props.use_id, use_email.value, use_password.value, rol_id.value);
      if (success) {
        closeModal.value = true;
      }
      editing.value = false;
    }
    clearForm();
  } catch {
    console.log('');
  } finally {
    submitting.value = false;
    loading.value = false;
    closeModal.value = true;
  }
};

// Función para cancelar los cambios
const cancelChanges = () => {
  clearForm()
  closeModal.value = true
}

// Función para limpiar campos
const clearForm = () => {
  use_email.value = "";
  rol_id.value = "";
};

// Función 'watchEffect' para mostrar los campos en el modal cuando se está editando
watchEffect(() => {
  use_email.value = props.use_email
  rol_id.value = props.rol_id
})

// Función para cargar los datos del store
onMounted(async () => {
  await rolStore.readRol(); 
});
</script>

<style scoped>
/** Estilos del modal */
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
