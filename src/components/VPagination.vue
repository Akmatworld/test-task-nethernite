<template>
    <div class="pg-block">
        <nav class="pg-block__nav">
            <ul class="pagination">
                <li class="page-item" @click="getPreviousPageLocal($event)"><a :class="{'disabled': isPreviousDisabled}" class="page-link" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" href="#">{{paginationData.currentPageNumber}}</a></li>
                <li class="page-item" @click="getNextPageLocal($event)"><a :class="{'disabled': isNextDisabled}" class="page-link" href="#">Next</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "VPagination",
        data() {
            return {
                currentPage: {pageNumber: 0, from: null},
                isPreviousDisabled: false,
                isNextDisabled: false,
            }
        },
        watch: {
            paginationData: {
                handler(nV, oV) {
                    this.isPreviousDisabled = nV.currentPageNumber === 1;
                    this.isNextDisabled = nV.currentPageNumber === nV.pages;
                },
                deep: true,
            },
        },
        methods: {
            getPreviousPageLocal(e) {
                e.preventDefault();
                this.getPreviousPage();
            },
            getNextPageLocal(e) {
                e.preventDefault();
                this.getNextPage();
            }
        }
    }
</script>

<style scoped lang="scss">
    .pg-block {
        display: flex;
        justify-content: center;
        margin-top: 18px;
    }
    .disabled {
        color: #fff;
        background: #ccc;
        &:hover {
            color: #fff;
            background: #ccc;
        }
    }
</style>
