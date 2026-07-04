<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const login = ref('')
const senha = ref('')
const erro = ref('')
const carregando = ref(false)

async function handleSubmit(){
    erro.value = ''

    if(!login.value.trim() || !senha.value.trim()){
        erro.value = 'Preencha o login e a senha.'
        return
    }

    carregando.value = true

    try{
        await store.dispatch('auth/login', {
            login: login.value,
            senha: senha.value
        })
        router.push('/') //se login e senha existirem manda pro dashboard
    
    } catch(e){
        erro.value = e.response?.data?.error || 'Erro ao conectar com o servidor.'
    } finally{
        carregando.value= false
    }
}

</script>

<template>
    <div class="d-flex justify-content-center align-items-center vh-100 bg-light p-4">
        <div class="card shadow-sm" style="width:100%; max-width:380px">
            <div class="card-body p-4">
                <div class="text-center mb-4">
                    <i class="bi bi-shop fs-1 text-primary"></i>
                    <h4 class="mt-2 mb-0">Smart Retail</h4>
                    <small class="text-muted">Painel administrativo</small>
                </div>

                <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                        <label for="login" class="form-label">Login</label>
                        <input type="text"
                            id="login"
                            v-model="login"
                            class="form-control"
                            placeholder="Digite seu login"
                            autocomplete="username"
                        />
                    </div>

                    <div class="mb-3">
                        <label for="senha" class="form-label">Senha</label>
                        <input type="password"
                            id="senha"
                            v-model="senha"
                            class="form-control"
                            placeholder="Digite sua senha"
                            autocomplete="current-password"
                        />
                    </div>

                    <div v-if="erro" class="alert alert-danger py-2 small" role="alert">
                        {{ erro }}
                    </div>

                    <button
                        type="submit"
                        class="btn btn-primary w-100"
                        :disabled="carregando"
                    >
                        <span v-if="carregando" class="spinner-border spinner-border-sm me-2"></span>
                        {{ carregando ? 'Entrando...' : 'Entrar' }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>