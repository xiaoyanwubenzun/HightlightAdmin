<template>
    <div>
        <HighlightHeader @send="getUserInfo"/>
        <div class="upload-main">
            <div class="upload-cover">
                <p class="upload-cover-p">上传视频封面</p>
                <el-upload
                        class="avatar-uploader"
                        :headers="upload_header"
                        action="http://localhost:8090/upload/uploadImg"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                >
                    <img v-if="video_cover" :src="video_cover" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <!-- 富文本编辑器 -->
            <div class="my-wang-editor"></div>
            <!-- 风车 -->
            <div class="windmill">
                <div class="trunk"></div>
                <div class="trunk"></div>
                <div class="fan-leaf"></div>
                <div class="fan-leaf"></div>
                <div class="fan-leaf"></div>
                <div class="fan-leaf"></div>
            </div>

            <!-- 动态内容 -->
            <div class="video-parameter">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="动态标题">
                        <el-input
                                v-model="video_title"
                                clearable
                                placeholder="请输入标题"
                                maxlength="20"
                                show-word-limit
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="游戏类型">
                        <el-select
                                clearable
                                v-model="video_type"
                                placeholder="请选择游戏类型"
                        >
                            <el-option
                                    label="英雄联盟"
                                    value="英雄联盟"
                            ></el-option>
                            <el-option
                                    label="穿越火线"
                                    value="穿越火线"
                            ></el-option>
                            <el-option
                                    label="绝地求生"
                                    value="绝地求生"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="btn">
                <el-row>
                    <el-tooltip
                            class="item"
                            effect="dark"
                            content="搜索"
                            placement="top-start"
                    >
                        <el-button
                                disabled
                                icon="el-icon-search"
                                circle
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip
                            class="item"
                            effect="dark"
                            content="编辑"
                            placement="top-start"
                    >
                        <el-button
                                @click="focusClick()"
                                type="primary"
                                icon="el-icon-edit"
                                circle
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip
                            class="item"
                            effect="dark"
                            content="发表"
                            placement="top-start"
                    >
                        <el-button
                                @click="publishVideo()"
                                :disabled="add_cooling"
                                type="success"
                                icon="el-icon-check"
                                circle
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip
                            class="item"
                            effect="dark"
                            content="邮箱"
                            placement="top-start"
                    >
                        <el-button
                                disabled
                                type="info"
                                icon="el-icon-message"
                                circle
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip
                            class="item"
                            effect="dark"
                            content="分享"
                            placement="top-start"
                    >
                        <el-button
                                @click="drawer = true"
                                type="warning"
                                icon="el-icon-share"
                                circle
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip
                            class="item"
                            effect="dark"
                            content="清空"
                            placement="top-start"
                    >
                        <el-button
                                @click="deleteVideoAll()"
                                type="danger"
                                icon="el-icon-delete"
                                circle
                        ></el-button>
                    </el-tooltip>
                </el-row>
            </div>
            <el-drawer
                    class="chouti"
                    title="分享至"
                    :visible.sync="drawer"
                    :before-close="handleClose"
            >
                <el-row>
                    <el-tooltip
                            class="item"
                            effect="dark"
                            content="分享到QQ空间"
                            placement="top-start"
                    >
                        <el-button @click="share('qzone')" circle
                        ><img
                                src="http://qzonestyle.gtimg.cn/aoi/img/logo/favicon.ico"
                                alt=""
                        /></el-button>
                    </el-tooltip>
                    <el-tooltip
                            class="item"
                            effect="dark"
                            content="分享到新浪微博"
                            placement="top-start"
                    >
                        <el-button @click="share('sina')" type="primary" circle
                        ><img src="https://weibo.com/favicon.ico" alt=""
                        /></el-button>
                    </el-tooltip>
                    <el-tooltip
                            class="item"
                            effect="dark"
                            content="分享给QQ好友"
                            placement="top-start"
                    >
                        <el-button @click="share('qq')" type="success" circle
                        ><img
                                src="https://connect.qq.com/favicon.ico"
                                alt=""
                        /></el-button>
                    </el-tooltip>
                </el-row>
            </el-drawer>
        </div>
    </div>
</template>

