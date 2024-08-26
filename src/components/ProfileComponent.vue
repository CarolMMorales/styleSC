<template>
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
                <img class="img-perfil dropdown-toggle" :src="profileImage" role="button" data-bs-toggle="dropdown" aria-expanded="false"/>
                <div class="overlay " data-bs-toggle="modal" data-bs-target="#updatePhoto"><i class="ri-pencil-line "></i></div>
              </div>
            </div>
            <div class="col-10">
              <div>
                <p class="name fw-semibold mb-1">
                  nombre
                </p>
                <p class="mail mb-0">use</p>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li><hr class="dropdown-divider"></li>
      <li>
        <div class="container">
          <RouterLink to="/userProfile" class="text-decoration-none"  >
            <div class="link ">
              <div class="dropdown-item">{{ $t("header.profile") }}</div>
            </div>
          </RouterLink>
        </div>
      </li>
      <li>
        <div class="container">
          <div class="link ">
            <a @click="logoutUser" class="dropdown-item">{{ $t("header.exit") }}</a>
          </div>
        </div>
      </li>
      <li><hr class="dropdown-divider"></li>
      
    </ul>
  </div>
  <!-- <changePhoto></changePhoto> -->
</template>

<script setup>

// import changePhoto from "./changePhoto.vue";
// import { useAuthStore } from "../stores/authStore";
//import { RouterLink } from "vue-router";
// import { useRouter } from "vue-router";
// import CryptoJS from "crypto-js";
// // import { useProfileStore } from "../stores/profileStore";
// import { ref, onMounted, watch } from "vue";

// const router = useRouter();
// // const userAuth = useAuthStore();
// // const profileStore = useProfileStore();

// const secretKey = "TuClaveSecreta";

// const use_id = CryptoJS.AES.decrypt(localStorage.getItem("id"), secretKey).toString(
//   CryptoJS.enc.Utf8
// );

// const profileImage = ref(profileStore.profile.use_photo);

// const updateProfileImage = (event) => {
//   profileImage.value = event.detail.newImage;
// };

// onMounted(() => {
//   // Actualizar la imagen durante la montura inicial
//   updateProfileImage({ detail: { newImage: profileStore.profile.use_photo } });
//   // Escuchar evento para actualizar la imagen
//   window.addEventListener("update-profile-image", updateProfileImage);
// });

// // Actualizar la imagen si cambia en el store
// watch(
//   () => profileStore.profile.use_photo,
//   (newValue) => {
//     profileImage.value = newValue;
//   }
// );

// const logoutUser = async () => {
//   await userAuth.logout(use_id);
//   router.push("/");
// };
</script>

<style lang="scss" scoped>
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
  --bs-dropdown-link-active-bg: #0e1f87;
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
