<template>
	<div class="highlight-header">
		<el-menu
			:default-active="activeIndex"
			class="el-menu-demo clear-float"
			mode="horizontal"
			@select="handleSelect"
			background-color="#409EFF"
			text-color="#fff"
			active-text-color="#ffd04b"
		>
			<template v-for="(item,index) in routes_list">
				<template v-if="item.children.length>0">
					<el-submenu :index="item.path">
						<template slot="title">{{item.meta.name}}</template>
						<el-menu-item v-for="(one_level_children,one_level_children_index) in item.children" :index="one_level_children.path" :key="one_level_children_index">
							{{one_level_children.meta.name}}
						</el-menu-item>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.path" :key="index" :disabled="['观看集锦','TA的主页'].indexOf(item.meta.name)>-1">
						{{item.meta.name}}
					</el-menu-item>
				</template>
			</template>
<!--			<el-menu-item v-for="(item,index) in routes_list" :index="item.path" :key="index" :disabled="['观看集锦','TA的主页'].indexOf(item.meta.name)>-1">-->
<!--				{{item.meta.name}}-->
<!--			</el-menu-item>-->
			<el-menu-item class="right" style="padding: 0">
				<el-dropdown class="right">
					<div class="el-dropdown-link" style="width: 150px;margin: 0 20px;display: flex;align-items: center">
						<div style="display: inline-block">
							<img class="img-head" :src="user_info.user_img" alt=""/>
						</div>
						<div style="display: flex;color: rgb(255, 255, 255);flex-direction: column;">
							<span class="user-message-span-name-header">{{ user_info.user_name }}</span>
							<span class="user-message-span-else-header">
								<span style="line-height: 16px">
									<img :src="user_info.user_gender===0?'../../img/icons/wan_sex_unknow.png':(user_info.user_gender===1?'../../img/icons/wan_sex_m.png':'../../img/icons/wan_sex_w.png')" alt="" width="16" height="16"/>
								</span>
								<span style="color: #ffd048;padding-left: 20px;font-size: 15px;line-height: 15px">{{user_info.user_age}}</span>
							</span>
						</div>
					</div>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item
								icon="el-icon-user"
								@click.native="myZone()"
						>
							我的主页
						</el-dropdown-item>
						<el-dropdown-item
								icon="el-icon-chat-dot-square"
								@click.native="myArticle()"
						>
							我的动态
						</el-dropdown-item>
						<el-dropdown-item
								icon="el-icon-refresh"
								@click.native="changeUser()"
						>
							切换用户
						</el-dropdown-item>
						<el-dropdown-item
								icon="el-icon-circle-plus-outline"
						>
							更多功能
						</el-dropdown-item>
						<el-dropdown-item
								icon="el-icon-circle-close"
								@click.native="logout()"
						>
							退出登录
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	import { deepClone } from "@/utils";
	import { routes } from "@/router";
	export default {
		data() {
			return {
				user_info: {},
				activeIndex: "",
				options: [
					{
						value: "lol",
						label: "英雄联盟",
					},
					{
						value: "cf",
						label: "穿越火线",
					},
					{
						value: "pubg",
						label: "绝地求生",
					},
				],
				value: "",
				routes_list: []
			};
		},
		methods: {
			async changeUser() {
				await this.$store.dispatch("user/resetToken")
					.then(() => {
						// location.reload() // 为了重新实例化vue-router对象 避免bug
						this.$router.push("/");
						console.log("resetToken-success");
					})
					.catch(() => {
						console.log("resetToken-error");
					})
			},
			handleSelect(key) {
				console.log(key);
				if(key!==null&&key!==this.$route.path){
					console.log(key);
					this.$router.push(key);
				}
			},
			myZone(){
				if(this.$route.path!=="/user-info"){
					this.$router.push("/user-info");
				} else{

				}
			},

			myArticle(){
				if(this.$route.path!=="/user-article"){
					this.$router.push("/user-article");
				} else{

				}
			},

			logout() {
				//退出登录，清除服务器session
				this.$confirm("确认退出登录?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(() => {
						this.$store.dispatch("user/logout")
							.then((res) => {
								const data = res;
								if (data.code == 200) {
									this.$message.success(data.message);
									this.$router.push("/");
								}
							})
							.catch((err) => {
								console.log(err);
							});
						// this.axios
						// 	.get("/logout")
						// 	.then((res) => {
						// 		console.log(res.data);
						// 		const result = res.data;
						// 		if (result.code == 1) {
						// 			sessionStorage.removeItem("who");
						// 			this.$message.success(result.Msg);
						// 			this.$router.push("/login");
						// 		} else if (result.code == -1) {
						// 			this.$message.success(result.Msg);
						// 		}
						// 	})
						// 	.catch((err) => {
						// 		console.log(err);
						// 	});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消退出登录",
						});
					});
			},

			async getUserInfo(){
				let res = await this.$store.dispatch("user/getInfo").then( res => res).catch((err) => {console.log(err);});
				if(res){
					if (res.code === 200) {
						this.user_info = deepClone(this.$store.getters.user_info);
						// switch (this.user_info.user_gender) {
						// 	case 0:
						// 		this.user_info.user_gender ="./img/icons/wan_sex_unknow.png";
						// 		break;
						// 	case 1:
						// 		this.user_info.user_gender ="./img/icons/wan_sex_m.png";
						// 		break;
						// 	case 2:
						// 		this.user_info.user_gender ="./img/icons/wan_sex_w.png";
						// 		break;
						// 	default:
						// 		break;
						// }
						this.$emit("send",this.user_info);
					} else {
						this.$message.error(res.message);
					}
				}

			},
			refreshUserInfo(res){

			}
		},
		beforeCreate() {
			// console.log("beforeCreate");
		},
		created() {
			// console.log("created");
			this.getUserInfo();
			// if(this.$store.getters.user_info){
			// 	this.user_info = deepClone(this.$store.getters.user_info);
			// 	switch (this.user_info.user_gender) {
			// 		case 0:
			// 			this.user_info.user_gender ="./img/icons/wan_sex_unknow.png";
			// 			break;
			// 		case 1:
			// 			this.user_info.user_gender ="./img/icons/wan_sex_m.png";
			// 			break;
			// 		case 2:
			// 			this.user_info.user_gender ="./img/icons/wan_sex_w.png";
			// 			break;
			// 		default:
			// 			break;
			// 	}
			// 	// console.log(this.user_info);
			// }
			// console.log(this.$router)
		},
		beforeMount() {
			// console.log("beforeMount");
			this.routes_list = routes.filter(item => item.isMenu&&item.meta.name!=='个人信息');
		},
		mounted() {
			// this.islogin();
			// this.activeIndex2 = this.$route.path;
			// this.getusermessage()
			this.activeIndex = this.$route.path;
		}
	};
