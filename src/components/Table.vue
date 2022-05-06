<template>
    <table class="table" RULES=ROWS FRAME=BOX>
        <thead>
            <tr class="table__header header">
                <th
                    class="header__cell header__id text-center"
                    @click="setSort('id-ascending', 'id-descending')"
                >
                    ID
                    <img
                        class="header__sort-arrow"
                        :class="selectedSort === 'id-descending'
                                    ? 'arrow-up'
                                    : 'arrow-down'"
                        :src="require('../assets/img/sort-arrow.svg')"
                        alt="sort"
                    >
                </th>
                <th
                    class="header__cell header__title text-center"
                    @click="setSort('title-ascending', 'title-descending')"
                >
                    Заголовок
                    <img
                        class="header__sort-arrow"
                        :class="selectedSort === 'title-descending'
                                    ? 'arrow-up'
                                    : 'arrow-down'"
                        :src="require('../assets/img/sort-arrow.svg')"
                        alt="sort"
                    >
                </th>
                <th
                    class="header__cell header__body text-center"
                    @click="setSort('body-ascending', 'body-descending')"
                >
                    Описание
                    <img
                        class="header__sort-arrow"
                        :class="selectedSort === 'body-descending'
                                    ? 'arrow-up'
                                    : 'arrow-down'"
                        :src="require('../assets/img/sort-arrow.svg')"
                        alt="sort"
                    >
                </th>
            </tr>
        </thead>
        <tbody class="table__body body">
            <tr
                v-for="post in posts"
                :key="post.id"
            >
                <td class="body__cell text-center">{{ post.id }}</td>
                <td class="body__cell ">{{ post.title }}</td>
                <td class="body__cell ">{{ post.body }}</td>
            </tr>
            <tr
                v-show="posts.length < 10"
                v-for="(post, i) in (10 - posts.length)"
                :key="i"
                style="min-height: 56px"
            >
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
                <td class="empty-cell"></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import Pagination from '@/components/Pagination';
import { mapMutations, mapState } from 'vuex';

export default {
    name: "Table",
    components: {Pagination},
    props: {
        posts: {
            type: Array,
            required: true,
        }
    },
    methods: {
        ...mapMutations({
            setSelectedSort: 'post/setSelectedSort',
        }),
        setSort(sortMethod1, sortMethod2) {
                 return this.selectedSort === sortMethod1
                            ? this.setSelectedSort(sortMethod2)
                            : this.setSelectedSort(sortMethod1)
        }
    },
    computed: {
        ...mapState({
            selectedSort: state => state.post.selectedSort,
        }),
    }
}
</script>

<style lang="scss" scoped>
@import '../css/_variables.scss';

.table {
    margin-top: 15px;
    width: 1077px;
}

.header {
    height: 54px;
    font-weight: 600;
    background-color: $color-grey-900;
    color: white;

    &__cell {
        cursor: pointer;
        border-bottom: none;

        &:hover {
            background-color: darken($color-grey-900, 3);
        }

        &:first-child {
            width: 100px;
            text-align: center;
        }
        &:last-child {
            width: 432px;
        }
    }

    &__sort-arrow {
        height: 7px;
        margin-left: 30px;
        transition: transform .2s linear;
    }
}

.body {
    font-size: $text-sm;
    font-weight: 500;
    color: $color-grey-900;

    tr td {
        height: 56px;
        padding: 10px 11px !important;
        border-top: none;
        border-bottom: 1px solid $color-grey-100;

        &:first-child {
            border-left: 1px solid $color-grey-100;
            border-right: 1px solid $color-grey-100;
        }

        &:last-child {
            border-left: 1px solid $color-grey-100;
            border-right: 1px solid $color-grey-100;
        }
    }
}

tr td {
    padding: 28px 11px !important;
}

.arrow-up {
    transform: rotate(180deg);
    transition: transform .2s linear;
}


</style>