<template>
    <div class="main">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" id="bg1"></div>
                <div class="swiper-slide" id="bg2"></div>
                <div class="swiper-slide" id="bg3"></div>
            </div>
        </div>
        <div class="login">
            <div class="logina">
                <h1 class="logintitle">集锦系统登录</h1>
                <div class="line">
                    <img class="smallImg" src="/img/icons/login_user.png" />
                    <input
                            placeholder="请输入账号"
                            type="text"
                            v-model="username"
                    />
                </div>
                <span v-html="usernameerr" class="usernameerr err"
                >用户名错误</span
                >
                <div class="line">
                    <img class="smallImg" src="/img/icons/login_pass.png" />
                    <input
                            placeholder="请输入密码"
                            type="password"
                            v-model="password"
                            @keyup.enter="login()"
                    />
                </div>
                <span v-html="passworderr" class="passworderr err"
                >密码错误</span
                >
                <input
                        class="passrefor repass"
                        disabled
                        type="checkbox"
                        :checked="checked"
                />
                <span class="passrefor forpass" @click="forgetPassword()"
                >忘记密码</span
                >
                <span class="passrefor repassspan">记住账号密码</span>
                <div style="text-align:center">
                    <button type="button" class="logBut" @click="login()">
                        登&nbsp;&nbsp;录
                    </button>
                    <button
                            style="margin-top: 30px"
                            type="button"
                            class="logBut"
                            @click="logon()"
                    >
                        注&nbsp;&nbsp;册
                    </button>
                </div>

                <!-- <div class="yanzhengma">
                    <div v-html="yanzhengimg" class="yanzhengimg"></div>
                    <span class="yanzhengimg-span">验证码：</span>
                    <input
                        v-model="verify_code"
                        class="yanzhengimg-input"
                        type="text"
                    />
                    <span
                        v-html="yanzhengmaerr"
                        class="yanzhengmaerr err"
                    ></span>
                </div>
                <div @click="getsvgimg()" class="btn-yanzhengma">
                    看不清,换一张
                    60s
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                username: "",
                password: "",
                usernameerr: "",
                passworderr: "",
                // verify_code: "",
                // yanzhengmaerr: "",
                // yanzhengimg: "",
                checked: false,
                my_swiper: null
            };
        },
        methods: {
            async login() {
                let data = {
                    username: this.username,
                    password: this.password,
                    // verify_code: this.verify_code
                }
                if (
                    this.username == "" ||
                    this.password == ""
                // this.verify_code == ""
                ) {
                    this.$message.error("请完善必填项！");
                    return;
                } else if (this.username.length < 3 || this.username.length > 10) {
                    console.log(this.username.length);
                    this.$message.error("用户名大于等于3个字符，不得超过10个字符");
                    return;
                } else if (this.password.length < 6 || this.password.length > 10) {
                    this.$message.error("密码大于等于6个字符，不得超过10个字符");
                    return;
                } else {
                    let res = await this.$store.dispatch("user/login", data).then(res => res).catch((err) => {console.log(err);})
                    if (res.code == -1) {
                        this.usernameerr = res.message;
                        // this.getsvgimg();
                    } else if (res.code == 0) {
                        this.passworderr = res.message;
                        // this.getsvgimg();
                    } else if (res.code == -2) {
                        // this.yanzhengmaerr = res.message;
                        // this.getsvgimg();
                    } else if (res.code == 200) {
                        this.$message.success(`等你很久啦~，${this.username}，快去发布视频吧！`);
                        this.$router.push("/index");
                    }
                    // login({
                    // 		username: this.username,
                    // 		passwd: this.password,
                    // 		yanzhengma: this.yanzhengma,
                    // 	})
                    // 	.then((res) => {
                    // 		console.log(res.data);
                    // 		const data = res;
                    // 		if (data.code == -1) {
                    // 			this.usernameerr = data.message;
                    // 			this.getsvgimg();
                    // 		} else if (data.code == 0) {
                    // 			this.passworderr = data.message;
                    // 			this.getsvgimg();
                    // 		} else if (data.code == -2) {
                    // 			this.yanzhengmaerr = data.message;
                    // 			this.getsvgimg();
                    // 		} else if (data.code == 1) {
                    // 			// sessionStorage.setItem("who",result.uid);
                    // 			this.$message.success(
                    // 				`等你很久啦~，${this.username}，快去发布视频吧！`
                    // 			);
                    // 			this.$router.push("/");
                    // 		}
                    // 	})
                    // 	.catch((err) => {
                    // 		console.log(err);
                    // 	});
                }
            },
            logon() {
                this.$router.push("/logon");
            },
            forgetPassword() {
                this.$router.push("/forget-password");
            },
            // async getsvgimg() {
            // 	let res = await getVerifyImg().then(res => res).catch((err) => {console.log(err);});
            // 	if(res){
            // 		this.yanzhengimg = res.data.img;
            // 	}
            // },
            // ischecked() {
            //   this.checked = !this.checked;
            //   console.log(this.checked);
            //   if(this.checked==true){
            //   document.cookie = `username=${this.username}`;
            //   document.cookie = `passwd=${this.password}`;
            //   console.log(document.cookie);
            //   console.log(this.getCookieByKey("username"));
            // }
            // else if(this.checked==false){
            //   document.cookie=`username=""`;
            //   document.cookie = `passwd=""`;
            //   console.log(document.cookie);
            //   console.log(this.getCookieByKey("username"));
            // }
            // },
            // getCookieByKey(key) {
            //   let name = key + "=";
            //   let ca = document.cookie.split(";");
            //   for (let i = 0; i < ca.length; i++) {
            //     let c = ca[i].trim();
            //     if (c.indexOf(name) == 0) {
            //       return c.substring(name.length, c.length);
            //     }
            //   }
            //   return null;
            // },
        },
        watch: {
            username() {
                if (this.username.length < 3 || this.username.length > 10) {
                    this.usernameerr = "用户名大于等于3个字符，不得超过10个字符";
                } else {
                    this.usernameerr = "";
                }
            },
            password() {
                if (this.password.length < 6 || this.password.length > 10) {
                    this.passworderr = "密码大于等于6个字符，不得超过10个字符";
                } else {
                    this.passworderr = "";
                }
            },
        },
        mounted() {
            this.my_swiper = new Swiper(".swiper-container", {
                autoplay: true,
                speed: 5000,
                effect: "fade",
                fadeEffect: {
                    crossFade: true,
                },
            });
        },
    };
