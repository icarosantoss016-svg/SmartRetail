<template>
  <div class="container-fluid px-0">
    <div v-if="estaCarregando" class="d-flex justify-content-center my-5">
      <div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>

    <div v-else-if="vitrine.length === 0" class="text-center my-5 text-muted">
      <p class="fs-5">Nenhuma Vitrine Cadastrada</p>
    </div>

    <div v-else class="table-responsive shadow-sm rounded">
      <table class="table table-dark table-hover table-striped align-middle mb-0">
        <thead>
          <tr>
            <th scope="col" class="text-center">ID</th>
            <th scope="col">Localização</th>
            <th scope="col" class="text-center">Status</th>
            <th scope="col" class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="item in vitrine" :key="item.idVitrine">
                <td class="text-center text-muted">#{{ item.idVitrine }}</td>

                <td>{{ item.localizacao }}</td>

                <td class="text-center">
                    <span class="badge" :class="codDoStatus(item.statusVitrine)">{{ item.statusVitrine }}</span>
                </td>

                <td class="text-center">
                    <div class="btn-group gap-2">
                        <button @click="$emit('editar',item)" class="btn btn-outline-info btn-sm">Editar</button>
                        <button @click="$emit('excluir',item.idVitrine)" class="btn btn-outline-danger btn-sm">Excluir</button>
                    </div>
                </td>


            </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const props =defineProps({
    vitrine:{
        type:Array,
        required:true
    },
    estaCarregando:{
        type:Boolean,
        default:false
    }
})

const emit =defineEmits(['editar','excluir'])

function corDoStatus(status){
   switch(status){
    case 'ATIVA': return 'bg-success'
    case 'DESATIVADA': return 'bg-danger'
    case 'MANUTENÇÂO': return 'bg-warning text-dark'
    default:return 'bg-secondary'
   }
}
</script>
