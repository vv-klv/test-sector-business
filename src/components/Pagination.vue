<template>
    <div class="pagination">
        <div
            class="pagination__btn"
            @click="$emit('change', currentPage - 1)"
        >
            Назад
        </div>
        <div class="pagination__pages">
            <div
                v-for='pageNumber in totalPages'
                :key='pageNumber'
                class='pagination__page'
                :class="{'current-page': currentPage === pageNumber}"
                @click="$emit('change', pageNumber)"
            >
                <slot>{{ pageNumber }}</slot>
            </div>
        </div>
        <div
            class="pagination__btn"
            @click="$emit('change', currentPage + 1)"
        >
            Вперед
        </div>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        totalPages: {
            type: Number
        },
        currentPage: {
            type: Number
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../css/_variables.scss';

.pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: auto;
    max-width: 1077px;
    margin-top: 24px;
    padding: 0 30px;
    color: $color-grey-900;

    @media (max-width: 575px) {
        padding: 0;
    }

    &__btn {
        font-size: $text-xl;
        cursor: pointer;

        @media (max-width: 575px) {
            font-size: $text-lg;
        }

        &:hover {
            color: $color-green;
            transition: 0.2s ease-out;
        }
    }

    &__pages {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        flex-direction: row;
        cursor: pointer;

        @media (max-width: 425px) {
            width: 130px;
        }
    }

    &__page {
        margin: 0 10px;
        font-weight: 700;
        font-size: $text-lg;
        color: $color-grey-900;

        @media (max-width: 575px) {
            margin: 3px 8px;
            font-size: $text-md;
        }

        &:hover {
            color: $color-green;
        }

        &:active {
            color: $color-green;
        }
    }
}

.current-page {
    color: $color-green;
}
</style>