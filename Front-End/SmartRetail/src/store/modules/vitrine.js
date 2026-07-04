    import api from '@/service/api'

    const state = {
    vitrines: [],
    carregando: false,
    erro: null,
    vitrineSelecionada:null
    }

    const getters = {
    todasVitrines: (state) => state.vitrines,
    vitrinesAtivas: (state) => state.vitrines.filter((v) => v.statusVitrine === 'ATIVA'),
    vitrinesDesativadas: (state) => state.vitrines.filter((v) => v.statusVitrine === 'DESATIVADA'),
    vitrinesManutencao: (state) => state.vitrines.filter((v) => v.statusVitrine === 'MANUTENÇÃO'),
    totalVitrines: (state) => state.vitrines.length,
    estaCarregando: (state) => state.carregando,
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
    },
    PACTH_VITRINE(state, vitrinePtc) {
        const index = state.vitrines.findIndex((v) => v.idVitrine === vitrinePtc.idVitrine)
        if (index !== -1) {
        state.vitrines.splice(index, 1, vitrinePtc)
        }
    },
    SEARCH_BY_ID(state, vitrineSc) {
        state.vitrineSelecionada = vitrineSc
    },
    }

    const actions = {
    async fetchVitrine({ commit }) {
        commit('SET_CARREGANDO', true)
        commit('SET_ERRO', null)

        try {
        const resposta = await api.get('/vitrine')
        commit('SET_VITRINES', resposta.data)
        } catch (error) {
        console.error('Erro ao buscar vitrines', error)
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
        })

        commit('ADD_VITRINE', resposta.data)
        return { message: 'Produto criado com sucesso.' }
        } catch (error) {
        console.error('Erro ao criar vitrine.', error)
        commit('SET_ERRO', 'Não foi possível criar vitrine.')
        } finally {
        commit('SET_CARREGANDO', false)
        }
    },

    async updadeVitrine({ commit }, vitrine) {
        commit('SET_CARREGANDO', true)
        commit('SET_ERRO', null)
        try {
        const resposta = await api.put(`/vitrine/${vitrine.idVitrine}`, {
            localizacao: vitrine.localizacao,
        })
        commit('UPDATE_VITRINE', resposta.data)
        return { message: 'Viturine atualizado com sucesso.' }
        } catch (error) {
        console.error('Erro ao atualizar a vitrine.')
        commit('SET_ERRO', 'Não foi possível atualizar a vitrine.')
        } finally {
        commit('SET_CARREGANDO', false)
        }
    },

    async deleteVitrine({ commit }, idVitrine) {
        commit('SET_CARREGANDO', true)
        commit('SET_ERRO', null)
        try {
        await api.delete(`/vitrine/${idVitrine}`)
        commit('DELETE_VITRINE', idVitrine)
        return { message: 'Vitrine deletado com sucesso.' }
        } catch (error) {
        console.error('Erro ao deletar vitrine', error)
        commit('SET_ERRO', 'Não foi posível deletar vitrine.')
        } finally {
        commit('SET_CARREGANDO', false)
        }
    },
    async alterarStatusVitrine({ commit }, vitrine) {
        commit('SET_CARREGANDO', true)
        commit('SET_ERRO', null)

        try {
        const resposta = await api.patch(`/vitrine/${vitrine.idVitrine}`, {
            statusVitrine: vitrine.statusVitrine,
        })
        commit('PACTH_VITRINE', resposta.data)
        } catch (error) {
        console.error('Erro ao atualizar a vitrine.')
        commit('SET_ERRO', 'Não foi possível atualizar a vitrine.')
        } finally {
        commit('SET_CARREGANDO', false)
        }
    },
    async searchByID({ commit }, vitrine) {
        commit('SET_CARREGANDO', true)
        commit('SET_ERRO', null)

        try {
        const resposta = await api.get(`vitrine/${vitrine.idVitrine}`)
        commit('SEARCH_BY_ID', resposta.data)
        } catch (error) {
        commit('SET_ERRO', 'Não foi possível carregar as vitrines.')
        } finally {
        commit('SET_CARREGANDO', false)
        }
    },
    }

    export default{
        namespaced: true,state, getters,mutations,actions
    }
