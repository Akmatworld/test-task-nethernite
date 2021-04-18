<template>
    <div class="header">
        <div class="header__input-block">
            <input class="header__input form-control" type="text" placeholder="Search packages" v-model="searchTextLocal" @keyup.enter="searchPackageLocal">
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
        &__input-block {
            display: flex;
            margin-top: 20px;
        }
    }
</style>
