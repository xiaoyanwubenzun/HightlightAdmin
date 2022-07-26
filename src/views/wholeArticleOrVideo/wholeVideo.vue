<template>
    <div>
        <HighlightHeader/>
        <div class="all-highlight clear-float" :style="backgroundStyle">
            <div class="empty-block"></div>
            <div class="user-best-video">
                <template v-if="best_video_list.length>0">
                    <h3 class="title">
                        <span>{{ best_video_list[0].username }}</span>
                        最受欢迎的两个视频
                    </h3>
                    <div
                            v-for="(item, index) in best_video_list"
                            :key="item.vid"
                            class="contain-each-video"
                    >
                        <span class="ranking">热度第{{ index + 1 }}</span>
                        <i class="ranking-hot"><img src="../../assets/index/hot.png" alt="图片加载失败"/></i>
                        <div class="each-video">
                            <a
                                    class="v-lnk"
                                    :href="'/view-video?vid=' + item.vid"
                            >
                                <img
                                        :src="item.fengmian"
                                        width="200"
                                        height="150"
                                        alt="封面加载错误"
                                />
                                <div class="v-overlay"></div>
                                <span class="v-icon"></span>
                            </a>
                            <div class="video-message">
                                <h3 class="video-title">{{ item.vtitle }}</h3>
                                <div class="video-content">
                                    <p>
                                        {{item.vtext == "" ? "这位用户很懒，没有写内容哦" : item.vtext }}
                                    </p>
                                    <p
                                            data-we-empty-p=""
                                            style="text-align: center"
                                    ></p>
                                </div>
                                <div class="type-and-user">
                                    <div class="video-type">
                                        <i><img src="../../assets/index/game.png" alt="图片加载失败"/></i>
                                        <span>{{ item.videotype }}</span>
                                    </div>
                                    <div class="video-user">
                                        <i><img src="../../assets/index/user.png" alt="图片加载失败"/></i>
                                        <span>{{ item.username }}</span>
                                    </div>
                                </div>
                                <div class="video-target">
                                    <ul class="clear-float">
                                        <li>
                                            <i class="el-icon-video-play"></i>
                                            浏览：{{ item.watchnum }}
                                        </li>
                                        <li>
                                            <i class="el-icon-star-off"></i>
                                            获赞：{{ item.likecount }}
                                        </li>
                                        <li>
                                            <i class="el-icon-chat-dot-square"></i>
                                            评论：{{ item.cnum }}
                                        </li>
                                        <li>
                                            发布日期：{{ new Date(item.createtime).toLocaleDateString() }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <span style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);color: #606266">未查询到内容</span>
                </template>
            </div>
            <div class="user-list">
                <template v-if="user_list.length>0">
                    <div
                            class="each-user"
                            v-for="item in user_list"
                            :key="item.uid"
                            @click="searchUserBestVideo(item.uid)"
                    >
