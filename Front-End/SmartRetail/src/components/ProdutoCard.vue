<template>
  <div class="card bg-dark text-white border-secondary shadow-sw h-100">
    <img
      v-if="produto.imagem"
      :src="produto.imagem"
      class="card-img-top"
      style="height: 200px; object-fit: cover"
    />

    <div class="card-body d-flex flex-column">
      <h5 class="card-title text-truncate" :title="produto.nome">{{ produto.nome }}</h5>

      <h6 class="card-subtitle mb-3 text-muted">
        {{ produto.categoria }} | {{ produto.tipoTecido }}
      </h6>

      <p class="card-text mb-1 small">
        <strong>NFC:</strong> <span class="text-secodary">{{ produto.nfcTag }}</span>
      </p>

      <p class="card-text mb-3 d-flex align-items-center gap-2 small">
        <strong>Cor:</strong>
        <span
          class="rounded-circle border border-light"
          :style="{
            backgroundColor: produto.cor,
            width: '15px',
            height: '15px',
            display: 'inline-block',
          }"
        ></span>
      </p>

      <h4 class="text-success mt-auto mb-0">
        {{ formatarPreco(produto.preco) }}
      </h4>
    </div>
    <div class="card-footer bg-transparent border-secondary d-flex justify-content-between">
      <button @click="$emit('editar', produto)" 
      class="btn btn-outline-info btn-sm">Editar</button>

      <button @click="$emit('excluir', produto.produtoId)"
      class="btn btn-outline-danger btn-sm">
        Excluir
      </button>
    </div>

  </div>
</template>

<script setup>
import {formatCurrency} from '@/helpers/currency'

const props= defineProps({
    produto:{
        type:Object,
        required:true
    }
})

const emit = defineEmits(['editar','excluir'])

function formatarPreco(valor){
    return formatCurrency(valor)
}
</script>
