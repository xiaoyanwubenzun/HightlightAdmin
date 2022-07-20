import request from "@/utils/request";
// import { getToken } from "@/utils/auth";

export function uploadImg(data) {
	return request({
		url: "/upload/uploadImg",
		method: "post",
		data
	})
}

export function uploadVideo(data) {
	return request({
		url: "/upload/uploadVideo",
		method: "post",
		data
	})
}
