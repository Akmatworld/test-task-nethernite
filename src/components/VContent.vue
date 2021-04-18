<template>
    <div class="content">
<!--        <VPopup/>-->
        <VTable v-show="isShowTable"/>
    </div>
</template>

<script>
    import VTable from "./VTable";
    import VPopup from "@/components/VPopup";

    export default {
        name: "VContent",
        components: {
            VTable,
            VPopup,
        },
        computed: {
            isShowTable() {
                return this.packageList.length > 0;
            },
            packageList: {
                get() {
                    return this.$store.getters['npmPackages/getPackageList'];
                },
                set(value) {
                    this.$store.dispatch('npmPackages/updatePackageList', {payload: this.data});
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .content::after {
        content: "";
        display: block;
        height: 100px;
    }
</style>
