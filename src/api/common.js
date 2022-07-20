import request from "@/utils/request";

export function getVerifyImg() {
	return request({
		url: "/common/svgImg",
		method: "post"
	})
}