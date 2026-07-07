import api from '@/service/api'

const state = {
  produtos: [],
  produtoEscaneado: null,
  carregando: false,
  erro: null,
}

const getters = {
  todosProdutos: (state) => state.produtos,
  produtoAtual: (state) => state.produtoEscaneado,
  estaCarregando: (state) => state.carregando,
  quantidadeProdutos: (state) => state.produtos.length,
}

const mutations = {
  SET_PRODUTOS(state, produtos) {
    state.produtos = produtos
  },
  SET_PRODUTO_ESCANEADO(state, produto) {
    state.produtoEscaneado = produto
  },
  LIMPAR_PRODUTO_ESCANEADO(state) {
    state.produtoEscaneado = null
  },
  SET_CARREGANDO(state, status) {
    state.carregando = status
  },
  SET_ERRO(state, erro) {
    state.erro = erro
  },
  ADD_PRODUTO(state, produto) {
    state.produtos.push(produto)
  },
  UPDATE_PRODUTO(state, produtoAtt) {
    const index = state.produtos.findIndex((p) => p.produtoId === produtoAtt.produtoId)

    if (index !== -1) {
      state.produtos.splice(index, 1, produtoAtt)
    }
  },
  DELETE_PRODUTO(state, produtoId) {
    state.produtos = state.produtos.filter((p) => p.produtoId !== produtoId)
  },
}

const actions = {
  async fetchProdutos({ commit }) {
    commit('SET_CARREGANDO', true)
    commit('SET_ERRO', null)

    try {
      const resposta = await api.get('/produtos')

      commit('SET_PRODUTOS', resposta.data)
    } catch (error) {
      console.error('Erro ao buscar os produtos.', error)
      commit('SET_ERRO', 'Não foi possível buscar produtos.')
    } finally {
      commit('SET_CARREGANDO', false)
    }
  },

  async criarProduto({ commit }, produto) {
    commit('SET_CARREGANDO', true)
    commit('SET_ERRO', null)

    try {
      const resposta = await api.post('/produtos', {
        nome: produto.nome,
        categoria: produto.categoria,
        preco: produto.preco,
        cor: produto.cor,
        nfcTag: produto.nfcTag,
        tipoTecido: produto.tipoTecido,
        imagem: produto.imagem,
      })
      commit('ADD_PRODUTO', resposta.data)
    } catch (error) {
      console.error('Erro ao criar produto.', error)
      commit('SET_ERRO', 'Não foi possível criar produto.')
    } finally {
      commit('SET_CARREGANDO', false)
    }
  },

  async updateProduto({ commit }, produto) {
    commit('SET_CARREGANDO', true)
    commit('SET_ERRO', null)

    try {
      const resposta = await api.put(`/produtos/${produto.produtoId}`, {
        nome: produto.nome,
        categoria: produto.categoria,
        preco: produto.preco,
        cor: produto.cor,
        nfcTag: produto.nfcTag,
        tipoTecido: produto.tipoTecido,
        imagem: produto.imagem,
      })
      commit('UPDATE_PRODUTO', resposta.data)
    } catch (error) {
      console.error('Erro ao atualizar o produto.')
      commit('SET_ERRO', 'Não foi possível atualizar o produto.')
    } finally {
      commit('SET_CARREGANDO', false)
    }
  },

  async deletarProduto({ commit }, produtoId) {
    commit('SET_CARREGANDO', true)
    commit('SET_ERRO', null)

    try {
      await api.delete(`/produtos/${produtoId}`)
      commit('DELETE_PRODUTO', produtoId)
    } catch (error) {
      console.error('Erro ao deletar produto', error)
      commit('SET_ERRO', 'Não foi posível deletar produto.')
    } finally {
      commit('SET_CARREGANDO', false)
    }
  },

  async buscarProduto({ commit }, { produtoId, idVitrine }) {
    commit('SET_CARREGANDO', true)
    commit('SET_ERRO', null)

    try {
        const resposta =await api.get(`/produtos/${produtoId}?vitrine=${idVitrine}`)
        commit('SET_PRODUTO_ESCANEADO',resposta.data)
    } catch (error) {
        console.error("Erro ao buscar produto.",error)
        commit('SET_ERRO','Não foi possível fazer a busca do produto.')        
    }finally{
        commit('SET_CARREGANDO', false)
    }
  },
  limparTela({commit}){
    commit('LIMPAR_PRODUTO_ESCANEADO')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,    
  actions
} 