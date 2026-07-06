<template>
  <div
    :style="estiloFundo"
    class="container-fluid vh-100 bg-dark text-white d-flex flex-column justify-content-center align-items-center"
  >
    <div v-if="estaCarregando" class="text-center" style="z-index: 2;">
      <div class="spinner-border text-light" role="status"></div>
      <p class="mt-2">Sincronizando...</p>
    </div>

    <div
      v-else-if="produtoAtual"
      class="card bg-dark text-white shadow-lg p-3"
      style="border-radius: 15px; max-width: 400px; z-index: 2;"
    >
      <img :src="produtoAtual.imagem" class="card-img-top rounded" alt="Produto">

      <div class="card-body text-center">
        <h2 class="card-title">{{ produtoAtual.nome }}</h2>
        <h5 class="text-muted">
          {{ produtoAtual.categoria }} | {{ produtoAtual.tipoTecido }}
        </h5>
        <h1 class="display-4 text-success mt-3">
          R${{ produtoAtual.preco }}
        </h1>
      </div>
    </div>

    <div v-else class="text-center" style="z-index: 2;">
      <h2 class="fw-light">Aproxime o produto para interagir</h2>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import api from '@/service/api'; 

export default {
  name: 'VitrineView',
  data() {
    return {
      corCamera: '#00E5FF',
      timer: null,
      idVitrine: 1
    }
  },
  computed: {
    ...mapGetters('produto', ['produtoAtual', 'estaCarregando']),
    
    estiloFundo() {
      if (this.produtoAtual) {
        return {
          boxShadow: `inset 0 0 150px ${this.produtoAtual.cor}`,
          transition: 'box-shadow 1.5s ease-in-out'
        }
      }
      return {
        boxShadow: `inset 0 0 150px ${this.corCamera}`,
        transition: 'box-shadow 1.5s ease-in-out'
      }
    },
  },

  methods: {
    ...mapActions('produto', ['buscarProduto', 'limparTela']),

    async checarVitrineEstado() {
      try {
        const resposta = await api.get(`/vitrine/${this.idVitrine}/estado`);
        const estado = resposta.data;

        if (estado.corCamera) {
          this.corCamera = estado.corCamera;
        }

        if (estado.produtoId) {
          if (!this.produtoAtual || this.produtoAtual.produtoId !== estado.produtoId) {
            this.buscarProduto({
              produtoId: estado.produtoId,
              idVitrine: this.idVitrine
            });
          }
        } else {
          if (this.produtoAtual) {
            this.limparTela();
          }
        }
      } catch (error) {
        console.error("Erro ao checar a vitrine:", error);
      }
    }
  },

  mounted() {                                
    console.log('Tela ligada. Aguardando NFC.');

    this.timer = setInterval(() => {
      this.checarVitrineEstado();
    }, 1000);
  },

  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
</script>