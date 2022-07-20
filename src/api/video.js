import request from "@/utils/request";

export function getVideoList(data) {
	return request({
		url: "/video/search",
		method: "post",
		data
	})
}

export function getUserHighLight(data) {
	return request({
		url: "/video/getUserHighLight",
		method: "post",
		data
	})
}

export function getHottestVideoData() {
	return request({
		url: "/video/getBestVideo",
		method: "post"
	})
}

export function getVideoData(data) {
	return request({
		url: "/video/getVideoInfo",
		method: "post",
		data
	})
}

export function updateVideoPopularCount(data) {
	return request({
		url: "/video/addLikeCount",
		method: "post",
		data
	})
}

export function createVideoArticle(data) {
	return request({
		url: "/video/uploadHighLight",
		method: "post",
		data
	})
}