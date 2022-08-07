<template>
    <div>
        <HighlightHeader/>
        <div class="index-main" :style="backgroundStyle">
            <div class="empty-block"></div>
            <div class="search">
                <div class="now-time">
                    <h1 v-text="now_time">17:00</h1>
                    <p v-text="day_date"></p>
                </div>
                <input
                        class="input"
                        type="text"
                        placeholder="搜索(标题关键字标题、内容、游戏类型、作者)"
                        v-model="keyword"
                        @keydown.enter="searchVideo()"
                />
            </div>
            <div class="result">
                <template v-if="video_list.length>0">
                    <div class="best-video">
                        <div class="best-video-title">
                            <i>
                                <img src="/img/icons/hot.png" alt="图片加载失败"/>
                            </i>
                            <h3>本周热度冠军</h3>
                        </div>
                        <div class="best-video-user">
                            <i>
                                <img src="/img/icons/king.png" alt="图片加载失败"/>
                            </i>
                            <i>
                                <img :src="best_video.userimg" alt="头像加载失败" />
                                <span>{{ best_video.username }}</span>
                            </i>
                        </div>
                        <div class="best-video-main">
                            <div class="best-video-title-real">
                                <h4>{{ best_video.vtitle }}</h4>
                            </div>
                            <div class="each-video">
                                <a
                                        :href="'/view-video?vid=' + best_video.vid"
                                        class="v-lnk"
                                ><img
                                        :src="best_video.fengmian"
                                        width="100%"
                                        height="100%"
                                        alt="封面加载错误"
                                />
                                    <div class="v-overlay"></div>
                                    <span class="v-icon"></span></a>
                            </div>
                            <div class="best-video-message">
                                <ul>
                                    <li>
                                        <i class="el-icon-video-play"></i>
                                        <span>{{ best_video.watchnum }}</span>
                                    </li>
                                    <li>
                                        <i class="el-icon-star-off"></i>
                                        <span>{{ best_video.likecount }}</span>
                                    </li>
                                    <li>
                                        <i class="el-icon-chat-dot-square">
                                            <span>{{ best_video.cnum }}</span>
                                        </i>
                                        <i>
                                            <img src="/img/icons/game.png" alt=""/>
                                            <span>{{best_video.videotype}}</span>
                                        </i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="video-list">
                        <div
                                v-for="(item,index) in video_list"
                                :key="index"
                                class="contain-each-video"
                        >
                            <div class="each-video">
                                <a
                                        class="v-lnk"
                                        :href="'/view-video?vid=' + item.vid"
                                >
                                    <img :src="item.fengmian" alt="封面加载错误" />
                                    <div class="v-overlay"></div>
                                    <span class="v-icon"></span>
                                </a>
                                <div class="video-message">
                                    <h3 class="video-title">{{ item.vtitle }}</h3>
                                    <div class="video-content">
                                        <p>
                                            {{item.vtext == "" ? "这位用户很懒，没有写文字内容哦" : item.vtext }}
                                        </p>
                                        <p
                                                data-we-empty-p=""
                                                style="text-align: center"
                                        ></p>
                                    </div>
                                    <div class="type-user">
                                        <div class="video-type">
                                            <i>
                                                <img src="/img/icons/game.png" alt="图片加载失败"/>
                                            </i>
                                            <span>{{ item.videotype }}</span>
                                        </div>
                                        <div class="video-user">
                                            <i>
                                                <img src="/img/icons/user.png" alt="图片加载失败"/>
                                            </i>
                                            <span>{{ item.username }}</span>
                                        </div>
                                    </div>
                                    <div class="video-popular-get">
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
                                                发布日期：{{new Date(item.create_time).toLocaleDateString()}}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="choose-page">
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                :total="total_page"
                                @current-change="currentChange"
                        >
                        </el-pagination>
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
    import { getVideoList,getHottestVideoData } from "@/api/video";
    export default {
        name: "index",
        components: { HighlightHeader },
        data() {
            return {
                backgroundStyle: "",
                now_time: "",
                day_date: "",
                begin_now_time: "",
                total_page: 1000,
                keyword: "",
                page_num: 1,
                video_list: [],
                best_video: {},
            };
        },
        watch: {},
        methods: {
            async searchVideo() {
                let data = {
                    keyword: this.keyword,
                    page_num: this.page_num
                };
                let res = await getVideoList(data).then(res => res).catch((err) => {console.log(err);});
                if(res){
                    if(res.code===200){
                        this.video_list = res.data.data_list;
                        this.total_page = res.data.total;
                    } else {
                        this.$message.error(res.message);
                    }
                }
            },
            async searchBestVideo() {
                let res = await getHottestVideoData().then((res) => res).catch((err) => {console.log(err);});
                if(res){
                    if(res.code===200){
                        this.best_video = res.data.hottest_video;
                    } else {
                        this.$message.error(res.message);
                    }
                }
            },
            currentChange(val) {
                this.page_num = val;
                this.searchVideo();
            },
            showtime() {
                this.begin_now_time = setInterval(() => {
                    let cnday;
                    let date = new Date();
                    let year = date.getFullYear(); //获取当前年份
                    let mon = date.getMonth() + 1; //获取当前月份
                    let da = date.getDate(); //获取当前日
                    let day = date.getDay(); //获取当前星期几
                    let h = date.getHours(); //获取小时
                    let m = date.getMinutes(); //获取分钟
                    let s = date.getSeconds(); //获取
                    if (h < 10) {
                        h = `0${h}`;
                    }
                    if (m < 10) {
                        m = `0${m}`;
                    }
                    if (s < 10) {
                        s = `0${s}`;
                    }
                    switch (day) {
                        case 1:
                            cnday = "星期一";
                            break;
                        case 2:
                            cnday = "星期二";
                            break;
                        case 3:
                            cnday = "星期三";
                            break;
                        case 4:
                            cnday = "星期四";
                            break;
                        case 5:
                            cnday = "星期五";
                            break;
                        case 6:
                            cnday = "星期六";
                            break;
                        case 0:
                            cnday = "星期天";
                            break;
                        default:
                            break;
                    }

                    this.now_time = `${h}:${m}:${s}`;
                    this.day_date = `${year}/${mon}/${da}    ${cnday}`;
                }, 1000);
            }
        },
        created() {
            this.showtime();
            this.searchBestVideo();
            this.searchVideo();
        },
        mounted() {
            // let guankanjijin = document.querySelector(".el-menu-item:nth-child(1)");
            // guankanjijin.className = "el-menu-item is-active";
            this.$store.dispatch("common/setBgStyle");
            this.backgroundStyle = this.$store.getters.backgroundStyle;
        },
        beforeDestroy() {
            clearInterval(this.begin_now_time);
        },
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
    .index-main {
        height: 120vh;
    }
    .empty-block {
        width: 100%;
        height: 3.8125rem;
    }
    .search {
        height: 9.375rem;
        width: 100%;
        .now-time {
            width: 6.25rem;
            height: 4.375rem;
            margin: 0 auto;
            position: relative;
            z-index: 2;
            top: 1.25rem;
        }
        .now-time h1 {
            font-weight: 100;
            color: white;
            white-space: nowrap;
        }
        .now-time p {
            position: absolute;
            white-space: nowrap;
            color: white;
            left: 12.5rem;
            top: 1rem;
        }
        .input:hover {
            color: var(--txt-b-pure);
            background-color: rgba(255, 255, 255, 0.6);
            box-shadow: rgba(0, 0, 0, 0.3) 0 0 0.625rem;
            width: 33.125rem;
        }
        .input {
            position: absolute;
            top: 8.75rem;
            left: 50%;
            transform: translateX(-50%);
            width: 14.375rem;
            max-width: 80%;
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
    }
    .result {
        height: 31.25rem;
        width: 78.125rem;
        margin: 0 auto;
        border-radius: 0.3125rem;
        top: 10vh;
        position: relative;
        background-color: rgba(255, 255, 255, 0.7);
        .best-video {
            height: 25rem;
            width: 18.75rem;
            background-color: rgba(250, 235, 215, 0.7);
            border-radius: 0.625rem;
            margin-left: 1.875rem;
            position: absolute;
            top: 1.875rem;
            transition: all 0.2s ease-in-out;
            .best-video-title img {
                position: absolute;
                top: 1.5rem;
                left: 4.375rem;
            }
            .best-video-title h3 {
                color: #f28123;
                text-align: center;
                margin-top: 1.25rem;
            }
            .best-video-user i span {
                position: absolute;
                right: 4rem;
                top: 4.375rem;
                width: 12.5rem;
                white-space: nowrap;
                font-style: normal;
                font-weight: bold;
                text-align: right;
                color: #409eff;
            }
            .best-video-user i:nth-child(1) img {
                position: absolute;
                right: 0.75rem;
                top: 2.125rem;
                transform: rotate(28deg);
            }
            .best-video-user i:nth-child(2) img {
                position: absolute;
                right: 0.9375rem;
                top: 3.125rem;
                width: 2.5rem;
                height: 2.5rem;
                object-fit: cover;
                border-radius: 50%;
            }
            .best-video-main {
                .best-video-title-real h4 {
                    color: #f5b93b;
                    position: absolute;
                    top: 16.5625rem;
                    left: 1.25rem;
                    width: 15.625rem;
                    text-align: left;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .each-video {
                    width: 13.75rem;
                    height: 9.375rem;
                    display: inline-block;
                    margin: 0.625rem;
                    position: absolute;
                    top: 5.9375rem;
                    left: 0.625rem;
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
                        filter: progid:DXImageTransform.Microsoft.gradient(enabled="true",startColorstr="#77df4e3a",endColorstr="#77df4e3a");
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
                        left: 5.3125rem;
                        top: 3.125rem;
                        opacity: 0;
                    }
                }
                .each-video img {
                    border-radius: 0.625rem;
                    object-fit: cover;
                }
                .best-video-message ul {
                    position: absolute;
                    top: 19.0625rem;
                    left: 1.875rem;
                    list-style: none;
                }
                .best-video-message li:nth-child(1),
                .best-video-message li:nth-child(2),
                .best-video-message li:nth-child(3) {
                    color: #559ad5;
                }
                .best-video-message ul li span {
                    font-weight: normal;
                    font-size: 0.8125rem;
                    position: relative;
                    left: 0.3125rem;
                    top: -0.0625rem;
                }
                .best-video-message ul li i:nth-child(2) {
                    position: relative;
                    left: 8.4375rem;
                    top: -0.0625rem;
                }
                .best-video-message ul li i:nth-child(2) img {
                    position: relative;
                    left: 0rem;
                    top: 0.3125rem;
                }
                .best-video-message ul li i:nth-child(2) span {
                    font-style: normal;
                    position: relative;
                    left: 0.3125rem;
                    top: 0.125rem;
                }
            }
        }
        .best-video:hover {
            box-shadow: 0.3125rem 0.3125rem 0.4375rem rgba(71, 70, 70, 0.6);
        }
        .video-list {
            width: 55rem;
            height: 26.875rem;
            margin-left: calc(100% - 440px);
            transform: translateX(-50%);
            overflow: hidden;
            overflow-x: scroll;
            overflow-y: unset;
            .contain-each-video {
                width: 53.75rem;
                margin-top: 1.25rem;
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
                        margin: 1.25rem auto 0 auto;
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
                    filter: progid:DXImageTransform.Microsoft.gradient(enabled="true",startColorstr="#77df4e3a",endColorstr="#77df4e3a");
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
            .each-video img {
                border-radius: 0.625rem;
                object-fit: cover;
                width: 100%;
                height: 100%;
            }
        }
        .choose-page {
            margin-left: calc(100% - 505px);
            margin-top: 20px;
        }
    }
</style>
