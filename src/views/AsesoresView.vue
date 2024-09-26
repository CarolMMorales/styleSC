<template>
  <div class="">
    <div class="card shadow rounded">
      <div class="bg-gray pe-4">
        <ul class="nav nav-tabs justify-content-end">
          <li class="nav-item">
            <RouterLink to="/usersData/users" active-class="active" class="nav-link">
              <i class="ri-mail-fill"></i>
              {{ $t('titles.users') }}
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/usersData/persons" active-class="active" class="nav-link">
              <i class="ri-article-fill"></i>
              {{ $t('titles.persons') }}
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.btn-custom {
  background-color: var(--red-color);
  color: #ffffff;
  padding: 1rem 4rem;
  font-size: 1.25rem;
}
.btn-custom:hover {
  background-color: var(----color-background);
  color: var(--blue-color);
  border: 2px solid var(--blue-color);
}
.bg-gray {
  background-color: var(--slate--Gray--color);
}
a.nav-link {
  color: var(--blue-color);
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: var(--red-color);
  background-color: var(--bs-nav-tabs-link-active-bg);
  border-color: var(--bs-nav-tabs-link-active-border-color);
}
</style>