<script>
    import HighlightHeader from "@/components/HighlightHeader.vue";
    import { getToken } from "@/utils/auth";
    import { createVideoArticle } from "@/api/video";
    import { deepClone } from "@/utils";
    import E from "wangeditor";
    import emoji from "../../assets/emoji/emojin.json";
    export default {
        name: "publishVideo",
        components: { HighlightHeader },
        data() {
            return {
                add_cooling: false,
                drawer: false,
                user_info: {},
                upload_header: {
                    'Highlight-Token': ""
                },
                video_title: "",
                video_content: "",
                video_text: "",
                video_type: "",
                video_cover: "",
                imageUrl: "",
                count_down_time: 60,
                publish_cooling: null,
                form: {
                    name: "",
                    region: "",
                },
            };
        },
        methods: {
            share(type) {
                //qq空间分享接口
                if (type == "qzone") {
                    window.open("https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + document.location.href + "?sharesource=qzone&title=标题&pics=图片地址&summary= 描述");
                }
                //新浪微博接口的传参
                if (type == "sina") {
                    window.open("http://service.weibo.com/share/share.php?url=" + document.location.href + "?sharesource=weibo&title=标题&pic=图片&appkey=微博平台申请的key");
                }
                //qq好友接口的传参
                if (type == "qq") {
                    window.open("http://connect.qq.com/widget/shareqq/index.html?url=" + document.location.href + "?sharesource=qzone&title=标题&pics=图片地址&summary= 描述");
                }
            },
            handleClose(done) {
                this.$confirm("确认取消分享？").then(() => {done();this.$message.warning("取消了分享！");}).catch(() => {});
            },
            countDownCooling() {
                this.publish_cooling = setInterval(() => {
                    this.timeReduce();
                    console.log("执行");
                }, 1000);
            },
            timeReduce() {
                this.count_down_time--;
                if (this.count_down_time <= 0) {
                    clearInterval(this.publish_cooling);
                    this.count_down_time = this.$options.data().count_down_time;
                    this.add_cooling = false;
                    console.log(this.count_down_time);
                }
            },
            focusClick() {
                //点击编辑聚焦到帖子内容
                // this.$refs.myQuillEditor.quill.focus();
            },
            publishVideo() {
                // console.log(this.editor.txt.text());
                //发表帖子
                // this.content = this.content.replace(<img[\s]+src[\s]*=[\s]*((['"](?<src>[^'"]*)[\'"])|(?<src>[^\s]*)));//去除标签
                let text_video = /<video/;
                if (
                    !this.video_title ||
                    !this.video_content ||
                    this.video_title.length > 20 ||
                    this.video_content.length > 10000
                ) {
                    //帖子内容验证
                    // console.log(this.video_title.length, this.video_content.length);
                    this.$message.error("标题或者内容不符合规范！");
                    return;
                } else if (!text_video.test(this.video_content)) {
                    this.$message.error("至少放入一个视频哦！");
                    return;
                } else if (!this.video_cover) {
                    this.$message.warning("没有选择视频封面哦！");
                    return;
                }
                // const content = this.video_content;
                // console.log(content);

                this.$confirm(
                    "写好动态了吗？不要发表违规内容哦, 是否发表?",
                    "提示",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    }
                )
                    .then(() => {
                        this.add_cooling = true;
                        this.countDownCooling();
                        // this.axios
                        //     .post("/uploadhightlight", {
                        //         uid: this.user_info.uid,
                        //         video_title: this.video_title,
                        //         vcontent: this.video_content,
                        //         vtext: this.video_text,
                        //         videotype: this.video_type,
                        //         fengmian: this.video_cover,
                        //     })
                        createVideoArticle({uid: this.user_info.uid,vtitle: this.video_title,vcontent: this.video_content,vtext: this.video_text,videotype: this.video_type,fengmian: this.video_cover})
                            .then((res) => {
                                if (res.code === 200) {
                                    this.$message.success("恭喜你，动态成功发布啦！发布功能将冷却60秒(视频3天内完成审核)");
                                    this.video_title = "";
                                    this.video_content = "";
                                    this.video_type = "";
                                    this.video_cover = "";
                                    this.editor.txt.clear();
                                    // this.$router.push("/");
                                } else {
                                    this.$message.error(res.message);
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消发表",
                        });
                    });
            },
            deleteVideoAll() {
                //清空帖子
                this.$confirm("此操作将清空你的动态标题和内容, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        this.video_title = "";
                        this.video_content = "";
                        this.video_type = "";
                        this.video_cover = "";
                        this.editor.txt.clear();
                        this.$message({
                            type: "success",
                            message: "清除成功!",
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消清除",
                        });
                    });
            },
            handleAvatarSuccess(res) {
                this.video_cover = res.data[0].url;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === "image/jpeg";
                const isPNG = file.type === "image/png";
                const isLt10M = file.size / 1024 / 1024 < 10;
                if (!isJPG && !isPNG) {
                    this.$message.error("上传封面图片只能是 JPG、PNG 格式!");
                }
                if (!isLt10M) {
                    this.$message.error("上传封面图片大小不能超过 10MB!");
                }
                return isJPG || (isPNG && isLt10M);
            },
            getUserInfo(res){
                this.user_info = deepClone(res);
            }
        },
        mounted() {
            // let guankanjijin = document.querySelector(".el-menu-item:nth-child(3)");
            // guankanjijin.className = "el-menu-item is-active";
            let editor = new E(".my-wang-editor");
            //图片上传设置
            editor.config.uploadImgServer = "http://localhost:8090/upload/uploadImg";
            editor.config.showLinkImg = false;
            editor.config.uploadImgHeaders = {
                // Accept: "text/x-json",
                "Highlight-Token": getToken(),
                a: 100,
            };
            editor.config.uploadImgAccept = ["jpg", "jpeg", "png", "gif", "bmp"];
            editor.config.uploadImgMaxSize = 10 * 1024 * 1024; // 2M
            editor.config.uploadImgMaxLength = 1; // 一次最多上传 1 个图片
            editor.config.uploadImgTimeout = 30 * 1000; //30s超时
            editor.config.uploadImgHooks = {
                // 上传图片之前
                // before: function (xhr) {
                //   console.log(xhr);

                //   // 可阻止图片上传
                //   return {
                //     prevent: true,
                //     msg: "需要提示给用户的错误信息",
                //   };
                // },
                // 图片上传并返回了结果，图片插入已成功
                success: function (xhr) {
                    // console.log('success', xhr)
                    // this.$message.success("图片上传并插入成功！");
                },
                // 图片上传并返回了结果，但图片插入时出错了
                fail: function (xhr, editor, resData) {
                    console.log("fail", resData);
                    // this.$message.error("图片插入文本失败！");
                },
                // 上传图片出错，一般为 http 请求的错误
                error: function (xhr, editor, resData) {
                    console.log("error", xhr, resData);
                    // this.$message.error("网络请求错误！");
                },
                // 上传图片超时
                timeout: function (xhr) {
                    console.log("timeout");
                    // this.$message.warning("图片上传超时！");
                },
                // 图片上传并返回了结果，想要自己把图片插入到编辑器中
                // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
                customInsert: function (insertImgFn, result) {
                    // result 即服务端返回的接口
                    // console.log("customInsert", result);
                    // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
                    insertImgFn(result.data[0].url);
                },
            };

            editor.config.uploadVideoServer = "http://localhost:8090/upload/uploadVideo";
            editor.config.showLinkVideo = false;
            editor.config.uploadVideoMaxSize = 500 * 1024 * 1024; // 500m
            editor.config.uploadVideoAccept = ["mp4", "webm", "wmv"];
            editor.config.uploadVideoHeaders = {
                // "Access-Control-Allow-Credentials": true,
                // "Access-Control-Allow-Origin": "http://localhost:8080",
                // "content-type": "application/json; charset=utf-8",
                "Highlight-Token": getToken(),
                a: 100,
            };
            editor.config.uploadVideoHooks = {
                // 上传视频之前
                // before: function (xhr) {
                //   console.log(xhr);

                //   // 可阻止视频上传
                //   // return {
                //   //     prevent: true,
                //   //     msg: '需要提示给用户的错误信息'
                //   // }
                // },
                // 视频上传并返回了结果，视频插入已成功
                success: function (xhr) {
                    console.log("success", xhr);
                },
                // 视频上传并返回了结果，但视频插入时出错了
                fail: function (xhr, editor, resData) {
                    console.log("fail", resData);
                },
                // 上传视频出错，一般为 http 请求的错误
                error: function (xhr, editor, resData) {
                    console.log("error", xhr, resData);
                },
                // 上传视频超时
                timeout: function (xhr) {
                    console.log("timeout");
                },
                // 视频上传并返回了结果，想要自己把视频插入到编辑器中
                // 例如服务器端返回的不是 { errno: 0, data: { url : '.....'} } 这种格式，可使用 customInsert
                customInsert: function (insertVideoFn, result) {
                    // result 即服务端返回的接口
                    console.log("customInsert", result);

                    // insertVideoFn 可把视频插入到编辑器，传入视频 src ，执行函数即可
                    insertVideoFn(result.data[0].url);
                },
            };
            //自定义 placeholder 提示文字
            editor.config.placeholder = "单张图片大小不超过10M，单个视频大小不超过500M哦，支持mp4, webm, jpg, jpeg, png,gif, bmp";

            // 配置 onchange 回调函数，将数据同步到 vue 中
            editor.config.onchange = (newHtml) => {
                this.editorData = newHtml;
                this.video_content = newHtml;
                this.video_text = this.editor.txt.text();
            };
            editor.create();
            this.editor = editor;
            const SINA_URL_PATH = "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal";
            this.editor.config.emotions = [
                {
                    title: "默认",
                    type: "image",
                    content: emoji,
                },
                {
                    title: "新浪", // tab 的标题
                    type: "image", // 'emoji' 或 'image' ，即 emoji 形式或者图片形式
                    content: [
                        {
                            alt: "[坏笑]",
                            src: `${SINA_URL_PATH}/50/pcmoren_huaixiao_org.png`,
                        },
                        {
                            alt: "[舔屏]",
                            src: `${SINA_URL_PATH}/40/pcmoren_tian_org.png`,
                        },
                        {
                            alt: "[污]",
                            src: `${SINA_URL_PATH}/3c/pcmoren_wu_org.png`,
                        },
                    ],
                },
            ];

            this.upload_header["Highlight-Token"] = getToken();
        },
        beforeDestroy() {
            // 调用销毁 API 对当前编辑器实例进行销毁
            this.editor.destroy();
            this.editor = null;
        },
    };