</script>

<style lang="scss">
	.right {
		float: right !important;
	}
	.img-head {
		height: 3.125rem;
		width: 3.125rem;
		background-color: white;
		object-fit: cover;
		border-radius: 50%;
	}
	.select:hover {
		background-color: rgb(64, 158, 255) !important;
	}
	a {
		font-weight: normal !important;
		color: #2c3e50;
		text-decoration: none;
	}
	.el-dropdown-link {
		cursor: pointer;
		color: #409eff;
	}
	.el-icon-arrow-down {
		font-size: 0.75rem;
	}
	.demonstration {
		display: block;
		color: #8492a6;
		font-size: 0.875rem;
		margin-bottom: 1.25rem;
	}
	.el-menu.el-menu--horizontal {
		border-bottom: solid 0.0625rem #409eff !important;
	}
	.highlight-header {
		width: 100%;
		position: fixed;
		display: block;
	}
	.user-message-span-name-header {
		width: 100px;
		display: block;
		height: 30px;
		line-height: 30px;
		padding-left: 20px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.user-message-span-else-header {
		height: 30px;
		display: flex;
		/*justify-content: space-evenly;*/
		align-items: center;
		padding-left: 20px;
	}
	.el-submenu__icon-arrow.el-icon-arrow-down {
		color: #fff;
	}
</style>
