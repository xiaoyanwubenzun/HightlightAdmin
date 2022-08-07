<template>
    <div>
        <HighlightHeader/>
        <div class="user-highlight" :style="backgroundStyle">
            <div class="empty-block"></div>
            <div class="user-message-head">
                <div v-if="user_info.user_name" class="message-user">
                    <span class="user-ranking">本站贡献排名：{{ user_info.ranking }}</span>
                    <div style="display: flex;align-items: center;">
                        <div style="display: flex;align-items: center;margin-left: 10px">
                            <img class="img-head-user" :src="user_info.user_img" alt=""/>
                        </div>
                        <div style="width: 100px;display: flex;flex-direction: column;color: cornflowerblue;">
                            <span class="user-message-span-name">{{ user_info.user_name }}</span>
                            <span class="user-message-span-else">
                                <span style="line-height: 16px">
                                    <img :src="user_info.user_gender===0?'/img/icons/gender_unknow.png':(user_info.user_gender===1?'/img/icons/gender_man.png':'/img/icons/gender_woman.png')" alt="" width="16" height="16"/>
                                </span>
                                <span style="color: #ffd048;padding-left: 20px;font-size: 16px;line-height: 16px">{{user_info.user_age}}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div v-if="user_info.user_name" class="user-personality-message">
                    <div class="clear-float">
                        <span style="color: #559ad5;font-size: 14px;padding-left: 20px">喜欢：<span style="color: #000">{{ format_game_like }}</span></span>
                        <span style="color: #559ad5;font-size: 14px;padding-left: 20px">签名：<span style="color: #000">{{ user_info.user_sign?user_info.user_sign:"太懒了，没有填写。" }}</span></span>
                        <span style="color: #559ad5;font-size: 14px;padding-left: 20px">电话：<span style="color: #000">{{ user_info.user_phone?user_info.user_phone:"太懒了，没有填写。" }}</span></span>
                        <span style="color: #559ad5;font-size: 14px;padding-left: 20px">星座：<span style="color: #000">{{ format_constellation }}</span></span>
                        <span style="color: #559ad5;font-size: 14px;padding-left: 20px">邮箱：<span style="color: #000">{{ user_info.user_email?user_info.user_email:"太懒了，没有填写。" }}</span></span>
                    </div>
                    <ul class="clear-float">
                        <li>
                            <i class="el-icon-video-camera"></i><span>发布集锦：<i>{{ user_info.vnum }}</i></span>
                        </li>
                        <li>
                            <i class="el-icon-star-off"></i><span>获得点赞：<i>{{ user_info.likenum }}</i></span>
                        </li>
                        <li>
                            <i class="el-icon-chat-dot-square"></i><span>评论总数：<i>{{ user_info.commentnum }}</i></span>
                        </li>
                        <li>
                            <i class="el-icon-view"></i><span>观看总数：<i>{{ user_info.wnum }}</i></span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="user-upload-video">
                <template v-if="video_list.length>0">
                    <div class="video-list">
                        <div
                                v-for="item in video_list"
                                :key="item.vid"
                                class="each-video"
                        >
                            <div class="each-video-item">
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
                                            {{item.vtext == "" ? "这位用户很懒，没有写文字内容哦" : item.vtext }}
                                        </p>
                                        <p data-we-empty-p="" style="text-align: center"></p>
                                    </div>
                                    <div class="type-user">
                                        <div class="video-type">
                                            <i><img src="/img/icons/game.png" alt="图片加载失败"/></i>
                                            <span>{{ item.videotype }}</span>
                                        </div>
                                        <div class="video-user">
                                            <i><img src="/img/icons/user.png" alt="图片加载失败"/></i>
                                            <span>{{ item.username }}</span>
                                        </div>
                                    </div>
                                    <div class="video-popular-get">
                                        <ul class="clear-float">
                                            <li>
                                                <i class="el-icon-video-play"></i>浏览：{{ item.watchnum }}
                                            </li>
                                            <li>
                                                <i class="el-icon-star-off"></i>获赞：{{ item.likecount }}
                                            </li>
                                            <li>
                                                <i class="el-icon-chat-dot-square"></i>评论：{{ item.cnum }}
                                            </li>
                                            <li>
                                                发布日期：{{new Date(item.createtime).toLocaleDateString() }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="total_page"
                            @current-change="currentChange"
                    >
                    </el-pagination>
                </template>
                <template v-else>
                    <span style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);color: #606266">未查询到内容</span>
                </template>
            </div>
            <div class="user-highlight-search">
                <input
                        class="input"
                        type="text"
                        placeholder="搜索(标题关键字标题、内容、游戏类型、作者)"
                        v-model="keyword"
                        @keydown.enter="searchVideo()"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import HighlightHeader from "@/components/HighlightHeader.vue";
    import { getUserRanking,getUserInfoById } from "@/api/user";
    import { getUserHighLight } from "@/api/video";
    import { deepClone } from "@/utils";

    export default {
        name: "userZone",
        components: { HighlightHeader },
        data() {
            return {
                backgroundStyle: "",
                user_info: {},
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
                game_options: [
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
                total_page: 1000,
                keyword: "",
                now_page: 1,
                video_list: [],
            };
        },
        computed: {
            format_constellation(){
                return this.constellation_options[Number(this.user_info.user_consttel)-1].label;
            },
            format_game_like(){
                return this.game_options.filter(item => item.value === this.user_info.user_game_like)[0]?this.game_options.filter(item => item.value === this.user_info.user_game_like)[0].label:"太懒了，没有填写。";
            }
        },
        methods: {
            async computedUserMessage() {
                let res = await getUserRanking().then(res => res).catch((err) => {console.log(err)});
                this.searchVideo();
                if(res){
                    if(res.code===200){
                        let valid_ranking_user = [], user_list = [], this_user_info;
                        valid_ranking_user = res.data.userList.map(item => item.uid);
                        if(valid_ranking_user.indexOf(this.user_info.uid)>-1){
                            user_list = deepClone(res.data.userList);
                            user_list.forEach((item,index) => {
                                item.ranking = index + 1;
                            });
                            this_user_info = user_list.filter(item => item.uid === Number(this.$route.query.uid))[0];
                            this.user_info = Object.assign({},this_user_info,this.user_info);
                            // console.log(this.user_info);
                        } else {
                            this.user_info.wnum = 0;
                            this.user_info.likenum = 0;
                            this.user_info.commentnum = 0;
                            this.user_info.vnum = 0;
                            this.user_info.sums = 0;
                            this.user_info.ranking = "10000+";
                            // console.log(this.user_info);
                        }
                    } else {
                        this.$message.error(res.message);
                    }
                }
            },
            async searchVideo() {
                let res = await getUserHighLight({ uid: this.$route.query.uid, keyword: this.keyword, page_num: this.now_page }).then(res => res).catch((err) => {console.log(err)});
                if(res){
                    if(res.code===200){
                        this.video_list = res.data.videoList;
                        this.total_page = res.data.total;
                    } else {
                        this.$message.error(res.message);
                    }
                }
            },
            currentChange(val) {
                this.now_page = val;
                this.searchVideo();
            },
            async getUserInfo(){
                let res_user = await getUserInfoById({uid: this.$route.query.uid}).then(res => res).catch((err) => {console.log(err)});
                if(res_user.code === 200){
                    this.user_info = deepClone(res_user.data.user_info);
                } else {
                    this.$message.error(res_user.message);
                }
            }
        },
        created() {
            this.getUserInfo();
        },
        mounted() {
            this.$store.dispatch("common/setBgStyle");
            this.backgroundStyle = this.$store.getters.backgroundStyle;
            this.computedUserMessage();
        },
    };
</script>

<style lang="scss" scoped>
    .user-highlight {
        height: 120vh;
        .empty-block {
            height: 61px;
        }
        .user-message-head,
        .user-upload-video {
            border-radius: 5px;
            transition: all 0.2s ease-in-out;
            background-color: rgba(255, 255, 255, 0.7);
        }
        .user-message-head:hover {
            box-shadow: 5px 5px 7px rgba(71, 70, 70, 0.6);
        }
        .user-message-head {
            height: 150px;
            width: 65vw;
            margin-left: 100px;
            margin-top: 50px;
            .message-user {
                width: 100%;
                height: 50%;
                position: relative;
                .img-head-user {
                    /*margin: 10px 0 0 10px;*/
                    height: 50px;
                    width: 50px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                .user-message-span-name {
                    width: 100px;
                    display: block;
                    height: 30px;
                    line-height: 30px;
                    padding-left: 20px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .user-message-span-else {
                    height: 30px;
                    display: flex;
                    /*justify-content: space-evenly;*/
                    align-items: center;
                    padding-left: 20px;
                }
                .user-ranking {
                    position: absolute;
                    right: 50px;
                    top: 20px;
                    font-size: 20px;
                    color: #f28123;
                }
            }
            .user-personality-message {
                ul {
                    list-style: none;
                    color: #559ad5;
                    margin: 10px 0 0 20px;
                }
                ul li {
                    float: left;
                }
                ul li i {
                    vertical-align: bottom;
                    margin-right: 5px;
                }
                ul li span {
                    font-weight: normal;
                    font-size: 12px;
                }
                ul li span i {
                    font-style: normal;
                    font-weight: normal;
                    font-size: 13px;
                    color: #000;
                }
            }
        }
        .user-upload-video {
            height: 500px;
            width: 80vw;
            margin-left: 100px;
            margin-top: 50px;
            .video-list {
                width: 55rem;
                height: 25.625rem;
                margin: 0 auto;
                overflow: hidden;
                overflow-x: scroll;
                overflow-y: unset;
                .each-video {
                    width: 53.75rem;
                    margin: 1.25rem auto 0 auto;
                    position: relative;
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

                        .type-user .video-type i {
                            position: absolute;
                            bottom: 1.75rem;
                            left: 1.25rem;
                        }
                        .type-user .video-type span {
                            position: absolute;
                            bottom: 1.875rem;
                            left: 2.5rem;
                            font-size: 0.875rem;
                            color: #66c3ff;
                        }
                        .type-user .video-user i {
                            position: absolute;
                            bottom: 1.625rem;
                            right: 6.875rem;
                        }
                        .type-user .video-user span {
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
                        .video-popular-get {
                            height: 1.875rem;
                            width: 37.5rem;
                            position: absolute;
                            bottom: 0;
                        }
                        .video-popular-get ul {
                            list-style: none;
                        }
                        .video-popular-get ul li {
                            color: #559ad5;
                            margin: 0 0.8125rem;
                            font-size: 0.8125rem;
                            float: right;
                            line-height: 1.875rem;
                        }
                        .video-popular-get ul li:nth-child(4) {
                            color: #559ad5;
                            margin: 0 0.8125rem;
                            font-size: 0.8125rem;
                            float: left;
                            line-height: 1.875rem;
                        }
                    }
                    .video-message:hover {
                        box-shadow: 0.3125rem 0.3125rem 0.4375rem
                        rgba(71, 70, 70, 0.6);
                    }
                }
                .each-video-item {
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
                        background: url("/img/icons/play.png") no-repeat;
                        background-size: cover;
                        position: absolute;
                        left: 4.6875rem;
                        top: 3.125rem;
                        opacity: 0;
                    }
                }
                .each-video-item img {
                    border-radius: 0.625rem;
                    object-fit: cover;
                }
            }
        }
        .user-highlight-search {
            position: absolute;
            top: 115px;
            right: 25px;
            width: 25vw;
            height: 50px;
            text-align: center;
            .input {
                width: 14.375rem;
                max-width: 90%;
                outline: none;
                /* border: 1px solid rgba(255,255,255,0.3); */
                border: none;
                padding: 0.8125rem 0.9375rem;
                border-radius: 1.875rem;
                // color: rgba(255, 255, 255, 0.8);
                color: black;
                font-size: small;
                font-weight: normal;
                font-family: "Microsoft Yahei", sans-serif;
                text-align: center;
                background-color: rgba(255, 255, 255, 0.25);
                box-shadow: rgba(0, 0, 0, 0.2) 0 0 0.625rem;
                -webkit-backdrop-filter: blur(0.625rem);
                backdrop-filter: blur(0.625rem);
                transition: color 0.25s, background-color 0.25s, box-shadow 0.25s,
                left 0.25s, opacity 0.25s, top 0.25s, width 0.25s;
            }
            .input:hover {
                color: var(--txt-b-pure);
                background-color: rgba(255, 255, 255, 0.6);
                box-shadow: rgba(0, 0, 0, 0.3) 0 0 0.625rem;
                width: 33.125rem;
            }
        }
        .el-pagination {
            white-space: nowrap;
            padding: 2px 5px;
            color: #303133;
            font-weight: 700;
            text-align: center;
            margin-top: 20px;
        }
    }
</style>