<!--                        <div class="user-img-and-name">-->
<!--                            <img-->
<!--                                    class="user-img"-->
<!--                                    :src="item.user_img"-->
<!--                                    alt="头像加载失败"-->
<!--                            />-->
<!--                            <span @click.stop="watchThisUser(item.uid)">{{item.user_name}}</span>-->
<!--                            <i><img :src="item.gender" alt="性别图标加载失败" /></i>-->
<!--                            <span class="user-sign">签名：{{ item.user_sign }}</span>-->
<!--                        </div>-->
                        <div style="display: flex;height: 60px;align-items: center;">
                            <div style="margin-left: 10px">
                                <img class="img-head-ranking" :src="item.user_img" alt=""/>
                            </div>
                            <div style="display: flex;flex-direction: column;color: cornflowerblue;">
                                <span @click.stop="watchThisUser(item.uid)" class="user-message-span-name-ranking">{{ item.user_name }}</span>
                                <span class="user-message-span-else-ranking">
                                <span style="line-height: 16px">
                                    <img :src="item.user_gender===0?'../../img/icons/wan_sex_unknow.png':(item.user_gender===1?'../../img/icons/wan_sex_m.png':'../../img/icons/wan_sex_w.png')" alt="" width="16" height="16"/>
                                </span>
                                <span style="color: #ffd048;padding-left: 20px;font-size: 16px;line-height: 16px">{{item.user_age}}</span>
                            </span>
                            </div>
                        </div>
                        <div class="user-hot-point">
                            <ul class="clear-float">
                                <li>
                                    <i class="el-icon-video-camera"></i><span>发布集锦：<i>{{ item.vnum }}</i></span>
                                </li>
                                <li>
                                    <i class="el-icon-star-off"></i><span>获得点赞：<i>{{ item.likenum }}</i></span>
                                </li>
                                <li>
                                    <i class="el-icon-view"></i><span>评论总数：<i>{{item.commentnum}}</i></span>
                                </li>
                                <li>
                                    <i class="el-icon-view"></i><span>观看总数：<i>{{item.wnum}}</i></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <span style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);color: #606266">未查询到内容</span>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import HighlightHeader from "@/components/HighlightHeader.vue";
    import { getUserRanking, getUserBestVideo } from "@/api/user";
    import { deepClone } from "@/utils";

    export default {
        name: "wholeVideo",
        components: { HighlightHeader },
        data() {
            return {
                user_info: {},
                backgroundStyle: "",
                best_video_list: [],
                user_list: [],
                // best_video_list:[],
                // userlist:[],
            };
        },
        methods: {
            // getuserpaiming() {
            // 	this.axios("/getuserpaiming")
            // 		.then((res) => {
            // 			//  console.log(res.data);
            // 			switch (res.data.code) {
            // 				case 1:
            // 					this.userlist = res.data.userlist;
            // 					this.userlist.forEach((item, index, userlist) => {
            // 						switch (item.gender) {
            // 							case 0:
            // 								userlist[index].gender =
            // 									"../../img/icons/wan_sex_unknow.png";
            // 								break;
            // 							case 1:
            // 								userlist[index].gender =
            // 									"../../img/icons/wan_sex_m.png";
            // 								break;
            // 							case 2:
            // 								userlist[index].gender =
            // 									"../../img/icons/wan_sex_w.png";
            // 								break;
            // 							default:
            // 								break;
            // 						}
            // 					});
            // 					//  console.log(this.userlist);
            // 					break;
            // 				case 0:
            // 					this.$message.error(res.data.Msg);
            // 					break;
            // 				default:
            // 					break;
            // 			}
            // 		})
            // 		.catch((err) => {
            // 			console.log(err);
            // 		});
            // },
            async getUsersMessage() {
                let res = await getUserRanking().then(res => res).catch((err) => {console.log(err)});
                if(res){
                    if(res.code===200){
                        this.user_list = deepClone(res.data.userList);
                        // this.user_list.forEach((item, index) => {
                        //     switch (item.gender) {
                        //         case 0:
                        //             item.gender = "../../img/icons/wan_sex_unknow.png";
                        //             break;
                        //         case 1:
                        //             item.gender = "../../img/icons/wan_sex_m.png";
                        //             break;
                        //         case 2:
                        //             item.gender = "../../img/icons/wan_sex_w.png";
                        //             break;
                        //         default:
                        //             break;
                        //     }
                        // });
                    } else {
                        this.$message.error(res.message);
                    }
                }
            },

            watchThisUser(uid) {
                this.$router.push(`/user-zone?uid=${uid}`);
            },
            async searchUserBestVideo(uid) {
                // this.axios("/searchuserbestvideo", {
                // 	params: {searchuid: uid},
                // })
                let res = await getUserBestVideo({searchUserId: uid}).then(res => res).catch((err) => {console.log(err)});
                if(res){
                    if(res.code===200){
                        this.best_video_list = res.data.bestVideoList;
                    } else {
                        this.$message.error(res.message);
                    }
                }
                // .then((res) => {
                // 	// console.log(res.data);
                // 	switch (res.data.code) {
                // 		case 1:
                // 			this.best_video_list = res.data.best_video_list;
                // 			break;
                // 		case 0:
                // 			this.$$message.error(res.data.Msg);
                // 			break;
                // 		default:
                // 			break;
                // 	}
                // })
                // .catch((err) => {
                // 	console.log(err);
                // });
            }
        },
        created() {
            this.getUsersMessage();
        },
        mounted() {
            // let guankanjijin = document.querySelector(".el-menu-item:nth-child(4)");
            // guankanjijin.className = "el-menu-item is-active";
            this.$store.dispatch("common/setBgStyle");
            this.backgroundStyle = this.$store.getters.backgroundStyle;
        },
    };
