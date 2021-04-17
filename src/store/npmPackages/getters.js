export default {
    getPackageList(state) {
        return state.packageList;
    },
    getTotalCount(state) {
        return state.totalCount;
    },
    getIsPopup(state) {
        return state.isPopup;
    },
    getPackageName(state) {
        return state.packageName;
    },
    getSearchText(state) {
        return state.searchText;
    },
    getPaginationData(state) {
        return state.paginationData;
    }
}
