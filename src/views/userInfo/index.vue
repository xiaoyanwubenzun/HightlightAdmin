<template>
    <div>
        <HighlightHeader ref="highlight-header" @send="getUserInfo"/>
        <template v-if="show_son">
            <userMessage @refresh="needReload" :userInfo="user_info"></userMessage>
        </template>
    </div>
</template>

<script>
    import HighlightHeader from "@/components/HighlightHeader.vue";
    import userMessage from "@/views/userInfo/userMessage.vue";
    import { deepClone } from "@/filters";
    export default {
        name: "index",
        components: { HighlightHeader, userMessage },
        data(){
            return {
                user_info: {},
                show_son: false
            }
        },
        methods: {
            getUserInfo(res){
                this.user_info = deepClone(res);
                this.show_son = true;
            },
            needReload(boo){
               this.$refs["highlight-header"].getUserInfo();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
