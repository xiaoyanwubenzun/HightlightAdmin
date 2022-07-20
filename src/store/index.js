import Vue from "vue"
import Vuex from "vuex"
import errorLog from "./modules/errorLog"
import user from "./modules/user"
import common from "./modules/common"
import getters from "./getters"

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		common,
		errorLog,
		user
	},
	getters
})

export default store
