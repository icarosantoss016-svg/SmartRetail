<template>
  <form @submit.prevent="handleSubmit">
    <div class="row">
      
      <div class="col-md-6 mb-3">
        <label class="form-label"> Nome do Produto </label>
        <input v-model="form.nome" type="text" class="form-control" required />
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label">Categoria</label>
        <input v-model="form.categoria" type="text" class="form-control" required />
      </div>

      <div class="col-md-4 mb-3">
        <label class="form-label">Cor (LED)</label>
        <input v-model="form.cor" type="color" class="form-control form-control-color w-100" required />
      </div>
      
      <div class="col-md-4 mb-3">
        <label class="form-label">Tecido</label>
        <input v-model="form.tipoTecido" type="text" class="form-control" required />
      </div>
      
      <div class="col-md-4 mb-3">
        <label class="form-label">Preço</label>
        <input v-model="form.preco" type="number" step="0.01" min="0.01" class="form-control" required/>
      </div>

      <div class="col-md-12 mb-3">
        <label class="form-label">Código NFC</label>
        <input v-model="form.nfcTag" type="number" class="form-control" required/>
      </div>

      <div class="col-md-12 mb-3">
        <label class="form-label">Imagem do Produto</label>
        <input type="file" accept="image/*" class="form-control" @change="handleImageChange" />
      </div>

      <div v-if="form.imagem" class="col-12 mb-3 text-center">
        <p class="mb-1 text-muted small">Pré-visualização</p>
        <img :src="form.imagem" class="img-thumbnail" alt="Preview" style="max-height: 150px;"/>
      </div>

      <div class="d-flex justify-content-end gap-2 mt-2">
        <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Cancelar</button>

        <button type="submit" class="btn btn-primary">
          {{ produto ? 'Salvar alterações' : 'Cadastrar Produto' }}
        </button>
      </div>

    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { fileToBase64 } from '@/helpers/image'

const props = defineProps({
  produto: {
    type: Object,
    default: null,
  }
})


const emit = defineEmits(['submit', 'cancel'])


const form = reactive({
  id: null,
  produtoId: '', 
  nome: '',
  categoria: '',
  cor: '#000000',
  tipoTecido: '',
  preco: '',
  nfcTag: '', 
  imagem: '',
})

watch(
  () => props.produto,
  (produtoSelecionado) => {
    if (produtoSelecionado) {
      form.id = produtoSelecionado.id;
      form.produtoId = produtoSelecionado.produtoId;
      form.nfcTag = produtoSelecionado.nfcTag;
      form.nome = produtoSelecionado.nome;
      form.categoria = produtoSelecionado.categoria;
      form.cor = produtoSelecionado.cor;
      form.tipoTecido = produtoSelecionado.tipoTecido;
      form.preco = produtoSelecionado.preco;
      form.imagem = produtoSelecionado.imagem || '';
    } else {
      form.id = null;
      form.produtoId = '';
      form.nfcTag = '';
      form.nome = '';
      form.categoria = '';
      form.cor = '#000000';
      form.tipoTecido = '';
      form.preco = '';
      form.imagem = '';
    }
  },
  { immediate: true }
)

async function handleImageChange(event) {
  const file = event.target.files[0]
  if (!file) return

  form.imagem = await fileToBase64(file)
}

function handleSubmit() {
  emit('submit', { ...form })
}
</script>