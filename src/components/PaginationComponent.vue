<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="changePage(1)">{{ $t('pagination.first') }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">{{ $t('pagination.previous') }}</a>
      </li>
      <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber" :class="{ active: currentPage === pageNumber }">
        <a class="page-link" href="#" @click.prevent="changePage(pageNumber)">{{ pageNumber }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">{{ $t('pagination.next') }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click.prevent="changePage(totalPages)">{{ $t('pagination.last') }}</a>
      </li>
    </ul>
  </nav>
</template>


<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['currentPage', 'totalPages']);
const emit = defineEmits(['changePage']);

function changePage(pageNumber) {
  if (pageNumber >= 1 && pageNumber <= props.totalPages) {
    emit('changePage', pageNumber); // Emitir el evento changePage
  }
}
</script>

<style>
.page-link {
  color: var(--lila-color);;
}
.page-link.active, .active > .page-link {
    z-index: 3;
    color: var(--bs-pagination-active-color);
    background-color: var(--lila-color);
    border-color: var(--lila-color);;
}
.page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: var(--lila-color);
    border-color:  var(--lila-color);
}

</style>