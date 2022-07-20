import Vue from "vue"
import App from "@/App.vue"
import router from "@/router"
import store from "@/store"

import * as filters from "@/filters" // global filters

import ElementUI from "@/ElementUI/index.js";
import '@/style/element-variables.scss'

import '@/style/index.scss' // global css
import VueCropper from "@/VueCropper/index.js";


// Vue.prototype.axios = axios;
// axios.defaults.baseURL = "http://localhost:8090";
// axios.defaults.withCredentials = true;


Vue.use(ElementUI);
Vue.use(VueCropper);

// 过滤方法循环添加到Vue的filter上
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
	el: "#app",
	router,
	store,
	render: h => h(App)
})