<template>
    <div class="table-block">
        <div class="table-block__total-count">{{totalCount}}&nbsp;<span class="total-count__title">packages found</span></div>
        <table class="table">
            <thead class="table-dark">
                <tr>
                    <th>№</th>
                    <th>Package Name</th>
                    <th>Scope</th>
                    <th>Version</th>
                    <th>Author</th>
                </tr>
            </thead>
            <tbody>
                <tr class="table__row" v-for="(itemPackage, index) in packageList" :key="index" @click="selectPackage(itemPackage.package.name)">
                    <td>{{index + 1}}</td>
                    <td>{{itemPackage.package.name}}</td>
                    <td>{{itemPackage.package.scope}}</td>
                    <td>{{itemPackage.package.version}}</td>
                    <td>{{checkUndefined(itemPackage.package.author)}}</td>
                </tr>
            </tbody>
        </table>
<!--        <div style="border: 1px solid red; margin-bottom: 10px;" v-for="(item, index) in packageList" :key="index">{{item}}</div>-->
        <VPagination/>
    </div>
</template>

<script>
    import VPagination from '@/components/VPagination';

    export default {
        name: "VTable",
        components: {
            VPagination,
        },
        computed: {
            totalCount() {
                return this.$store.getters['npmPackages/getTotalCount'];
            },
            packageList: {
                get() {
                    return this.$store.getters['npmPackages/getPackageList'];
                },
                set(value) {
                    this.$store.dispatch('npmPackages/updatePackageList', {payload: this.data});
                }
            },
            isPopup: {
                get() {
                    return this.$store.getters['npmPackages/getIsPopup'];
                },
                set(value) {
                    this.$store.dispatch('npmPackages/updateIsPopup', {payload: value});
                }
            }
        },
        methods: {
            openPopup() {
                this.isPopup = true;
            },
            updatePackageData(packageName) {
                this.$store.dispatch('npmPackages/updatePackageName', {packageName: packageName});
            },
            selectPackage(packageObject){
                console.log('hey')
                this.updatePackageData(packageObject);
                this.openPopup();
            },
            checkUndefined(value) {
                if (value)
                    return value.name;
                return '';
            }
        }
    }
</script>

<style scoped lang="scss">
    $bgc: rgba(100, 88, 77, 0.2);
    $color: #000;

    .table-block {
        padding: 0 10px;
        overflow-x: scroll;

        &__total-count {
            font-weight: bold;
            padding-bottom: 10px;
        }
    }
    .table {

        &__row:hover {
            background: $bgc;
            color: $color;
            cursor: pointer;
        }
    }

</style>
