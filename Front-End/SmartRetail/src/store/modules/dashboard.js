import api from '@/service/api'

const state = {
  metricas: {
    historico: [],
    ranking:[],
    tempoMedioAtivacao:'0m 0s',
    totalScans
  },
  carregando: false,
  erro: null,
}

const getters = {
  dadosDashboard: (state) => state.metricas,
  estaCarregando: (state) => state.carregando,
}

const mutations = {
  SET_METRICAS(state, dados) {
    state.metricas = dados
  },
  SET_CARREGANDO(state, status) {
    state.carregando = status
  },
  SET_ERRO(state, erro) {
    state.erro = erro
  },
}

const actions = {
  async fetchMetricas({ commit }) {
    commit('SET_CARREGANDO', true)
    commit('SET_ERRO', null)
    
    try {
        const resposta =await api.get('/api/dashboard')
        commit('SET_METRICAS',resposta.data)
    } catch (error) {
        console.error('Erro ao buscar os dadso do dashboard.')
        commit('SET_ERRO', 'Não foi possível carregar as métrica.')
    }finally{
        commit('SET_CARREGANDO',false)
    }
  }
}

export default{
    namespaced:true,state,getters,mutations,actions
}