</script>

<style lang="scss">
    .upload-main {
        height: 100vh;
        background-image: url("../../assets/uploadhightlight/background.jpg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-position-y: 61px;
        .upload-cover {
            position: relative;
            top: 180px;
            .upload-cover-p {
                width: 200px;
                text-align: center;
                color: #f9c27f;
                white-space: nowrap;
                font-size: 20px;
            }
            .avatar-uploader .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
                border-color: #409eff;
            }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 200px;
                height: 150px;
                line-height: 150px;
                text-align: center;
            }
            .avatar {
                width: 200px;
                height: 150px;
                display: block;
            }
        }
        .my-wang-editor {
            width: 58vw;
            height: 81.5vh;
            position: absolute;
            z-index: 0;
            top: 70px;
            left: 210px;
            border-radius: 5px;
            transition: all 0.2s ease-in-out;

            .w-e-toolbar {
                border-radius: 5px 5px 0px 0px;
                background-color: rgba(255, 255, 255, 0.7) !important;
            }
            .w-e-text-container {
                height: 70vh !important;
                background-color: rgba(255, 255, 255, 0.7) !important;
                border-radius: 0px 0px 5px 5px;
            }
            .w-e-text-container .placeholder {
                color: #999999;
                position: absolute;
                font-size: 11pt;
                line-height: 22px;
                left: 10px;
                top: 10px;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                z-index: -1;
            }
        }
        .my-wang-editor:hover {
            box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);
        }

        .windmill {
            width: 300px;
            height: 300px;
            position: absolute;
            animation: rotatex 15s linear infinite;
            top: 10vh;
            right: 5vw;
            @keyframes rotatex {
                0% {
                    transform: rotate(0);
                }

                50% {
                    transform: rotate(-200deg);
                }

                100% {
                    transform: rotate(-360deg);
                }
            }

            .trunk {
                width: 300px;
                height: 2px;
                background-color: #f9c27f;
            }

            .trunk:first-child {
                position: relative;
                top: 50%;
            }

            .trunk:nth-child(2) {
                position: relative;
                top: 50%;
                transform: rotate(90deg);
                top: 147px;
            }

            .fan-leaf {
                position: absolute;
                width: 50px;
                height: 80px;
                background-color: #f9c27f;
            }

            .fan-leaf:nth-child(4) {
                position: absolute;
                top: 0px;
                left: 150px;
            }

            .fan-leaf:nth-child(3) {
                position: absolute;
                top: 220px;
                left: 99px;
            }

            .fan-leaf:nth-child(6) {
                position: absolute;
                right: 15px;
                top: 137px;
                transform: rotate(90deg);
            }

            .fan-leaf:nth-child(5) {
                position: absolute;
                left: 15px;
                top: 86px;
                transform: rotate(90deg);
            }
        }
        .video-parameter {
            position: absolute;
            bottom: 120px;
            right: 70px;
            .el-form-item__label {
                color: #f9c27f;
                white-space: nowrap;
                font-size: 20px;
            }
        }
        .btn {
            position: absolute;
            bottom: 9vh;
            right: 5vw;
        }
    }
</style>
