<template>
  <div
    class="modal fade border-primary"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    id="editUser"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-primary shadow-lg">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ $t("users.editUser") }}
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
              <div class="mb-3">
                <label for="username" class="form-label">{{ $t("login.email") }}</label>
                
                  <input
                    type="text"
                    id="username"
                    v-model="use_email"
                    class="form-control"
                    :placeholder="$t('login.email')"
                    required
                  />
                
              </div>
              <label for="use_password">{{ $t('profile.changePassword') }} </label>
                <div class="input-group flex-nowrap">
                  <input
                    type="password"
                    class="form-control ps-3"
                    aria-describedby="password"
                    v-model="use_password"
                    id="txtNewPassword"
                    required
                    autocomplete="new-password"
                  />
                  <span
                    v-on:click="showPassword('txtNewPassword')"
                    id="show_newpassword"
                    class="btn btn-outline-dark"
                    type="button"
                  >
                    <span class="icon fa fa-eye-slash"></span>
                  </span>
                </div>
              <div class="mb-3 col-12">
                <label for="rol" class="form-label">{{ $t("profile.rol") }}</label>
                <select v-model="rol_id" class="form-select" id="rol">
                  <option
                    v-for="(Item, index) in filteredRol"
                    :key="index"
                    :value="Item.rol_id"
                  >
                    {{ Item.rol_name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 d-flex justify-content-center">
                <button
                  type="submit"
                  class="btn btn-custom fw-semibold"
                  :disabled="submitting"
                  data-bs-dismiss="modal"
                >
                  <span v-if="!loading">{{ $t("buttons.save") }}</span>
                  <span v-else>
                    <span
                      class="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
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

const props = defineProps({
  use_id: Number,
  use_email: String,
  rol_id: Number,
  edit:Boolean
});
const closeModal = ref(false)
const use_email = ref(props.use_email);
const rol_id = ref(props.rol_id);
const use_password = ref('')
const editing = ref(props.edit)
const filteredRol = computed(() => {
  return rolStore.rol.filter((item) => item.rol_name != 0);
});

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
    // Emit an event to close the modal
  } catch {
    console.log("error");
  } finally {
    submitting.value = false;
    loading.value = false;
    closeModal.value = true;
  }
};

const cancelChanges = () => {
  clearForm()
  closeModal.value = true
}

const clearForm = () => {
  use_email.value = "";
  rol_id.value = "";
};

watchEffect(() => {
    
    use_email.value = props.use_email
    rol_id.value = props.rol_id
  })

onMounted(async () => {
  await rolStore.readRol(); // Asegúrate de tener una función que cargue los roles.
});
</script>

<style scoped>
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
