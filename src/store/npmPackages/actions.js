import types from './mutation-types';

export default {
    updatePackageList({commit}, {payload}) {
        commit(types.UPDATE_PACKAGE_LIST, payload);
    },
    updateTotalCount({commit}, {payload}) {
        commit(types.UPDATE_TOTAL_COUNT, payload);
    },
    updateIsPopup({commit}, {payload}) {
        commit(types.UPDATE_IS_POPUP, payload);
    },
    updatePackageName({commit}, {packageName}) {
        commit(types.UPDATE_PACKAGE_NAME, packageName);
    },
    updateSearchText({commit}, {searchText}) {
        commit(types.UPDATE_SEARCH_TEXT, searchText);
    },
    updatePaginationData({commit}, {paginationData}) {
        commit(types.UPDATE_PAGINATION_DATA, paginationData);
    }
}
