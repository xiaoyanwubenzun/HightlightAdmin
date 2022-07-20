<template>
    <div>
        <HighlightHeader class="header-user-article"></HighlightHeader>
        <div class="user-article" :style="backgroundStyle">
            <div class="empty-block"></div>
            <div>我的动态</div>
        </div>
    </div>
</template>

<script>
    import HighlightHeader from "@/components/HighlightHeader.vue";
    export default {
        name: "userArticle",
        components: { HighlightHeader },
        data() {
            return {
                backgroundStyle: ""
            };
        },
        watch: {},
        computed: {},
        methods: {},
        beforeCreated() {},
        created() {},
        beforeMounted() {},
        mounted() {
            this.$store.dispatch("common/setBgStyle");
            this.backgroundStyle = this.$store.getters.backgroundStyle;
        },
        beforeUpdated() {},
        updated() {},
        beforeDestroy() {},
        destroyed() {},
    };
</script>

<style lang="scss" scoped>
    .header-user-article {
        width: 100%;
        position: fixed;
        display: block;
        z-index: 100;
    }
    .user-article {
        height: 120vh;
        .empty-block {
            height: 61px;
        }
    }
</style>