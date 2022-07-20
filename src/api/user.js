import request from "@/utils/request"

export function login(data) {
	return request({
		url: "/user/login",
		method: "post",
		data
	})
}

export function logon(data) {
	return request({
		url: "/user/logon",
		method: "post",
		data
	})
}

export function getInfo() {
	return request({
		url: "/user/getUserInfo",
		method: "post",
	})
}

export function getUserInfoById(data) {
	return request({
		url: "/user/getUserInfoById",
		method: "post",
		data
	})
}

export function logout() {
	return request({
		url: "/user/logout",
		method: "post"
	})
}

export function getUserRanking() {
	return request({
		url: "/user/getUserRanking",
		method: "post"
	})
}

export function getUserBestVideo(data) {
	return request({
		url: "/user/getUserBestVideo",
		method: "post",
		data
	})
}

export function createUser(data) {
	return request({
		url: "/user/logon",
		method: "post",
		data
	})
}

export function updateUserPassword(data) {
	return request({
		url: "/user/changePassword",
		method: "post",
		data
	})
}

export function updateUserMessage(data) {
	return request({
		url: "/user/changeUserInfo",
		method: "post",
		data
	})
}

