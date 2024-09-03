<template>

  <div class="container d-flex justify-content-center align-items-center mt-5">
        <div class="card p-4 shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 300px;">
            <h2 class="text-center mb-4 ">{{ $t('login.title') }}</h2>
            <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                    <label for="username" class="form-label">{{
                $t('login.email')
              }}</label>
              <div class="input-group flex-nowrap">
                <span class="input-group-text">
                  <i class="bi bi-envelope-at-fill"></i>
                </span>
                    <input type="text" id="username" 
                    v-model="use_email" class="form-control" :placeholder="$t('login.email')" required>
                    </div>
                    <span v-if="use_email === '' && mailError" v-bind:class="{
                  ' bi bi-exclamation-lg ': !mailError.isEmpty,
                  ' text-secondary ': !mailError.isEmpty
              }">
                  {{ mailError.message }}
              </span>
              <span v-else-if="mailError" v-bind:class="{
                  'bi bi-exclamation-lg': mailError.isEmpty,
                  'text-danger': mailError.isEmpty
              }">
                  {{ mailError.message }}
              </span>
                </div>
                <div class="input-group flex-nowrap">
                <span class="input-group-text">
                  <i class="bi bi-lock-fill"></i>
                </span>
                <input
                  type="password"
                  class="form-control ps-3"
                  aria-describedby="password"
                  v-model="use_password"
                  id="txtPassword"
                  :placeholder="$t('login.password')"
                  required
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
             

           
           
      <div class="mb-3 form-check ">
      <input
        class="form-check-input is-invalid text-dark "
        type="checkbox"
        value=""
        id="invalidCheck3"
        aria-describedby="invalidCheck3Feedback"
        required
        
      />
      <label class="form-check-label text-dark" for="invalidCheck3">{{ $t('login.Terms') }}</label>
      <div id="invalidCheck3Feedback" class="invalid-feedback" >
      
      </div>
    </div>
            <div class="text-center mt-3">
            
                <button
                type="submit"
                class="specialButton w-100"
                >
                {{ $t('login.Login') }}
              </button>

             
            </div>

            <div class="text-center">
              <router-link class="btn btn-link fs-6 text-center" to="/forgotPassword">{{
                $t('login.Forget')
              }}</router-link
              ><br />
              
              <br />
            </div>
            </form>
        </div>
    </div>

</template>

<script setup>
import { validateEmails, showPassword } from '../validation'
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router'

import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const use_email = ref('')
const use_password = ref('')
const authStore = useAuthStore()
const router = useRouter()
const validateMailWrapper = () => {
  return validateEmails(
    use_email.value,
    t('correo no valido')
  )
}
const mailError = computed(() => {
  return validateMailWrapper()
})

const handleSubmit = async () => {
  await authStore.access(use_email.value, use_password.value)
  const localStoragePassword = localStorage.getItem('pass');
    const localStorageDocument = localStorage.getItem('doct');
    if (localStoragePassword === localStorageDocument) {
        // Si las contraseñas cifradas y los documentos cifrados son iguales, redirigir a "/resetPassword"
        router.push("/updatePassword");
    } else {
        // Si no son iguales, redirigir a "/userProfile"
        router.push('/userProfile');
    }
}

</script>

<style>

h2{
    color: var(--purple-color)
}

.specialButton {
    background-color: var(--purple-color);
    color: #ffffff;
    border-radius: 15px;
}
</style>
  