<template>
    <footer class="footer">
        <ul class="profile-block">
            <li class="profile-block__name"><span>Автор:</span>&nbsp;Акмат</li>
            <li class="profile-block__link-block">
                <a class="profile-block__link" target="_blank" href="https://github.com/Akmatworld">Github</a>
            </li>
        </ul>
    </footer>
</template>

<script>
    export default {
        name: "VFooter"
    }
</script>

<style scoped lang="scss">
    $color: #fff;
    $bgc: #343a40;
    $none: none;

    .footer {
        display: flex;
        justify-content: center;
        background: $bgc;
        color: $color;
        height: 40px;
        margin-top: -40px;
    }
    .profile-block {
        display: inline-flex;
        justify-content: space-between;
        padding-top: 10px;

        &__name, &__link-block {
            list-style: $none;
        }
        &__name {
            margin-right: 20px;
        }
        &__link {
            text-decoration: underline;
            color: inherit;
        }
        &__link:hover {
            color: #888;
            text-decoration: $none;
        }
    }
</style>
