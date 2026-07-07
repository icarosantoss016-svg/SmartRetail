import { createStore } from 'vuex'
import auth from './modules/auth'
import vitrine from './modules/vitrine'
import produto from './modules/produto'
import dashboard from './modules/dashboard'

export default createStore({
    modules:{
        auth,
        vitrine,
        produto,
        dashboard
    }
})    