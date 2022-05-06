<template>
    <div class="wrapper">
        <Search @update:value="setSearchQuery"/>
        <Table :posts="searchedPosts"/>
        <Pagination
            @change="changePage"
            :current-page="page"
            :total-pages="totalPages"
        />
    </div>
</template>

<script>
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import Table from '@/components/Table';
import router from '@/router';
import { createRouter as $router } from 'vue-router';
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

export default {
    name: "HomeView",
    components: {Pagination, Search, Table},
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
        }),
        ...mapActions({
            fetchPosts: 'post/fetchPosts',
            loadMorePosts: 'post/loadMorePosts',
        }),
        changePage(pageNumber) {
            if (pageNumber < 1 || pageNumber > this.totalPages)
                return;
            router.push(
                {
                    pathname: `/posts/[page]`,
                    query: {
                        page: pageNumber
                    }
                }
            );
            this.setPage(pageNumber);
            this.fetchPosts();
        }
    },
    mounted() {
        this.fetchPosts();
    },
    computed: {
        ...mapState({
            BASE_URL: state => state.post.BASE_URL,
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            searchedPosts: 'post/searchedPosts',
        }),
    }
}
</script>

<style lang="scss" scoped>
@import '../css/_variables.scss';

.wrapper {
    width: 1232px;
    margin: 0 auto;
    padding: 24px 78px 12px;
    box-shadow: 0 4px 27px rgba(230, 231, 234, 0.78);
}

</style>