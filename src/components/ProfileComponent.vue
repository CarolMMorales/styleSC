<template>
  <!-- componente para ir al perfil y cerrar sesión -->
  <div class="dropdown">
    <img
      class="img img-thumbnail dropdown-toggle"
      :src="profileImage"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    />
    <ul class="dropdown-menu">
      <li>
        <div class="container">
          <div class="row">
            <div class="col-2 pr-2">
              <div class="position-relative">
                <img class="img-perfil" :src="localImage" />
                <div class="overlay">
                  <i class="ri-pencil-line"></i>
                </div>
              </div>
            </div>
            <div class="col-10">
              <div>
                <p class="name fw-semibold mb-1">
                  {{ profileStore.profile.per_name }}
                  {{ profileStore.profile.per_lastname }}
                </p>
                <p class="mail mb-0">{{ profileStore.profile.use_email }}</p>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li><hr class="dropdown-divider"></li>
      <li>
        <div class="container">
          <RouterLink to="/userProfile" class="text-decoration-none">
            <div class="link">
              <div class="dropdown-item">{{ $t("titles.profile") }}</div>
            </div>
          </RouterLink>
        </div>
      </li>
      <li>
        <div class="container">
          <div class="link">
            <a @click="logoutUser" class="dropdown-item">{{ $t("titles.exit") }}</a>
          </div>
        </div>
      </li>
      <li><hr class="dropdown-divider"></li>
    </ul>
  </div>
</template>

<script setup>
import { useAuthStore } from "../stores/authStore";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { useProfileStore } from "../stores/profileStore";
import { ref, onMounted } from "vue";

// Importa la imagen local desde assets
const localImage = new URL('../assets/perfil.jpg', import.meta.url).href;

const profileStore = useProfileStore();
const profileImage = ref(localImage);

const router = useRouter();
const userAuth = useAuthStore();

onMounted(async () => {
  await profileStore.readPersonDetailsById();
});

const logoutUser = async () => {
  await userAuth.logout();
  router.push("/");
};
</script>


<style lang="scss" scoped>
// estilos para que la imagen y el menu funcionen correctamente 
.img {
  width: 65px; /* Ancho automático para mantener la proporción */
  height: 65px; /* Establece una altura fija según tus necesidades */
  border-radius: 50%; /* Hace que la imagen sea redonda */
  object-position: center top;
  object-fit: cover;
}
.img-perfil {
  width: 58px; /* Ancho automático para mantener la proporción */
  height: 55px; /* Establece una altura fija según tus necesidades */
  border-radius: 50%; /* Hace que la imagen sea redonda */
  object-position: center top;
  object-fit: cover;
  padding-right: 5px;
}
p {
  margin: 0 10px;
}
.name {
  font-size: 15px;
}
.mail {
  font-size: 14px;
}
.link {
  margin-left: 18%;
}
.dropdown-menu {
  width: 300px;
  --bs-dropdown-link-active-bg: #885199;
}


.position-relative {
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5); /* Capa de superposición negra con transparencia */
  opacity: 0;
  transition: opacity 0.3s ease; /* Transición de opacidad suave */
}

.overlay:hover {
  opacity: 1; /* Mostrar la capa de superposición al pasar el cursor */
  object-position: center top;
  cursor: pointer;

}
.ri-pencil-line {
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Centrar el ícono horizontal y verticalmente */
}
</style>
