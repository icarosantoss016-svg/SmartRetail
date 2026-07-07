import axios from 'axios'

// Configuração base da sua API
const api = axios.create({
  baseURL: 'http://localhost:3000', // O endereço do seu back-end
})

// INTERCEPTOR DE REQUISIÇÃO (Coloca o "crachá" antes de sair)
api.interceptors.request.use(
  (config) => {
    // Pega o token que o módulo auth.js guardou no login
    const token = localStorage.getItem('token')
    
    // Se tiver token, anexa no cabeçalho de Autorização
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// INTERCEPTOR DE RESPOSTA (Lida com o que o back-end responde, incluindo o erro da linha 24)
api.interceptors.response.use(
  (response) => {
    return response // Se deu tudo certo (Status 200), deixa passar
  },
  (error) => {
    // AQUI ESTAVA O SEU ERRO (linha 24)! 
    // Você provavelmente usou apenas 'response' em vez de 'error.response'
    
    if (error.response && error.response.status === 401) {
      console.warn("Sessão expirada ou não autorizada. Faça login novamente.")
      // Opcional: Aqui você pode limpar o localStorage e forçar a volta para a tela de login
      // localStorage.removeItem('token')
      // window.location.href = '/login'
    }
    
    return Promise.reject(error)
  }
)

export default api