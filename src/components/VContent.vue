<template>
    <div class="content">
        <VTable v-show="isShowTable"/>
        <VPagination v-show="isShowTable"/>
    </div>
</template>

<script>
    import VPagination from '@/components/VPagination';
    import VTable from "./VTable";

    export default {
        name: "VContent",
        components: {
            VPagination,
            VTable,
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
</style>
