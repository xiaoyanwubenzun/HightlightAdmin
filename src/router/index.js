import Vue from "vue"
import VueRouter from "vue-router"
import fa
	from "element-ui/src/locale/lang/fa";

Vue.use(VueRouter)

export const routes = [
	// {
	// 	path: "/hightlightheader",
	// 	name: "Hightlightheader",
	// 	component: () => import("@/components/Hightlightheader.vue"),
	// 	isMenu: false
	// },
	{
		path: "/",
		name: "login",
		component: () => import("@/views/login/login.vue"),
		meta: {
			name: "登录集锦系统",
		},
		isMenu: false,
		children: []
	},
	{
		path: "/logon",
		name: "logon",
		component: () => import("@/views/login/logon.vue"),
		meta: {
			name: "用户注册",
		},
		isMenu: false,
		children: []
	},
	{
		path: "/forget-password",
		name: "forgetPassword",
		component: () => import("@/views/login/forgetPassword.vue"),
		meta: {
			name: "忘记密码",
		},
		isMenu: false,
		children: []
	},

	{
		path: "/index",
		name: "index",
		component: () => import("@/views/index/index.vue"),
		meta: {
			name: "首页",
		},
		isMenu: true,
		children: []
	},
	{
		path: "/publish",
		name: "publish",
		component: () => import("@/views/publish/index.vue"),
		meta: {
			name: "发布內容",
		},
		isMenu: true,
		children: [
			{
				path: "/publish/publish-article",
				name: "publishArticle",
				component: () => import("@/views/publish/publishArticle.vue"),
				meta: {
					name: "发布动态",
				},
				isMenu: true,
				children: []
			},
			{
				path: "/publish/publish-highlight",
				name: "publishVideo",
				component: () => import("@/views/publish/publishVideo.vue"),
				meta: {
					name: "发布集锦",
				},
				isMenu: true,
				children: []
			},
		]
	},
	{
		path: "/whole",
		name: "whole",
		component: () => import("@/views/wholeArticleOrVideo/index.vue"),
		meta: {
			name: "逛一逛",
		},
		isMenu: true,
		children: [
			{
				path: "/whole/whole-article",
				name: "wholeArticle",
				component: () => import("@/views/wholeArticleOrVideo/wholeArticle.vue"),
				meta: {
					name: "新的动态",
				},
				isMenu: true,
				children: []
			},
			{
				path: "/whole/whole-video",
				name: "wholeVideo",
				component: () => import("@/views/wholeArticleOrVideo/wholeVideo.vue"),
				meta: {
					name: "用户排行",
				},
				isMenu: true,
				children: []
			},
		]
	},
	{
		path: "/view-video",
		name: "viewVideo",
		component: () => import("@/views/viewVideo/viewVideo.vue"),
		meta: {
			name: "观看集锦",
		},
		isMenu: true,
		children: [],
		beforeEnter(to, from, next) {
			if (!to.query.vid) {
				alert("别乱来");
				router.push("/");
			} else {
				next();
			}
		}
	},
	{
		path: "/user-zone",
		name: "userZone",
		component: () => import("@/views/userZone/userZone.vue"),
		meta: {
			name: "TA的主页",
		},
		isMenu: true,
		children: [],
		beforeEnter(to, from, next) {
			if (!to.query.uid) {
				alert("别乱来");
				router.push("/");
			} else {
				next();
			}
		}
	},
	{
		path: "/user-info",
		name: "userInfo",
		component: () => import("@/views/userInfo/index.vue"),
		meta: {
			name: "我的主页",
		},
		isMenu: false,
		children: []
	},
	{
		path: "/user-article",
		name: "userArticle",
		component: () => import("@/views/userInfo/userArticle.vue"),
		meta: {
			name: "我的动态",
		},
		isMenu: false,
		children: []
	},
]
// router.beforeEach((to, from, next) => {
//     // window.document.title = this.$route.meta.name;
//     // console.log(window);
//     // next();
// })

// router.beforeRouteEnter(to, from, next) {
//     window.document.title = this.$route.meta.name;
//     next();
// }

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	window.document.title = to.meta.name;
	// console.log(to.meta.name);
	// console.log(to);
	next();
})
export default router