</script>

<style lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
    }
    .main {
        height: 722px;
        display: flex;
    }
    .login {
        width: 800px;
        height: 450px;
        margin: auto 100px;
        border-radius: 5px;
        background-size: cover;
        background: rgba(128, 105, 91, 0.3);
        align-self: end;
        transition: all 0.2s ease-in-out;
        transition-property: all;
        transition-duration: 0.2s;
        transition-timing-function: ease-in-out;
        transition-delay: 0s;
        position: relative;
    }
    .logintitle {
        color: #f9d2ab;
        text-align: center;
        padding-top: 10px;
    }
    .login:hover {
        box-shadow: 0 2px 7px rgba(37, 35, 35, 0.904);
        border-color: transparent;
    }

    .line {
        margin: 32px auto;
        width: 700px;
        background: #ffffffe8;
        padding: 5px 2%;
    }
    .err {
        position: absolute;
        color: red;
        font-size: 13px;
    }
    .passrefor {
        position: absolute;
        color: #00ced1;
        font-size: 13px;
    }
    .repass {
        top: 238px;
        right: 125px;
    }
    .forpass {
        top: 235px;
        right: 170px;
        cursor: pointer;
    }
    .repassspan {
        top: 235px;
        right: 40px;
        cursor: pointer;
    }
    .usernameerr {
        left: 100px;
        top: 145px;
    }
    .passworderr {
        left: 100px;
        top: 230px;
    }

    .line input {
        border: none;
        padding: 0px 1%;
        margin: 1% 0px;
        background: none;
        width: 550px;
        font-size: 16px;
        line-height: 30px;
        outline: none;
    }

    .line .smallImg {
        width: 26px;
        float: left;
        vertical-align: middle;
        margin-top: 5px;
        margin-left: 8px;
    }

    .logBut {
        background: #00ced1;
        padding: 14px 0px;
        border: none;
        color: #fff;
        font-size: 16px;
        width: 480px;
        margin-top: 10px;
        outline: none;
    }

    .logBut:hover {
        cursor: pointer;
        border-radius: 5px;
        color: wheat;
    }

    .swiper-container {
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: -1;
    }

    #bg1 {
        height: 100vh;
        background: url("/img/backgroundImage/lol_background.jpg") no-repeat;
        background-size: cover;
    }

    #bg2 {
        height: 100vh;
        background: url("/img/backgroundImage/cf_background.jpg") no-repeat;
        background-size: cover;
    }

    #bg3 {
        height: 100vh;
        background: url("/img/backgroundImage/pubg_background.jpg") no-repeat;
        background-size: cover;
    }
</style>
