<template>
    
<footer class=" text-lg-start w-100 footer ">
    <div class="text center m-2">
        <h2>{{ $t('titles.stylecs') }}</h2>
        <p>{{ $t('footer.context') }}</p>
        <p>{{ $t('footer.createby') }}</p>
    </div>
</footer>

</template>
<style>
.footer {
  /* Establece el pie de página como un elemento flexible */
  background-color: var(--slate--Gray--color);
  display: flex;
  flex-direction: column;

}

.p {
  font-size: smaller;
}

h2{
  font-size: 20px;
}

</style>
