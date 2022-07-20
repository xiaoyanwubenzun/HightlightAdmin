<template>
    <div>
        <HighlightHeader class="header-view-video"></HighlightHeader>
        <div class="view-video clear-float" :style="backgroundStyle">
            <div class="author-message">
                <div class="author-img-name">
                    <img class="author-img" :src="user_info.userimg" alt="" />
                    <span @click.stop="watchVideo(user_info.uid)">
						{{user_info.username}}
					</span>
                    <i><img :src="user_info.gender===0?'../../img/icons/wan_sex_unknow.png':(user_info.gender===1?'../../img/icons/wan_sex_m.png':'../../img/icons/wan_sex_w.png')" alt="" /></i>
                </div>
                <div class="author-popular-get">
                    <ul>
                        <li>
                            <i class="el-icon-video-camera"></i>
                            <span>
								发布集锦：
								<i>{{ user_info.sumvideo }}</i>
							</span>
                        </li>
                        <li>
                            <i class="el-icon-star-off"></i>
                            <span>
								获得点赞：
								<i>{{ user_info.sumlikecount }}</i>
							</span>
                        </li>
                        <li>
                            <i class="el-icon-view"></i>
                            <span>
								集锦被浏览总量：
								<i>{{user_info.sumwatchnum}}</i>
							</span>
                        </li>
                    </ul>
                </div>
                <div class="author-personal-message">
                    <ul>
                        <li>
                            <i class=""></i>
                            <span>
								星座：
								<i>{{ user_info.consttell }}</i>
							</span>
                        </li>
                        <li>
                            <i class=""></i>
                            <span>
								喜欢的游戏：
								<i>{{ user_info.gamelike }}</i>
							</span>
                        </li>
                        <li>
                            <i class=""></i>
                            <span>
								个性签名：
								<i>{{ user_info.usersign }}</i>
							</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="view-video">
                <div class="video-item">
                    <h2>{{ video.vtitle }}</h2>
                    <div class="video-date-play-count clear-float">
                        <ul>
                            <li>
                                <i class="el-icon-date"></i>
                                <span>{{new Date(video.createtime).toLocaleDateString()}}</span>
                            </li>
                            <li>
                                <i class="el-icon-video-play"></i>
                                <span>播放量：</span>
                                {{ video.watchnum }}
                            </li>
                        </ul>
                    </div>
                    <div class="xyw-video" id="video-el">
