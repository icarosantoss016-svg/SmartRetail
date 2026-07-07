<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-white m-0">Gestão de Vitrines</h2>
      <button class="btn btn-primary" @click="alternarTela">
        {{ mostrandoFormulario ? 'Voltar para Lista' : 'Nova Vitrine' }}
      </button>
    </div>

    <div v-if="erro" class="alert alert-danger shadow-sm mb-4" role="alert">{{ erro }}</div>

    <div v-if="mostrandoFormulario" class="card bg-dark text-white border-secondary p-4 shadow">
      <VitrineForm
        :vitrine="vitrineEmEdicao"
        @submit="salvarVitrine"
        @cancel="alternarTela"    
      />
    </div>
        
    <div v-else>
      <VitrineLista
        :vitrine="todasVitrines"
        :estaCarregando="estaCarregando"
        @editar="prepararEdicao"
        @excluir="excluirVitrine"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import VitrineLista from '@/components/VitrineLista.vue'
import VitrineForm from '@/components/VitrineForms.vue' 

const store = useStore()

const mostrandoFormulario = ref(false)
const vitrineEmEdicao = ref(null)

const todasVitrines = computed(() => store.getters['vitrine/todasVitrines'] || [])
const estaCarregando = computed(() => store.getters['vitrine/estaCarregando'] || false)
const erro = computed(() => store.getters['vitrine/erro'] || null)

onMounted(() => {
  store.dispatch('vitrine/fetchVitrine')
})

function alternarTela() {
  
  mostrandoFormulario.value = !mostrandoFormulario.value

  if (!mostrandoFormulario.value) {
    vitrineEmEdicao.value = null
  }
}

function prepararEdicao(vitrine) {
  vitrineEmEdicao.value = vitrine
  mostrandoFormulario.value = true
}

async function salvarVitrine(dadosDoForm) {
  if (dadosDoForm.idVitrine) {
    await store.dispatch('vitrine/updateVitrine', dadosDoForm)
  } else {
    await store.dispatch('vitrine/criarVitrine', dadosDoForm)
  }

  if (!erro.value) {
    alternarTela()
    store.dispatch('vitrine/fetchVitrine')
  }
}

function excluirVitrine(idVitrine) {
  if (confirm('Tem certeza que deseja excluir esta vitrine?')) {
    store.dispatch('vitrine/deletarVitrine', idVitrine)
  }
}
</script>