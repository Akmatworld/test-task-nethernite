<template>
    <div class="popup-block" v-show="isPopup">
        <div class="popup-block__popup">
            <div class="popup-block__close" @click="closePopup"></div>
            <div class="popup-block__content">
                <div class="popup-block__badge-block">
                    <p class="popup-block__badge-title">Get a badge for your package</p>
                    <div class="popup-block__svg-badge" v-show="svgBadge" v-html="svgBadge"></div>
                    <p class="popup-block__alternative-link" @click="getCustomBadge">{{badgeText}}</p>
                    <div class="popup-block__injection-link">
                        <p class="popup-block__badge-link">{{badgeLink}}</p>
                    </div>
                </div>

                <div class="popup-block__files">
                    <span class="popup-block__version" @click="openSelectVersion" ref="popup">{{packageVersion}}</span>
                    <ul v-closable="{exclude: ['popup'], handler: 'closable'}" class="popup-block__ul" v-show="isActive">
                        <li class="popup-block__li" v-for="(version, index) in packageVersionList.versions" :key="index"
                            @click="selectVersion(version)">{{version}}</li>
                    </ul>
                    <div class="popup-block__file-list">
                        <div class="popup-block__file-default">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-code" viewBox="0 0 16 16">
                                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                                <path d="M8.646 6.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 9 8.646 7.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 9l1.647-1.646a.5.5 0 0 0 0-.708z"/>
                            </svg>
                            <span>{{files.default}}</span></div>
                        <div class="popup-block__block-icon-text">
                            <div class="popup-block__file-name" v-for="(item, index) in files.files" :key="index">
                                <div class="popup-block__svg" v-show="item.type === 'directory'">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-fill" viewBox="0 0 16 16">
                                        <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
                                    </svg>
                                </div>
                                <div class="popup-block__svg" v-show="item.type !== 'directory'">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-fill" viewBox="0 0 16 16">
                                        <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z"/>
                                    </svg>
                                </div>
                                <div class="popup-block__item-name"><span class="popup-block__npmPath">{{npmPath}}</span>{{item.name}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--   block package usage    -->
                <div class="package-usage">
                    <div class="package-usage__header">
                        <div class="package-usage__title-blok">
                            <h3 class="package-usage__title">Package usage</h3>
                        </div>
                        <div class="package-usage__select">
                            <h3 class="package-usage__select-title" @click="openPopularPackagePopup" ref="popularPackage">Show requests per:&nbsp;{{popularPackageText}}</h3>
                            <ul v-closable="{exclude: ['popularPackage'], handler: 'closablePopularPackage'}" v-show="isActivePopularPackagePopup" class="package-usage__ul">
                                <li class="package-usage__li" v-for="(period, index) in select" :key="index" @click="selectPopularPackage(period)">{{period}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="package-usage__block-content">
                        <p class="package-usage__popular-text" v-show="packageUsage.isPopular">{{packageUsage.name}} is the {{packageUsage.order}}th most popular package on jsDelivr, with {{packageUsage.hits}} CDN hits in the last month</p>
                        <p class="package-usage__popular-text" v-show="!packageUsage.isPopular">{{packageName}} had {{packageUsage.hits}} CDN hits in the last month</p>
                    </div>
                </div>
                <!-- block top 5 version -->
                <div class="block-top-five-version">
                    <h3 class="block-top-five-version__title">Top 5 versions</h3>
                    <div class="block-top-five-version__line" v-for="(item, index) in topFiveVersions" :key="index">{{item.versionName}}: {{item.total}}</div>
                </div>
                <!-- block top 5 files -->
                <div class="block-top-five-files">
                    <h3 class="block-top-five-files__title" ref="topFiveFiles">Top 5 files&nbsp;
                        <span class="block-top-five-files__version" @click="openTopFiveFilesPopup">{{topFiveFilesVersion}}</span></h3>
                    <ul v-closable="{exclude: ['topFiveFiles'], handler: 'closableTopFiveFiles'}" v-show="isActiveTopFiveFilesPopup" class="block-top-five-files__ul">
                        <li class="block-top-five-files__li" v-for="(version, index) in packageVersionList.versions" :key="index"
                            @click="selectVersionTopFiveFiles(version)">{{version}}</li>
                    </ul>

                    <div v-for="(item, index) in topFiveFiles" :key="index">{{item.fileName}}: {{item.total}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VPopup",
        data() {
            return {
                svgBadge: '',
                packageVersionList: {},
                packageVersion: null,
                isActive: false,
                files: {},
                npmPath: '',
                badgeLink: '',
                badgeText: 'Alternative style',
                isAlternativeStyle: false,
                packageUsage: {name: '', hits: '', order: '', isPopular: false},
                select: ['day', 'week', 'month', 'year'],
                isActivePopularPackagePopup: false,
                popularPackageText: 'month',
                topFiveFiles: [],
                isActiveTopFiveFilesPopup: false,
                topFiveFilesVersion: '',
                topFiveVersions: [],
            }
        },
        computed: {
            packageName: {
                get() {
                    return this.$store.getters['npmPackages/getPackageName'];
                },
                set(packageName) {
                    this.$store.dispatch('npmPackages/updatePackageName', {packageName});
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
        watch: {
            topFiveFilesVersion(newValue, oldValue) {
                this.getTopFiveFiles(newValue);
            },
            popularPackageText(newValue, oldValue) {
                this.getPopularPackages();
            },
            packageVersion(newValue, oldValue) {
                this.getListOfPackageFiles();
                this.getPopularPackages();
            },
            packageName(newValue, oldValue) {
                if (newValue) {
                    this.getBadge();
                    this.getListOfPackageVersion();
                    this.getTopFiveVersions();
                }
            }
        },
        methods: {
            closableTopFiveFiles() {
                this.isActiveTopFiveFilesPopup = false;
            },
            openTopFiveFilesPopup() {
                this.isActiveTopFiveFilesPopup = !this.isActiveTopFiveFilesPopup;
            },
            selectVersionTopFiveFiles(value) {
                this.topFiveFilesVersion = value;
                this.isActiveTopFiveFilesPopup = false;
            },
            selectPopularPackage(value) {
                this.popularPackageText = value;
                this.isActivePopularPackagePopup = false;
            },
            closablePopularPackage() {
                this.isActivePopularPackagePopup = false;
            },
            openPopularPackagePopup() {
                this.isActivePopularPackagePopup = !this.isActivePopularPackagePopup;
            },
            getPopularPackages() {
                this.getMostPopularPackages()
                .catch(error => console.log(error));
            },
            getCustomBadge() {
                if (this.isAlternativeStyle) {
                    this.getBadge();
                    this.badgeText = 'Alternative style';
                    this.isAlternativeStyle = false;
                } else {
                    this.getBadge(true);
                    this.badgeText = 'Default style';
                    this.isAlternativeStyle = true;
                }
            },
            closable() {
                this.isActive = false;
            },
            openSelectVersion() {
                this.isActive = !this.isActive;
            },
            selectVersion(version) {
                this.packageVersion = version;
                this.topFiveFilesVersion = version;
                this.openSelectVersion();
            },
            setDefaultValues() {
                this.packageName = '';
                this.isPopup = false;
                this.isActive = false;
                this.popularPackageText = 'month';
                this.packageUsage = {name: '', hits: '', order: '', isPopular: false};
                this.topFiveVersions = [];
            },
            closePopup() {
                this.setDefaultValues();
            },
            checkIsPopular(array) {
                let status;
                array.forEach(item => {
                    if (item.name.toLowerCase() === this.packageName.toLowerCase())
                        status = true;
                });

                return status;
            },
            async getDataForChart() {
                // https://data.jsdelivr.com/v1/package/npm/jquery/stats/date/month

            },
            async getTopFiveVersions() {
                let url = `https://data.jsdelivr.com/v1/package/npm/${this.packageName}/stats`;
                let response = await fetch(url);
                let result;

                if (response.ok) {
                    result = await response.json();
                    this.topFiveVersions = this.findTopFiveVersions(result.versions);
                }
            },
            findTopFiveVersions(topFiveVersionObject) {
                let resObj = {};
                let i = 0;
                let big = 0;
                let versionName = '';

                while(i <= 4) {

                    for (let prop in topFiveVersionObject) {
                        let value = topFiveVersionObject[prop].total;
                        if (value > big && !(prop in resObj)) {
                            big = value;
                            versionName = prop;
                        }
                    }

                    if (big !== 0 && versionName)
                        resObj[versionName] = big.toLocaleString();
                    big = 0;
                    versionName = '';
                    i++;
                }

                let propertiesAsName = Object.keys(resObj);
                let arr = [];

                for (let i = 0; i < propertiesAsName.length; i++) {
                    let prop = propertiesAsName[i];
                    arr.push({versionName: prop, total: resObj[prop]});
                }

                return arr;
            },
            async getMostPopularPackages() {
                this.topFiveFiles.length = 0;
                let mostPopularUrl = `https://data.jsdelivr.com/v1/stats/packages`;
                let mpResponse = await fetch(mostPopularUrl);
                let mpResult, status;

                if (mpResponse.ok) {
                    mpResult = await mpResponse.json();
                    status = this.checkIsPopular(mpResult);
                }

                let url = `https://data.jsdelivr.com/v1/package/npm/${this.packageName}/stats/${this.popularPackageText}`;
                let response = await fetch(url);
                let result;
                if (response.ok) {
                    result = await response.json();
                    this.packageUsage.name = this.packageName;
                    this.packageUsage.hits = result.total.toLocaleString();
                    this.packageUsage.order = +result.rank + 1;
                    this.packageUsage.isPopular = status;
                }
                this.getTopFiveFiles();
            },
            async getTopFiveFiles(versionArg = null) {
                this.topFiveFiles.length = 0;
                let version = versionArg ? versionArg : this.packageVersion;
                let url = `https://data.jsdelivr.com/v1/package/npm/${this.packageName}@${version}/stats/${this.popularPackageText}`;
                let result;
                let response = await fetch(url);
                if (response.ok) {
                    result = await response.json();

                    let obj = this.getFileNameAndTotal(result.files);
                    let properties = Object.keys(obj);

                    for (let i = 0; i < properties.length; i++) {
                        let prop = properties[i];
                        this.topFiveFiles.push({fileName: prop, total: obj[prop]});
                    }
                }
            },
            getFileNameAndTotal(objects) {
                let resObj = {};

                let big = 0;
                let fileName = '';
                let i = 0;

                while (i <= 4) {

                    for (let file in objects) {
                        if (objects[file].total > big) {
                            big = objects[file].total;
                            fileName = file;
                        }
                    }

                    if (fileName && big !== 0)
                        resObj[fileName] = big;

                    delete objects[fileName];
                    fileName = '';
                    big = 0;
                    i++;
                }

                return resObj;
            },
            async getUsageStats(url) {
                let response = await fetch(url);
                let result;

                if (response.ok)
                    result = await response.json();

                return result;
            },
            async getBadge(styled) {
                let queryString = '';
                if (styled)
                    queryString = '?style=rounded';

                let url = `https://data.jsdelivr.com/v1/package/npm/${this.packageName}/badge${queryString}`;
                let response = await fetch(url);
                let result;
                if (response.ok) {
                    result = await response.text();
                    this.svgBadge = result;
                    this.badgeLink = `[![](${url})](https://www.jsdelivr.com/package/npm/${this.packageName})`;
                }
            },
            async getListOfPackageVersion() {
                let url = `https://data.jsdelivr.com/v1/package/npm/${this.packageName}`;
                let response = await fetch(url);
                if (response.ok) {
                    this.packageVersionList = await response.json();
                    this.packageVersion = this.packageVersionList.versions[0];
                    this.topFiveFilesVersion = this.packageVersion;
                    this.getListOfPackageFiles();
                }

            },
            async getListOfPackageFiles() {
                let url = `https://data.jsdelivr.com/v1/package/npm/${this.packageName}@${this.packageVersion}`;
                this.npmPath = `/npm/${this.packageName}@${this.packageVersion}/`;
                let response = await fetch(url);
                if (response.ok) {
                    this.files = await response.json();
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    $bgc: rgb(0, 0, 0, 0.7);
    $popupBgc: #fff;

    @mixin ul {
        position: absolute;
        background: #fff;
        height: 250px;
        overflow-x: hidden;
        overflow-y: scroll;
        margin: 0;
        padding: 0;
        border: 1px solid #ccc;
        box-shadow: 5px 5px 10px -7px rgb(0 0 0 / 76%);
        scrollbar-width: thin;
        scrollbar-color: #e5e5e5;

        &::-webkit-scrollbar {
            width: 8px;
        }
        &::-webkit-scrollbar-track {
            background-color: #e5e5e5;
        }
        &::-webkit-scrollbar-thumb {
            background: rgba(51,51,51,.3);
            border-radius: 8px;
        }
    }
    @mixin li {
        list-style: none;
        margin: 0;
        padding-left: 10px;
        &:hover {
            background: #333;
            color: #fff;
            cursor: pointer;
        }
    }
    @mixin five-title {
        font-size: 17px;
        font-weight: bold;
    }

    .popup-block {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        background: $bgc;
        width: 100%;
        height: 100%;

        &__ul {
            @include ul;
        }
        &__li {
            @include li;
        }
        &__file-list {
            line-height: 2em;
        }
        &__file-default {
            display: flex;
            align-items: center;
        }
        &__version {
            position: relative;
            &:hover {
                cursor: pointer;
            }
            &::after {
                content: "";
                position: absolute;
                border-top: 5px solid #000;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                top: 5px;
                margin-left: 5px;
            }
        }
        &__popup {
            position: relative;
            width: 140vh;
            background: $popupBgc;
            border-radius: 5px;
            margin: 10px;
        }
        &__content {
            padding: 5px;
        }
        &__npmPath {
            color: #888;
        }
        &__file-name {
            display: flex;
        }
        &__svg {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &__close:after {
            content: '\271A';
            display: inline-block;
            transform: rotate(46deg);
            position: absolute;
            right: 5px;
            top: 0;
        }
        &__close:hover {
            cursor: pointer;
        }

        &__badge-block {
            border: 1px solid #888;
            border-radius: 5px;
        }
        &__svg-badge {
            text-align: center;
        }
        &__alternative-link {
            font-size: 14px;
            margin-top: 4px;
            text-decoration: none;
            text-align: center;
            color: #888;
            &:hover {
                cursor: pointer;;
            }
        }
        &__injection-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            background: #f5f5f5;
        }
        &__badge-link {
            padding: 10px 5px;
            font-size: 15px;
            text-align: center;
            margin-bottom: 0;
        }
        &__badge-title {
            margin-top: 4px;
            text-align: center;
        }
    }
    .package-usage {
        margin-top: 40px;
        &__header {
            display: flex;
            justify-content: space-between;
        }
        &__title, &__select-title {
            font-size: 16px;
        }
        &__select-title {
            &:hover {
                cursor: pointer;
            }
        }
        &__ul {
            border: 1px solid #ccc;
            box-shadow: 5px 5px 10px -7px rgb(0 0 0 / 76%);
            position: absolute;
            background: #fff;
            width: 140px;
            padding:0;
            line-height: 1.8em;
        }
        &__li {
            list-style: none;
            padding-left: 20px;
            font-size: 13px;
            &:hover {
                background: #333;
                color: #fff;
                cursor: pointer;
            }
        }
        &__popular-text {
            text-align: center;
            font-weight: bold;
        }
    }
    .block-top-five-files {

        &__ul {
            @include ul;
        }
        &__li {
            @include li;
        }

        &__title {
            @include five-title;
            &:hover {
                cursor: pointer;
            }
        }
        &__version {
            position: relative;
            &::after {
                content: "";
                position: absolute;
                border-top: 5px solid #000;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                top: 5px;
                margin-left: 5px;
            }
        }
    }
    .block-top-five-version {
        &__title {
            @include five-title;
        }
        &__line {
            font-size: 16px;
        }
    }
</style>
