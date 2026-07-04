import api from '../../service/api'

export default {
    namespaced: true, 

    state:{
        token: localStorage.getItem('token') || null,
        usuario: JSON.parse(localStorage.getItem('usuario')) || null
    },
    getters:{
        estaAutenticado: (state) => !!state.token
    },
    mutations:{
        SET_AUTH(state, {token, usuario}){
            state.token = token
            state.usuario = usuario
            localStorage.setItem('token', token)
            localStorage.setItem('usuario', JSON.stringify(usuario))
        },
        LOGOUT(state){
            state.token = null
            state.usuario = null
            localStorage.removeItem('token')
            localStorage.removeItem('usuario')
        }
    },
    actions:{
        async login({ commit }, { login, senha }){
            const { data } = await api.post('auth/login', { login, senha })

            commit('SET_AUTH', { token: data.token, usuario: { login }})
        },

        logout({ commit }){
            commit('LOGOUT')
        }
    }
}   