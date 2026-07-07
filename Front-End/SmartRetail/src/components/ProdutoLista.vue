<template>
    <div class="container-fluid px-0">
        
        <div v-if="estaCarregando" class="d-flex justify-content-center my-5">
            <div class="spinner-border text-info" role="status">
                <span class="visually-hidden">Carregando...</span>
            </div>
        </div>

        <div v-else-if="produto.length === 0" class="text-center my-5 text-muted">
            <p class="fs-5">Nenhum produto cadastrado.</p>
        </div>
        
        <div v-else class="row g-4">
            <div
                v-for="item in produto"
                :key="item.produtoId"
                class="col-12 col-lg-4 col-xl-3">
                    
                    <ProdutoCard
                        :produto="item"
                        @editar="(item) => $emit('editar', item)"
                        @excluir="(id) => $emit('excluir', id)" 
                    />
            </div>
        </div>
    </div>
</template>

<script setup>
import ProdutoCard from './ProdutoCard.vue'

const props = defineProps({
    produto: {
        type: Array,
        required: true 
    },
    estaCarregando: {
        type: Boolean,
        default: false
    }
})


const emit = defineEmits(['editar', 'excluir'])
</script>