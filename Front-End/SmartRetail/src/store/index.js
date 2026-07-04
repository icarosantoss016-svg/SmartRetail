import { createStore } from 'vuex'
import auth from './modules/auth'
import vitrine from '.modules/vitrine'

export default createStore({
    modules:{
        auth,
        vitrine
    }
})    