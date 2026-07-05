<template>
  <div
    class="container-flluid vh-100 bg-dark text-white d-flex flex-colum justify-content-center align-items-center"
  >
    <div v-if="estaCarregando" class="text-center">
      <div class="spinner-border text-light" role="status"></div>
      <p class="mt-2">Lendo tag NFC...</p>
    </div>
    <div
      v-else-if="produtoAtual"
      class="card bg-dark text-white shadow-lg p-3"
      :style="{ border: '4px solid' + produtoAtual.cor, borderRadius: '15px', maxWidth: '400px' }"
    >
      <img src="produtoAtual.imagem" class="card-img-top rounded" alt="Imagem do Produto" />
      <div class="card-body text-center">
        <h2 class="card-title">{{ produtoAtual.nome }}</h2>
        <h5 class="text-muted">{{ produtoAtual.categoria }} | {{ produtoAtual.tipoTecido }}</h5>
        <h1 class="display-4 text-sucess mt-3">R$ {{ produtoAtual.preco }}</h1>

        <button @click="limparTela" class="btn btn-outline-light mt-4">Encerar Visualização</button>
      </div>
    </div>

    <div v-else class="text-center text-muted">
        <h2>Aproxime o produto do leitor NFC</h2>
    </div>

    <div class="position-fixex bottom-0 end-0 p-3 bg-secondary rounded m-3" style="opacity: 0.8;">
        <small class="text-white">Simulador de NFC</small>
        <div class="input-group input-group-sm mt-1">
            <input v-model="idTeste" type="number" class="form-control" placeholder="ID do Produto">
            <button @click="dispaararScan" class="btn btn-warning">Escanear</button>
        </div>
    </div>

  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'

export default{
    name:'VitrineView',
    data(){
        return{
            idTeste: 1,
            idVitrineFixo:1
        }
    },
    computed:{
        ...mapGetters('produto',[produtoAtual,estaCarregando])
    },

    methods:{
        ...mapActions('produtos',['buscarProduto', 'limparTela']),
        dispaararScan(){
            if(this.idTeste){
                this.buscarProduto({
                    produtoId: this.idTeste,
                    idVitrine: this.idVitrineFixo
                })
            }
        }
    }
}
</script>

<style scoped>
.card{
    transition: border-color 0.5s ease-in-out;
}
</style>