import {
    UPDATE_PACKAGE_LIST,
    UPDATE_TOTAL_COUNT,
    UPDATE_IS_POPUP,
    UPDATE_PACKAGE_NAME,
} from './mutation-types';

export default {
    [UPDATE_PACKAGE_LIST](state, payload) {
        state.packageList = payload;
    },
    [UPDATE_TOTAL_COUNT](state, payload) {
        state.totalCount = payload;
    },
    [UPDATE_IS_POPUP](state, payload) {
        state.isPopup = payload;
    },
    [UPDATE_PACKAGE_NAME](state, payload) {
        state.packageName = payload;
    },
}