<!--                        <video-->
<!--                                controls="controls"-->
<!--                                preload="false"-->
<!--                                :poster="video.fengmian"-->
<!--                                :src="video_src"-->
<!--                        ></video>-->
                    </div>
                </div>
                <div class="popular-point">
                    <ul>
                        <li>
                            <i><img src="../../assets/icons/game.png" alt="" /></i>
                            <span>
								{{ video.videotype }}
							</span>
                        </li>
                        <li @click="openAddComment()">
                            <i class="el-icon-chat-dot-square"></i>
                            <span>评论：</span>
                            {{video_comment_list.length }}
                        </li>
                        <li @click="addLikeCountWeb()">
                            <i class="el-icon-star-off"></i>
                            <span>点赞：</span>
                            <span>
								{{ video.likecount }}
							</span>
                        </li>
                    </ul>
                </div>
                <div class="video-content" v-html="video_content"></div>
            </div>
            <div class="comment-area">
                <template v-if="video_comment_list.length>0">
                    <div
                            v-for="item in video_comment_list"
                            :key="item.cid"
                            class="each-comment clear-float"
                    >
                        <img :src="item.userimg" alt="图片" />
                        <span>{{ item.username }}</span>
                        <div class="comment-content">
                            <p>{{ item.content }}</p>
                        </div>
                        <p class="comment-createtime">
                            {{ new Date(item.createtime).toLocaleString() }}
                        </p>
                    </div>
                </template>
                <template v-else>
                    <div class="each-comment clear-float">
                        <img src="http://localhost:8090/public/imgupload/defaultuserimg.jpg" alt="图片" />
                        <span>默认用户</span>
                        <div class="comment-content">
                            <p>还没有评论哦</p>
                        </div>
                        <p class="comment-create-time">1998/6/29 20:30:00</p>
                    </div>
                </template>
            </div>
            <div :class="comment_style">
                <el-input
                        type="text"
                        placeholder="发个友善的评论吧(Enter)"
                        v-model="comment"
                        maxlength="200"
                        show-word-limit
                        @keydown.enter.native="addComment()"
                >
                </el-input>
                <el-button
                        @click="addComment()"
                        class="comment-button"
                        type="primary"
                        icon="el-icon-s-promotion"
                >
                    发表
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import HighlightHeader from "@/components/HighlightHeader.vue";
    import { getVideoData,updateVideoPopularCount } from "@/api/video";
    import { createComment,getCommentList } from "@/api/comment";
    import { deepClone } from "@/utils";
    export default {
        name: "viewVideo",
        data() {
            return {
                vid: "",
                // uid: "",
                user_info: {},
                video: "",
                video_content: "",
                video_src: "",
                video_comment_list: [],
                // gender: 1,
                // constellation: "肉做的",
                constellation_options: [
                    {
                        value: 1,
                        label: "水瓶座",
                    },
                    {
                        value: 2,
                        label: "双鱼座",
                    },
                    {
                        value: 3,
                        label: "白羊座",
                    },
                    {
                        value: 4,
                        label: "金牛座",
                    },
                    {
                        value: 5,
                        label: "双子座",
                    },
                    {
                        value: 6,
                        label: "巨蟹座",
                    },
                    {
                        value: 7,
                        label: "狮子座",
                    },
                    {
                        value: 8,
                        label: "处女座",
                    },
                    {
                        value: 9,
                        label: "天枰座",
                    },
                    {
                        value: 10,
                        label: "天蝎座",
                    },
                    {
                        value: 11,
                        label: "射手座",
                    },
                    {
                        value: 12,
                        label: "魔羯座",
                    },
                ],
                is_like: false,
                backgroundStyle: "",
                comment: "",
                comment_style: "comment",
                flag: false,
                player: null
            };
        },
        components: { HighlightHeader },
        computed: {
            // format_constellation(){
            //     console.log(this.user_info)
            //     return this.constellation_options[this.user_info.consttell].label;
            // },
            // format_gender_img(){
            //     return this.user_info.gender===0?"../../img/icons/wan_sex_unknow.png":(this.user_info.gender===1?"../../img/icons/wan_sex_m.png":"../../img/icons/wan_sex_w.png");
            // }
        },
        methods: {
            async getVideoMessage() {
                let player;
                let res = await getVideoData({vid: this.vid,uid: this.user_info.uid}).then(res => res).catch((err) => {console.log(err)});
                if(res){
                    if(res.code===200){
                        this.user_info = deepClone(res.data.user);
                        this.video = deepClone(res.data.video);
                        this.video_comment_list = deepClone(res.data.comment);
                        // console.log(this.user);
                        // console.log(this.video.vcontent);
                        // console.log(this.video.vcontent.match(/\<video.*?\<\/video\>/)[0]);
                        let old_video_content = this.video.vcontent.match(/\<video.*?\<\/video\>/)?this.video.vcontent.match(/\<video.*?\<\/video\>/)[0]:"";
                        this.video_content = this.video.vcontent.replace(old_video_content, "");
                        let video_reg = /<video[^<>]*? src="([^<>]*?)"/gim;
                        let video_src_reg = /(?<=(src="))[^"]*?(?=")/gim;
                        let video = this.video.vcontent.match(video_reg)?this.video.vcontent.match(video_reg)[0]:"";
                        this.video_src = video.match(video_src_reg)?video.match(video_src_reg)[0]:"";
                        player = new uumPlayer("video-el", {
                            poster: this.video.fengmian,
                            src: this.video_src,
                            loop: true,
                            playsinline: true,
                            MS: {
                                hls: {},
                            },
                        });
                        // player.play();

                        // 自动播放


                        this.$message.success(`欢迎观看${res.data.user.username}的视频`);
                    } else {
                        this.$message.error(res.message);
                    }
                }
            },
            addLikeCountWeb() {
                this.is_like = !this.is_like;
                let like = document.querySelector(".popular-point ul li:nth-child(3) i");
                if (this.is_like == true) {
                    like.className = "el-icon-star-on";
                    like.style.color = "rgb(0, 140, 255)";
                    like.parentElement.style.color = "rgb(0, 140, 255)";
                    like.nextSibling.nextSibling.innerText = Number(like.nextSibling.nextSibling.innerText) + 1;
                } else if (this.is_like == false) {
                    like.className = "el-icon-star-off";
                    like.style.color = "black";
                    like.parentElement.style.color = "black";
                    like.nextSibling.nextSibling.innerText = Number(like.nextSibling.nextSibling.innerText) - 1;
                }
            },
            async addLikeCountSql() {
                let res = await updateVideoPopularCount({vid: this.vid}).then(res => res).catch((err) => {console.log(err)});
                if(res){
                    if(res.code===200){
                        this.$message.success(res.message);
                        this.refreshComment();
                    } else {
                        this.$message.error(res.message);
                    }
                }
            },
            openAddComment() {
                this.flag = !this.flag;
                // console.log( "dom前"+this.flag);
                // this.flag==true?document.querySelector(".comment").style.right = "115px":document.querySelector(".comment").style.right = "-200px!important";
                if (this.flag) {
                    this.comment_style = "show-add-comment";
                } else {
                    this.comment_style = "comment";
                }
                //  console.log( "dom后"+this.flag);
            },
            async addComment() {
                if (!this.comment) {
                    this.$message.warning("评论不能为空哦");
                    return;
                }
                let res = await createComment({uid: this.user_info.uid,vid: this.vid,content: this.comment,}).then(res => res).catch((err) => {console.log(err)});
                if(res){
                    if(res.code===200){
                        this.$message.success(res.message);
                        this.refreshComment();
                    } else {
                        this.$message.error(res.message);
                    }
                }
            },
            async refreshComment() {
                let res = await getCommentList({vid: this.vid}).then(res => res).catch((err) => {console.log(err)});
                if(res){
                    if(res.code===200){
                        this.video_comment_list = deepClone(res.data.comment);
                        this.comment = "";
                    } else {
                        this.$message.error(res.message);
                    }
                }
            },
            watchVideo(uid) {
                this.$router.push(`/user-zone?uid=${uid}`);
            },
            // getUserInfo(res){
            //     this.user_info = deepClone(res);
            // }
        },
        created() {
            this.vid = this.$router.currentRoute.query.vid;
            // this.uid = sessionStorage.getItem("who");
            this.getVideoMessage();
        },
        mounted() {
            // let guankanjijin = document.querySelector(".el-menu-item:nth-child(5)");
            // guankanjijin.className = "el-menu-item is-active";
            this.$store.dispatch("common/setBgStyle");
            this.backgroundStyle = this.$store.getters.backgroundStyle;
        },
        beforeDestroy() {
            if (this.is_like) {
                this.addLikeCountSql();
            }
        },
    };
</script>

<style lang="scss">
    .header-view-video {
        position: fixed;
        z-index: 100;
    }
    .view-video {
        height: 120vh;
        /*height: 1296px;*/
        position: relative;
        overflow: hidden;
        .author-message,
        .view-video,
        .comment-area {
            border-radius: 10px;
            transition: all 0.2s ease-in-out;
            float: left;
        }
        .author-message:hover,
        .view-video:hover,
        .comment-area:hover,
        .each-comment:hover {
            box-shadow: 5px 5px 5px rgba(14, 13, 13, 0.747);
        }
        .author-message {
            margin-top: 25vh;
            /*margin-top: 270px;*/
            margin-left: 20px;
            width: 25vw;
            height: 40vh;
            /*height: 432px;*/
            background-color: rgba(250, 235, 215, 0.7);
            .author-img-name .author-img {
                margin-top: 15px;
                margin-left: 50px;
                height: 50px;
                width: 50px;
                border-radius: 50%;
                object-fit: cover;
            }
            .author-img-name span {
                white-space: nowrap;
                font-style: normal;
                font-weight: bold;
                color: #409eff;
            }
            .author-img-name span:nth-child(2):hover {
                cursor: pointer;
                color: #f28123;
            }
            .author-img-name i img {
                position: relative;
                top: 2px;
                margin-left: 15px;
                width: 15px;
                height: 15px;
            }
            .author-popular-get ul {
                list-style: none;
                color: #559ad5;
            }
            .author-popular-get ul li {
                margin-left: 50px;
                margin-top: 10px;
            }
            .author-popular-get ul li i {
                vertical-align: bottom;
                margin-right: 5px;
            }
            .author-popular-get ul li:nth-child(1) {
                margin-left: 50px;
                margin-top: 20px;
            }
            .author-popular-get ul li span {
                font-weight: normal;
                font-size: 13px;
            }
            .author-popular-get ul li span i {
                font-style: normal;
                font-weight: normal;
                font-size: 13px;
                color: #000;
            }
            .author-personal-message {
                width: 360px;
                height: 80px;
                margin: 20px 10px 10px 10px;
                ul {
                    list-style: none;
                }
                ul li {
                    margin-left: 10px;
                    margin-top: 2px;
                }
                ul li:nth-child(3) span {
                    display: block;
                    margin-top: 5px;
                    width: 300px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                ul li span {
                    font-weight: normal;
                    font-size: 12px;
                    color: #000;
                }
                ul li span i {
                    font-style: normal;
                    font-weight: normal;
                    font-size: 13px;
                    color: brown;
                    font-family: "KaiTi";
                }
            }
        }
        .view-video {
            margin-top: 20vh;
            /*margin-top: 216px;*/
            margin-left: 2vw;
            width: 50vw;
            height: 75vh;
            /*height: 810px;*/
            background-color: rgba(255, 255, 255, 0.5);
            .video-item {
                position: relative;
                h2 {
                    text-align: left;
                    color: #504746;
                    margin: 20px 0 0 90px;
                }
                .video-date-play-count {
                    position: absolute;
                    right: 0;
                }
                .video-date-play-count ul {
                    list-style: none;
                    color: #559ad5;
                    float: right;
                    font-size: 13px;
                    margin: -16px 90px 0 0;
                }
                .video-date-play-count ul li {
                    float: left;
                    margin-left: 15px;
                }
                .video-date-play-count ul li i {
                    margin-right: 2px;
                }
            }
            .xyw-video {
                width: 39vw;
                margin: 0 auto;
                margin-top: 10px;
                video {
                    transition: all 0.2s ease-in-out;
                    width: 39vw;
                    border-radius: 5px;
                    margin-top: 3vh;
                    /*margin-top: 32.4px;*/
                }
                video:hover {
                    box-shadow: 5px 5px 5px rgba(117, 116, 116, 0.747);
                }
                // .uumPlayer,
                // .uum-gradient-bottom,
                // .uumPlayer video {
                //   border-radius: 5px;
                // }
                // .uumPlayer {
                //   transition: all 0.2s ease-in-out;
                // }
                // .uumPlayer:hover {
                //   box-shadow: 5px 5px 5px rgba(117, 116, 116, 0.747);
                // }
            }
            .popular-point {
                ul {
                    margin-top: 2vh !important;
                    /*margin-top: 21.6px!important;*/
                    list-style: none;
                    margin: 0 auto;
                    color: black;
                    font-size: 13px;
                }
                ul li {
                    float: left;
                }
                ul li:nth-child(1) i {
                    vertical-align: middle;
                }
                ul li:nth-child(1) {
                    margin-right: 18vw;
                    margin-left: 8vw;
                    i {
                        vertical-align: middle;
                    }
                }
                ul li:nth-child(2),
                ul li:nth-child(3) {
                    i {
                        font-size: 16px;
                        vertical-align: middle;
                        margin-right: 5px;
                    }
                    margin-left: 1vw;
                    cursor: pointer;
                }
                ul li:nth-child(2):hover,
                ul li:nth-child(3):hover {
                    color: rgb(0, 140, 255);
                }
            }
            .video-content {
                width: 39vw;
                height: 10vh;
                /*height: 108px;*/
                overflow: scroll;
                margin: 0 auto;
                p {
                    text-indent: 40px;
                }
            }
        }
        .comment-area {
            margin-top: 25vh;
            /*margin-top: 270px;*/
            margin-left: 1vw;
            width: 20vw;
            height: 60vh;
            /*height: 648px;*/
            background-color: rgba(250, 235, 215, 0.7);
            overflow: scroll;
            .each-comment {
                width: 90%;
                height: auto;
                margin: 0 auto;
                margin-top: 10px !important;
                background-color: rgb(255, 255, 255, 0.7);
                border-radius: 5px;
                transition: all 0.2s ease-in-out;
                img {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    float: left;
                    object-fit: cover;
                }
                span {
                    font-size: 12px;
                    color: darkred;
                }
                .comment-content {
                    margin-top: 10px !important;
                    width: 70%;
                    margin: 0 auto;
                    p {
                        font-size: 12px;
                        font-weight: 700;
                        color: gray;
                        font-family: "KaiTi";
                    }
                }
                .comment-create-time {
                    text-align: right;
                    font-size: 12px;
                    color: darkred;
                    margin-top: 5px;
                    margin-right: 10px;
                }
            }
        }
        .comment {
            position: absolute;
            bottom: 170px;
            right: -200px;
            width: 13vw;
            transition: all 1s ease-out;
        }
        .show-add-comment {
            position: absolute;
            bottom: 170px;
            right: 115px;
            width: 13vw;
            transition: all 1s ease-out;
        }
        .comment-button {
            position: absolute;
            right: -100px;
            bottom: 0;
        }
    }
</style>
