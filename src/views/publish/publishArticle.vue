<template>
    <div>
        <HighlightHeader/>
        <div class="publish-article" :style="backgroundStyle">
            <div class="empty-block"></div>
            <div>发布动态</div>
        </div>
    </div>
</template>

<script>
    import HighlightHeader from "@/components/HighlightHeader.vue";
    export default {
        name: "publishArticle",
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
    .publish-article {
        height: 120vh;
        .empty-block {
            height: 61px;
        }
    }
</style>