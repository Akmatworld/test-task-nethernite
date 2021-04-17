<template>
    <div class="header">
        <div class="header__input-block">
            <input type="text" :placeholder="searchText" v-model="searchText" @keyup.enter="searchPackage">
            <button class="btn btn-primary" @click="searchPackage">Search</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VHeader",
        data() {
            return {
                searchText: '',
            }
        },
        methods: {
            async searchPackage() {
                let response = await fetch(`${this.$SEARCH_API_URL}/search?text=${this.searchText}&size=10`);
                let result;
                if (response.ok) {
                    result = await response.json();
                    if (result.objects.length > 0) {
                        this.saveTotalCount(result.total);
                        this.saveFoundPackagesToStore(result.objects);
                    }

                }
            },
            saveTotalCount(total) {
                this.$store.dispatch('npmPackages/updateTotalCount', {payload: total});
            },
            saveFoundPackagesToStore(resultObject) {
                this.$store.dispatch('npmPackages/updatePackageList', {payload: resultObject});
            },
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
