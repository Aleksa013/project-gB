Vue.component('filters', {
    props: ['quest'],
    template: `
    <form action="#" class="search-form" @submit.prevent="$parent.$emit('filter', 'userSearch')">
    <input type="text" class="search-field" v-model="quest">
    <button type="submit" class="btn-search">
        <i class="fas fa-search"></i>
    </button>
    </form>
    `
});