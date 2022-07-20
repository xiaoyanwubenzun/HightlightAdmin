import axios from "axios"
import { MessageBox, Message } from "element-ui"
import store from "@/store"
import { getToken } from "@/utils/auth"

const CancelToken = axios.CancelToken;
let cancel;

// 当token失效后后续可能存在多个携带失效token的请求,定义全局变量只一次token失效提示，或者多个请求异常错误,也只提示首次异常请求的异常信息
let num = 0;

// create an axios instance
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
	withCredentials: true, // 跨域请求时发送 cookies
	timeout: 5000, // request timeout
	cancelToken: new CancelToken(function executor(c) {
		// executor 函数接收一个 cancel 函数作为参数
		cancel = c;
	})
})
// request interceptor

// 中断请求白名单,不需要验证token的接口
const white_list = ["/user/login", "/common/svgimg"];

service.interceptors.request.use(
	config => {
		// Do something before request is sent
		if (store.getters.token) {
			// 设置的自定义请求头Highlight-Token在后端获取时变为小写highlight-token
			config.headers["Highlight-Token"] = getToken();
		}
		return config
	},
	error => {
		// Do something with request error
		console.log(error) // for debug
		Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	/**
	 * If you want to get information such as headers or status
	 * Please return  response => response
	 */
	/**
	 * 下面的注释为通过在response里，自定义code来标示请求状态
	 * 当code返回如下情况则说明权限有问题，登出并返回到登录页
	 * 如想通过 XMLHttpRequest 来状态码标识 逻辑可写在下面error中
	 * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
	 */
	response => {
		const res = response.data;
		console.log(response.config.url);
		if (res) {
			if (res.code !== 200) {
				// console.log(res);
				// 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
				if (res.code === 50008 || res.code === 50012 || res.code === 50014 || res.code === 50009) {
					// 使用CancelToken取消请求
					// token失效时后端可能接受到不只一个请求，只要有一个接口返回token失效信息，后续请求直接中断
					if (!white_list.some(item => item == response.config.url)) {
						cancel("当前登录身份失效，请重新登录!");
					}
					Message({
						message: "当前登录身份失效，请重新登录!",
						type: "error",
						duration: 5 * 1000
					})
					MessageBox.confirm("你已被登出，可以取消继续留在该页面，或者重新登录", "确定登出", {
						confirmButtonText: "重新登录",
						cancelButtonText: "取消",
						type: "warning"
					})
						.then(() => {
							store.dispatch("user/resetToken")
								.then(() => {
									// location.reload() // 为了重新实例化vue-router对象 避免bug
									window.location.href = "/";
									console.log("resetToken-success");
								})
								.catch(() => {
									console.log("resetToken-error");
								})
						})
						.catch((err) => {
							console.log(err);
						})
				}
				else {
					// console.log(res);
					return Promise.resolve(res);
				}
			}
			// console.log("200");
			return Promise.resolve(res);
		} else {
			return Promise.reject("error");
		}
	},
	error => {
	// 多个请求异常错误,只提示首次异常请求的异常信息
		num++;
		if (num<=1) { 
			console.log("err" + error) // for debug
			Message({
				message: error.message,
				type: "error",
				duration: 5 * 1000
			})
		}
		return Promise.reject(error)
	}
)

export default service
