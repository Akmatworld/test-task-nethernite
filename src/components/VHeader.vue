<template>
    <div class="header">
        <div class="header__input-block">
            <input type="text" placeholder="Search packages" v-model="searchTextLocal" @keyup.enter="searchPackageLocal">
            <button class="btn btn-primary" @click="searchPackageLocal">Search</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VHeader",
        data() {
            return {
                searchTextLocal: '',
            }
        },
        methods: {
            saveSearchText(value) {
                this.$store.dispatch('npmPackages/updateSearchText', {searchText: value});
            },
            searchPackageLocal() {
                this.saveSearchText(this.searchTextLocal);
                this.searchPackage();
            }
        }
    }
</script>

<style scoped lang="scss">
    .header {
        display: flex;
        justify-content: center;
        padding-top: 20px;
    }
</style>
