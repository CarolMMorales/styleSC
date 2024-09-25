<!-- vista pruincipal y molde donde iran el resto de los componentes  -->
<template>
  <div class="container-fluid justify-content-center m-2 mb-3">
    <div class="card  shadow bg-body-tertiary rounded">
      <h2 class="fw-bold text-center mt-3 fs-3">{{ $t('titles.products') }}</h2>
      <div class="card-header">
        <div class="row p-3">
          <div class="col-12 col-md-12 col-lg-12 text-end">
            <!-- boton para agregar en la tabla  -->
            <button class="btn btn-custom " type="button" data-bs-toggle="modal" data-bs-target="#createModal"><i
                class="bi bi-plus-square"></i> {{ $t('buttons.add') }}</button>
          </div>
          <div class="col-12 col-md-12 col-lg-12 text-start">
          </div>

        </div>
      </div>
      <div class="card-body">

        <!-- llamado de la tabla y el modal de agregar -->
        <TableComponent></TableComponent>
        <createComponent :edit="false"></createComponent>
      </div>
    </div>
  </div>
</template>

<script setup>
//se importan los componentes 
import TableComponent from '../components/products/TablaProductsComponent.vue';
import createComponent from '../components/products/ModalComponent.vue';

</script>

<style lang="scss" scoped>
// estilos de la vista 
.btn-custom {
  background-color: var(--purple-color);
  color: #ffffff;
  padding: 0.8rem 3rem;
  font-size: 1.25rem;
}

.btn-custom:hover {
  background-color: var(----color-background);
  color: var(--purple-color);
  border: 2px solid var(--purple-color);
}
</style>