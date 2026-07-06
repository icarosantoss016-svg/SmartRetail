<template>
  <div id="app">
    <nav v-if="mostrarNavbar" class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"> Smart Retail </a>

        <button
          class="navbar-toggler"
          type="buttom"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="menuPrincipal">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link" active-class="active">Dashboard</router-link>
            </li>

            <li class="nav-item">
              <router-link to="/produtos" class="nav-link" active-class="active"
                >Produtos</router-link
              >
            </li>

            <li class="nav-item">
              <router-link to="/vitrines" class="nav-link" active-class="active"
                >Vitrines</router-link
              >
            </li>
          </ul>

          <div class="d-flex">
            <button @click="sairDoSistema" class="btn btn-outline-danger btn-sm">
              Sair do sistema
            </button>
          </div>
        </div>

      </div>
    </nav>
    <RouterView></RouterView>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  computed: {
    mostrarNavbar() {
      const rotasSemNavbar = ['/login', '/vitrine']
      return !rotasSemNavbar.includes(this.$route.path)
    },
  },
  methods: {
    ...mapActions('auth', ['logout']),

    async sairDoSistema() {
      await this.logout()
      this.$router.push('/login')
    },
  },
}
</script>

<style>
body {
  background-color: #f8f9fa;
  margin: 0;
}
</style>
