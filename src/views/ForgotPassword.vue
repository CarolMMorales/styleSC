<template>
  <div class="container">
    <div class="row justify-content-center align-items-center" style="height: 80vh;">
      <div class="col-md-6">
        <div class="card shadow bg-body-tertiary rounded p-5">
          <h3>{{
            $t('profile.resetPassword') }}</h3>
          <form  @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="email" class="form-label">{{
                $t('profile.email')
              }}</label>
              <input type="email" v-model="email" class="form-control" id="email" :placeholder="$t('login.email')
                  ">
            </div>
            <div class="row">
              <div class="col-md-12 d-flex justify-content-center">
                <button type="submit" class="btn btn-custom">{{ $t('header.send') }} <i
                    class="ri-send-plane-fill"></i></button>
              </div>
            </div>
          </form>
          
          <div class="text-center">
            <router-link class="btn btn-link fs-6 text-center" to="/">{{ $t('header.home') }} </router-link><br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router'


const router = useRouter()

const authStore = useAuthStore();

const email = ref('');

 // Inicialmente mostrar el primer formulario

const handleSubmit = async () => {

  await authStore.mail(email.value);
   // Obtener el objeto history para redirigir
  // Redirigir a la ruta deseada
  router.push('/forgotPassword');
    // Cambiar a mostrar el segundo formulario después de enviar el primero
};

</script>

<style lang="scss" scoped>
.btn-custom {
  background-color: var(--blue-color);
  color: #ffffff;
  padding: 1rem 4rem;
  font-size: 1.25rem;
}

.btn-custom:hover {
  background-color: var(----color-background);
  color: var(--blue-color);
  border: 2px solid var(--blue-color);
}
</style>
