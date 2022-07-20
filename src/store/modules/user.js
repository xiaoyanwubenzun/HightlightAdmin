// import { login, logout, getInfo } from "@/api/user"
import { login, logout, getInfo } from "@/api/user"
import { getToken, setToken, removeToken } from "@/utils/auth"
// import { resolve } from "core-js/fn/promise"
// import router, { resetRouter } from "@/router"

const state = {
	token: getToken(),
	// name: "",
	// avatar: "",
	// introduction: "",
	// roles: [],
	user_info: {},
	img: [
		"http://localhost:8090/public/img/image2019-09-08ompu2.jpg",
		"http://localhost:8090/public/img/image2019-09-08ompu8.png",
		"http://localhost:8090/public/img/image2019-09-08ompu13.jpg",
		"http://localhost:8090/public/img/image2019-09-08ompu29.jpg",
		"http://localhost:8090/public/img/image2019-09-08ompu30.jpg",
		"http://localhost:8090/public/img/image2019-09-08ompu41.jpg",
		"http://localhost:8090/public/img/image2019-09-08ompu59.jpg",
		"http://localhost:8090/public/img/image2019-09-08ompu61.jpg",
		"http://localhost:8090/public/img/image2019-09-08ompu117.jpg",
		"http://localhost:8090/public/img/image2019-09-08ompu123.png",
	],
	backgroundStyle: "",
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	// SET_INTRODUCTION: (state, introduction) => {
	//     state.introduction = introduction
	// },
	// SET_NAME: (state, name) => {
	//     state.name = name
	// },
	// SET_AVATAR: (state, avatar) => {
	//     state.avatar = avatar
	// },
	// SET_ROLES: (state, roles) => {
	//     state.roles = roles
	// },
	SET_USER_INFO: (state, user_info) => { 
		state.user_info = user_info;
	},
	SET_BG_STYLE: (state, style) => {
		state.backgroundStyle = style;
	},
}

const actions = {
	// user login
	login({ commit }, userInfo) {
		const { username, password,verify_code } = userInfo
		return new Promise((resolve, reject) => {
			login({ username: username.trim(), password: password, verify_code: verify_code }).then(response => {
				commit("SET_TOKEN", response.data.token)
				commit("SET_USER_INFO", response.data.user_info)
				setToken(response.data.token)
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},
	// get user info
	getInfo({ commit }) {
		return new Promise((resolve, reject) => {
			getInfo().then(response => {
				commit("SET_USER_INFO", response.data.user_info)
				
				// const { data } = response

				// if (!data) {
				// 	reject("Verification failed, please Login again.")
				// }

				// const { roles, name, avatar, introduction } = data

				// // roles must be a non-empty array
				// if (!roles || roles.length <= 0) {
				// 	reject("getInfo: roles must be a non-null array!")
				// }
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},

	// user logout
	logout({ commit, state }) {
		return new Promise((resolve, reject) => {
			logout().then((response) => {
				commit("SET_TOKEN", "")
				commit("SET_USER_INFO", {})
				removeToken()
				// resetRouter()
				resolve(response)
			}).catch(error => {
				reject(error)
			})
		})
	},

	// remove token
	resetToken({ commit }) {
		return new Promise(resolve => {
			commit("SET_TOKEN", "")
			commit("SET_USER_INFO", {})
			removeToken()
			resolve()
		})
	},

	setBgStyle({ commit, state }) {
		// return new Promise(resolve => { 
		// 	commit("SET_IMG", imgName);
		// 	resolve()
		// })
		let imgName = state.img[Math.floor(Math.random() * 10)]; //进行计算随机
		commit("SET_BG_STYLE", "background-image:url(" + imgName + ");background-repeat: no-repeat;background-size: cover;background-position: center;background-position-y: 61px;");
	},

	// Dynamically modify permissions
	// changeRoles({ commit, dispatch }, role) {
	//     return new Promise(async resolve => {
	//         const token = role + "-token"
	//
	//         commit("SET_TOKEN", token)
	//         setToken(token)
	//
	//         const { roles } = await dispatch("getInfo")
	//
	//         resetRouter()
	//
	//         // generate accessible routes map based on roles
	//         const accessRoutes = await dispatch("permission/generateRoutes", roles, { root: true })
	//
	//         // dynamically add accessible routes
	//         router.addRoutes(accessRoutes)
	//
	//         resolve()
	//     })
	// }
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
