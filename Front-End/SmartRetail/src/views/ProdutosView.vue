<template>
  <div class="container-fluid min-vh-100 py-4">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="text-secondary m-0">Gestão de Produtos</h2>
        <button class="btn btn-primary" @click="alternarTela">
          {{ mostrandoFormulario ? 'Voltar para Lista' : 'Novo Produto' }}
        </button>
      </div>
      
      <div v-if="erro" class="alert alert-danger shadow-sm mb-4" role="alert">
        {{ erro }}
      </div>

      <div v-if="mostrandoFormulario" class="card azul-escuro-card text-white border-0 p-4 shadow">
        <ProdutoForm
          :produto="produtoEmEdicao"
          @submit="salvarProduto"
          @cancel="alternarTela"
        />
      </div>

      <div v-else>
        <ProdutoLista
          :produto="todosProdutos"
          :estaCarregando="estaCarregando"
          @editar="prepararEdicao"
          @excluir="excluirProduto"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from "vuex"
import ProdutoLista from '@/components/ProdutoLista.vue'
import ProdutoForm from '@/components/ProdutoForm.vue'

const store = useStore()

const mostrandoFormulario = ref(false)
const produtoEmEdicao = ref(null)

const todosProdutos = computed(() => store.getters['produto/todosProdutos'])
const estaCarregando = computed(() => store.getters['produto/estaCarregando'])
const erro = computed(() => store.getters['produto/erro'])

onMounted(() => {
  store.dispatch('produto/fetchProdutos')
})

function alternarTela() {
  mostrandoFormulario.value = !mostrandoFormulario.value
  if (!mostrandoFormulario.value) {
    produtoEmEdicao.value = null
  }
}

function prepararEdicao(produto) {
  produtoEmEdicao.value = produto
  mostrandoFormulario.value = true
}

async function salvarProduto(dadosDoForm) {
  if (dadosDoForm.produtoId) {
    await store.dispatch('produto/updateProduto', dadosDoForm)  
  } else {
    await store.dispatch('produto/criarProduto', dadosDoForm)
  }
  alternarTela()
}

async function excluirProduto(produtoId) {
  if (confirm("Tem certeza que deseja excluir este produto?")) {
    await store.dispatch('produto/deletarProduto', produtoId)
  }
}
</script>

