import request from "@/utils/request";

export function createComment(data) {
	return request({
		url: "/comment/insertComment",
		method: "post",
		data
	})
}

export function getCommentList(data) {
	return request({
		url: "/comment/refreshComment",
		method: "post",
		data
	})
}