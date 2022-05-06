import axios from 'axios';

export const postModule = {
    state: () => ({
        BASE_URL: process.env.VUE_APP_TYPICODE_POSTS_URL,
        posts: [],
        isPostsLoading: false,
        searchQuery: '',
        selectedSort: 'id-ascending',
        page: 1,
        limit: 10,
        totalPages: 0,
    }),
    getters: {
        sortedPosts(state, column) {
            if (state.selectedSort === 'id-descending')
                return [...state.posts].reverse();

            if (state.selectedSort === 'title-ascending')
                return [...state.posts].sort((post1, post2) =>
                    post1.title?.localeCompare(post2.title))

            if (state.selectedSort === 'title-descending')
                return [...state.posts].sort((post1, post2) =>
                    post1.title?.localeCompare(post2.title)).reverse()

            if (state.selectedSort === 'body-ascending')
                return [...state.posts].sort((post1, post2) =>
                    post1.body?.localeCompare(post2.body))

            if (state.selectedSort === 'body-descending')
                return [...state.posts].sort((post1, post2) =>
                    post1.body?.localeCompare(post2.body)).reverse()

            else return [...state.posts]
        },
        searchedPosts(state, getters) {
            try {
                return getters.sortedPosts.filter(function(post) {
                        if (post.title.toLowerCase()
                            .includes(state.searchQuery.toLowerCase()))
                            return post;
                        if (post.body.toLowerCase()
                            .includes(state.searchQuery.toLowerCase()))
                            return post;
                    }
                )
            } catch (e) {
                console.log(e);
            }

        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool;
        },
        setSearchQuery(state, searchQuery) {
            try {
                state.searchQuery = searchQuery;
            } catch (e) {
                console.log(e);
            }
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setPage(state, page) {
            state.page = page;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true);
                const response = await axios
                    .get(state.BASE_URL, {
                        params: {
                            _page: state.page,
                            _limit: state.limit,
                        }
                    })
                commit('setTotalPages', Math.ceil(
                    response.headers['x-total-count'] / state.limit
                ));
                commit('setPosts', response.data);

            } catch (err) {
                console.log(err);
            } finally {
                commit('setLoading', false);
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page += 1);
                const response = await axios
                    .get(state.BASE_URL, {
                        params: {
                            _page: state.page,
                            _limit: state.limit,
                        }
                    })
                commit('setTotalPages', Math.ceil(
                    response.headers['x-total-count'] / state.limit
                ));
                commit('setPosts', [...state.posts, ...response.data]);
            } catch (err) {
                console.log(err);
            }
        },

    },
    namespaced: true
}