<template>
    <div>
        <div class="user-message" :style="backgroundStyle">
            <div class="my-message">
                <div class="user-message-head">
                    <div v-if="user_info.user_name" class="message-main">
<!--                        <img-->
<!--                                class="whosuserimg"-->
<!--                                :src="user_info.user_img"-->
<!--                                alt="图片加载中"-->
<!--                        />-->
<!--                        <span class="whosname">{{ user_info.user_name }}</span>-->
<!--                        <i class="whosgender"><img :src="user_info.gender==='0'?'../../img/icons/wan_sex_unknow.png':(user_info.gender==='1'?'../../img/icons/wan_sex_m.png':'../../img/icons/wan_sex_w.png')" alt="图片加载中"-->
<!--                        /></i>-->
<!--                        <i class="whosage"><span>{{ user_info.user_age }}</span></i>-->
                        <span style="color: #559ad5;font-size: 16px;position: absolute;right: 25%;top: 36%;cursor: pointer">
                            <el-tooltip
                                    class="item"
                                    effect="dark"
                                    content="修改"
                                    placement="top"
                            >
                              <i class="el-icon-edit-outline" @click="editUserMessage()"></i>
                            </el-tooltip>
                        </span>
                        <span class="ranking">本站贡献排名：{{ user_info.ranking }}</span>
                        <div style="display: flex;align-items: center;">
                            <div style="display: flex;align-items: center;margin-left: 10px">
                                <img class="img-head-user" :src="user_info.user_img" alt=""/>
                            </div>
                            <div style="width: 100px;display: flex;flex-direction: column;color: cornflowerblue;">
                                <span class="user-message-span-name">{{ user_info.user_name }}</span>
                                <span class="user-message-span-else">
                                <span style="line-height: 16px">
                                    <img :src="user_info.user_gender===0?'../../img/icons/wan_sex_unknow.png':(user_info.user_gender===1?'../../img/icons/wan_sex_m.png':'../../img/icons/wan_sex_w.png')" alt="" width="16" height="16"/>
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
                                            <p
                                                    data-we-empty-p=""
                                                    style="text-align: center"
                                            ></p>
                                        </div>
                                        <div class="type-user">
                                            <div class="video-type">
                                                <i><img
                                                        src="../../assets/index/game.png"
                                                        alt="图片加载失败"
                                                /></i>
                                                <span>{{ item.videotype }}</span>
                                            </div>
                                            <div class="video-user">
                                                <i><img
                                                        src="../../assets/index/user.png"
                                                        alt="图片加载失败"
                                                /></i>
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
                                                    <i
                                                            class="el-icon-chat-dot-square"
                                                    ></i>
                                                    评论：{{ item.cnum }}
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
                        <div class="my-highlight-search">
                            <input
                                    class="input"
                                    type="text"
                                    placeholder="搜索(标题关键字标题、内容、游戏类型、作者)"
                                    v-model="keyword"
                                    @keydown.enter="searchUserVideo()"
                            />
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
                        <div class="my-highlight-search">
                            <input
                                    class="input"
                                    type="text"
                                    placeholder="搜索(标题关键字标题、内容、游戏类型、作者)"
                                    v-model="keyword"
                                    @keydown.enter="searchUserVideo()"
                            />
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <el-dialog
                title="编辑个人信息"
                :visible.sync="show_edit_user_message"
                custom-class="super-market-el-dialog"
                top="30vh"
                width="35%"
                center
        >
            <div>
                <div class="dialog-item">
                    <div style="text-align: center">
                        <div style="text-align: left;position: relative">
                            <img class="img-head-user-edit" :src="edit_user_data.user_img" alt=""/>
                            <span class="img-head-user-edit-hover">
                                <el-upload
                                        :headers="upload_header"
                                        action="http://localhost:8090/upload/uploadImg"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload"
                                >
                                    <span style="font-size: 12px;">更换头像</span>
                                </el-upload>
                            </span>
                        </div>
                        <div style="margin-top: 20px;text-align: left">
                            <span style="line-height: 36px;white-space: nowrap">性&nbsp;&nbsp;&ensp;&ensp;&ensp;别：</span>
                            <div style="width: 200px;display: inline-block">
                                <el-radio-group v-model="edit_user_data.user_gender">
                                    <el-radio :label="0">
                                        <span style="line-height: 16px">
                                            <img :src="'../../img/icons/wan_sex_unknow.png'" alt="" width="16" height="16">
                                        </span>
                                    </el-radio>
                                    <el-radio :label="1">
                                        <span style="line-height: 16px">
                                            <img :src="'../../img/icons/wan_sex_m.png'" alt="" width="16" height="16">
                                        </span>
                                    </el-radio>
                                    <el-radio :label="2">
                                        <span style="line-height: 16px">
                                            <img :src="'../../img/icons/wan_sex_w.png'" alt="" width="16" height="16">
                                        </span>
                                    </el-radio>
                                </el-radio-group>
                            </div>
                            <span style="line-height: 36px;white-space: nowrap">&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：</span>
                            <div style="width: 200px;display: inline-block">
                                <el-input-number
                                        v-model="edit_user_data.user_age"
                                        controls-position="right"
                                        placeholder="请填写年龄"
                                        size="medium"
                                        :min="1" :max="100"
                                ></el-input-number>
                            </div>
                        </div>
                        <div style="margin-top: 20px;display: flex">
                            <span style="line-height: 36px;white-space: nowrap">喜&nbsp;&nbsp;&ensp;&ensp;&ensp;欢：</span>
                            <div style="width: 200px;display: inline-block">
                                <el-select
                                        v-model="edit_user_data.user_game_like"
                                        placeholder="请选择的游戏"
                                        size="medium"
                                >
                                    <el-option
                                            v-for="(item,index) in game_options"
                                            :key="index"
                                            :label="item.label"
                                            :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                            <span style="line-height: 36px;white-space: nowrap">&nbsp;&nbsp;&nbsp;&nbsp;星&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;座：</span>
                            <div style="width: 200px;display: inline-block">
                                <el-select
                                        v-model="edit_user_data.user_consttel"
                                        placeholder="请选择星座"
                                        size="medium"
                                >
                                    <el-option
                                            v-for="(item,index) in constellation_options"
                                            :key="index"
                                            :label="item.label"
                                            :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div style="margin-top: 20px;display: flex">
                            <span style="line-height: 36px;white-space: nowrap">密&nbsp;&nbsp;&ensp;&ensp;&ensp;保：</span>
                            <div style="width: 200px;display: inline-block">
                                <el-input
                                        v-model="edit_user_data.user_mibao"
                                        placeholder="请填修改密码的密保"
                                        size="medium"
                                ></el-input>
                            </div>
                            <span style="line-height: 36px;white-space: nowrap">&nbsp;&nbsp;&nbsp;&nbsp;电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：</span>
                            <div style="width: 200px;display: inline-block">
                                <el-input
                                        v-model="edit_user_data.user_phone"
                                        placeholder="请填写11位电话"
                                        size="medium"
                                ></el-input>
                            </div>
                        </div>
                        <div style="margin-top: 20px;display: flex">
                            <span style="line-height: 36px;white-space: nowrap">个性签名：</span>
                            <div style="width: 100%;display: inline-block">
                                <el-input
                                        v-model="edit_user_data.user_sign"
                                        placeholder="请填写个性签名"
                                        size="medium"
                                ></el-input>
                            </div>
                        </div>
                        <div style="margin-top: 20px;display: flex">
                            <span style="line-height: 36px;white-space: nowrap">邮箱地址：</span>
                            <div style="width: 100%;display: inline-block">
                                <el-input
                                        v-model="edit_user_data.user_email"
                                        placeholder="请填写邮箱"
                                        size="medium"
                                ></el-input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button
                        type="primary"
                        size="medium"
                        @click="updateUserMessage()"
                >
                    保 存
                </el-button>
                <el-button
                        size="medium"
                        @click="show_edit_user_message = false"
                >
                    取 消
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    // import HighlightHeader from "@/components/HighlightHeader.vue";
    import { getToken } from "@/utils/auth";
    import { getUserRanking,updateUserMessage } from "@/api/user";
    import { getUserHighLight } from "@/api/video";
    import { deepClone } from "@/filters";
    export default {
        name: "userMessage",
        components: {},
        props: {
            userInfo: {
        		type: Object,
        		required: true
        	}
        },
        data() {
            return {
                show_edit_user_message: false,
                backgroundStyle: "",
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
                user_info: this.userInfo,
                upload_header: {
                    'Highlight-Token': ""
                },
                edit_user_data: {},
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
            async getUsersMessage() {
                let res = await getUserRanking().then(res => res).catch((err) => {console.log(err)});
                this.searchUserVideo();
                if(res){
                    if(res.code===200){
                        let valid_ranking_user = [], user_list = [];
                        valid_ranking_user = res.data.userList.map(item => item.uid);
                        if(valid_ranking_user.indexOf(this.user_info.uid)>-1){
                            user_list = deepClone(res.data.userList);
                            user_list.forEach((item,index) => {
                                item.ranking = index + 1;
                            });
                            this.user_info = user_list.filter(item => item.uid === Number(this.user_info.uid))[0];
                            this.user_info = Object.assign({},this.$store.getters.user_info,this.user_info);
                        } else {
                            this.user_info.wnum = 0;
                            this.user_info.likenum = 0;
                            this.user_info.commentnum = 0;
                            this.user_info.vnum = 0;
                            this.user_info.sums = 0;
                            this.user_info.ranking = "10000+";
                            this.user_info = Object.assign({},this.$store.getters.user_info,this.user_info);
                        }
                    } else {
                        this.$message.error(res.message);
                    }
                }
            },
            async searchUserVideo() {
                let res = await getUserHighLight({ uid: this.$store.getters.user_info.uid, keyword: this.keyword, pagenum: this.now_page }).then(res => res).catch((err) => {console.log(err)});
                if(res){
                    if(res.code===200){
                        this.video_list = deepClone(res.data.videoList);
                        this.total_page = res.data.total;
                    } else {
                        this.$message.error(res.message);
                    }
                }
            },
            currentChange(val) {
                this.now_page = val;
                this.searchUserVideo();
            },
            editUserMessage(){
                this.edit_user_data = deepClone(this.user_info);
                this.show_edit_user_message = true;
                this.upload_header["Highlight-Token"] = getToken();
            },
            async updateUserMessage(){
                if(this.edit_user_data.user_img
                    &&this.edit_user_data.user_gender!==""
                    &&this.edit_user_data.user_age
                    &&this.edit_user_data.user_game_like
                    &&this.edit_user_data.user_consttel
                    &&this.edit_user_data.user_sign
                    &&this.edit_user_data.user_phone
                    &&this.edit_user_data.user_email
                ){
                    let data = {
                        // [obj.userimg, obj.usersign, obj.tel, obj.useremail, obj.gender, obj.uage, obj.consttell, obj.gamevalue, obj.uid, obj.mibao]
                        uid: this.user_info.uid,
                        userimg: this.edit_user_data.user_img,
                        usersign: this.edit_user_data.user_sign,
                        tel: this.edit_user_data.user_phone,
                        useremail: this.edit_user_data.user_email,
                        gender: this.edit_user_data.user_gender,
                        uage: this.edit_user_data.user_age,
                        consttell: this.edit_user_data.user_consttel,
                        gamevalue: this.edit_user_data.user_game_like,
                        mibao: this.edit_user_data.user_mibao
                    };
                    if (!/^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]*\.)+[A-Za-z]{2,14}$/.test(data.useremail)) {
                        this.$message.warning("邮箱格式不正确");
                        return;
                    }
                    if (!/^((13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/.test(data.tel)) {
                        this.$message.warning("手机号格式不正确");
                        return;
                    }
                    let res = await updateUserMessage(data).then(res => res).catch((err) => {console.log(err)});
                    if(res){
                        if(res.code===200){
                            this.$message.success(res.message);
                            this.user_info = Object.assign({},this.user_info,res.data.user_info);
                            this.show_edit_user_message = false;
                            this.$forceUpdate();
                            this.$emit("refresh",true);
                        } else {
                            this.$message.error(res.message);
                        }
                    }
                } else {
                    this.$message.warning("请完善个人资料")
                }
            },
            handleAvatarSuccess(res, file) {
                this.edit_user_data.user_img = res.data[0].url;
            },
            beforeAvatarUpload(file) {
                // console.log(file);
                const isJPG = file.type === "image/jpeg";
                const isPNG = file.type === "image/png";
                const isLt10M = file.size / 1024 / 1024 < 10;
                if (!isJPG && !isPNG) {
                    this.$message.error("上传头像只能是 JPG、PNG 格式!");
                }
                if (!isLt10M) {
                    this.$message.error("上传头像不能超过 10MB!");
                }
                return isJPG || (isPNG && isLt10M);
            }
        },
        created() {},
        mounted() {
            this.$store.dispatch("common/setBgStyle");
            this.backgroundStyle = this.$store.getters.backgroundStyle;
            this.getUsersMessage();
        },
    };
</script>

<style lang="scss" scoped>
    .super-market-el-dialog .el-dialog__header {
        padding: 5px 0;
        background-color: #F2F2F2;
        border-bottom: 1px solid #DEE3EF;
    }
    .super-market-el-dialog.el-dialog {
        position: relative;
        margin: 0 auto 50px;
        border-radius: 1px;
        -webkit-box-shadow: none;
        width: 50%;
        border: 1px solid #DEE3EF;
    }
    .super-market-el-dialog .el-dialog__headerbtn {
        top: 5px;
    }
    .user-message {
        height: 120vh;
        position: relative;
    }
    .img-head-user {
        /*margin: 10px 0 0 10px;*/
        height: 50px;
        width: 50px;
        border-radius: 50%;
        object-fit: cover;
    }
    .img-head-user-edit {
        height: 80px;
        width: 80px;
        border-radius: 50%;
        object-fit: cover;
    }
    .img-head-user-edit-hover {
        position: absolute;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        line-height: 80px;
        background-color: rgba(0,0,0,.5);
        transition: opacity .3s;
    }
    .img-head-user-edit-hover:hover{
        opacity: 1;
        cursor: pointer;
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
    .my-message {
        display: inline-block;
        width: 90%;
        height: 80%;
        // padding-top: 5%;
        margin-top: 5%;
        margin-left: 50%;
        transform: translateX(-50%);
        border-radius: 10px;
        background-color: rgba(245, 222, 179, 0.7);
        .user-message-head,
        .user-upload-video {
            border-radius: 5px;
            transition: all 0.2s ease-in-out;
            background-color: rgba(255, 255, 255, 0.7);
        }
        .user-message-head:hover,.user-upload-video:hover {
            box-shadow: 5px 5px 7px rgba(71, 70, 70, 0.6);
        }
        .user-message-head {
            height: 150px;
            width: 65vw;
            margin: 2rem auto 0 96px;
            .message-main {
                width: 100%;
                height: 50%;
                position: relative;
                /*.whosuserimg {*/
                /*    margin: 10px 0 0 10px;*/
                /*    height: 50px;*/
                /*    width: 50px;*/
                /*    border-radius: 50%;*/
                /*    object-fit: cover;*/
                /*}*/
                /*.whosgender img {*/
                /*    width: 15px;*/
                /*    height: 15px;*/
                /*    position: absolute;*/
                /*    top: 25%;*/
                /*    left: 25%;*/
                /*}*/
                /*.whosname {*/
                /*    position: absolute;*/
                /*    top: 15px;*/
                /*    left: 70px;*/
                /*    color: cornflowerblue;*/
                /*}*/
                /*.whosage span {*/
                /*    position: absolute;*/
                /*    top: 15px;*/
                /*    left: 28%;*/
                /*    font-style: normal;*/
                /*    color: darkorchid;*/
                /*}*/
                .ranking {
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
            margin: 2rem auto 0 96px;
            position: relative;
            .video-list {
                width: 55rem;
                height: 25.625rem;
                overflow: hidden;
                overflow-x: scroll;
                overflow-y: unset;
                margin-left: calc(50% - 15%);
                transform: translateX(-50%);
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
                        background: url("../../assets/index/play.png") no-repeat;
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
        .my-highlight-search {
            position: absolute;
            top: 50px;
            right: 0;
            text-align: center;
            width: 25vw;
            height: 50px;
            .input {
                width: 14.375rem;
                margin-right: 20px;
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
                width: 25.125rem;
            }
        }
        .el-pagination {
            width: 55rem;
            white-space: nowrap;
            padding: 2px 5px;
            color: #303133;
            font-weight: 700;
            margin-top: 20px;
            text-align: center;
            margin-left: calc(50% - 15%);
            transform: translateX(-50%);
        }
    }
</style>
