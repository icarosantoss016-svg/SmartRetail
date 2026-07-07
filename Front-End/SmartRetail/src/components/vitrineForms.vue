<template>
    <form @submit.prevent="handleSubmit">
        <div class="row">
            <div class="col-md-8 mb-3">
                <label class="form-label">Localização da Vitrine</label>
                <input
                    v-model="form.localizacao"
                    type="text"
                    class="form-contro"
                    placeholder="Ex: Corredor Principal, Loja1..."
                    required/>
            </div>

            <div class="col-md-4 mb-3">
                <label class="form-label">Status</label>
                <select v-model="form.statusVitrine" class="form-select" required>
                    <option value="ATIVA">ATIVA</option>
                    <option value="DESATIVADA">DESATIVADA</option>
                    <option value="MANUTENÇÃO">MANUTENÇÃO</option>
                </select>
            </div>

            <div class="d-flex justify-content-end gap-2 mt-2">
                <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Cancelar</button>
                <button type="submit" class="btn btn-primary">
                    {{ vitrine ? 'Salvar alterações' : 'Cadastrar Vitrine' }}
                </button>
            </div>

        </div>
    </form>
</template>

<script setup>

import vitrine from '@/store/modules/vitrine';
import { reactive, watch } from 'vue'

const props = defineProps({
    vitrine:{
        type: Object,
        defautl:null
    }
})

const emit = defineEmits(['submit','cancel'])

const form = reactive({
    idVitrine:null,
    localizacao:'',
    statusVitrine:'ATIVA'
})

watch(()=>props.vitrine,(vitrineSelecionada)=>{
    if(vitrineSelecionada){
        form.idVitrine=vitrineSelecionado.idVitrine,
        form.localizacao=vitrineSelecionado.localizacao,
        form.statusVitrine=vitrineSelecionado.statusVitrine
    }else{
        form.idVitrine=null,
        form.localizacao='',
        form.statusVitrine='ATIVA'
    }
}, 
{immediate:true}
)

function handleSubmit(){
    emit('submit',{...form})
}
</script>