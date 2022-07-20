<template>
    <div class="bigmain">
        <el-page-header
                class="forgetpasshead"
                @back="goBack"
                content="忘记密码"
        >
        </el-page-header>
        <div class="forgetpassmain">
            <div class="forgetpass">
                <div style="display: inline-block;">
                    <el-form
                            :model="ruleForm"
                            status-icon
                            :rules="rules"
                            ref="ruleForm"
                            label-width="100px"
                            class="demo-ruleForm myfrom"
                    >
                        <el-form-item label="手机号码" prop="tel" class="redim">
                            <el-input
                                    v-model="ruleForm.tel"
                                    placeholder="输入注册时的手机号码"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                                label="新的用户名"
                                prop="username"
                                class="redim"
                        >
                            <el-input
                                    v-model="ruleForm.username"
                                    placeholder="输入新的用户名"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="新的密码" prop="passwd">
                            <el-input
                                    type="password"
                                    placeholder="输入密码"
                                    v-model="ruleForm.passwd"
                                    autocomplete="off"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input
                                    type="password"
                                    placeholder="请再次输入密码"
                                    v-model="ruleForm.checkPass"
                                    autocomplete="off"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="密保" prop="mibao">
                            <el-input
                                    type="text"
                                    placeholder="未设置密保填没有密保"
                                    v-model="ruleForm.mibao"
                                    autocomplete="off"
                            ></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button
                                    size="small"
                                    type="primary"
                                    @click="submitForm('ruleForm')"
                            >
                                确认修改
                            </el-button>
                            <el-button
                                    size="small"
                                    @click="resetForm('ruleForm')"
                            >
                                重置
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div style="display: flex;padding-left: 1vw;height: 277px;align-items: end;">
                    <div style="width: 270px">
                        <div style="display: flex;width: 100%;align-items: end;justify-content: space-between;">
                            <div style="display: inline-block;width: 160px;height: 100px;background-color: wheat;border-radius: 5px;" v-html="yanzhengimg"></div>
                            <el-button
                                    size="small"
                                    type="primary"
                                    :disabled="!can_change_verify_code"
                                    @click="getsvgimg()"
                                    style="width: 92px;height: 32px"
                            >
                                {{count_msg}}
                            </el-button>
                        </div>
                        <div style="margin-top: 22px;display: flex;align-items: end;justify-content: space-between;">
                            <el-input
                                    class="verify-input"
                                    type="text"
                                    placeholder="输入验证码"
                                    v-model="verify_code"
                                    style="width: 160px;display: inline-block;"
                            ></el-input>
                            <span
                                    v-html="yanzhengmaerr"
                                    style="color: red;font-size: 12px;vertical-align: bottom;width: 92px;text-align: center"
                            >
							</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getVerifyImg } from "@/api/common";
    import { updateUserPassword } from "@/api/user";
    export default {
        name: "forgetPassword",
        data() {
            var checktel = (rule, tel, callback) => {
                tel = tel.replace(/\s/g, ""); //去除空格
                let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
                if (tel.length == 0) {
                    return callback(new Error("手机号不能为空"));
                }
                setTimeout(() => {
                    if (tel.length != 11) {
                        callback(new Error("手机号必须为11位数"));
                    } else {
                        if (!regs.test(tel)) {
                            callback([new Error("手机号输入不合法")]);
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            var checkusername = (rule, username, callback) => {
                if (!username) {
                    return callback(new Error("账号不能为空"));
                }
                setTimeout(() => {
                    if (username.length > 10) {
                        callback(new Error("账号必须小于10字符"));
                    } else {
                        if (username.length < 3) {
                            callback(new Error("账号必须大于3个字符"));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            var checkmibao = (rule, mibao, callback) => {
                let regzh = /^[u4E00-u9FA5]+$/;
                if (mibao.length == 0) {
                    return callback(new Error("密保不能为空"));
                }
                setTimeout(() => {
                    if (mibao.length > 10) {
                        callback(new Error("密保字符长度不能超过10"));
                    } else {
                        if (regzh.test(mibao)) {
                            callback([new Error("密保输入不合法")]);
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            var validatePass = (rule, passwd, callback) => {
                if (passwd === "") {
                    callback(new Error("请输入密码"));
                } else if (passwd.length < 6) {
                    callback(new Error("密码必须大于等于6个字符"));
                } else if (passwd.length > 10) {
                    callback(new Error("密码必须小于等于10个字符"));
                } else {
                    if (this.ruleForm.checkPass !== "") {
                        this.$refs.ruleForm.validateField("checkPass");
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, passwd, callback) => {
                if (passwd == "") {
                    callback(new Error("请再次输入密码"));
                } else if (passwd.length < 6) {
                    callback(new Error("密码必须大于等于6个字符"));
                } else if (passwd.length > 10) {
                    callback(new Error("密码必须小于10个字符"));
                } else if (passwd !== this.ruleForm.passwd) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    tel: "",
                    passwd: "",
                    checkPass: "",
                    username: "",
                    mibao: ""
                },
                rules: {
                    tel: [{ validator: checktel, trigger: "blur" }],
                    passwd: [{ validator: validatePass, trigger: "blur" }],
                    checkPass: [{ validator: validatePass2, trigger: "blur" }],
                    username: [{ validator: checkusername, trigger: "blur" }],
                    mibao: [{ validator: checkmibao, trigger: "blur" }],
                },
                verify_code: "",
                yanzhengmaerr: "",
                yanzhengimg: "",
                count: 60,
                count_msg: "获取验证码",
                can_change_verify_code: true
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(!this.verify_code){
                            this.yanzhengmaerr = "请填写验证码";
                            return false
                        }
                        if(!this.yanzhengmaerr===""){
                            this.yanzhengmaerr = "验证码有误";
                            return false
                        }
                        updateUserPassword({
                            username: this.ruleForm.username,
                            passwd: this.ruleForm.passwd,
                            tel: this.ruleForm.tel,
                            mibao: this.ruleForm.mibao,
                            verify_code: this.verify_code
                        })
                            .then((res) => {
                                // console.log(res.data);
                                const result = res;
                                switch (result.code) {
                                    case 200:
                                        this.$message.success(result.message);
                                        this.$router.push("/");
                                        break;
                                    case 0:
                                        this.$message.warning(result.message);
                                        break;
                                    case -1:
                                        this.$message.error(result.message);
                                        break;
                                    case -2:
                                        this.$message.warning(result.message);
                                        break;
                                    case -3:
                                        this.$message.error(result.message);
                                        break;
                                    case -4:
                                        this.yanzhengmaerr = result.message;
                                        break;
                                    case -5:
                                        this.yanzhengmaerr = result.message;
                                        break;
                                    default:
                                        break;
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        //   console.log("error submit!!");
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            goBack() {
                this.$router.go(-1);
            },
            setMyInterval(fn,delay,times){
                if(times>0){
                    setTimeout(() => {
                        fn()
                        times--;
                        this.setMyInterval(fn,delay,times)
                    },delay)
                }
                else {
                    this.count_msg = "重新获取";
                    this.count = 60;
                    this.yanzhengmaerr = "验证码已过期";
                    this.can_change_verify_code = true;
                }

            },
            countSeconds(){
                this.count--;
                this.count_msg = `${this.count}s`;
            },
            async getsvgimg() {
                let res = await getVerifyImg().then(res => res).catch((err) => {console.log(err);});
                if(res){
                    this.yanzhengimg = res.data.img;
                    this.setMyInterval(this.countSeconds,1000,60);
                    this.can_change_verify_code = false;
                    this.yanzhengmaerr = "";
                }
            },
        },
        watch: {

        },
        mounted(){
            // this.getsvgimg();
        }
    };
</script>

<style lang="scss" scoped>
    .bigmain {
        width: 100vw;
        height: 100vh;
        background-image: url("../../assets/forgetpass/background.jpg");
        background-size: cover;
        .forgetpasshead {
            color: #128290;
        }
        .forgetpassmain{
            padding-top: 15vh;
        }
    }
    .forgetpass {
        display: flex;
        align-items: center;
        width: 800px;
        height: 450px;
        margin: auto 100px;
        border-radius: 5px;
        background-size: cover;
        background: rgba(128, 105, 91, 0.3);
        transition: all 0.2s ease-in-out;
        transition-property: all;
        transition-duration: 0.2s;
        transition-timing-function: ease-in-out;
        transition-delay: 0s;
        .verify-input.el-input{
            width: 200px;
        }
    }
    .forgetpass:hover {
        box-shadow: 0 2px 7px rgba(37, 35, 35, 0.904);
        border-color: transparent;
    }
    .myfrom {
        width: 500px;
        height: 300px;
        font-weight: bold;
        color: gold !important;
    }
    .el-form-item__label {
        color: black !important;
    }
</style>