</script>

<style lang="scss" scoped>
    .img-head-ranking {
        /*margin: 10px 0 0 10px;*/
        height: 40px;
        width: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
    .user-message-span-name-ranking {
        width: 100px;
        display: block;
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .user-message-span-else-ranking {
        height: 30px;
        display: flex;
        /*justify-content: space-evenly;*/
        align-items: center;
        padding-left: 10px;
    }
    .all-highlight {
        height: 120vh;
        .user-best-video {
            height: 80vh;
            width: 65vw;
            margin-top: 30px;
            margin-left: 20px;
            float: left;
            border-radius: 5px;
            background-color: rgba(255, 255, 255, 0.7);
            position: relative;
            .title {
                color: coral;
                font-family: kaiti;
                text-align: right;
                font-size: 25px;
                margin-top: 20px;
                margin-right: 80px;
                span {
                    color: #559ad5;
                    font-family: kaiti;
                    font-size: 30px;
                }
            }
            .contain-each-video {
                width: 860px;
                margin-top: 45px !important;
                position: relative;
                margin: 0 auto;
                .ranking {
                    position: absolute;
                    left: -50px;
                    top: -15px;
                    color: #f28123;
                    font-weight: 600;
                }
                .ranking-hot {
                    img {
                        position: absolute;
                        left: 15px;
                        top: -15px;
                    }
                }
                .video-message {
                    height: 9.375rem;
                    width: 37.5rem;
                    position: absolute;
                    background-color: rgba(250, 235, 215, 0.7);
                    border-radius: 0.625rem;
                    right: 0.625rem;
                    top: 0.625rem;
                    transition: all 0.2s ease-in-out;
                    .video-title {
                        margin-top: 0.625rem;
                        text-align: center;
                        color: #409eff;
                    }
                    .video-content {
                        width: 31.25rem;
                        height: 4.375rem;
                        margin-top: 1.25rem;
                        margin: 0 auto;
                    }
                    .video-content p {
                        width: 13.125rem;
                        color: #559ad5;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .type-and-user .video-type i {
                        position: absolute;
                        bottom: 1.75rem;
                        left: 1.25rem;
                    }
                    .type-and-user .video-type span {
                        position: absolute;
                        bottom: 1.875rem;
                        left: 2.5rem;
                        font-size: 0.875rem;
                        color: #66c3ff;
                    }
                    /*position: absolute;*/
                    /*bottom: 1.625rem;*/
                    /*right: 6.875rem;*/
                }
                .type-and-user .video-user span {
                    display: block;
                    width: 5.625rem;
                    height: 1.25rem;
                    text-align: left;
                    position: absolute;
                    bottom: 1.75rem;
                    right: 0.9375rem;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size: 0.875rem;
                    color: #66c3ff;
                }
                .video-target {
                    height: 1.875rem;
                    width: 37.5rem;
                    position: absolute;
                    bottom: 0;
                }
                .video-target ul {
                    list-style: none;
                }
                .video-target ul li {
                    color: #559ad5;
                    margin: 0 0.8125rem;
                    font-size: 0.8125rem;
                    float: right;
                    line-height: 1.875rem;
                }
                .video-target ul li:nth-child(4) {
                    color: #559ad5;
                    margin: 0 0.8125rem;
                    font-size: 0.8125rem;
                    float: left;
                    line-height: 1.875rem;
                }
            }
            .video-message:hover {
                box-shadow: 0.3125rem 0.3125rem 0.4375rem rgba(71, 70, 70, 0.6);
            }
        }
        .each-video {
            width: 12.5rem;
            height: 9.375rem;
            display: inline-block;
            margin: 0.625rem;
            .v-lnk {
                position: relative;
                display: block;
                height: 9.375rem;
                cursor: pointer;
            }
            @keyframes ani-ico {
                from {
                    transform: scale(3);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            .v-lnk:hover .v-overlay {
                opacity: 1;
                filter: alpha(opacity=100);
                background-color: #53bcf6;
                opacity: 0.7;
                border-radius: 0.625rem;
                filter: alpha(opacity=70);
            }
            .v-lnk:hover .v-icon {
                animation: 0.2s linear 0s normal none ani-ico;
                -webkit-animation: 0.2s linear 0s normal none ani-ico;
                opacity: 1;
            }
            .v-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                border-radius: 0.625rem;
                background: rgba(84, 189, 247, 0.7);
                filter: progid:DXImageTransform.Microsoft.gradient(enabled='true',startColorstr='#77df4e3a',endColorstr='#77df4e3a');
                zoom: 1;
                height: 9.375rem;
                opacity: 0;
                filter: alpha(opacity=0);
                -webkit-transition: all 0.3s ease-in-out;
                -moz-transition: all 0.3s ease-in-out;
                transition: all 0.3s ease-in-out;
            }
            .v-icon {
                width: 3.125rem;
                height: 3.125rem;
                background: url("../../assets/index/play.png") no-repeat;
                background-size: cover;
                position: absolute;
                left: 4.6875rem;
                top: 3.125rem;
                opacity: 0;
            }
        }
        .each-video img {
            border-radius: 0.625rem;
            object-fit: cover;
        }
        .user-list {
            height: 70vh;
            width: 23vw;
            margin-top: 50px;
            margin-left: 120px;
            float: left;
            position: relative;
            border-radius: 5px;
            transition: all 0.2s ease-in-out;
            overflow-y: scroll;
            background-color: rgba(250, 235, 215, 0.7);
            .each-user:nth-child(1) {
                margin-top: 25px;
            }
            .each-user {
                cursor: pointer;
                width: 95%;
                height: 80px;
                margin: 0 auto;
                margin-top: 40px;
                position: relative;
                border-radius: 5px;
                transition: all 0.2s ease-in-out;
                background-color: rgba(255, 255, 255, 0.7);
                .user-img-and-name .user-img {
                    margin-top: 5px;
                    margin-left: 5px;
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                .user-img-and-name span:nth-child(2) {
                    white-space: nowrap;
                    font-style: normal;
                    font-weight: bold;
                    color: #409eff;
                    position: absolute;
                    left: 70px;
                }
                .user-img-and-name span:nth-child(2):hover {
                    white-space: nowrap;
                    font-style: normal;
                    font-weight: bold;
                    color: #f28123;
                    position: absolute;
                    left: 70px;
                }
                .user-sign {
                    white-space: nowrap;
                    font-style: normal;
                    color: burlywood;
                    position: absolute;
                    top: 30px;
                    font-size: 13px;
                    left: 70px;
                }
                .user-img-and-name i img {
                    position: absolute;
                    top: 5px;
                    right: 35px;
                    margin-left: 15px;
                    width: 15px;
                    height: 15px;
                }
                .user-hot-point ul {
                    list-style: none;
                    color: #559ad5;
                }
                .user-hot-point ul li {
                    float: right;
                }
                .user-hot-point ul li i {
                    vertical-align: bottom;
                    margin-right: 5px;
                }
                .user-hot-point ul li span {
                    font-weight: normal;
                    font-size: 12px;
                }
                .user-hot-point ul li span i {
                    font-style: normal;
                    font-weight: normal;
                    font-size: 13px;
                    color: #000;
                }
            }
        }
        .user-list:hover,
        .each-user:hover {
            box-shadow: 0.3125rem 0.3125rem 0.4375rem rgba(71, 70, 70, 0.6);
        }
    }
    .empty-block {
        width: 100%;
        height: 61px;
    }
    .all-highlight-header {
        width: 100%;
        position: fixed;
        display: block;
        z-index: 100;
    }
</style>
