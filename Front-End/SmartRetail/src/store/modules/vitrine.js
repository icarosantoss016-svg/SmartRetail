import api from '@/service/api'

const state = {
  vitrines: [],
  carregando: false,
  erro: null
}

const getters = {
  vitrine: (state) => state.vitrines,
  todasVitrines: (state) => state.vitrines,
  estaCarregando: (state) => state.carregando,
  erro: (state) => state.erro
}

const mutations = {
  SET_VITRINES(state, vitrinesDaApi) {
    state.vitrines = vitrinesDaApi
  },
  SET_CARREGANDO(state, status) {
    state.carregando = status
  },
  SET_ERRO(state, erro) {
    state.erro = erro
  },
  ADD_VITRINE(state, vitrine) {
    state.vitrines.push(vitrine)
  },
  UPDATE_VITRINE(state, vitrineAtt) {
    const index = state.vitrines.findIndex((v) => v.idVitrine === vitrineAtt.idVitrine)
    if (index !== -1) {
      state.vitrines.splice(index, 1, vitrineAtt)
    }
  },
  DELETE_VITRINE(state, idVitrine) {
    state.vitrines = state.vitrines.filter((v) => v.idVitrine !== idVitrine)
  }
}

const actions = {
  async fetchVitrine({ commit }) {
    commit('SET_CARREGANDO', true)
    commit('SET_ERRO', null)
    try {
      const resposta = await api.get('/vitrine')
      commit('SET_VITRINES', resposta.data)
    } catch (error) {
      console.error('Erro ao buscar vitrines:', error)
      commit('SET_ERRO', 'Não foi possível carregar as vitrines.')
    } finally {
      commit('SET_CARREGANDO', false)
    }
  },

  async criarVitrine({ commit }, vitrine) {
    commit('SET_CARREGANDO', true)
    commit('SET_ERRO', null)
    try {
      const resposta = await api.post('/vitrine', {
        localizacao: vitrine.localizacao,
        statusVitrine: vitrine.statusVitrine
      })
      commit('ADD_VITRINE', resposta.data)
    } catch (error) {
      console.error('Erro ao criar vitrine:', error)
      commit('SET_ERRO', 'Não foi possível criar a vitrine.')
      throw error 
    } finally {
      commit('SET_CARREGANDO', false)
    }
  },

  async updateVitrine({ commit }, vitrine) {
    commit('SET_CARREGANDO', true)
    commit('SET_ERRO', null)
    try {
      const resposta = await api.put(`/vitrine/${vitrine.idVitrine}`, {
        localizacao: vitrine.localizacao,
        statusVitrine: vitrine.statusVitrine
      })
      commit('UPDATE_VITRINE', resposta.data)
    } catch (error) {
      console.error('Erro ao atualizar vitrine:', error)
      commit('SET_ERRO', 'Não foi possível atualizar a vitrine.')
      throw error
    } finally {
      commit('SET_CARREGANDO', false)
    }
  },

  async deletarVitrine({ commit }, idVitrine) {
    commit('SET_CARREGANDO', true)
    commit('SET_ERRO', null)
    try {
      await api.delete(`/vitrine/${idVitrine}`)
      commit('DELETE_VITRINE', idVitrine)
    } catch (error) {
      console.error('Erro ao deletar vitrine:', error)
      commit('SET_ERRO', 'Não foi possível deletar a vitrine.')
      throw error
    } finally {
      commit('SET_CARREGANDO', false)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}