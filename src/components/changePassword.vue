<!-- modal de cambiar contraseña -->
<template>
  <div class="container p-5">
    <!-- Modal -->
    <div
      class="modal fade border-primary"
      id="CambiarContrasena"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content border-primary shadow-lg">
          <div class="modal-header justify-content-center">
            <h5 class="modal-title  fw-semibold" id="exampleModalLabel">
              {{ $t('profile.titleModal') }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="cancelChanges()"
            ></button>
          </div>
          <!-- cuerpo del modal donde se pediran los datos -->
          <div class="modal-body">
            <form @submit.prevent="changePassword">
              <label for="currentPassword">{{ $t('profile.password') }} </label>
              <div class="input-group flex-nowrap">
                <input
                  type="password"
                  class="form-control ps-3"
                  aria-describedby="password"
                  v-model="currentPassword"
                  id="txtPassword"
                  required
                  autocomplete="current-password"
                />
                <span
                  v-on:click="showPassword('txtPassword')"
                  id="show_password"
                  class="btn btn-outline-dark"
                  type="button"
                >
                  <span class="icon fa fa-eye-slash"></span>
                </span>
              </div>

              <label for="newPassword">{{ $t('profile.changePassword') }} </label>
              <div class="input-group flex-nowrap">
                <input
                  type="password"
                  class="form-control ps-3"
                  aria-describedby="password"
                  v-model="newPassword"
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

              <span class="text-danger" v-if="passwordError">
                <i class="bi bi-exclamation-circle-fill"></i>
                 {{ passwordError }}
              </span> <br>

              <label for="confirmPassword">{{ $t('profile.passwordConfirm') }} </label>
              <div class="input-group flex-nowrap">
                <input
                  type="password"
                  class="form-control ps-3"
                  aria-describedby="password"
                  v-model="confirmPassword"
                  id="txtConfirmPassword"
                  required
                  autocomplete="new-password"
                />

                <span
                  v-on:click="showPassword('txtConfirmPassword')"
                  id="show_passwordConfirm"
                  class="btn btn-outline-dark"
                  type="button"
                >
                  <span class="icon fa fa-eye-slash"></span>
                </span>
              </div>
              <span v-if="confirmPassword !== ''" v-bind:class="{
                'bi bi-check-circle-fill text-success': passwordsNotMatching.isValid,
                'bi-exclamation-circle-fill text-danger': !passwordsNotMatching.isValid 
                }">
                  <i class="bi"></i> {{ passwordsNotMatching.message }}
                </span>
              <div class="row">
                <div  class="col-md-12 d-flex justify-content-center  mt-3">
                  <button  type="submit" class="btn btn-custom fw-semibold" 
                  v-bind:disabled="passwordError || !passwordsNotMatching.isValid"  data-bs-dismiss="modal" >
                  <span class="btn-content" v-if="!loading">
                    {{ $t('buttons.save') }}
                  </span>
                  <span class="btn-content" v-else>
                      <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <span role="status"> {{ $t('errors.loading') }}</span>
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//se importan las funciones utiizadas
import { useProfileStore } from '../stores/profileStore'
import {  showPassword, validatePassword, validateSame} from '../validation'
import { ref , computed} from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const profileStore = useProfileStore()
//se instancian las variables
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const message = ref('')
const status= ref('')
const loading = ref(false)
//funcion para cambiar la contraseña
const changePassword = async () => {
  try {
    const password = await profileStore.updatePassword(currentPassword.value, newPassword.value, confirmPassword.value);
    status.value = password;
    
    if (password === true) {
      clearFormFields();
     
    }
    clearFormFields();

  } catch (error) {
    // Si hay errores, muestra un mensaje de error
    message.value = 'Hubo un error al cambiar la contraseña. Por favor, inténtalo de nuevo.'
  } finally {
    
    loading.value = false
  }

}
const clearFormFields = () => {
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  message.value = ''
}

const cancelChanges = () => {
  clearFormFields()
}

const validatePasswordWrapper = () => {
  return validatePassword(
    newPassword.value,
    t('validation.password.invalidFormat')
  )
}
const passwordError = computed(() => {
  return validatePasswordWrapper()
})

const validatePasswordSameWrapper = () => {
return validateSame(
    newPassword.value,
    confirmPassword.value,
    t('validation.password.notSame'),
    t('validation.password.same')
  );
}

const passwordsNotMatching = computed(() => {
  return validatePasswordSameWrapper();

});

</script>

<style lang="scss" scoped>
.btn-custom {
  background-color: #a186a8;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.btn-custom:hover {
  background-color: var(----color-background);
  color: #a186a8;
  border: 2px solid #a186a8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  transition: 0.5s ease;
}

.btn-cancel {
  background-color: red;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.btn-cancel:hover {
  background-color: red;
  color: red;
  border: 2px solid var(--button-red-color);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  transition: 0.5s ease;
}
</style>