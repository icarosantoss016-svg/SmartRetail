import axios from 'axios'
import store from '../store'
import router from '../router'


const api = axios.create({
    baseURL:'http://localhost:3000'
})

// toda requisição ao back ele injeta o token JWT
api.interceptors.request.use((config) => {
    const token = store.state.auth.token

    if(token){
        config.headers.Autorization = `Bearer ${token}`
    }

    return config
})

//se a o token rodar (inválido ou expirado) tira o mano e joga pra tela de login dnv
api.interceptors.response.use(
    (response) => response, (error)=>{
        if(error, response && error.response.status === 403){
            store.dispatch('auth/logout')
            store.push('/login')

        }
        return Promise.reject(error)
    }
)

export default api