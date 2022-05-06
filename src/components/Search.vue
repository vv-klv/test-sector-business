<template>
    <div class="search">
        <input
            type="text"
            placeholder="Поиск"
            @input="updateInput"
            class="search__field"
        />
        <img
            class="search__icon"
            :src="require('../assets/img/search-icon.svg')"
            alt="search-icon"
        >
    </div>
</template>

<script>
export default {
    name: "Search",
    methods: {
        updateInput(event) {
            this.$emit('update:value', event.target.value)
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../css/_variables.scss';

.search {
    display: flex;
    position: relative;
    width: 631px;
    height: 52px;
    align-items: center;


    &__field {
        display: flex;
        padding: 0 26px;
        width: 100%;
        height: 100%;
        color: white;
        outline: none;
        background-color: $color-grey-800;

        &:hover {
            background-color: darken($color-grey-800, 3);
        }

        &::placeholder {
            color: $color-grey-200;
        }
    }

    &__icon {
        position: absolute;
        right: 26px;
        height: 21px;
    }
}
</style>