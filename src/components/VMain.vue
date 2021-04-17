<template>
    <div class="main">
        <VHeader/>
        <VContent/>
        <VFooter/>
    </div>
</template>

<script>
    import VHeader from "@/components/VHeader";
    import VContent from "@/components/VContent";
    import VFooter from "./VFooter";

    export default {
        name: "VMain",
        components: {
            VHeader,
            VContent,
            VFooter,
        },
    }
</script>

<style scoped lang="scss">
</style>
