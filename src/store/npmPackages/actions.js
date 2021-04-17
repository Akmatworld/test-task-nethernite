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
}
