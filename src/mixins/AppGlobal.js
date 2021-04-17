const PAGE_SIZE = 10;
export default {
    computed: {
        searchText: {
            get() {
                return this.$store.getters['npmPackages/getSearchText'];
            },
            set(value) {
                this.$store.dispatch('npmPackages/updateSearchText', {searchText: value});
            }
        },
        paginationData: {
            get() {
                return this.$store.getters['npmPackages/getPaginationData'];
            },
            set(value) {
                this.$store.dispatch('npmPackages/updatePaginationData', {paginationData: value});
            }
        }
    },
    methods: {
        async searchPackage() {
            let response = await fetch(`${this.$SEARCH_API_URL}/search?text=${this.searchText}&size=${PAGE_SIZE}`);
            let result;
            if (response.ok) {
                result = await response.json();
                if (result.objects.length > 0) {
                    this.saveTotalCount(result.total);
                    this.saveFoundPackagesToStore(result.objects);
                    this.savePaginationData(result.total);
                }

            }
        },
        async getNextPage() {
            let from = this.paginationData.index + 1;
            if (this.paginationData.currentPageNumber === this.paginationData.pages)
                return;
            let response = await fetch(`${this.$SEARCH_API_URL}/search?text=${this.searchText}&size=${PAGE_SIZE}&from=${from}`);
            let result;

            if (response.ok) {
                result = await response.json();
                this.saveFoundPackagesToStore(result.objects);
                this.savePaginationData(result.total, 'next');
            }
        },
        async getPreviousPage() {
            let from = this.paginationData.index - 19;
            if (from < 0)
                return;
            let response = await fetch(`${this.$SEARCH_API_URL}/search?text=${this.searchText}&size=${PAGE_SIZE}&from=${from}`);
            let result;

            if (response.ok) {
                result = await response.json();
                this.saveFoundPackagesToStore(result.objects);
                this.savePaginationData(result.total, 'previousPage');
            }
        },
        savePaginationData(total, value = null) {
            let data = {}, pages, index, currentPageNumber;
            if (!value) {
                pages = Math.round(total / 10);
                index = 9;
                currentPageNumber = 1;

                data.pages = pages;
                data.index = index;
                data.currentPageNumber = currentPageNumber;
                this.paginationData = data;
            } else if (value === 'next') {
                data.index = this.paginationData.index + 10;
                data.currentPageNumber = this.paginationData.currentPageNumber + 1;
                this.paginationData = data;
            } else {
                data.index = this.paginationData.index - 10;
                data.currentPageNumber = this.paginationData.currentPageNumber - 1;
                this.paginationData = data;
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
